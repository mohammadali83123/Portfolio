import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Mohammad Ali | Software Engineer - AI & Backend Systems",
  description:
    "Software Engineer specializing in AI/ML, Backend Development, and Cloud Architecture. Expert in Python, FastAPI, LLMs, RAG pipelines, PostgreSQL, AWS, and microservices. Building scalable production systems with 70%+ automation rates.",
  keywords: [
    "Software Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Backend Developer",
    "Python Developer",
    "FastAPI",
    "LLM",
    "RAG Pipeline",
    "Conversational AI",
    "NLP",
    "PostgreSQL",
    "AWS",
    "Azure",
    "Microservices",
    "Docker",
    "CI/CD",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: "Mohammad Ali", url: "https://mohammadali.dev" }],
  creator: "Mohammad Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mohammadali.dev",
    title: "Mohammad Ali | Software Engineer - AI & Backend Systems",
    description:
      "Software Engineer with expertise in AI/ML, Backend Development, and Cloud Architecture. Building scalable production systems.",
    siteName: "Mohammad Ali Portfolio",
    images: [
      {
        url: "/my-favicon/favicon.png",
        width: 1200,
        height: 630,
        alt: "Mohammad Ali - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Ali | Software Engineer - AI & Backend Systems",
    description: "Software Engineer specializing in AI/ML, Backend Development, and Cloud Architecture.",
    images: ["/my-favicon/favicon.png"],
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
      { url: "/my-favicon/favicon.ico", sizes: "any" }
    ],
    shortcut: "/my-favicon/favicon.ico",
    apple: "/my-favicon/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
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
      <body className={`font-sans antialiased ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
