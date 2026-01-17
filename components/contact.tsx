"use client"

import Link from "next/link"
import { Mail, MapPin, Github, Linkedin, Calendar } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="contact" className="py-24 pb-32" ref={ref}>
      <h2 className="text-2xl font-bold text-foreground mb-12 flex items-center gap-4">
        <span className="text-primary font-mono text-lg">05.</span>
        Get In Touch
        <span className="h-px bg-border flex-1 ml-4" />
      </h2>

      <div
        className={cn("max-w-3xl mx-auto opacity-0", isInView && "animate-fade-in-up")}
        style={{ animationFillMode: "forwards" }}
      >
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            I&apos;m actively seeking <span className="text-primary font-medium">Software Engineering roles</span>{" "}
            specializing in{" "}
            <span className="text-primary font-medium">
              Backend Development, AI/ML Engineering, and Cloud Architecture
            </span>
            . Open to opportunities in EU, US, and remote positions. Whether you have a role, project, or just want to
            connect—my inbox is always open.
          </p>
        </div>

        {/* CTA Buttons - Responsive Grid */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="mailto:mohammadali83123@gmail.com"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-all hover:scale-105 text-lg"
          >
            <Mail className="w-5 h-5" />
            Send Email
          </Link>
          <Link
            href="https://calendly.com/mohammadali83123"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-primary text-primary font-medium rounded hover:bg-primary/10 transition-all hover:scale-105 text-lg"
          >
            <Calendar className="w-5 h-5" />
            Schedule Call
          </Link>
        </div>

        {/* Contact Info Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
          <div className="flex items-center justify-center sm:justify-start gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors">
            <Mail className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-muted-foreground truncate">mohammadali83123@gmail.com</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/30 transition-colors">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-muted-foreground">Karachi, Pakistan (Open to Relocation)</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6">
          <Link
            href="https://github.com/mohammadali83123"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-muted-foreground hover:text-primary transition-all hover:scale-110 bg-card rounded-full border border-border hover:border-primary/30"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/mohammadali83123"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 text-muted-foreground hover:text-primary transition-all hover:scale-110 bg-card rounded-full border border-border hover:border-primary/30"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link
            href="mailto:mohammadali83123@gmail.com"
            className="p-3 text-muted-foreground hover:text-primary transition-all hover:scale-110 bg-card rounded-full border border-border hover:border-primary/30"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}
