import HackerText from "./HackerText"
import { Github, Linkedin, Mail, Facebook, MessageCircle, Terminal } from "lucide-react"

const socialLinks = [
  { href: "https://github.com/md8-habibullah", label: "GitHub", Icon: Github },
  { href: "https://linkedin.com/in/md-habibullahs", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.facebook.com/md8.habibullah", label: "Facebook", Icon: Facebook },
  { href: "https://wa.me/8801329876070", label: "WhatsApp", Icon: MessageCircle },
  { href: "mailto:hello@habibullah.dev", label: "Email", Icon: Mail },
]

export default function Hero() {
  return (
    <section className="section-spacing min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl w-full">

        {/* Left: Profile Image with hacker glow */}
        <div className="flex justify-center md:justify-end animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-3xl animate-pulse-slow" />
            <img
              src="https://avatars.githubusercontent.com/u/149287500?v=4&s=300"
              alt="MD. HABIBULLAH SHARIF - Full-Stack Developer & Security Enthusiast__"
              className="profile-pic animate-float-up border border-primary/50 rounded-2xl shadow-lg"
              width={224}
              height={224}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="space-y-4">
            <div className="accent-line" />
            <h1 className="section-title">
              MD. HABIBULLAH
              <br />
              <span className="text-primary">SHARIF</span>
            </h1>

            {/* Hacker Terminal Text */}
            <HackerText
              text="Full-Stack Developer & Security Enthusiast__"
              className="text-xl sm:text-2xl font-semibold text-muted-foreground font-mono"
            />
          </div>

          <p className="section-subtitle text-base sm:text-lg">
            Building scalable, secure web applications with modern technologies. Full-stack development expertise
            combined with DevOps automation and security-first mindset. Computer Science student from Northern
            University Bangladesh.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href="#projects" className="fire-button group">
              <span className="relative z-10">View My Work</span>
            </a>
            <a
              href="https://github.com/md8-habibullah"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-semibold border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              GitHub Profile
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 pt-8">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative flex items-center rounded-full border border-border/50 bg-card p-2 text-muted-foreground
                           transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-lg overflow-hidden"
              >
                {/* Icon with glow pulse */}
                <Icon className="w-6 h-6 flex-shrink-0 transition-colors duration-300 group-hover:text-white group-hover:animate-glow-pulse" />

                {/* Label slides in on hover */}
                <span className="ml-0 max-w-0 opacity-0 whitespace-nowrap font-mono font-semibold transition-all duration-300
                                 group-hover:ml-2 group-hover:max-w-xs group-hover:opacity-100">
                  {label}
                </span>

                {/* Terminal cursor effect */}
                <span className="absolute right-2 opacity-0 group-hover:opacity-100 animate-blink">_</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
