"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Terminal, Facebook, MessageCircle } from "lucide-react"

const socialLinks = [
  { href: "https://github.com/md8-habibullah", label: "GitHub", Icon: Github },
  { href: "https://www.linkedin.com/in/md-habibullahs", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.facebook.com/md8.habibullah", label: "Facebook", Icon: Facebook },
  { href: "https://wa.me/8801329876070", label: "WhatsApp", Icon: MessageCircle },
  { href: "mailto:hello@habibullah.dev", label: "Email", Icon: Mail },
]

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">

            {/* Brand */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-6 h-6 text-primary animate-pulse-slow" />
                <h3 className="text-xl font-bold tracking-tight text-foreground">MD. Habibullah</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full-Stack Developer & DevOps Engineer passionate about building scalable infrastructure and clean code.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-semibold text-foreground uppercase tracking-wide text-sm">Quick Links</h4>
              <div className="space-y-2 text-sm">
                {["About", "Skills", "Projects", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="link-arrow text-muted-foreground hover:text-primary transition-colors duration-300 block"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Connect */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-semibold text-foreground uppercase tracking-wide text-sm">Connect</h4>
              <p className="text-sm text-muted-foreground">Open to collaborations and exciting opportunities.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                {socialLinks.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group relative flex items-center rounded-full overflow-hidden bg-card border border-border/50 p-2 text-muted-foreground
                               transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:scale-105"
                  >
                    {/* Hacker-like icon glow effect */}
                    <Icon className="w-5 h-5 flex-shrink-0 transition-colors duration-300 group-hover:text-white group-hover:animate-glow-pulse" />
                    <span className="ml-0 max-w-0 opacity-0 whitespace-nowrap font-semibold transition-all duration-300 ease-in-out
                                     group-hover:ml-2 group-hover:max-w-xs group-hover:opacity-100">
                      {label}
                    </span>
                    {/* Optional "terminal cursor effect" */}
                    <span className="absolute right-2 opacity-0 group-hover:opacity-100 animate-blink">_</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="border-t border-border/30 my-8" />

          {/* Bottom */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
          >
            <motion.p variants={itemVariants} className="font-mono font-bold text-xs">
              $ cd /portfolio && cat README.md
            </motion.p>
            <motion.p variants={itemVariants} className="font-light">
              © 2025 HABIBULLAH | All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}
