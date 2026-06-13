"use client"

import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

export function SectionHeading({ index, title }: { index: string; title: string }) {
  const { ref, revealed } = useReveal({ threshold: 0.4 })

  return (
    <div ref={ref} className="flex items-baseline gap-4 mb-16 border-b border-border pb-6">
      <span
        className={cn(
          "font-mono text-xs tracking-[0.25em] text-primary uppercase transition-opacity duration-700",
          revealed ? "opacity-100" : "opacity-0",
        )}
      >
        {index} /
      </span>
      <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight overflow-hidden">
        <span
          className={cn(
            "block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            revealed ? "translate-y-0" : "translate-y-[115%]",
          )}
        >
          {title}
        </span>
      </h2>
    </div>
  )
}
