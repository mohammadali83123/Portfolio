export const dynamic = "force-static"

import type { MetadataRoute } from "next"

const BASE = "https://mohammadalis.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: BASE, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/#experience`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/#projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/#stack`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/#contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ]
}
