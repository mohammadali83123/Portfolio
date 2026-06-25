"use client"

import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const metrics = [
  { value: "94%", label: "Autonomous query resolution — AI customer care" },
  { value: "82%", label: "Reduction in agent ticket volume" },
  { value: "30K+", label: "Production users on voice AI agent" },
  { value: "2.8K+", label: "Legal records structured for RAG retrieval" },
]

const socials = [
  { label: "GitHub", href: "https://github.com/mohammadali83123", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/mohammadali83123", icon: Linkedin },
  { label: "Email", href: "mailto:mohammadali83123@gmail.com", icon: Mail },
]

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [visitorName, setVisitorName] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const mastRef = useRef<HTMLHeadingElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  // Greet a visitor who introduced themselves at the welcome gate
  useEffect(() => {
    try {
      const raw = localStorage.getItem("ma_visitor")
      if (raw) {
        const n = (JSON.parse(raw)?.name || "").trim()
        if (n) setVisitorName(n.split(/\s+/)[0])
      }
    } catch {
      /* ignore */
    }
    const onId = (e: Event) => {
      const n = ((e as CustomEvent).detail?.name || "").trim()
      if (n) setVisitorName(n.split(/\s+/)[0])
    }
    window.addEventListener("visitor-identified", onId as EventListener)
    return () => window.removeEventListener("visitor-identified", onId as EventListener)
  }, [])

  // Cursor parallax — masthead, metrics, and dot grid drift at different depths.
  // Fine-pointer only, so touch devices never get stuck mid-transform.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1
        const ny = (e.clientY / window.innerHeight) * 2 - 1
        if (mastRef.current) {
          mastRef.current.style.transform = `translate3d(${(nx * 10).toFixed(1)}px, ${(ny * 6).toFixed(1)}px, 0)`
        }
        if (metricsRef.current) {
          metricsRef.current.style.transform = `translate3d(${(nx * -14).toFixed(1)}px, ${(ny * -8).toFixed(1)}px, 0)`
        }
        if (sectionRef.current) {
          sectionRef.current.style.backgroundPosition = `${(nx * -18).toFixed(1)}px ${(ny * -12).toFixed(1)}px`
        }
      })
    }
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    // Hold the entrance animation until the boot sequence overlay clears
    const w = window as Window & { __bootDone?: boolean }
    if (w.__bootDone) {
      setIsVisible(true)
      return
    }
    const onBoot = () => setIsVisible(true)
    window.addEventListener("boot-complete", onBoot)
    const fallback = setTimeout(() => setIsVisible(true), 6000)
    return () => {
      window.removeEventListener("boot-complete", onBoot)
      clearTimeout(fallback)
    }
  }, [])

  const reveal = (delay: number, extra = "") => ({
    className: `${extra} opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`,
    style: { animationDelay: `${delay}ms`, animationFillMode: "forwards" as const },
  })

  return (
    <section id="about" ref={sectionRef} className="relative dot-grid border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 pt-32 pb-16 lg:pt-40">
        {/* Status readout line */}
        <div {...reveal(100)}>
          <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-primary animate-blink" />
            {visitorName ? (
              <span>
                <span className="text-primary">welcome, {visitorName}.</span> sys.status:
                open_to_opportunities — karachi, pk / remote
              </span>
            ) : (
              <span>sys.status: open_to_opportunities — karachi, pk / remote</span>
            )}
          </p>
        </div>

        {/* Masthead */}
        <h1
          ref={mastRef}
          className="font-display font-semibold leading-[0.95] mt-8 text-[clamp(3.2rem,11vw,8.5rem)] tracking-tight will-change-transform"
        >
          <span {...reveal(200, "block")}>Mohammad</span>
          <span {...reveal(300, "block text-primary italic")}>
            Ali<span className="text-foreground not-italic">.</span>
          </span>
        </h1>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 mt-10 items-end">
          <div {...reveal(450)}>
            <p className="font-mono text-sm text-primary mb-4">
              Software Engineer II · Backend &amp; AI Systems @ Bazaar Technologies
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              I build distributed backend systems and production AI agents — WhatsApp customer-care
              automation, voice agents serving 30,000+ users, multi-agent orchestration with OpenAI
              Agents SDK and LangGraph, and high-concurrency Go services. Java, Python, and Go on
              AWS/Azure, shipped with Kubernetes and CI/CD.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                href="#projects"
                className="px-7 py-3.5 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-wider hover:bg-foreground transition-colors"
              >
                View Work ↓
              </Link>
              <Link
                href="#contact"
                className="px-7 py-3.5 border border-border text-foreground font-mono text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
              >
                Get in Touch
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-8">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                >
                  <s.icon className="w-4 h-4" />
                  {s.label} ↗
                </Link>
              ))}
            </div>
          </div>

          {/* Production metrics readout — the signature element */}
          <div ref={metricsRef} className="will-change-transform">
          <div {...reveal(600)}>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground border-b border-border pb-2 mb-1">
              production metrics
            </p>
            <dl>
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-3 group"
                >
                  <dt className="text-xs text-muted-foreground leading-snug max-w-[16rem] group-hover:text-foreground transition-colors">
                    {m.label}
                  </dt>
                  <dd className="font-display text-3xl sm:text-4xl text-primary font-medium order-first">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
