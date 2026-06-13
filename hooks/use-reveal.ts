"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Scroll-reveal that can NEVER leave content permanently hidden.
 * - Reveals when the element scrolls into view (IntersectionObserver).
 * - Reveals immediately if IO is unsupported.
 * - Safety net: reveals after `fallbackMs` no matter what, so a missed
 *   observer callback or odd layout can't strand content off-screen.
 * Consumers default to visible until JS arms the hidden state, so SSR / no-JS
 * always render the content.
 */
export function useReveal({ threshold = 0.25, fallbackMs = 1400 } = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) {
      setRevealed(true)
      return
    }
    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true)
      return
    }

    let done = false
    const reveal = () => {
      if (done) return
      done = true
      setRevealed(true)
      io.disconnect()
      clearTimeout(timer)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal()
      },
      { threshold },
    )
    io.observe(el)
    // If already in view at mount, fire on the next frame.
    const raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) reveal()
    })
    const timer = setTimeout(reveal, fallbackMs)

    return () => {
      io.disconnect()
      clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [threshold, fallbackMs])

  return { ref, revealed }
}
