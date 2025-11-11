'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    // Clear any existing theme from localStorage to ensure fresh start
    if (typeof window !== 'undefined') {
      localStorage.removeItem('theme')
      // Set dark theme directly on html element
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }, [])

  return (
    <NextThemesProvider
      {...props}
      attribute="class"              // Uses 'dark' class on html element
      defaultTheme="dark"            // Default to dark mode for everyone
      enableSystem={false}           // Ignore user's system preference
      enableColorScheme={false}      // Prevent browser color scheme changes
      storageKey="nonexistent_key"   // Use a nonexistent key so nothing saves
      themes={["light", "dark"]}     // Available themes
      forcedTheme={undefined}        // Allow switching between themes
      disableTransitionOnChange      // Smooth transitions
    >
      {children}
    </NextThemesProvider>
  )
}
