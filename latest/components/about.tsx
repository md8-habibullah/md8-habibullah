export default function About() {
  return (
    <section id="about" className="section-spacing bg-card/20">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="section-title">About Me</h2>
          <div className="accent-line" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6 text-muted-foreground leading-relaxed animate-fade-in-up">
            <p className="text-base sm:text-lg">
              I'm <strong className="text-foreground">Habibullah</strong> — a Full-Stack Developer and Computer Science
              student who builds <strong>secure, scalable web applications</strong> with modern technologies. I
              specialize in crafting clean, maintainable code that solves real problems while keeping{" "}
              <strong>security and automation</strong> at the core of everything I build.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-foreground font-semibold mb-2">What I Do</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-primary">▸</span>
                    <span>
                      <strong>Modern Web Development</strong> — Building responsive, production-ready applications with
                      Next.js, React, and TypeScript
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">▸</span>
                    <span>
                      <strong>Backend & APIs</strong> — Designing robust REST APIs and server-side logic with Node.js,
                      Express, and PostgreSQL
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">▸</span>
                    <span>
                      <strong>DevOps & Automation</strong> — Creating CI/CD pipelines, Docker containers, and scripts
                      that eliminate manual work
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary">▸</span>
                    <span>
                      <strong>Security-First Approach</strong> — Implementing secure coding practices and vulnerability
                      assessments
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-foreground font-semibold mb-2">How I Work</h3>
                <p className="text-sm">
                  I believe in writing code that's testable, documented, and maintainable. Whether it's building
                  user-facing dashboards or backend APIs, I focus on <strong>security by design</strong>, automation
                  that saves time, and <strong>clean architecture that scales</strong> with your product.
                </p>
              </div>
            </div>

            <p className="italic text-primary/90 text-base">
              "Code with purpose, learn with curiosity, build with ethics."
            </p>
          </div>

         {/* Stats */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="minimal-card text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary">50+</div>
              <p className="text-sm text-muted-foreground mt-3 font-medium">Open Source Contributions</p>
            </div>
            <div className="minimal-card text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary">3+</div>
              <p className="text-sm text-muted-foreground mt-3 font-medium">Years Experience</p>
            </div>
            <div className="minimal-card text-center">
              <div className="text-4xl sm:text-5xl font-bold text-primary">90%</div>
              <p className="text-sm text-muted-foreground mt-3 font-medium">Commitment to Excellence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
