"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Until mounted, assume night (the default) so server and client markup agree
  const isDark = mounted ? resolvedTheme === "dark" : true

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to day mode" : "Switch to night mode"}
      className="font-mono text-xs uppercase tracking-widest px-3 py-2.5 border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2 cursor-pointer"
    >
      {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      {isDark ? "day" : "night"}
    </button>
  )
}
