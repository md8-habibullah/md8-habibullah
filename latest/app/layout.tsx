import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { GoogleTagManager } from '@next/third-parties/google'


const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MD. HABIBULLAH SHARIF - Full-Stack Developer & DevOps Engineer | Portfolio",
  description:
    "Full-Stack Developer & DevOps Engineer specializing in scalable applications, infrastructure automation, and Linux systems. Building secure, performant solutions with React, Node.js, Docker, and Kubernetes.",
  // icons: {
  //   icon: 'https://avatars.githubusercontent.com/u/149287500?v=4&s=300'
  // },
  keywords: [
    "Full-Stack Developer",
    "DevOps Engineer",
    "React Developer",
    "Node.js",
    "Docker",
    "Kubernetes",
    "Linux",
    "Infrastructure",
    "CI/CD",
  ],
  authors: [{ name: "MD. HABIBULLAH SHARIF" }],
  creator: "MD. HABIBULLAH SHARIF",
  generator: "Next.js 16",
  robots: "index, follow",
  openGraph: {
    title: "MD. HABIBULLAH SHARIF - Full-Stack Developer & DevOps Engineer",
    description: "Crafting scalable applications and robust infrastructure with modern technologies",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MD. HABIBULLAH SHARIF - Full-Stack Developer",
    description: "Full-Stack Developer & DevOps Engineer | React, Node.js, Docker, Kubernetes",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />

        {/* Google Tag Manager */}
        {/* <GoogleTagManager gtmId="GTM-KC8SQW4R" /> */}

        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          `,
          }}
        />

        <link
          rel="prefetch"
          href="https://status.habibullah.dev"
          as="document"
          crossOrigin="anonymous"
        />

      </head>

      <body className="font-sans antialiased bg-background text-foreground">

        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Person",
              name: "MD. HABIBULLAH SHARIF",
              url: "https://md8-habibullah.com",
              image: "https://avatars.githubusercontent.com/u/149287500?v=4&s=300",
              jobTitle: "Full-Stack Developer & DevOps Engineer",
              sameAs: ["https://github.com/md8-habibullah", "https://linkedin.com/in/md-habibullahs"],
            }),
          }}
        />
      </body>
    </html>
  )
}
