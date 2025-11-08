import ProjectCard from "./project-card"

export default function Projects() {
  const projects = [
    {
      title: "Full-Stack E-Commerce Platform",
      description:
        "Production-ready e-commerce application with React frontend, Node.js backend, PostgreSQL database, and Stripe integration. Features authentication, real-time inventory, and secure payment processing.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe", "Full-Stack"],
      github: "https://github.com/md8-habibullah",
      featured: true,
    },
    {
      title: "DevOps Pipeline Automation",
      description:
        "Enterprise CI/CD pipeline with Docker containerization, automated testing, code quality checks, and GitHub Actions orchestration for multi-environment deployments.",
      tags: ["Docker", "GitHub Actions", "CI/CD", "Linux", "DevOps"],
      github: "https://github.com/md8-habibullah",
      featured: true,
    },
    {
      title: "Real-Time Monitoring Dashboard",
      description:
        "React-based analytics dashboard with WebSocket integration for real-time data streaming, interactive charts, and comprehensive system metrics visualization.",
      tags: ["React", "WebSocket", "Node.js", "Socket.IO", "Real-time"],
      github: "https://github.com/md8-habibullah",
    },
    {
      title: "Kubernetes Deployment Suite",
      description:
        "Enterprise-grade Kubernetes infrastructure with auto-scaling policies, health checks, resource optimization, monitoring, and security best practices implementation.",
      tags: ["Kubernetes", "Docker", "DevOps", "Infrastructure", "Cloud"],
      github: "https://github.com/md8-habibullah",
    },
    {
      title: "Infrastructure as Code (Terraform)",
      description:
        "Complete AWS infrastructure automation using Terraform with version control, disaster recovery, multi-region setup, and automated provisioning scripts.",
      tags: ["Terraform", "AWS", "IaC", "DevOps", "Infrastructure"],
      github: "https://github.com/md8-habibullah",
    },
    {
      title: "Secure Full-Stack Application",
      description:
        "Security-first web application with end-to-end encryption, JWT authentication, role-based access control, SQL injection prevention, and regular security audits.",
      tags: ["Node.js", "React", "PostgreSQL", "Security", "Full-Stack"],
      github: "https://github.com/md8-habibullah",
    },
  ]

  return (
    <section id="projects" className="section-spacing bg-card/20">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="section-title">Featured Projects</h2>
          <div className="accent-line" />
          <p className="section-subtitle">
            A selection of projects showcasing full-stack development and DevOps expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div key={project.title} style={{ animationDelay: `${index * 0.1}s` }} className="animate-fade-in-up">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <a
            href="https://github.com/md8-habibullah"
            target="_blank"
            rel="noopener noreferrer"
            className="fire-button inline-flex"
          >
            Explore More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
