"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useInView } from "@/hooks/use-in-view"
import { SectionHeading } from "@/components/section-heading"
import { Tilt } from "@/components/tilt"
import { cn } from "@/lib/utils"

// Brand icons come from the simple-icons CDN, tinted to the design palette.
// Skills with no public icon (or whose icon fails to load) render as
// terminal-style abbreviation tiles instead. Tints follow the active theme —
// chartreuse is unreadable on paper, so day mode uses the darkened olive.
const TINTS = {
  dark: { muted: "9A9C84", accent: "D6FF4B" },
  light: { muted: "75775F", accent: "5E7D0C" },
}

type Skill = {
  name: string
  slug?: string
  abbr?: string
}

const stack: { category: string; skills: Skill[] }[] = [
  {
    category: "Languages & Frameworks",
    skills: [
      { name: "Java", slug: "openjdk" },
      { name: "Spring Boot", slug: "springboot" },
      { name: "Python", slug: "python" },
      { name: "Go", slug: "go" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express.js", slug: "express" },
      { name: "Next.js", slug: "nextdotjs" },
    ],
  },
  {
    category: "AI & Agentic Systems",
    skills: [
      { name: "OpenAI Agents SDK", abbr: "OAI" },
      { name: "LangGraph", slug: "langgraph", abbr: "LG" },
      { name: "LangChain", slug: "langchain", abbr: "LC" },
      { name: "RAG", abbr: "RAG" },
      { name: "LLMs", abbr: "LLM" },
      { name: "Prompt Engineering", abbr: ">_" },
      { name: "Semantic Caching", abbr: "S$" },
      { name: "Ollama", slug: "ollama" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MySQL", slug: "mysql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "TimescaleDB", slug: "timescale", abbr: "TS" },
      { name: "Firebase", slug: "firebase" },
      { name: "Pinecone", abbr: "PC" },
      { name: "pgvector", abbr: "PGV" },
      { name: "Hibernate", slug: "hibernate" },
    ],
  },
  {
    category: "Architecture & Systems",
    skills: [
      { name: "Microservices", abbr: "µS" },
      { name: "Distributed Systems", abbr: "DS" },
      { name: "Event-Driven Architecture", abbr: "EDA" },
      { name: "REST API Design", abbr: "API" },
      { name: "Domain-Driven Design", abbr: "DDD" },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "AWS", abbr: "AWS" },
      { name: "Azure", abbr: "AZ" },
      { name: "ArgoCD", slug: "argo", abbr: "CD" },
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "Git", slug: "git" },
      { name: "Terraform (IaC)", slug: "terraform" },
      { name: "CI/CD", abbr: "CI" },
    ],
  },
  {
    category: "ML & Data",
    skills: [
      { name: "PyTorch", slug: "pytorch" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "Scikit-learn", slug: "scikitlearn", abbr: "SKL" },
      { name: "Keras", slug: "keras" },
      { name: "Azure ML", abbr: "AML" },
      { name: "Microsoft Fabric", abbr: "FAB" },
    ],
  },
]

function defaultAbbr(name: string) {
  return name
    .split(/[\s/.-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase()
}

function SkillTile({ skill, tints }: { skill: Skill; tints: { muted: string; accent: string } }) {
  const [failed, setFailed] = useState(false)
  const showIcon = skill.slug && !failed

  return (
    <Tilt max={12} className="group flex flex-col items-center gap-2">
      <div className="w-full aspect-square border border-border bg-card/40 flex items-center justify-center transition-colors duration-300 group-hover:border-primary group-hover:bg-card">
        {showIcon ? (
          <span className="relative block w-8 h-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://cdn.simpleicons.org/${skill.slug}/${tints.muted}`}
              alt={skill.name}
              loading="lazy"
              className="absolute inset-0 w-8 h-8 transition-opacity duration-300 group-hover:opacity-0"
              onError={() => setFailed(true)}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://cdn.simpleicons.org/${skill.slug}/${tints.accent}`}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-8 h-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </span>
        ) : (
          <span className="font-mono text-sm font-semibold tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-primary">
            {skill.abbr ?? defaultAbbr(skill.name)}
          </span>
        )}
      </div>
      <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors duration-300 text-center leading-snug">
        {skill.name}
      </p>
    </Tilt>
  )
}

export function Skills() {
  const { ref, isInView } = useInView({ threshold: 0.05 })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const tints = mounted && resolvedTheme === "light" ? TINTS.light : TINTS.dark

  return (
    <section id="stack" className="py-24 lg:py-32" ref={ref}>
      <SectionHeading index="03" title="Stack Index" />

      <div className="space-y-14">
        {stack.map((row, index) => (
          <div
            key={row.category}
            className={cn("grid sm:grid-cols-[220px_1fr] gap-6 sm:gap-10 opacity-0", isInView && "animate-fade-in-up")}
            style={{ animationDelay: `${index * 90}ms`, animationFillMode: "forwards" }}
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase">
                {String(index + 1).padStart(2, "0")} /
              </p>
              <h3 className="font-display text-xl font-medium mt-1 leading-snug">{row.category}</h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">
                {row.skills.length} entries
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(84px,1fr))] gap-3 content-start">
              {row.skills.map((skill) => (
                <SkillTile key={skill.name} skill={skill} tints={tints} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
