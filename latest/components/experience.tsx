export default function Experience() {
  const experiences = [
    {
      role: "Full Stack Development Intern",
      company: "CodeAlpha",
      type: "Internship",
      period: "Nov 2025 - Jan 2026",
      location: "Remote",
      description:
        "Working on practical web development projects with focus on React, Node.js, and scalable architecture. Emphasis on hands-on learning, GitHub project delivery, and technical reporting.",
      skills: ["React.js", "Node.js", "Full-Stack Development"],
    },
    {
      role: "Web Developer & Security Specialist",
      company: "Neurootix",
      type: "Part-time",
      period: "Aug 2025 - Present",
      location: "Dhaka, Bangladesh (Hybrid)",
      description:
        "Developing security protocols, contributing as full-stack developer on various projects, and collaborating with teams to address cybersecurity challenges.",
      skills: ["Security", "Full-Stack Development", "DevOps", "Research"],
    },
    {
      role: "Assistant Robotics Secretary",
      company: "NUB Computer Club",
      type: "Part-time",
      period: "Jul 2025 - Present",
      location: "Dhaka, Bangladesh",
      description:
        "Assisting in planning and organizing robotics-related events, workshops, and competitions for club members.",
      skills: ["Robotics", "Artificial Intelligence", "Leadership"],
    },
  ]

  return (
    <section id="experience" className="section-spacing">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="section-title">Experience</h2>
          <div className="accent-line" />
          <p className="section-subtitle">
            Professional roles and internships where I've applied and expanded my technical expertise.
          </p>
        </div>

        <div className="space-y-6 animate-fade-in-up">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="minimal-card p-6 hover:bg-primary/5 transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-primary font-semibold">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{exp.location}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-semibold mb-2">
                    {exp.type}
                  </span>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <span key={skill} className="skill-tag text-xs">
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
