"use client"

import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/* Perspective tilt-on-hover — gives flat cards physical depth.
   Pointer-driven, so it gracefully no-ops on touch/coarse pointers and for
   users who prefer reduced motion. */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rect = useRef<DOMRect | null>(null)
  const raf = useRef(0)

  const allowed = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const onEnter = () => {
    if (!allowed() || !ref.current) return
    rect.current = ref.current.getBoundingClientRect() // cache once; no per-move layout reads
    ref.current.style.willChange = "transform"
  }

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    const r = rect.current
    if (!allowed() || !el || !r) return
    const { clientX, clientY } = e
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const px = ((clientX - r.left) / r.width) * 2 - 1
      const py = ((clientY - r.top) / r.height) * 2 - 1
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale3d(1.015, 1.015, 1)`
    })
  }

  const onLeave = () => {
    cancelAnimationFrame(raf.current)
    if (ref.current) {
      ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      ref.current.style.willChange = "auto"
    }
  }

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("transition-transform duration-200 ease-out", className)}
    >
      {children}
    </div>
  )
}
