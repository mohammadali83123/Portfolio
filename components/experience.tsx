"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const experiences = [
  {
    title: "Software Engineer I",
    company: "Bazaar Technologies",
    companyUrl: "https://bazaar.com",
    period: "May 2025 — Present",
    description: [
      "Architected and deployed production-grade Customer Care Bot on MessagingBird CRM, achieving 70%+ automation rate for customer queries, reducing manual agent workload by 60%",
      "Engineered end-to-end features including real-time order tracking, automated cancellation workflows, delivery status APIs, intelligent product search, and Urdu voice query processing using NLP",
      "Designed and implemented n8n automation workflows for order confirmation processes, reducing operational overhead by 40% and improving order accuracy",
      "Developed RESTful microservices using FastAPI and Python, optimized PostgreSQL queries achieving 30% performance improvement for data analytics pipelines",
      "Collaborated cross-functionally with Engineering, Product, and Customer Experience teams; work directly visible to Co-founder and executive leadership",
    ],
    skills: ["Python", "FastAPI", "n8n", "PostgreSQL", "ArgoCD", "CI/CD", "NLP", "Microservices"],
  },
  {
    title: "AI/ML Engineer Intern",
    company: "Imperium Dynamics",
    companyUrl: "#",
    period: "April 2025 — May 2025",
    description: [
      "Developed and deployed machine learning models on Microsoft Azure and Microsoft Fabric, improving data processing efficiency by 30%",
      "Architected and maintained scalable ETL data pipelines, reducing model training time by 25% through optimized data handling and preprocessing",
      "Collaborated with cross-functional team of 4+ engineers to integrate AI/ML features into production systems, enhancing project delivery efficiency by 20%",
    ],
    skills: ["Azure", "Microsoft Fabric", "Python", "Machine Learning", "ETL", "Data Pipelines"],
  },
  {
    title: "Software Engineer Intern",
    company: "SOCByte",
    companyUrl: "#",
    period: "March 2025 — April 2025",
    description: [
      "Enhanced system security by 10% through implementing authentication protocols, encryption standards, and security best practices using Fastify and Next.js",
      "Optimized backend performance using Node.js, Fastify, and PostgreSQL, increasing data processing efficiency by 15%",
      "Led migration from React.js to Next.js, implementing secure authentication components and improved access control mechanisms",
    ],
    skills: ["Next.js", "Node.js", "Fastify", "PostgreSQL", "Security", "Authentication"],
  },
]

export function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="experience" className="py-24" ref={ref}>
      <h2 className="text-2xl font-bold text-foreground mb-12 flex items-center gap-4">
        <span className="text-primary font-mono text-lg">02.</span>
        Professional Experience
        <span className="h-px bg-border flex-1 ml-4" />
      </h2>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={cn("grid md:grid-cols-[200px_1fr] gap-4 group opacity-0", isInView && "animate-fade-in-up")}
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
          >
            <div className="text-sm text-muted-foreground font-mono">{exp.period}</div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {exp.title} ·{" "}
                <Link
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  {exp.company}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </h3>
              <ul className="mt-4 space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                    <span className="text-primary mt-1.5">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-xs bg-primary/10 text-primary rounded font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
