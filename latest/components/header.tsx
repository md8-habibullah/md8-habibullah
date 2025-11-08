"use client"

import { useEffect, useState } from "react"
import { Lock } from "lucide-react"

export default function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.add("dark")
  }, [])

  if (!mounted) return null

  return (
    <header className="header-bar">
      <a href="/#">
        <div className="flex items-center gap-4">
          <img
            src="https://avatars.githubusercontent.com/u/149287500?v=4&s=300"
            alt="MD. Habibullah Sharif"
            className="w-10 h-10 rounded-lg object-cover shadow-lg"
            width={40}
            height={40}
          />
          <div>
            <h1 className="text-lg font-bold tracking-tight">MD. HABIBULLAH</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Full-Stack Dev</p>
          </div>
        </div>
      </a>

      <nav className="hidden md:flex items-center gap-8">
        <a href="#about" className="nav-link">
          About
        </a>
        <a href="#skills" className="nav-link">
          Skills
        </a>
        <a href="#projects" className="nav-link">
          Projects
        </a>
      </nav>

      <div className="theme-toggle" aria-label="Dark theme locked" title="Dark theme is locked">
        <Lock className="w-5 h-5 text-primary" />
      </div>
    </header>
  )
}
