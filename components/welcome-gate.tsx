"use client"

import { useEffect, useRef, useState } from "react"
import { recordVisitor } from "@/lib/record-visitor"

declare global {
  interface Window {
    __bootDone?: boolean
  }
}

function signalReady() {
  window.__bootDone = true
  window.dispatchEvent(new Event("boot-complete"))
}

export function WelcomeGate() {
  const [active, setActive] = useState<boolean | null>(null)
  const [leaving, setLeaving] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [clock, setClock] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState("0x0000")
  const inputRef = useRef<HTMLInputElement>(null)

  // Decide whether to show (once per tab session), and prep the session badge.
  useEffect(() => {
    const seen = sessionStorage.getItem("ma_welcome_seen")
    if (seen) {
      setActive(false)
      signalReady()
      return
    }
    setActive(true)
    document.body.style.overflow = "hidden"

    // Honest, on-brand session token (local to this visit) for the badge.
    const hex = Math.floor(Math.random() * 0xffff)
      .toString(16)
      .toUpperCase()
      .padStart(4, "0")
    setSessionId(`0x${hex}`)

    setTimeout(() => inputRef.current?.focus(), 350)

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  // Live Karachi clock for the footer readout
  useEffect(() => {
    if (!active) return
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Karachi",
        }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [active])

  // Escape always skips
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, name, email])

  const finish = (record: boolean) => {
    sessionStorage.setItem("ma_welcome_seen", "1")
    if (record) {
      const trimmed = name.trim()
      const mail = email.trim()
      if (trimmed || mail) {
        try {
          localStorage.setItem(
            "ma_visitor",
            JSON.stringify({ name: trimmed, email: mail, at: new Date().toISOString() }),
          )
          window.dispatchEvent(new CustomEvent("visitor-identified", { detail: { name: trimmed } }))
        } catch {
          /* storage may be blocked; ignore */
        }
        // Record to Supabase + Formspree (fire-and-forget, fails silently)
        recordVisitor({
          name: trimmed,
          email: mail,
          honeypot,
          referrer: typeof document !== "undefined" ? document.referrer : "",
        })
      }
    }
    setLeaving(true)
    document.body.style.overflow = "unset"
    signalReady()
    setTimeout(() => setActive(false), 500)
  }

  if (!active) return null

  const displayName = name.trim() || "VISITOR"

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome — identify yourself"
      className={`fixed inset-0 z-[10000] bg-background dot-grid flex items-center justify-center transition-opacity duration-500 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      
      <span className="absolute top-7 right-6 z-10 font-mono text-xs uppercase tracking-[0.25em] text-foreground">
        Mohammad Ali<span className="text-primary"></span>
      </span>

      {/* card */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          finish(true)
        }}
        className={`relative w-full max-w-md px-6 ${leaving ? "" : "animate-fade-in-up"}`}
        style={{ animationDuration: "0.6s" }}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2.5 justify-center mb-2">
          <span className="inline-block w-1.5 h-1.5 bg-primary animate-blink" />
          uplink established · visitor manifest
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-center mb-1">
          Welcome, traveler.
        </h2>
        <p className="font-mono text-xs text-muted-foreground text-center mb-8">
          identify yourself — or slip in unnoticed.
        </p>

        {/* access card — corner-bracket badge that mirrors your name live */}
        <div className="relative p-3 mb-6">
          <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary" />
          <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary" />
          <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-primary" />
          <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-primary" />
          <div className="border border-border bg-card">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                visitor pass
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {sessionId}
              </span>
            </div>
            <div className="px-4 py-6 min-h-[5.5rem] flex items-center justify-center">
              <span
                className={`font-display text-3xl sm:text-4xl italic tracking-tight text-center break-words ${
                  name.trim() ? "text-foreground" : "text-muted-foreground/50"
                }`}
              >
                {displayName}
              </span>
            </div>
          </div>
        </div>

        {/* inputs */}
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">name</span>
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            placeholder="who's visiting?"
            className="mt-1 w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
          />
        </label>
        <label className="block mt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            email <span className="text-muted-foreground/50">— optional</span>
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            maxLength={80}
            placeholder="so he can reach back"
            className="mt-1 w-full bg-transparent border border-border px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
          />
        </label>

        {/* Honeypot — hidden from humans, catches form-filling bots */}
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
        />

        {/* actions */}
        <div className="flex items-center gap-3 mt-7">
          <button
            type="submit"
            className="flex-1 px-7 py-3.5 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
          >
            Enter →
          </button>
          <button
            type="button"
            onClick={() => finish(false)}
            className="px-7 py-3.5 border border-border text-muted-foreground font-mono text-sm uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
          >
            Skip
          </button>
        </div>

      </form>

      {/* footer readout */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-2.5">
            <span className="inline-block w-1.5 h-1.5 bg-primary animate-blink" />
            all systems operational
          </span>
          <span className="hidden sm:block tabular-nums">{clock ? `khi ${clock}` : "khi --:--:--"}</span>
          <span className="hidden md:block">
            session {sessionId} · <span className="text-primary">visitor</span>
          </span>
        </div>
      </div>
    </div>
  )
}
