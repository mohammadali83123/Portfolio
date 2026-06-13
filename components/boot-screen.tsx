"use client"

import { useEffect, useRef, useState } from "react"

const BOOT_LINES = [
  "> initializing portfolio_v2.0 ...",
  "> mounting backend_services ... ok",
  "> loading ai_agents [voice, care, multi-agent] ... ok",
  "> establishing uplink: karachi.pk ... ok",
  "> SYSTEM ONLINE ✓",
]

const CHAR_INTERVAL = 14
const LINE_PAUSE = 120
const EXIT_DELAY = 500

declare global {
  interface Window {
    __bootDone?: boolean
  }
}

function finishBoot() {
  window.__bootDone = true
  window.dispatchEvent(new Event("boot-complete"))
}

export function BootScreen() {
  const [active, setActive] = useState<boolean | null>(null)
  const [leaving, setLeaving] = useState(false)
  const [typed, setTyped] = useState<string[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const seen = sessionStorage.getItem("ma_boot_seen")

    if (reducedMotion || seen) {
      setActive(false)
      finishBoot()
      return
    }

    setActive(true)
    document.body.style.overflow = "hidden"

    // Time-driven typing: each tick renders everything that should be visible
    // by now, so browser timer throttling delays nothing — it just catches up.
    const charAt: { line: number; char: number; at: number }[] = []
    let t = 300
    BOOT_LINES.forEach((text, line) => {
      for (let c = 1; c <= text.length; c++) {
        t += CHAR_INTERVAL
        charAt.push({ line, char: c, at: t })
      }
      t += LINE_PAUSE
    })
    const total = t + EXIT_DELAY
    const start = performance.now()

    const tick = () => {
      const elapsed = performance.now() - start
      const visible = charAt.filter((c) => c.at <= elapsed)
      const next: string[] = []
      for (const v of visible) {
        next[v.line] = BOOT_LINES[v.line].slice(0, v.char)
      }
      setTyped(next)
      if (elapsed >= total) {
        dismiss()
        return
      }
      timers.current.push(setTimeout(tick, 30))
    }
    timers.current.push(setTimeout(tick, 30))

    return () => {
      timers.current.forEach(clearTimeout)
      document.body.style.overflow = "unset"
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dismiss = () => {
    sessionStorage.setItem("ma_boot_seen", "1")
    setLeaving(true)
    document.body.style.overflow = "unset"
    finishBoot()
    setTimeout(() => setActive(false), 450)
  }

  if (!active) return null

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-background flex items-center justify-center transition-opacity duration-400 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <button
        onClick={dismiss}
        className="absolute top-6 left-6 font-mono text-xs uppercase tracking-widest text-muted-foreground border border-border px-4 py-2 hover:border-primary hover:text-primary transition-colors"
      >
        ← skip
      </button>

      <div className="w-full max-w-md px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          ma_portfolio · boot sequence
        </p>
        <div className="font-mono text-sm leading-loose min-h-[10rem]">
          {typed.map((text, i) => (
            <p
              key={i}
              className={
                text.startsWith("> SYSTEM") ? "text-primary font-semibold" : "text-foreground/80"
              }
            >
              {text}
            </p>
          ))}
          <span className="inline-block w-2.5 h-4 bg-primary animate-blink align-middle" />
        </div>
      </div>
    </div>
  )
}
