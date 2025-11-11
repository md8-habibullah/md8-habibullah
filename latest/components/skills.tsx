"use client"

import HackerText from "./HackerText"

export default function Skills() {
  const fullStackSkills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "Python",
    "PostgreSQL",
    "Prisma ORM",
    "REST APIs",
    "Tailwind CSS",
    "Web Performance",
  ]

  const devopsSkills = [
    "Docker",
    "CI/CD Pipelines",
    "GitHub Actions",
    "Linux",
    "AWS (EC2, S3)",
    "Nginx",
    "Terraform",
    "Shell Scripting",
    "System Administration",
    "Infrastructure as Code",
    "Cloud Security",
    "Git & Version Control",
  ]

  return (
    <section id="skills" className="section-spacing bg-card/20">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-4 animate-fade-in-up">
          <HackerText
            text="Skills & Expertise"
            className="section-title font-mono text-3xl sm:text-4xl"
          />
          <div className="accent-line" />
          <p className="section-subtitle text-muted-foreground">
            Full-stack development expertise combined with DevOps and infrastructure mastery.
          </p>
        </div>

        {/* Full-Stack Skills */}
        <div className="animate-fade-in-up">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-mono text-primary hover:text-primary/80 transition-colors duration-300">
                Full-Stack Development
              </h3>
              <p className="text-muted-foreground mb-8 text-base">
                Modern web development across the entire stack with focus on performance, scalability, and user
                experience using latest technologies.
              </p>
              <div className="flex flex-wrap gap-3">
                {fullStackSkills.map((skill, idx) => (
                  <span
                    key={skill}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                    className="skill-tag animate-fade-in-up cursor-default hover:bg-primary/20 hover:text-primary transition-all duration-300 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* DevOps & Infrastructure Skills */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 font-mono text-primary hover:text-primary/80 transition-colors duration-300">
                DevOps & Infrastructure
              </h3>
              <p className="text-muted-foreground mb-8 text-base">
                Container orchestration, Infrastructure as Code, CI/CD automation, and cloud infrastructure management
                with strong Linux expertise and security focus.
              </p>
              <div className="flex flex-wrap gap-3">
                {devopsSkills.map((skill, idx) => (
                  <span
                    key={skill}
                    style={{ animationDelay: `${idx * 0.05}s` }}
                    className="skill-tag animate-fade-in-up cursor-default hover:bg-primary/20 hover:text-primary transition-all duration-300 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
