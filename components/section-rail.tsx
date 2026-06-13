"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "about", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
]

export function SectionRail() {
  const [activeId, setActiveId] = useState("about")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-4"
      aria-label="Section navigation"
    >
      {sections.map((s) => {
        const isActive = s.id === activeId
        return (
          <a key={s.id} href={`#${s.id}`} className="group flex items-center gap-3">
            <span
              className={cn(
                "font-mono text-[10px] uppercase tracking-[0.2em] border px-2.5 py-1 transition-all duration-200",
                isActive
                  ? "opacity-100 text-primary border-primary"
                  : "opacity-0 group-hover:opacity-100 text-muted-foreground border-border",
              )}
            >
              {s.label}
            </span>
            <span
              className={cn(
                "w-2 h-2 border transition-colors duration-200",
                isActive ? "bg-primary border-primary" : "border-muted-foreground group-hover:border-primary",
              )}
            />
          </a>
        )
      })}
    </nav>
  )
}
