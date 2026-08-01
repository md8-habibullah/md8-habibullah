#!/usr/bin/env node
/**
 * Regenerates the marker-delimited regions of README.md from three independent
 * sources, each of which owns a different kind of fact:
 *
 *   - the portfolio CMS (MongoDB `portfolio_cms`) owns identity, narrative and
 *     curation: about, experience, skills, curated projects, kits, roadmap;
 *   - the GitHub API owns every number and all repo metadata: stars, followers,
 *     repo counts, top repositories, language mix, topics;
 *   - the Dev.to API owns the writing.
 *
 * Nothing numeric is ever hand-typed into the README, so the profile can't drift
 * from reality the way the previous hand-maintained version did.
 *
 * Each source fails independently. A source that can't be reached simply leaves
 * its own regions at whatever is already committed, rather than blanking them -
 * a Mongo outage must never publish an empty profile. If every source fails the
 * script exits 0 having touched nothing.
 *
 * Usage: node scripts/sync-readme.mjs
 *   MONGODB_URI_READONLY  read-only Atlas user (falls back to habibullah.dev/llms.txt)
 *   GITHUB_TOKEN          supplied automatically by Actions; raises the rate limit
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const README_PATH = path.join(ROOT, 'README.md');

const GH_USER = 'md8-habibullah';
const DEVTO_USER = 'md8_habibullah';
const SITE = 'https://habibullah.dev';
const CMS_DB = 'portfolio_cms';
const CMS_COLLECTION = 'homepage';

const GH_TOKEN = process.env.GITHUB_TOKEN || '';
const MONGO_URI = process.env.MONGODB_URI_READONLY || process.env.MONGODB_URI || '';

const UA = 'md8-habibullah-profile-sync';
const BROWSER_UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const log = (...a) => console.log('[sync]', ...a);
const warn = (...a) => console.warn('[sync]', ...a);

/* ------------------------------------------------------------------ utils */

/** Fetch with a hard timeout; returns null instead of throwing. */
async function safeFetch(url, { timeout = 15000, ...init } = {}) {
  try {
    return await fetch(url, { signal: AbortSignal.timeout(timeout), ...init });
  } catch (err) {
    warn(`fetch failed: ${url} - ${err.message}`);
    return null;
  }
}

async function fetchJson(url, { timeout = 15000, headers = {} } = {}) {
  const res = await safeFetch(url, {
    timeout,
    headers: { 'User-Agent': UA, Accept: 'application/json', ...headers },
  });
  if (!res || !res.ok) {
    if (res) warn(`HTTP ${res.status} for ${url}`);
    return null;
  }
  try {
    return await res.json();
  } catch (err) {
    warn(`bad JSON from ${url} - ${err.message}`);
    return null;
  }
}

/** Escape a value destined for a markdown table cell. */
function cell(text) {
  return String(text ?? '')
    .replace(/\r?\n+/g, ' ')
    .replace(/\|/g, '\\|')
    .trim();
}

/** Collapse CMS prose to a single tidy line. */
function oneLine(text) {
  return String(text ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

/* --------------------------------------------------------- link probing */

const probeCache = new Map();

/**
 * Is a URL safe to publish?
 *
 * The CMS is mirrored verbatim, so it can contain links that have rotted since
 * they were entered - a demo whose deployment is gone, or a repo that has since
 * been flipped private (which GitHub reports as 404 to anonymous visitors).
 * Publishing those would put dead links on the profile, so every candidate is
 * probed once and silently dropped if it doesn't resolve.
 *
 * 403/405/999 are anti-bot or method-not-allowed responses from hosts like
 * LinkedIn and Medium - the page is fine, it just dislikes scripted HEADs.
 */
async function isLinkAlive(url) {
  if (!url || typeof url !== 'string') return false;
  if (!/^https?:\/\//i.test(url)) return false;
  if (probeCache.has(url)) return probeCache.get(url);

  const alive = await probeUrl(url);
  probeCache.set(url, alive);
  if (!alive) warn(`dropping dead link: ${url}`);
  return alive;
}

async function probeUrl(url) {
  const repo = url.match(/^https?:\/\/github\.com\/([^/]+)\/([^/#?]+)/i);
  if (repo) {
    const name = repo[2].replace(/\.git$/i, '');
    const headers = { 'User-Agent': UA, Accept: 'application/vnd.github+json' };
    if (GH_TOKEN) headers.Authorization = `Bearer ${GH_TOKEN}`;
    const res = await safeFetch(`https://api.github.com/repos/${repo[1]}/${name}`, { headers });
    if (!res || !res.ok) return false;
    // A token that can see private repos would happily report 200 here, but a
    // visitor to the profile gets a 404 - so judge by visibility, not by status.
    const body = await res.json().catch(() => null);
    if (body?.private) {
      warn(`private repo, not linkable: ${url}`);
      return false;
    }
    return true;
  }

  const headers = { 'User-Agent': BROWSER_UA };
  let res = await safeFetch(url, { method: 'HEAD', redirect: 'follow', headers });
  if (res && (res.status === 405 || res.status === 501)) {
    res = await safeFetch(url, { method: 'GET', redirect: 'follow', headers });
  }
  if (!res) return false;
  if (res.ok) return true;
  return [403, 405, 999].includes(res.status);
}

/** Normalise a CMS link and drop it if it doesn't resolve. */
async function liveLink(url) {
  if (!url || typeof url !== 'string') return null;
  const clean = url.trim().replace(/\.git$/i, '');
  if (!clean) return null;
  return (await isLinkAlive(clean)) ? clean : null;
}

/* ------------------------------------------------------------ source: CMS */

async function loadCmsFromMongo() {
  if (!MONGO_URI) return null;
  let client;
  try {
    const { MongoClient } = await import('mongodb');
    // Mirrors global-ID/lib/db.ts: a tiny pool, because Atlas M0 caps total
    // connections and this process is short-lived.
    client = new MongoClient(MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
      maxPoolSize: 2,
      minPoolSize: 0,
    });
    await client.connect();
    const col = client.db(CMS_DB).collection(CMS_COLLECTION);
    const docs = await col.find({}).toArray();
    const byType = {};
    for (const doc of docs) byType[doc.type] = doc;
    log(`CMS: read ${docs.length} docs from MongoDB`);
    return byType;
  } catch (err) {
    warn(`CMS: MongoDB unavailable - ${err.message}`);
    return null;
  } finally {
    await client?.close().catch(() => { });
  }
}

/**
 * Zero-secret fallback. habibullah.dev/llms.txt is generated by the portfolio
 * itself from the same documents, so it carries the same facts in a public,
 * already-ISR-cached form - enough to keep the README current when the database
 * can't be reached (or when no secret is configured at all).
 */
async function loadCmsFromLlmsTxt() {
  const res = await safeFetch(`${SITE}/llms.txt`, { headers: { 'User-Agent': UA } });
  if (!res || !res.ok) return null;
  const text = await res.text();

  const section = (name) => {
    // `$(?![\s\S])` is a genuine end-of-string anchor. A bare `$` under the `m`
    // flag matches at every line ending, which would cut each section short
    // after its first bullet.
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const m = text.match(new RegExp(`^## ${escaped}\\s*\\n([\\s\\S]*?)(?=\\n## |$(?![\\s\\S]))`, 'm'));
    return m ? m[1].trim() : '';
  };
  const bullets = (name) =>
    section(name)
      .split('\n')
      .filter((l) => l.trim().startsWith('- '))
      .map((l) => l.trim().slice(2).trim());

  const roles = bullets('Current Roles').map((line) => {
    const m = line.match(/^\*\*(.+?)\*\*\s+at\s+(.+?)\s+\((.+?),\s*(.+?)\)$/);
    return m
      ? { displayRole: m[1], company: m[2], type: m[3], period: m[4], location: '' }
      : { displayRole: line, company: '', type: '', period: '', location: '' };
  });

  const projects = bullets('Projects').map((line) => {
    const m = line.match(/^\[(.+?)\]\((.+?)\)(?:\s*\(Featured\))?:\s*([\s\S]*?)(?:\s*\[(.+?)\])?$/);
    if (!m) return null;
    return {
      title: m[1],
      demo: m[2],
      github: '',
      description: m[3].trim(),
      tags: m[4] ? m[4].split(',').map((t) => t.trim()) : [],
      featured: /\(Featured\)/.test(line),
    };
  });

  const categories = bullets('Skills').map((line) => {
    const m = line.match(/^\*\*(.+?):\*\*\s*(.+)$/);
    return m
      ? { name: m[1], skills: m[2].split(',').map((s) => ({ name: s.trim() })) }
      : null;
  });

  const roadmapItems = bullets('Roadmap').map((line) => {
    const m = line.match(/^\*\*(.+?):\*\*\s*(.+?)\s*-\s*([\s\S]+)$/);
    return m ? { year: m[1], title: m[2], description: m[3], tech: [] } : null;
  });

  const tools = bullets('Free Tools (Kits)').map((line) => {
    const m = line.match(/^\[(.+?)\]\((.+?)\):\s*([\s\S]+)$/);
    return m ? { name: m[1], href: m[2], description: m[3] } : null;
  });

  log('CMS: fell back to public llms.txt');
  return {
    __fallback: true,
    about_content: { bioText: (text.match(/^> ([\s\S]*?)\n\n/m) || [, ''])[1] },
    experience_content: { experiences: roles },
    projects_content: { projects: projects.filter(Boolean) },
    skills_content: { categories: categories.filter(Boolean) },
    roadmap_content: { roadmapItems: roadmapItems.filter(Boolean) },
    kits_content: { tools: tools.filter(Boolean) },
  };
}

async function loadCms() {
  return (await loadCmsFromMongo()) || (await loadCmsFromLlmsTxt());
}

/* --------------------------------------------------------- source: GitHub */

async function loadGitHub() {
  const headers = { 'User-Agent': UA, Accept: 'application/vnd.github+json' };
  if (GH_TOKEN) headers.Authorization = `Bearer ${GH_TOKEN}`;

  const user = await fetchJson(`https://api.github.com/users/${GH_USER}`, { headers });
  if (!user) {
    warn('GitHub: profile unavailable');
    return null;
  }

  // Paginate fully. The account has ~300 public repos, so a single page would
  // silently truncate the star ranking and hide older highly-starred work.
  const repos = [];
  for (let page = 1; page <= 10; page += 1) {
    const batch = await fetchJson(
      `https://api.github.com/users/${GH_USER}/repos?per_page=100&page=${page}&type=owner&sort=pushed`,
      { headers },
    );
    if (!batch || batch.length === 0) break;
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  if (repos.length === 0) {
    warn('GitHub: no repositories returned');
    return null;
  }

  const owned = repos.filter((r) => !r.fork && !r.private);
  log(`GitHub: ${repos.length} public repos, ${owned.length} original`);
  return { user, repos: owned };
}

/* --------------------------------------------------------- source: Dev.to */

async function loadDevto() {
  const articles = await fetchJson(
    `https://dev.to/api/articles?username=${DEVTO_USER}&per_page=30`,
  );
  if (!Array.isArray(articles) || articles.length === 0) {
    warn('Dev.to: no articles returned');
    return null;
  }
  log(`Dev.to: ${articles.length} articles`);
  return articles;
}

/* -------------------------------------------------------------- renderers */

function renderAbout(cms) {
  const about = cms.about_content || {};
  const hero = cms.hero_content || {};
  const out = [];
  if (about.bioText) out.push(String(about.bioText).trim());
  if (hero.description) out.push(`\n${oneLine(hero.description)}`);
  if (about.quote) out.push(`\n> *${oneLine(about.quote)}*`);
  return out.join('\n');
}

/**
 * The header banner's caption comes from the CMS too, so a change of job or title
 * doesn't leave a stale headline at the very top of the profile.
 */
function renderBanner(cms) {
  const subtitle = cms.hero_content?.subtitle || '';
  // e.g. "Full-Stack Engineer @ Octopi Digital || Backend Specialist --" -> the
  // part before the separator, without trailing punctuation.
  const caption =
    // Unicode escapes, not literal dashes: a literal en/em dash inside a
    // character class is fragile if the file is ever reformatted.
    oneLine(String(subtitle).split('||')[0])
      .replace(/[\u2013\u2014|\-]+$/, '')
      .trim() ||
    'Full-Stack Engineer';

  const banner =
    'https://capsule-render.vercel.app/api?type=waving&color=0:1e1e2e,100:4d4dff&height=230' +
    '&section=footer&text=HABIBULLAH+%F0%9F%9A%80&fontSize=68&fontColor=ffffff&animation=fadeIn' +
    `&desc=${encodeURIComponent(caption)}&descSize=20&descAlignY=75`;

  return [
    '<div align="center">',
    '  <a href="https://habibullah.dev">',
    `    <img src="${banner}" alt="MD. Habibullah Sharif - ${caption}" />`,
    '  </a>',
    '</div>',
  ].join('\n');
}

/** Shields.io styling per known social label; anything unknown still renders. */
const SOCIAL_STYLE = {
  github: { color: '181717', logo: 'github', logoColor: '60a5fa' },
  linkedin: { color: '0077B5', logo: 'linkedin' },
  'dev.to': { color: '0A0A0A', logo: 'dev.to' },
  whatsapp: { color: '25D366', logo: 'whatsapp' },
  email: { color: 'c14438', logo: 'gmail' },
  medium: { color: '000000', logo: 'medium' },
  facebook: { color: '1877F2', logo: 'facebook' },
  discord: { color: '5865F2', logo: 'discord' },
  portfolio: { color: '0EA5E9', logo: 'google-earth' },
};

async function renderSocials(cms, field) {
  const socials = cms.global_content?.[field];
  if (!Array.isArray(socials) || socials.length === 0) return null;

  // The portfolio itself is not in the socials list, but it belongs on a GitHub
  // profile - it is the one link the whole README is derived from.
  const entries = [{ label: 'Portfolio', href: SITE }, ...socials];

  const badges = [];
  for (const s of entries) {
    const label = String(s.label || '').trim();
    if (!label) continue;
    const href = String(s.href || '').trim();
    // mailto: links can't be probed; everything else must resolve.
    if (!href.startsWith('mailto:') && !(await isLinkAlive(href))) continue;

    const style = SOCIAL_STYLE[label.toLowerCase()] || { color: '4d4dff' };
    const params = [`style=for-the-badge`];
    if (style.logo) params.push(`logo=${style.logo}`);
    params.push(`logoColor=${style.logoColor || 'white'}`);
    const badge = `https://img.shields.io/badge/${encodeURIComponent(label)}-${style.color}?${params.join('&')}`;
    badges.push(`  <a href="${href}"><img src="${badge}" alt="${label}" /></a>`);
  }

  if (badges.length === 0) return null;
  return `<p align="center">\n${badges.join('\n')}\n</p>`;
}

function renderExperience(cms) {
  const list = cms.experience_content?.experiences || [];
  if (list.length === 0) return null;
  const rows = list.map((e) => {
    const type = e.type ? String(e.type).replace(/_/g, ' ').toLowerCase() : '';
    const when = [e.period, type].filter(Boolean).join(' · ');
    return `| **${cell(e.displayRole || e.role)}** | ${cell(e.company)} | ${cell(when)} | ${cell(e.location)} |`;
  });
  return [
    '| Role | Organisation | Period | Location |',
    '| :--- | :--- | :--- | :--- |',
    ...rows,
  ].join('\n');
}

function renderStats(gh) {
  const { user, repos } = gh;
  const stars = repos.reduce((sum, r) => sum + (r.stargazerCount ?? r.stargazers_count ?? 0), 0);
  const forks = repos.reduce((sum, r) => sum + (r.forks_count ?? 0), 0);

  const langCounts = new Map();
  for (const r of repos) {
    if (!r.language) continue;
    langCounts.set(r.language, (langCounts.get(r.language) || 0) + 1);
  }
  const ranked = [...langCounts.entries()].sort((a, b) => b[1] - a[1]);
  const total = ranked.reduce((sum, [, n]) => sum + n, 0) || 1;
  const langs = ranked
    .slice(0, 8)
    .map(([name, n]) => `\`${name} ${Math.round((n / total) * 100)}%\``)
    .join(' ');

  return [
    '| Stars earned | Original repos | Followers | Public repos |',
    '| :---: | :---: | :---: | :---: |',
    `| **${stars}** | **${repos.length}** | **${user.followers}** | **${user.public_repos}** |`,
    '',
    `**Most-used languages** - ${langs}`,
  ].join('\n');
}

function renderSkills(cms) {
  const categories = cms.skills_content?.categories || [];
  if (categories.length === 0) return null;
  const blocks = categories.map((c) => {
    const names = (c.skills || []).map((s) => `\`${cell(s.name)}\``).join(' ');
    return `**${cell(String(c.name).replace(/_/g, ' '))}**  \n${names}`;
  });

  const stacks = cms.techstacks_content?.content;
  if (stacks) {
    const all = [...(stacks.row1 || []), ...(stacks.row2 || []), ...(stacks.row3 || [])];
    if (all.length) {
      blocks.push(`**Also worked with**  \n${all.map((t) => `\`${cell(t)}\``).join(' ')}`);
    }
  }
  return blocks.join('\n\n');
}

async function renderProjects(cms) {
  const list = cms.projects_content?.projects || [];
  if (list.length === 0) return null;

  const ordered = [...list].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  const blocks = [];

  for (const p of ordered) {
    const demo = await liveLink(p.demo);
    const code = await liveLink(p.github);
    const links = [
      demo ? `[Live](${demo})` : null,
      code ? `[Source](${code})` : null,
    ].filter(Boolean);

    const tags = (p.tags || []).map((t) => `\`${cell(t)}\``).join(' ');
    const parts = [`#### ${cell(p.title)}`, oneLine(p.description)];
    if (tags) parts.push(tags);
    if (links.length) parts.push(links.join(' · '));
    blocks.push(parts.join('\n\n'));
  }
  return blocks.join('\n\n');
}

/**
 * Top repositories by stars, straight from GitHub. This is what keeps genuinely
 * popular work visible without waiting for it to be added to the CMS by hand.
 * Anything already shown in the curated section above is skipped.
 */
function renderTopRepos(gh, cms) {
  const curated = new Set(
    (cms?.projects_content?.projects || [])
      .flatMap((p) => [p.github, p.demo])
      .filter(Boolean)
      .map((u) => String(u).toLowerCase().replace(/\.git$/, '').replace(/\/+$/, '')),
  );

  const top = gh.repos
    .filter((r) => !r.archived)
    // GitHub Skills course exercises are onboarding walkthroughs, not portfolio work.
    .filter((r) => !/^skills-/.test(r.name))
    .filter((r) => !curated.has(String(r.html_url).toLowerCase()))
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 6);

  if (top.length === 0) return null;

  const rows = top.map((r) => {
    const desc = cell(r.description || '-');
    const short = desc.length > 110 ? `${desc.slice(0, 107)}…` : desc;
    return `| [${cell(r.name)}](${r.html_url}) | ${r.stargazers_count} | ${cell(r.language || '-')} | ${short} |`;
  });

  return ['| Repository | ★ | Language | About |', '| :--- | :---: | :--- | :--- |', ...rows].join(
    '\n',
  );
}

function renderTopics(gh) {
  const counts = new Map();
  for (const r of gh.repos) {
    for (const t of r.topics || []) counts.set(t, (counts.get(t) || 0) + 1);
  }
  if (counts.size === 0) return null;
  const top = [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 30)
    .map(([t]) => `\`${t}\``);
  return top.join(' ');
}

function renderArticles(articles) {
  const rows = articles.slice(0, 5).map((a) => {
    const date = String(a.published_at || '').slice(0, 10);
    return `- **[${cell(a.title)}](${a.url})** - ${date} · ${a.reading_time_minutes || 1} min read`;
  });
  return [...rows, '', `<sub>${articles.length} articles published on [Dev.to](https://dev.to/${DEVTO_USER}).</sub>`].join('\n');
}

async function renderKits(cms) {
  const tools = cms.kits_content?.tools || [];
  if (tools.length === 0) return null;
  const items = [];
  for (const t of tools) {
    const href = t.href || t.url || (t.slug ? `${SITE}/kits/${t.slug}` : '');
    const abs = href?.startsWith('http') ? href : `${SITE}${href}`;
    const label = cell(t.name || t.title);
    items.push(href ? `[${label}](${abs})` : label);
  }
  return items.join(' · ');
}

function renderRoadmap(cms) {
  const items = cms.roadmap_content?.roadmapItems || [];
  if (items.length === 0) return null;
  const rows = items.map((r) => {
    const tech = (r.tech || []).map((t) => `\`${cell(t)}\``).join(' ');
    return `| **${cell(r.year)}** | ${cell(String(r.title).replace(/_/g, ' '))} | ${cell(r.description)} ${tech} |`;
  });
  return ['| When | Focus | Detail |', '| :--- | :--- | :--- |', ...rows].join('\n');
}

/**
 * A short, stable stamp for the newest CMS edit. Returns null when the CMS is
 * unavailable, in which case the card URLs simply carry no version.
 */
function cmsVersion(cms) {
  if (!cms) return null;
  let newest = 0;
  for (const doc of Object.values(cms)) {
    const at = Date.parse(doc?.updatedAt ?? '');
    if (Number.isFinite(at) && at > newest) newest = at;
  }
  return newest ? Math.floor(newest / 1000).toString(36) : null;
}

/**
 * Third-party stat widgets, probed before use.
 *
 * These are free community deployments that go down without warning - at the
 * time of writing github-readme-stats answers 503 and github-profile-trophy
 * answers 402 (out of quota). Publishing them unconditionally would put broken
 * images on the profile, so each is checked and only the live ones are emitted.
 * The list is deliberately kept complete: when a service recovers, the next sync
 * silently brings it back.
 */
const WIDGETS = [
  {
    alt: 'Contribution streak',
    url: 'https://streak-stats.demolab.com/?user=md8-habibullah&hide_border=true&background=00000000&stroke=888888&ring=4d4dff&fire=4d4dff&currStreakLabel=4d4dff&sideLabels=888888&dates=888888&currStreakNum=4d4dff&sideNums=4d4dff',
  },
  {
    alt: 'Contribution activity',
    url: 'https://github-readme-activity-graph.vercel.app/graph?username=md8-habibullah&bg_color=00000000&color=888888&line=4d4dff&point=4d4dff&area=true&hide_border=true',
  },
  {
    alt: 'GitHub stats',
    url: 'https://github-readme-stats.vercel.app/api?username=md8-habibullah&show_icons=true&hide_border=true&bg_color=00000000&title_color=4d4dff&icon_color=4d4dff&text_color=888888',
  },
  {
    alt: 'Top languages',
    url: 'https://github-readme-stats.vercel.app/api/top-langs/?username=md8-habibullah&layout=compact&langs_count=8&hide_border=true&bg_color=00000000&title_color=4d4dff&text_color=888888',
  },
  {
    alt: 'Trophies',
    url: 'https://github-profile-trophy.vercel.app/?username=md8-habibullah&theme=discord&no-frame=true&no-bg=true&column=7&margin-w=6',
  },
];

async function renderWidgets() {
  const live = [];
  for (const w of WIDGETS) {
    if (await isLinkAlive(w.url)) live.push(`  <img src="${w.url}" alt="${w.alt}" />`);
    else warn(`widget unavailable, omitted: ${w.alt}`);
  }
  if (live.length === 0) return null;
  return `<div align="center">\n\n${live.join('\n')}\n\n</div>`;
}

/**
 * Self-hosted live cards. These are only emitted once the endpoints actually
 * exist, so the profile never shows broken images while the portfolio side of
 * the change is still in review.
 */
async function renderCards(cms) {
  // GitHub proxies every image through Camo, which caches aggressively. Stamping
  // the URL with the newest CMS updatedAt means a real content edit produces a
  // new URL, so the card refreshes immediately instead of serving a stale copy
  // for the life of the cache TTL.
  const stamp = cmsVersion(cms);
  const suffix = stamp ? `&v=${stamp}` : '';

  const types = ['stats', 'experience', 'skills'];
  const blocks = [];
  for (const type of types) {
    const url = `${SITE}/api/card/${type}`;
    if (!(await isLinkAlive(`${url}?theme=light${suffix}`))) continue;
    blocks.push(
      [
        '<picture>',
        `  <source media="(prefers-color-scheme: dark)" srcset="${url}?theme=dark${suffix}" />`,
        `  <img alt="${type} card" src="${url}?theme=light${suffix}" />`,
        '</picture>',
      ].join('\n'),
    );
  }
  if (blocks.length === 0) {
    log('cards: /api/card endpoints not live yet - section left empty');
    return null;
  }
  return `<div align="center">\n\n${blocks.join('\n')}\n\n</div>`;
}

/* ----------------------------------------------------------------- region */

function replaceRegion(markdown, name, body) {
  const re = new RegExp(
    `(<!-- SYNC:${name}:START -->)([\\s\\S]*?)(<!-- SYNC:${name}:END -->)`,
  );
  if (!re.test(markdown)) {
    warn(`region ${name} not found in README`);
    return markdown;
  }
  return markdown.replace(re, `$1\n${body}\n$3`);
}

/* ------------------------------------------------------------------- main */

async function main() {
  const [cms, gh, devto] = await Promise.all([loadCms(), loadGitHub(), loadDevto()]);

  if (!cms && !gh && !devto) {
    warn('every source failed - leaving README untouched');
    return;
  }

  const original = await readFile(README_PATH, 'utf8');
  let next = original;

  // Each region is only rewritten when its own source came back. A failed
  // source leaves the committed content in place rather than blanking it.
  const regions = [];

  if (cms) {
    regions.push(
      ['BANNER', renderBanner(cms)],
      ['SOCIALS', await renderSocials(cms, 'socials')],
      ['FOOTERSOCIALS', await renderSocials(cms, 'footerSocials')],
      ['ABOUT', renderAbout(cms)],
      ['EXPERIENCE', renderExperience(cms)],
      ['SKILLS', renderSkills(cms)],
      ['PROJECTS', await renderProjects(cms)],
      ['KITS', await renderKits(cms)],
      ['ROADMAP', renderRoadmap(cms)],
    );
    if (cms.__fallback) warn('CMS regions rendered from llms.txt fallback (reduced fidelity)');
  } else {
    warn('CMS unreachable - about/experience/skills/projects/kits/roadmap left as committed');
  }

  if (gh) {
    regions.push(['STATS', renderStats(gh)], ['TOPICS', renderTopics(gh)]);
    // Top repositories are deduplicated against the curated CMS project list, so
    // without the CMS this section would wrongly repeat a featured project.
    // Better to leave it as committed than to publish a duplicate.
    if (cms) regions.push(['TOPREPOS', renderTopRepos(gh, cms)]);
    else warn('CMS unreachable - top-repos left as committed to avoid duplicating featured work');
  } else {
    warn('GitHub unreachable - stats/top-repos/topics left as committed');
  }

  if (devto) {
    regions.push(['ARTICLES', renderArticles(devto)]);
  } else {
    warn('Dev.to unreachable - articles left as committed');
  }

  regions.push(['WIDGETS', await renderWidgets()], ['CARDS', await renderCards(cms)]);

  for (const [name, body] of regions) {
    if (body == null || body === '') continue;
    next = replaceRegion(next, name, body);
  }

  if (next === original) {
    log('README already current - no changes');
    return;
  }

  await writeFile(README_PATH, next, 'utf8');
  log('README updated');
}

main().catch((err) => {
  // Never fail the workflow over a sync hiccup; the README simply stays put.
  warn(`unexpected error - ${err.stack || err.message}`);
  process.exit(0);
});
