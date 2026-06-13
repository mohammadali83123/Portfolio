"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const Robot3DScene = dynamic(() => import("./robot3d"), { ssr: false })

export function Mascot() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (desktop && !reducedMotion) setShow(true)
  }, [])

  if (!show) return null
  return <Robot3DScene />
}
