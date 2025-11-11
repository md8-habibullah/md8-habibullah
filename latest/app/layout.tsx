import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Script from 'next/script';


const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MD. HABIBULLAH SHARIF - Full-Stack Developer & DevOps Engineer | Portfolio",
  description:
    "Full-Stack Developer & DevOps Engineer specializing in scalable applications, infrastructure automation, and Linux systems. Building secure, performant solutions with React, Node.js, Docker, and Kubernetes.",
  icons: {
    icon: 'https://avatars.githubusercontent.com/u/149287500?v=4&s=300'
  },
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

        {/* <script>(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KC8SQW4R');</script>
 */}
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KCBSQW4');`,
          }}
        />


        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">

        {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KC8SQW4R"
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> */}

        {/* Also Google Tag Manager  */}

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KCBSQW4" 
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`, // 👈 GTM ID here
          }}
        />

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
