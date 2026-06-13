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
  title: "Mohammad Ali | Software Engineer II — Backend & AI Systems",
  description:
    "Software Engineer II at Bazaar Technologies, building distributed backend systems and production AI agents. Java, Python, Go, FastAPI, OpenAI Agents SDK, LangGraph, RAG, Kubernetes, AWS/Azure. 94% autonomous query resolution, 30,000+ users served.",
  keywords: [
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
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
