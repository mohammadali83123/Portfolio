"use client"

import { useInView } from "@/hooks/use-in-view"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const honors = [
  {
    title: "Dean's List Scholar",
    detail: "Fall 2022 & Fall 2024",
  },
  {
    title: "Competitive Programming Finalist",
    detail: "Inter-University Competitive Programming Competition",
  },
  {
    title: "Hackathon Participant",
    detail: "Multiple national-level hackathons",
  },
]

export function Education() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="education" className="py-24 lg:py-32" ref={ref}>
      <SectionHeading index="04" title="Education & Honors" />

      <div className="grid md:grid-cols-2 gap-12">
        <div
          className={cn("opacity-0", isInView && "animate-fade-in-up")}
          style={{ animationFillMode: "forwards" }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Sep 2021 — Jun 2025</p>
          <h3 className="font-display text-2xl sm:text-3xl font-medium leading-snug">
            BS Computer Science
            <span className="block text-muted-foreground italic text-xl mt-1">
              NUCES FAST, Karachi
            </span>
          </h3>
          <div className="flex items-baseline gap-6 mt-6 border-t border-border pt-5">
            <div>
              <p className="font-display text-3xl text-primary">3.29</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
                cgpa / 4.00
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Coursework: Data Structures &amp; Algorithms, Distributed Systems, Database Systems, Operating
              Systems, AI, Machine Learning, NLP, DevOps &amp; Cloud Computing, Information Security.
            </p>
          </div>
        </div>

        <div
          className={cn("opacity-0", isInView && "animate-fade-in-up")}
          style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground border-b border-border pb-2">
            honors &amp; awards
          </p>
          <ul>
            {honors.map((h, i) => (
              <li key={h.title} className="flex gap-5 py-5 border-b border-border items-baseline">
                <span className="font-mono text-xs text-primary shrink-0">[{String(i + 1).padStart(2, "0")}]</span>
                <div>
                  <p className="font-display text-lg font-medium">{h.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{h.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
