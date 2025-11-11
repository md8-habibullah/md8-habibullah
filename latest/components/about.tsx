const stats = [
  { value: "50+", label: "Open Source Contributions" },
  { value: "3+", label: "Years Experience" },
  { value: "90%", label: "Commitment to Excellence" },
]

const whatIDo = [
  {
    title: "Modern Web Development",
    desc: "Building responsive, production-ready applications with Next.js, React, and TypeScript",
  },
  {
    title: "Backend & APIs",
    desc: "Designing robust REST APIs and server-side logic with Node.js, Express, and PostgreSQL",
  },
  {
    title: "DevOps & Automation",
    desc: "Creating CI/CD pipelines, Docker containers, and scripts that eliminate manual work",
  },
  {
    title: "Security-First Approach",
    desc: "Implementing secure coding practices and vulnerability assessments",
  },
]

export default function About() {
  return (
    <section id="about" className="section-spacing bg-card/20">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="section-title">About Me</h2>
          <div className="accent-line" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6 text-muted-foreground leading-relaxed animate-fade-in-up">
            <p className="text-base sm:text-lg">
              I'm <strong className="text-foreground">Habibullah</strong> — a Full-Stack Developer and Computer Science student
              who builds <strong>secure, scalable web applications</strong> with modern technologies. I specialize in
              crafting clean, maintainable code that solves real problems while keeping <strong>security and automation</strong>
              at the core of everything I build.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-foreground font-semibold mb-2">What I Do</h3>
                <ul className="space-y-2 text-sm">
                  {whatIDo.map(({ title, desc }) => (
                    <li key={title} className="flex gap-2">
                      <span className="text-primary animate-pulse">▸</span>
                      <span>
                        <strong>{title}</strong> — {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-foreground font-semibold mb-2">How I Work</h3>
                <p className="text-sm font-mono text-muted-foreground">
                  I focus on writing testable, documented, and maintainable code. Whether building user-facing dashboards or backend APIs, I prioritize
                  <span className="text-primary"> security by design</span>, automation, and
                  <span className="text-primary"> clean architecture</span> that scales with your product.
                </p>
              </div>
            </div>

            <p className="italic text-primary/90 text-base font-mono animate-blink-cursor">
              "Code with purpose, learn with curiosity, build with ethics."
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-4 animate-fade-in-up">
            {stats.map(({ value, label }) => (
              <div key={label} className="minimal-card text-center hover:scale-105 transition-transform duration-300">
                <div className="text-4xl sm:text-5xl font-bold text-primary font-mono">{value}</div>
                <p className="text-sm text-muted-foreground mt-3 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
