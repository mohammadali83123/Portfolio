"use client"

import { useEffect } from "react"

/** Disables the browser context menu (right-click) across the site.
 *  Note: a deterrent only — it does not prevent viewing source or DevTools. */
export function NoContextMenu() {
  useEffect(() => {
    const handler = (e: MouseEvent) => e.preventDefault()
    document.addEventListener("contextmenu", handler)
    return () => document.removeEventListener("contextmenu", handler)
  }, [])

  return null
}
