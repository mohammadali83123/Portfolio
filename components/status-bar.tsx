"use client"

import { useEffect, useState } from "react"

export function StatusBar() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Karachi",
        }),
      )
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[35] border-t border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="flex items-center gap-2.5">
          <span className="inline-block w-1.5 h-1.5 bg-primary animate-blink" />
          all systems operational
        </span>
        <span className="hidden sm:block tabular-nums">{time ? `khi ${time}` : "khi --:--:--"}</span>
        <span className="hidden md:block">
          m.ali — portfolio <span className="text-primary">v2.0</span>
        </span>
      </div>
    </div>
  )
}
