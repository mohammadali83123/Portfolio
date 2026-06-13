"use client"

import Link from "next/link"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { useReveal } from "@/hooks/use-reveal"
import { SectionHeading } from "@/components/section-heading"
import { Tilt } from "@/components/tilt"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "WhatsApp Customer Care AI",
    subtitle: "Distributed Production System — Bazaar Technologies",
    description:
      "AI-powered customer-care system built as Java and Python FastAPI microservices with high availability and fault tolerance. Resolves 94% of queries autonomously and cut agent ticket volume by 82% — with semantic caching (pgvector + Supabase RAG) and layered prompt caching keeping latency and LLM cost down at scale.",
    role: "Lead Engineer",
    tech: ["Java", "Python", "FastAPI", "pgvector", "Supabase", "RAG", "Microservices"],
    github: null,
    external: null,
    image: "/customer-service-chatbot-dashboard-with-analytics.jpg",
  },
  {
    title: "LawMadad",
    subtitle: "AI Legal Assistant — Final Year Project",
    description:
      "Production-grade LLM system using RAG for multi-step reasoning over structured and unstructured legal documents. Document ingestion pipelines processed 2,800+ records into structured databases; prompt engineering and structured output generation keep responses reliable. Integrated with backend APIs and a mobile app, deployed via CI/CD on AWS with data privacy and masking. Live on Google Play.",
    role: "Backend Developer & AI Specialist",
    tech: ["Python", "RAG", "Llama 3.1", "Spring Boot", "PostgreSQL", "React Native", "AWS"],
    github: "https://github.com/mohammadali83123/LawMadad",
    external: "https://play.google.com/store/apps/details?id=com.mohammadali83123.LawMadad",
    image: "/ai-legal-chatbot-interface-with-document-drafting.jpg",
  },
  {
    title: "Fitness Microservices Platform",
    subtitle: "Distributed Systems — Personal Project",
    description:
      "Scalable microservices platform built with Spring Boot and Spring Cloud, designed for high availability and fault tolerance. Event-driven architecture handles reliable communication across services, with clean, well-tested production code and system design aligned to scalable architecture standards.",
    role: "Architect & Developer",
    tech: ["Java", "Spring Boot", "Spring Cloud", "Event-Driven Architecture", "Microservices"],
    github: "https://github.com/mohammadali83123",
    external: null,
    image: "/fitness-microservices-schematic.svg",
  },
  {
    title: "CodeTribute",
    subtitle: "Blockchain Code Collaboration Platform",
    description:
      "Full-stack platform rewarding open-source contributions via blockchain smart contracts — contribution tracking analytics, Solidity-based reward distribution, and community engagement tools.",
    role: "Full Stack Developer",
    tech: ["React", "Node.js", "Express.js", "MySQL", "Solidity", "Web3"],
    github: "https://github.com/mohammadali83123/CODETRIBUTE",
    external: null,
    image: "/code-collaboration-platform-with-blockchain-reward.jpg",
  },
]

function ProjectImage({
  project,
  index,
}: {
  project: (typeof projects)[number]
  index: number
}) {
  const { ref, revealed } = useReveal({ threshold: 0.2 })

  return (
    <Tilt max={5}>
      <div
        ref={ref}
        className="relative group border border-border overflow-hidden transition-[clip-path] duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
      >
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={640}
          height={400}
          loading="lazy"
          className="w-full aspect-video object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
        />
        <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.25em] bg-background/90 text-primary px-2.5 py-1.5 border border-border">
          proj.{String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </Tilt>
  )
}

export function Projects() {
  const { ref, isInView } = useInView({ threshold: 0.05 })

  return (
    <section id="projects" className="py-24 lg:py-32" ref={ref}>
      <SectionHeading index="02" title="Selected Work" />

      <div className="space-y-20 lg:space-y-28">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={cn(
              "grid md:grid-cols-12 gap-8 items-start opacity-0",
              isInView && "animate-fade-in-up",
            )}
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
          >
            <div className={cn("md:col-span-6", index % 2 === 1 && "md:order-2")}>
              <ProjectImage project={project} index={index} />
            </div>

            <div className={cn("md:col-span-6", index % 2 === 1 && "md:order-1")}>
              <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">{project.subtitle}</p>
              <h3 className="font-display text-3xl sm:text-4xl font-medium tracking-tight mb-5">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary pl-5">
                {project.description}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4 pl-5">
                role — {project.role}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="font-mono text-xs uppercase tracking-wider text-foreground/70">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 mt-6">
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                  >
                    Source ↗
                  </Link>
                )}
                {project.external && (
                  <Link
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors"
                  >
                    Live ↗
                  </Link>
                )}
                {!project.github && !project.external && (
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    proprietary system
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
