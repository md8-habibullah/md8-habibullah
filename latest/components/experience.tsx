const experiences = [
  {
    role: "Full Stack Development Intern",
    company: "CodeAlpha",
    type: "Internship",
    period: "Nov 2025 - Jan 2026",
    location: "Remote",
    description:
      "Worked on practical web projects focusing on React, Node.js, and scalable architecture. Delivered GitHub projects and technical reports.",
    skills: ["React.js", "Node.js", "Full-Stack Development"],
  },
  {
    role: "Web Developer & Security Specialist",
    company: "Neurootix",
    type: "Part-time",
    period: "Aug 2025 - Present",
    location: "Dhaka, Bangladesh (Hybrid)",
    description:
      "Developed security protocols and contributed as a full-stack developer on various projects, tackling cybersecurity challenges.",
    skills: ["Security", "Full-Stack Development", "DevOps", "Research"],
  },
  {
    role: "Assistant Robotics Secretary",
    company: "NUB Computer Club",
    type: "Part-time",
    period: "Jul 2025 - Present",
    location: "Dhaka, Bangladesh",
    description:
      "Planned and organized robotics events, workshops, and competitions, assisting club members in technical growth.",
    skills: ["Robotics", "Artificial Intelligence", "Leadership"],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="section-spacing bg-card/10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="section-title">Experience</h2>
          <div className="accent-line" />
          <p className="section-subtitle text-muted-foreground">
            Roles and internships where I've applied and expanded my technical expertise.
          </p>
        </div>

        {/* Experiences List */}
        <div className="space-y-6 animate-fade-in-up">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="minimal-card p-6 border-l-4 border-l-primary/20 hover:border-l-primary hover:bg-primary/5 transition-all duration-300 relative group"
            >
              {/* Hacker glow effect */}
              <span className="absolute -top-2 left-0 w-1 h-full bg-primary/10 rounded transition-all duration-300 group-hover:bg-primary/30 animate-pulse-slow" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground font-mono">{exp.role}</h3>
                  <p className="text-primary font-semibold font-mono">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{exp.location}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-semibold mb-2 font-mono">
                    {exp.type}
                  </span>
                  <p className="text-sm text-muted-foreground font-mono">{exp.period}</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4 font-mono">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag text-xs px-2 py-1 rounded bg-card/20 border border-border/20 text-primary font-mono hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
