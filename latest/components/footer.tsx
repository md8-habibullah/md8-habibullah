"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Terminal, Facebook, MessageCircle } from "lucide-react"

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
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
            {/* Brand section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold tracking-tight">MD. Habibullah</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full-Stack Developer & DevOps Engineer passionate about building scalable infrastructure and clean code.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-semibold text-foreground uppercase tracking-wide text-sm">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a
                  href="#about"
                  className="link-arrow text-muted-foreground hover:text-primary transition-colors duration-300 block"
                >
                  About
                </a>
                <a
                  href="#skills"
                  className="link-arrow text-muted-foreground hover:text-primary transition-colors duration-300 block"
                >
                  Skills
                </a>
                <a
                  href="#projects"
                  className="link-arrow text-muted-foreground hover:text-primary transition-colors duration-300 block"
                >
                  Projects
                </a>
                <a
                  href="mailto:md8.habibullah@gmail.com"
                  className="link-arrow text-muted-foreground hover:text-primary transition-colors duration-300 block"
                >
                  Contact
                </a>
              </div>
            </motion.div>

            {/* Connect section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-semibold text-foreground uppercase tracking-wide text-sm">Connect</h4>
              <p className="text-sm text-muted-foreground">Open to collaborations and exciting opportunities.</p>
              <div className="flex items-center gap-4 pt-2">
                {/* GitHub */}
                <a
                  href="https://github.com/md8-habibullah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/md-habibullahs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/md8.habibullah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801329876070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>

                {/* Email */}
                <a
                  href="mailto:md8.habibullah@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>

              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div variants={itemVariants} className="border-t border-border/30 my-8" />

          {/* Bottom section */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
          >
            <motion.p variants={itemVariants} className="font-mono text-xs">
              $ cd /portfolio && cat README.md
            </motion.p>
            <motion.p variants={itemVariants}>© 2025 MD. HABIBULLAH SHARIF. All rights reserved.</motion.p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  )
}
