"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    tags: string[]
    github: string
    featured?: boolean
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -8 }} className="group h-full">
      <div className="relative h-full p-6 sm:p-8 bg-card border border-border/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/20 via-transparent to-primary/10 opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10 blur" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full gap-4">
          {/* Title */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex-grow">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/30 group-hover:border-primary/60 transition-colors duration-300 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-border/30">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-300 font-medium"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
              aria-label="View live demo"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
