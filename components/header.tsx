"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "Experience", href: "#experience", index: "01" },
  { label: "Work", href: "#projects", index: "02" },
  { label: "Stack", href: "#stack", index: "03" },
  { label: "Contact", href: "#contact", index: "05" },
]

const RESUME_URL = "https://drive.google.com/file/d/1xFBJkDVEBfhSzSQ0NKPy59IMm2VttJEa/view?usp=sharing"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (isProfileModalOpen) {
        setIsProfileModalOpen(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isProfileModalOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isProfileModalOpen) {
        setIsProfileModalOpen(false)
      }
    }

    if (isProfileModalOpen) {
      document.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [isProfileModalOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-border"
          : "bg-transparent border-transparent",
      )}
    >
      <nav className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="relative w-8 h-8 overflow-hidden border border-border hover:border-primary transition-colors cursor-pointer"
            aria-label="View profile picture"
          >
            <Image src="/profile/profile.png" alt="Mohammad Ali" fill className="object-cover" sizes="32px" />
          </button>
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight hover:text-primary transition-colors"
          >
            M.Ali<span className="text-primary">—</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary">{item.index}.</span> {item.label}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
          <li>
            <Link
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-widest px-4 py-2.5 bg-primary text-primary-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              Resume ↗
            </Link>
          </li>
        </ul>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="px-6 py-5 space-y-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary">{item.index}.</span> {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-sm uppercase tracking-widest px-4 py-2.5 bg-primary text-primary-foreground"
            >
              Resume ↗
            </Link>
          </li>
        </ul>
      </div>

      {/* Profile Picture Modal */}
      {mounted &&
        isProfileModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-background/90 backdrop-blur-sm"
            onClick={() => setIsProfileModalOpen(false)}
          >
            <div className="relative max-w-lg max-h-[80vh] p-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center hover:bg-foreground transition-colors"
                aria-label="Close profile picture"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="relative overflow-hidden border border-border">
                <Image
                  src="/profile/profile.png"
                  alt="Mohammad Ali - Full Profile Picture"
                  width={500}
                  height={500}
                  className="object-cover w-full h-auto max-w-full"
                  priority
                  quality={95}
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  )
}
