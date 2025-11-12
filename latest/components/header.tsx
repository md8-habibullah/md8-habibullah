"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { Lock, Sun, Moon, Menu, X } from "lucide-react"
import SiteUptime from "./SiteUptime"

const SiteUptimeAny: any = SiteUptime as any

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Mark component as mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle clicks outside menu & scroll
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        (menuRef.current && event.target instanceof Node && menuRef.current.contains(event.target)) ||
        (buttonRef.current && event.target instanceof Node && buttonRef.current.contains(event.target))
      ) return
      setIsMenuOpen(false)
    }

    const handleScroll = () => setIsMenuOpen(false)

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMenuOpen])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <header className="header-bar relative">
      {/* Logo */}
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

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#about" className="nav-link">About</a>
        <a href="#skills" className="nav-link">Skills</a>
        <a href="#projects" className="nav-link">Projects</a>
      </nav>

      {/* Right-side Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* SiteUptime */}
        <div className="hidden md:block"><SiteUptime /></div>
        <div className="md:hidden"><SiteUptimeAny compact /></div>

        {/* Dark mode toggle */}
        <button
          className="theme-toggle-btn p-2 rounded-full border border-border/30 hover:bg-primary/10 transition cursor-pointer"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-yellow-400" />}
        </button>

        {/* Mobile menu toggle */}
        <button
          ref={buttonRef}
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav
        ref={menuRef}
        className={`
          absolute top-full left-0 w-full bg-background/95 backdrop-blur-sm z-50
          flex flex-col items-center gap-6 py-8
          md:hidden ${isMenuOpen ? "flex" : "hidden"}
        `}
      >
        <a href="#about" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>About</a>
        <a href="#skills" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>Skills</a>
        <a href="#projects" className="nav-link text-lg" onClick={() => setIsMenuOpen(false)}>Projects</a>
      </nav>
    </header>
  )
}
