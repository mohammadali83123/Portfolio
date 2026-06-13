"use client"

import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const experiences = [
  {
    title: "Software Engineer II",
    company: "Bazaar Technologies",
    companyUrl: "https://www.bazaartech.com/",
    period: "May 2025 — Present",
    badge: "full_time",
    active: true,
    description: [
      "Engineered a distributed AI-powered WhatsApp customer-care system using Java and Python FastAPI microservices, built for high availability and fault tolerance — 94% autonomous query resolution and an 82% reduction in agent ticket volume.",
      "Designed and deployed a client-side voice AI agent (Google ADK + LiteLLM) serving 30,000+ production users on a mobile ledger app: real-time voice transcription, intent resolution, in-app action execution, and plug-and-play LLM routing to swap underlying models in seconds.",
      "Architecting a multi-agent AI system with OpenAI Agents SDK and LangGraph to automate onboarding, transactions, and cash-flow workflows, using event-driven architecture for reliable agent orchestration.",
      "Implemented multi-layer latency and cost optimization across AI systems — semantic caching for repetitive FAQ queries with pgvector and Supabase RAG, explicit and implicit prompt caching, and pre-cached workflow step responses to cut redundant LLM calls at scale.",
      "Built a high-concurrency Go-based Proof of Delivery distributed system enabling low-latency order processing and real-time synchronization across services, delivered on AWS and Azure with Docker, Kubernetes, and CI/CD.",
    ],
    skills: ["Java", "Python", "Go", "FastAPI", "OpenAI Agents SDK", "LangGraph", "pgvector", "Kubernetes", "AWS", "Azure"],
  },
  {
    title: "AI Engineer Intern",
    company: "Imperium Dynamics",
    companyUrl: "https://imperiumdynamics.com/",
    period: "Apr 2025 — May 2025",
    badge: "internship",
    active: false,
    description: [
      "Developed LLM-powered agentic systems using LangChain and LangGraph with orchestration, tool/function calling, and production execution.",
      "Built RAG-based document pipelines handling structured and unstructured data ingestion, embedding, and retrieval for scalable AI systems.",
      "Implemented monitoring, logging, and debugging — diagnosing production issues and iterating based on real-world usage.",
    ],
    skills: ["LangChain", "LangGraph", "RAG", "Python", "Azure", "Microsoft Fabric"],
  },
  {
    title: "Software Engineer Intern",
    company: "SOCByte",
    companyUrl: "https://socbyte.ai/",
    period: "Mar 2025 — Apr 2025",
    badge: "internship",
    active: false,
    description: [
      "Enhanced system security through authentication protocols, encryption standards, and security best practices using Fastify and Next.js.",
      "Optimized backend performance with Node.js, Fastify, and PostgreSQL, increasing data processing efficiency by 15%.",
      "Led migration from React.js to Next.js, implementing secure authentication components and improved access control.",
    ],
    skills: ["Next.js", "Node.js", "Fastify", "PostgreSQL", "Security"],
  },
]

export function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.05 })

  return (
    <section id="experience" className="py-24 lg:py-32" ref={ref}>
      <SectionHeading index="01" title="Experience" />

      <div>
        {experiences.map((exp, index) => (
          <article
            key={exp.company}
            className={cn(
              "grid md:grid-cols-[220px_1fr] gap-6 py-12 border-b border-border opacity-0 group",
              isInView && "animate-fade-in-up",
            )}
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
          >
            <div>
              <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase">{exp.period}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase border border-border text-muted-foreground px-2 py-1">
                  {exp.badge}
                </span>
                {exp.active && (
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 bg-primary animate-blink" />
                    active
                  </span>
                )}
              </div>
              <p className="font-mono text-[10px] tracking-[0.25em] text-primary uppercase mt-3">
                log.{String(index + 1).padStart(2, "0")}
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-medium">
                {exp.title}{" "}
                <Link
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary italic hover:underline underline-offset-4"
                >
                  — {exp.company} ↗
                </Link>
              </h3>

              <ul className="mt-6 space-y-3">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-3">
                    <span className="font-mono text-primary shrink-0 text-xs mt-1">
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6">
                {exp.skills.map((skill) => (
                  <span key={skill} className="font-mono text-xs uppercase tracking-wider text-foreground/70">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
