"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center pt-20 pb-16">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
        {/* Left Column - Fixed Info */}
        <div className="lg:sticky lg:top-24">
          <p
            className={`text-primary font-mono text-sm mb-4 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            Hi, my name is
          </p>
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 text-balance opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Mohammad Ali
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground mb-6 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            Software Engineer | AI & Backend
          </h2>
          <p
            className={`text-muted-foreground text-lg leading-relaxed max-w-md mb-8 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            I architect and deploy scalable backend systems, production-grade AI chatbots, and enterprise automation
            workflows. Specializing in Python, FastAPI, LLMs, and cloud infrastructure.
          </p>

          {/* Social Links */}
          <div
            className={`flex items-center gap-5 mb-8 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
            style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
          >
            <Link
              href="https://github.com/mohammadali83123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com/in/mohammadali83123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href="mailto:mohammadali83123@gmail.com"
              className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap gap-4 opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
            style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-all hover:scale-105"
            >
              View Projects
              <ArrowDown className="w-4 h-4" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-medium rounded hover:bg-primary/10 transition-all hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Right Column - About with ATS keywords */}
        <div
          className={`text-muted-foreground leading-relaxed space-y-4 opacity-0 ${isVisible ? "animate-fade-in" : ""}`}
          style={{ animationDelay: "700ms", animationFillMode: "forwards" }}
        >
          <p>
            I&apos;m a <span className="text-foreground font-medium">Software Engineer at Bazaar Technologies</span>,
            where I lead development of backend systems, conversational AI solutions, and workflow automation. My
            production systems have achieved <span className="text-primary">92%+ query automation rates</span>,
            significantly reducing operational costs and improving customer satisfaction.
          </p>
          <p>
            My technical expertise spans{" "}
            <span className="text-foreground font-medium">Python, FastAPI, and microservices architecture</span>,
            alongside{" "}
            <span className="text-foreground font-medium">RAG pipelines, LLM integration (Llama 3.1, GPT)</span>, and
            cloud platforms (AWS, Azure). I specialize in building intelligent systems that scale to handle enterprise
            workloads.
          </p>
          <p>
            I hold a <span className="text-foreground font-medium">BS in Computer Science from FAST NUCES</span>{" "}
            (Dean&apos;s List) and bring hands-on experience in agile development, CI/CD pipelines, and cross-functional
            collaboration with Product, Engineering, and Customer Experience teams.
          </p>
        </div>
      </div>
    </section>
  )
}
