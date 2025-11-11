'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"           // Uses 'dark' class on html element
      defaultTheme="light"        // Default to light mode (clean & professional)
      enableSystem={true}         // Users can follow system preference
      enableColorScheme={false}   // Prevent browser color scheme changes
      storageKey="theme"          // Save preference to localStorage
      themes={["light", "dark"]}  // Available themes
      forcedTheme={undefined}     // Allow switching between themes
    >
      {children}
    </NextThemesProvider>
  )
}
