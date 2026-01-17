"use client"

import { GraduationCap, Award, Trophy, Code } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

export function Education() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section className="py-24" ref={ref}>
      <h2 className="text-2xl font-bold text-foreground mb-12 flex items-center gap-4">
        <span className="text-primary font-mono text-lg">04.</span>
        Education & Achievements
        <span className="h-px bg-border flex-1 ml-4" />
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Education */}
        <div
          className={cn(
            "p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg opacity-0",
            isInView && "animate-slide-in-left",
          )}
          style={{ animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Education</h3>
          </div>
          <div>
            <h4 className="text-lg font-medium text-foreground">Bachelor of Science in Computer Science</h4>
            <p className="text-primary text-sm">FAST National University of Computer & Emerging Sciences, Karachi</p>
            <p className="text-muted-foreground text-sm mt-1">September 2021 — June 2025</p>
            <p className="text-muted-foreground text-sm mt-2">
              CGPA: <span className="text-foreground font-medium">3.29/4.0</span>
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Relevant Coursework: OOP, Data Structures & Algorithms, Database Systems, Operating Systems, Software
              Engineering, Distributed Systems, Information Security, Artificial Intelligence, Machine Learning, Natural Language Processing, DevOps, Cloud Computing, Agile Project Mangement
            </p>
          </div>
        </div>

        {/* Achievements */}
        <div
          className={cn(
            "p-6 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg opacity-0",
            isInView && "animate-slide-in-right",
          )}
          style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Achievements & Recognition</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <Trophy className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                <span className="text-foreground font-medium">Dean&apos;s List Scholar</span> — Fall 2022 & Fall 2024
                (Top 10% of class)
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <Code className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                <span className="text-foreground font-medium">Competitive Programming Finalist</span> — Qualified for
                national finals
              </span>
            </li>
            <li className="flex items-start gap-3 text-sm">
              <Trophy className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                <span className="text-foreground font-medium">Hackathon Participant</span> — Multiple events including
                university and corporate-sponsored competitions
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
