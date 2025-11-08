"use client"

import { useEffect, useState } from "react"
import { Lock } from "lucide-react"
import SiteUptime from "./SiteUptime" // <-- 1. IMPORT YOUR NEW COMPONENT

export default function Header() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.add("dark")
  }, [])

  if (!mounted) return null

  return (
    <header className="header-bar">
      {/* ... (your existing logo/name link) ... */}
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
            <h1 className="text-lg font-bold tracking-tight">HABIBULLAH</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Full-Stack Dev</p>
          </div>
        </div>
      </a>

      {/* ... (your existing nav) ... */}
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

      {/* --- Group Uptime & Theme Lock --- */}
      {/* I've added a wrapper div to keep them grouped nicely */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        <SiteUptime /> {/* <-- 2. ADD THE COMPONENT HERE */}

        <div className="theme-toggle" aria-label="Dark theme locked" title="Dark theme is locked">
          <Lock className="w-5 h-5 text-primary" />
        </div>
      </div>
    </header>
  )
}