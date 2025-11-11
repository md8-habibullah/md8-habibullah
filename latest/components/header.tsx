"use client"

// 1. Import useRef
import { useEffect, useState, useRef } from "react" 
import { Lock, Menu, X } from "lucide-react"
import SiteUptime from "./SiteUptime"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // 2. Create refs for the menu and the button
  const menuRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    document.documentElement.classList.add("dark")
  }, [])

  // 3. NEW: Add useEffect to handle "click outside" and "scroll"
  useEffect(() => {
    // If the menu isn't open, do nothing
    if (!isMenuOpen) return

    // Function to handle clicks
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is *inside* the menu (menuRef) or *on* the button (buttonRef), don't close it
      if (
        (menuRef.current && event.target instanceof Node && menuRef.current.contains(event.target)) ||
        (buttonRef.current && event.target instanceof Node && buttonRef.current.contains(event.target))
      ) {
        return
      }
      // Otherwise, close the menu
      setIsMenuOpen(false)
    }

    // Function to handle scroll
    const handleScroll = () => {
      setIsMenuOpen(false)
    }

    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("scroll", handleScroll)

    // Cleanup function to remove listeners
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMenuOpen]) // This effect re-runs whenever isMenuOpen changes

  if (!mounted) return null

  return (
    <header className="header-bar relative">
      {/* ... (logo) ... */}
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

      {/* --- Desktop Navigation --- */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="/#" className="nav-link">Home</a>
        <a href="#about" className="nav-link">About</a>
        <a href="#skills" className="nav-link">Skills</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="https://status.habibullah.dev" target="_blank" rel="noopener noreferrer" className="nav-link">
          Uptime
        </a>
      </nav>

      {/* --- Right-side Icons --- */}
      <div className="flex items-center gap-4 sm:gap-6">
        <SiteUptime />

        <div className="theme-toggle" aria-label="Dark theme locked" title="Dark theme is locked">
          <Lock className="w-5 h-5 text-primary" />
        </div>

        {/* 4. Add the ref to the button */}
        <button
          ref={buttonRef} 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- Mobile Navigation Menu --- */}
      <nav
        ref={menuRef} // 5. Add the ref to the menu
        className={`
          absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm z-50
          flex flex-col items-center gap-6 py-8
          md:hidden ${isMenuOpen ? "flex" : "hidden"}
        `}
        // 6. REMOVED onClick from the <nav> itself
      >
        {/* 7. Add onClick to each link to close menu on navigation */}
        <a href="/#" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>
          Home
        </a>
        <a href="#about" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>
          About
        </a>
        <a href="#skills" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>
          Skills
        </a>
        <a href="#projects" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>
          Projects
        </a>
        <a
          href="https://status.habibullah.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link text-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          Uptime
        </a>
      </nav>
    </header>
  )
}