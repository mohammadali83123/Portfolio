"use client"

import { useState } from "react"
import { ExternalLink, Github, Folder } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const featuredProjects = [
  {
    title: "LawMadad",
    subtitle: "AI-Powered Legal Assistant",
    category: "AI/ML",
    description:
      "Production-grade AI chatbot providing legal assistance and automated document drafting based on Pakistani law. Implements RAG architecture with Llama 3.1 and Legal BERT for accurate legal guidance, streamlined documentation, and enhanced accessibility.",
    role: "Backend Developer & AI Specialist",
    tech: ["Python", "React Native", "Spring Boot", "PostgreSQL", "Llama 3.1", "Legal BERT", "RAG Pipeline", "AWS"],
    github: "https://github.com/mohammadali83123/LawMadad",
    external: "https://play.google.com/store/apps/details?id=com.mohammadali83123.LawMadad",
    image: "/ai-legal-chatbot-interface-with-document-drafting.jpg",
  },
  {
    title: "Customer Care Bot",
    subtitle: "Enterprise Production AI System",
    category: "AI/ML",
    description:
      "Architected and deployed intelligent customer care automation system achieving 92%+ query automation rate. Features include real-time order tracking, automated cancellations, delivery status APIs, NLP-powered product search, and multilingual voice query support (English/Urdu).",
    role: "Lead Developer",
    tech: ["Python", "FastAPI", "MessagingBird", "n8n", "PostgreSQL", "NLP", "Microservices"],
    github: null,
    external: null,
    image: "/customer-service-chatbot-dashboard-with-analytics.jpg",
  },
  {
    title: "CodeTribute",
    subtitle: "Blockchain Code Collaboration Platform",
    category: "Full Stack",
    description:
      "Full-stack code collaboration platform rewarding open-source contributions via blockchain smart contracts. Features include contribution tracking analytics, Solidity-based reward distribution, and community engagement tools.",
    role: "Full Stack Developer",
    tech: ["React", "Node.js", "Express.js", "MySQL", "Solidity", "Blockchain", "Web3"],
    github: "https://github.com/mohammadali83123/CODETRIBUTE",
    external: null,
    image: "/code-collaboration-platform-with-blockchain-reward.jpg",
  },
]

const categories = ["All", "AI/ML", "Full Stack", "Backend"]

export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All")
  const { ref, isInView } = useInView({ threshold: 0.1 })

  const filteredProjects =
    activeCategory === "All"
      ? featuredProjects
      : featuredProjects.filter((project) => project.category === activeCategory)

  return (
    <section id="projects" className="py-24" ref={ref}>
      <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-4">
        <span className="text-primary font-mono text-lg">03.</span>
        Featured Projects
        <span className="h-px bg-border flex-1 ml-4" />
      </h2>

      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
              activeCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-24">
        {filteredProjects.map((project, index) => (
          <div
            key={project.title}
            className={cn(
              "grid md:grid-cols-12 gap-4 items-center opacity-0",
              index % 2 === 1 ? "md:text-right" : "",
              isInView && (index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"),
            )}
            style={{ animationDelay: `${index * 200}ms`, animationFillMode: "forwards" }}
          >
            <div className={`md:col-span-7 ${index % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="relative group overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content with hover animation */}
            <div className={`md:col-span-5 ${index % 2 === 1 ? "md:order-1" : ""}`}>
              <p className="text-primary font-mono text-sm mb-2">{project.subtitle}</p>
              <h3 className="text-2xl font-bold text-foreground mb-4">{project.title}</h3>
              <div className="bg-card p-6 rounded-lg shadow-lg mb-4 border border-border hover:border-primary/30 transition-colors duration-300">
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                <p className="text-xs text-primary mt-3 font-mono">Role: {project.role}</p>
              </div>
              <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-muted-foreground font-mono hover:text-primary transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className={`flex gap-4 ${index % 2 === 1 ? "md:justify-end" : ""}`}>
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors hover:scale-110 transform"
                    aria-label="GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                )}
                {project.external && (
                  <Link
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-primary transition-colors hover:scale-110 transform"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Section */}
      <div
        className={cn(
          "mt-24 p-8 bg-card rounded-lg border border-border hover:border-primary/30 transition-all duration-300 opacity-0",
          isInView && "animate-fade-in-up",
        )}
        style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Folder className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold text-foreground">System Architecture Expertise</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="group">
            <h4 className="text-primary font-semibold mb-2 group-hover:text-primary/80 transition-colors">
              AI/ML Pipeline Architecture
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              RAG architecture with vector databases (Pinecone, Chroma), LLM integration (Llama 3.1, GPT-4, Claude),
              fine-tuning pipelines, and conversational AI with context retention.
            </p>
          </div>
          <div className="group">
            <h4 className="text-primary font-semibold mb-2 group-hover:text-primary/80 transition-colors">
              Backend & Microservices
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              FastAPI/Spring Boot microservices, PostgreSQL optimization, RESTful API design, event-driven architecture
              with message queues (RabbitMQ, Kafka).
            </p>
          </div>
          <div className="group">
            <h4 className="text-primary font-semibold mb-2 group-hover:text-primary/80 transition-colors">
              DevOps & Cloud Infrastructure
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              CI/CD pipelines (ArgoCD, GitHub Actions), Docker/Kubernetes containerization, AWS/Azure cloud deployments,
              infrastructure as code (Terraform).
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
