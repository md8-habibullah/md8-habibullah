'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      defaultTheme="dark"     // Start everyone in dark mode
      enableSystem={true}    // Allow switching based on system preference
      attribute="class"      // Uses class strategy (e.g., 'dark' class on html)
    >
      {children}
    </NextThemesProvider>
  )
}
