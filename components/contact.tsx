"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Github, Linkedin, Mail } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { SectionHeading } from "@/components/section-heading"
import { Tilt } from "@/components/tilt"
import { cn } from "@/lib/utils"

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="contact" className="py-24 lg:py-32" ref={ref}>
      <SectionHeading index="05" title="Contact" />

      <div
        className={cn("opacity-0", isInView && "animate-fade-in-up")}
        style={{ animationFillMode: "forwards" }}
      >
        <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase flex items-center gap-3 mb-8">
          <span className="inline-block w-2 h-2 bg-primary animate-blink" />
          accepting: backend / ai engineering / cloud architecture — eu, us, remote
        </p>

        <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">
          <div>
            <h3 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight max-w-4xl">
              Let&apos;s build something <span className="text-primary italic">reliable</span> together.
            </h3>

            <Link
              href="mailto:mohammadali83123@gmail.com"
              className="group inline-block mt-10 font-mono text-base sm:text-2xl text-foreground hover:text-primary transition-colors break-all"
            >
              <span className="inline-flex items-center gap-3">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0" />
                mohammadali83123@gmail.com
              </span>
              <span className="block h-px bg-border group-hover:bg-primary transition-colors mt-2" />
            </Link>
          </div>

          {/* Identity frame — corner brackets, reference: shafiab.com */}
          <div className="hidden lg:block">
            <Tilt max={8} className="relative p-3">
              <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-primary" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary" />
              <Image
                src="/profile/profile.png"
                alt="Mohammad Ali"
                width={280}
                height={280}
                className="w-full aspect-square object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
              />
            </Tilt>
            <div className="flex items-center justify-between mt-3 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>that&apos;s me — say hi</span>
              <span className="flex items-center gap-1.5 text-primary">
                <span className="inline-block w-1.5 h-1.5 bg-primary animate-blink" />
                online
              </span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-px bg-border border border-border mt-14">
          {[
            { label: "schedule_call", value: "Calendly ↗", href: "https://calendly.com/mohammadali83123", icon: Calendar },
            { label: "github", value: "mohammadali83123 ↗", href: "https://github.com/mohammadali83123", icon: Github },
            { label: "linkedin", value: "mohammadali83123 ↗", href: "https://linkedin.com/in/mohammadali83123", icon: Linkedin },
          ].map((item) => (
            <Tilt key={item.label} max={6}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full bg-background p-6 hover:bg-card transition-colors group"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-2">
                  <item.icon className="w-3.5 h-3.5 text-primary" />
                  {item.label}
                </p>
                <p className="font-display text-lg mt-2 group-hover:text-primary transition-colors">{item.value}</p>
              </Link>
            </Tilt>
          ))}
        </div>

        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-10">
          Karachi, Pakistan — open to relocation
        </p>
      </div>
    </section>
  )
}
