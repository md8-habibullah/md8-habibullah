'use client'

import { useState, useEffect } from 'react' // <--- Fixed: was 'in', now 'from'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // Use navigation for App Router
import { Home, Terminal } from 'lucide-react'
import HackerText from '@/components/HackerText'

/**
 * A custom, eye-catching 404 page styled as a "hacker terminal"
 * to match the portfolio's default dark theme.
 *
 * Includes a 7-second countdown and automatic redirect to the homepage.
 */
export default function NotFound() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(7) // 7-second countdown

  useEffect(() => {
    // Set up the interval
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1)
    }, 1000)

    // Check if countdown is finished
    if (countdown <= 0) {
      clearInterval(timer)
      router.push('/') // Redirect to homepage
    }

    // Cleanup: clear the interval when the component unmounts
    // or if the user navigates away manually.
    return () => clearInterval(timer)
  }, [countdown, router])

  return (
    <>
      {/*
        This <style> tag injects the custom fade-in animation.
        The "neon" text-glow animation has been removed as requested.
      */}
      <style jsx global>{`
        @keyframes fade-in-up-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up-notfound {
          animation: fade-in-up-delay 0.6s ease-out forwards;
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-background text-foreground font-mono p-4">
        {/* Main terminal window card.
          The box-shadow is now more subtle and less "neon".
        */}
        <div
          className="w-full max-w-2xl bg-card border border-border rounded-lg shadow-2xl overflow-hidden animate-fade-in-up-notfound"
          style={{
            /* This shadow is a much subtler, static glow */
            boxShadow:
              '0 0 25px rgba(52, 211, 153, 0.15)', // Softer glow from --primary
            animationDelay: '0.1s',
          }}
        >
          {/* Terminal Header Bar */}
          <div className="flex items-center justify-between p-3 bg-border/20 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#f87171] rounded-full"></span>
              <span className="w-3 h-3 bg-[#facc15] rounded-full"></span>
              <span className="w-3 h-3 bg-[#34d399] rounded-full"></span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Terminal className="w-4 h-4" />
              <span>/bin/bash -- 404</span>
            </div>
            <div className="w-16"></div> {/* Spacer */}
          </div>

          {/* Terminal Body Content */}
          <div className="p-8 sm:p-12 text-center space-y-8">
            {/* The 404 number (no longer glowing) */}
            <h1 className="text-8xl sm:text-9xl font-bold text-primary">
              404
            </h1>

            {/* Your HackerText component */}
            <HackerText
              text=">_ RESOURCE_NOT_FOUND _<"
              className="text-2xl sm:text-3xl font-semibold text-primary"
            />

            <p className="text-lg text-muted-foreground">
              The entity you're tracking has vanished.
              <br />
              The matrix has been altered, or the path is corrupted.
            </p>

            {/* Call to Action Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow-lg transition-all duration-300 ease-in-out
                         hover:scale-105 hover:shadow-xl hover:shadow-primary/30
                         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card"
            >
              <Home className="w-5 h-5" />
              <span>RETURN TO BASE</span>
            </Link>

            {/* Automatic Redirect Countdown */}
            <div className="mt-6 text-sm text-muted-foreground">
              Redirecting to base in {countdown}s...
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
