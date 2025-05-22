// STARFIELD BACKGROUND
const canvas = document.getElementById('bg-stars');
const ctx = canvas.getContext('2d');
let w = window.innerWidth, h = window.innerHeight;
canvas.width = w; canvas.height = h;
let stars = [];
function resizeStars() {
  w = window.innerWidth; h = window.innerHeight;
  canvas.width = w; canvas.height = h;
  stars = [];
  for(let i=0; i<110; i++){
    stars.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: Math.random()*1.5+0.3,
      dx: (Math.random()-0.5)*0.11,
      dy: (Math.random()-0.5)*0.11,
      o: Math.random()*0.5+0.5
    });
  }
}
resizeStars();
window.addEventListener('resize',resizeStars);
function drawStars(){
  ctx.clearRect(0,0,w,h);
  for(const s of stars){
    ctx.save();
    ctx.globalAlpha = s.o;
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fillStyle = Math.random()>0.5?"#4ecdc4":"#ffe066";
    ctx.shadowColor = "#4ecdc4";
    ctx.shadowBlur = 7;
    ctx.fill();
    ctx.restore();
    s.x += s.dx; s.y += s.dy;
    if(s.x < 0) s.x=w; if(s.x > w) s.x=0;
    if(s.y < 0) s.y=h; if(s.y > h) s.y=0;
  }
  requestAnimationFrame(drawStars);
}
drawStars();

// Glowing arrow SVG cursor
const cursorArrow = document.getElementById('cursor-arrow');
const isFinePointer = window.matchMedia('(pointer: fine)').matches;
const arrowSVG = `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polyline points="6,22 17,10 28,22" style="fill:none;stroke:#4ecdc4;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 8px #ffe066cc);" />
</svg>`;
if (isFinePointer) {
  cursorArrow.innerHTML = arrowSVG;
  document.body.style.cursor = "none";
  cursorArrow.style.display = "block";
  window.addEventListener('mousemove', e=>{
    cursorArrow.style.left = (e.clientX - 17) + "px";
    cursorArrow.style.top = (e.clientY - 17) + "px";
    cursorArrow.style.opacity = 0.96;
  });
  window.addEventListener('mouseleave', ()=>{ cursorArrow.style.opacity='0'; });
  window.addEventListener('mouseenter', ()=>{ cursorArrow.style.opacity='0.96'; });
} else {
  cursorArrow.style.display = "none";
}

// ENTRANCE ANIMATION FOR SECTIONS
const sections = Array.from(document.querySelectorAll('.section'));
function showSection(idx) {
  if(idx < sections.length) {
    sections[idx].classList.add('visible');
    sections[idx].setAttribute('tabindex','0');
    setTimeout(()=>showSection(idx+1), 300);
  }
}
window.addEventListener('DOMContentLoaded',()=>showSection(0));

// POPUP "LEVEL UP" WHEN SECTION SCROLLED INTO VIEW
let lastPopup = 0;
function showLevelPopup(msg) {
  const popup = document.getElementById('level-popup');
  popup.textContent = msg;
  popup.classList.add('show');
  document.getElementById('pop-sound').currentTime = 0;
  document.getElementById('pop-sound').play();
  setTimeout(()=>popup.classList.remove('show'), 1200);
}
const sectionTitles = [
  "Welcome, Player 1!",
  "Level 1: About Me",
  "Level 2: Interests",
  "Level 3: Tools & Tech",
  "Level 4: Currently Exploring",
  "Level 5: Let's Connect",
  "Bonus: Fun Fact"
];
function handleScrollPopup(){
  sections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if(rect.top < window.innerHeight/2 && rect.bottom > window.innerHeight/4) {
      if(lastPopup !== i+1) {
        showLevelPopup(sectionTitles[i+1] || "Achievement!");
        lastPopup = i+1;
      }
    }
  });
}
window.addEventListener('scroll', handleScrollPopup);

// Card parallax hover and section click burst
sections.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const midX = rect.width / 2, midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 3;
    const rotateX = -((y - midY) / midY) * 3;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
  card.addEventListener('click', e => {
    card.classList.add('clicked');
    setTimeout(()=>card.classList.remove('clicked'), 520);
    document.getElementById('pop-sound').currentTime = 0;
    document.getElementById('pop-sound').play();
  });
});

// Section tilt on scroll (active section only)
window.addEventListener('scroll', ()=>{
  let found = false;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if(!found && rect.top<window.innerHeight/2 && rect.bottom>window.innerHeight/4) {
      sec.style.transform += ` rotateZ(${Math.sin(window.scrollY/90)*2}deg)`;
      found = true;
    } else {
      sec.style.transform = sec.style.transform.replace(/rotateZ\([^)]+\)/,'');
    }
  });
});

// Color theme change on keypress (1-5)
const themeSets = [
  {}, // default
  {'--accent':'#1bc6e8','--accent2':'#d9f6fb','--highlight':'#a0f7e8','--card-bg':'#20344a'},
  {'--accent':'#b39ddb','--accent2':'#e1bee7','--highlight':'#ffb74d','--card-bg':'#2a204a'},
  {'--accent':'#8bc34a','--accent2':'#dcedc8','--highlight':'#fff176','--card-bg':'#223a26'},
  {'--accent':'#f06292','--accent2':'#ffe1f0','--highlight':'#ffe082','--card-bg':'#4a2031'}
];
document.addEventListener('keydown', e => {
  if (!/^[1-5]$/.test(e.key)) return;
  const idx = parseInt(e.key)-1;
  Object.entries(themeSets[idx]||{}).forEach(([k,v])=>{
    document.documentElement.style.setProperty(k,v);
  });
  showLevelPopup(`Theme ${e.key} activated!`);
});

// Emoji float on double click
const emojis = ["✨","💡","🤩","🎉","🚀","🤖","🌟","🦾","😎","🔥","🪐","🎈"];
window.addEventListener('dblclick', e=>{
  const emoji = emojis[Math.floor(Math.random()*emojis.length)];
  const el = document.createElement('div');
  el.className = 'floating-emoji';
  el.textContent = emoji;
  el.style.left = (e.clientX-20)+'px';
  el.style.top = (e.clientY-20)+'px';
  el.style.opacity = 1;
  document.body.appendChild(el);
  setTimeout(()=>{
    el.style.transform = `translateY(-120px) scale(1.6) rotate(${Math.random()*40-20}deg)`;
    el.style.opacity = 0;
  },15);
  setTimeout(()=>el.remove(), 1200);
});

// ANIMATED TITLE (GLITCH/JUMP)
const title = document.querySelector('.animated-title');
if (title) {
  setInterval(() => {
    title.style.transform = `translateY(${Math.random()*2-1}px) skewX(${Math.random()*1.2-0.6}deg)`;
    title.style.textShadow = `0 0 10px #4ecdc4, 0 0 18px #ffe066`;
  }, 1400);
}

// THEME TOGGLE (Night/Day)
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
function setTheme(day) {
  if (day) {
    document.body.classList.add('day');
    themeIcon.textContent = '🌞';
    localStorage.setItem('theme', 'day');
  } else {
    document.body.classList.remove('day');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'night');
  }
}
themeToggle.addEventListener('click', ()=>{
  setTheme(!document.body.classList.contains('day'));
});
if(localStorage.getItem('theme') === 'day') {
  setTheme(true);
} else {
  setTheme(false);
}

// KONAMI CODE EASTER EGG: unlocks secret theme!
const konami = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;
document.addEventListener('keydown', e=>{
  if(e.keyCode === konami[konamiIndex]) {
    konamiIndex++;
    if(konamiIndex === konami.length) {
      document.body.classList.toggle('secret-theme');
      showLevelPopup("Secret Theme Unlocked!");
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
const style = document.createElement('style');
style.innerHTML = `
body.secret-theme { background: linear-gradient(120deg,#1b1b5f 10%,#4ecdc4 60%,#ffe066 100%)!important; }
body.secret-theme .section,.secret-theme .hero { background: rgba(24,34,74,0.85)!important; border-color: #ffe066!important; }
body.secret-theme .highlight { color: #4ecdc4!important; }
body.secret-theme .animated-title { color: #ffe066!important; text-shadow: 0 0 18px #4ecdc4; }
body.secret-theme .footer { color: #ffe066!important; }
`;
document.head.appendChild(style);

// KEYBOARD NAVIGATION (ARROW KEYS)
let selected = 0;
function selectSection(idx) {
  if(idx<0 || idx>=sections.length) return;
  sections[selected].classList.remove('selected');
  selected = idx;
  sections[selected].classList.add('selected');
  sections[selected].focus();
  sections[selected].scrollIntoView({behavior:'smooth',block:'center'});
}
document.addEventListener('keydown', e=>{
  if(e.key==='ArrowDown') { selectSection(Math.min(selected+1,sections.length-1)); }
  if(e.key==='ArrowUp') { selectSection(Math.max(selected-1,0)); }
});

// --- Floating Go To Top Button ---
const goTopBtn = document.getElementById('go-top-btn');
window.addEventListener('scroll', () => {
  if(window.scrollY > 200) goTopBtn.classList.add('show');
  else goTopBtn.classList.remove('show');
});
goTopBtn.addEventListener('click', () => {
  window.scrollTo({top:0, left:0, behavior:'smooth'});
});