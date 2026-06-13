import type React from "react"
import type { Metadata, Viewport } from "next"
import { Fraunces, Archivo, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
})
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://mohammadalis.vercel.app"),
  title: "Mohammad Ali — Software Engineer Portfolio | Backend & AI Systems",
  description:
    "Official portfolio of Mohammad Ali, Software Engineer II at Bazaar Technologies — building distributed backend systems and production AI agents. Java, Python, Go, FastAPI, OpenAI Agents SDK, LangGraph, RAG, Kubernetes, AWS/Azure. 94% autonomous query resolution, 30,000+ users served.",
  alternates: {
    canonical: "https://mohammadalis.vercel.app",
  },
  keywords: [
    "Mohammad Ali",
    "Mohammad Ali Portfolio",
    "Mohammad Ali Software Engineer",
    "Mohammad Ali Bazaar Technologies",
    "Mohammad Ali Karachi",
    "Software Engineer",
    "AI Engineer",
    "Backend Developer",
    "Agentic AI",
    "Multi-Agent Systems",
    "Java",
    "Spring Boot",
    "Python",
    "Go",
    "FastAPI",
    "OpenAI Agents SDK",
    "LangGraph",
    "LangChain",
    "LLM",
    "RAG Pipeline",
    "Semantic Caching",
    "PostgreSQL",
    "pgvector",
    "AWS",
    "Azure",
    "Kubernetes",
    "Microservices",
    "Distributed Systems",
    "Event-Driven Architecture",
    "Next.js",
  ],
  authors: [{ name: "Mohammad Ali", url: "https://mohammadalis.vercel.app" }],
  creator: "Mohammad Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohammadalis.vercel.app",
    title: "Mohammad Ali | Software Engineer II — Backend & AI Systems",
    description:
      "Building distributed backend systems and production AI agents. 94% autonomous query resolution, 30,000+ users served.",
    siteName: "Mohammad Ali",
    images: [
      {
        url: "https://mohammadalis.vercel.app/profile/profile.png",
        width: 1200,
        height: 630,
        alt: "Mohammad Ali - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Ali | Software Engineer II — Backend & AI Systems",
    description: "Building distributed backend systems and production AI agents.",
    images: ["https://mohammadalis.vercel.app/profile/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "mohammad-ali-portfolio.app",
  icons: {
    icon: [
      { url: "/my-favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/my-favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/my-favicon/favicon.ico", sizes: "any" },
    ],
    shortcut: "/my-favicon/favicon.ico",
    apple: "/my-favicon/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0e4" },
    { media: "(prefers-color-scheme: dark)", color: "#15160f" },
  ],
  width: "device-width",
  initialScale: 1,
}

// Structured data: declares this as the official site of a Person named
// Mohammad Ali, disambiguating from others and enabling richer Google results.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammad Ali",
  url: "https://mohammadalis.vercel.app",
  image: "https://mohammadalis.vercel.app/profile/profile.png",
  jobTitle: "Software Engineer II — Backend & AI Systems",
  worksFor: {
    "@type": "Organization",
    name: "Bazaar Technologies",
    url: "https://www.bazaartech.com/",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "FAST National University of Computer and Emerging Sciences (NUCES), Karachi",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  email: "mailto:mohammadali83123@gmail.com",
  knowsAbout: [
    "Backend Engineering",
    "Distributed Systems",
    "Agentic AI",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Java",
    "Python",
    "Go",
    "Kubernetes",
  ],
  sameAs: [
    "https://github.com/mohammadali83123",
    "https://linkedin.com/in/mohammadali83123",
  ],
}

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mohammad Ali — Portfolio",
  url: "https://mohammadalis.vercel.app",
  author: { "@type": "Person", name: "Mohammad Ali" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${archivo.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, siteJsonLd]) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
