"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <nav className="mx-auto max-w-6xl px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsProfileModalOpen(true)
            }}
            className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all duration-200 hover:scale-105 cursor-pointer"
            aria-label="View profile picture"
          >
            <Image
              src="/profile/profile.png"
              alt="Mohammad Ali"
              fill
              className="object-cover"
              sizes="32px"
            />
          </button>
          <Link href="/" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
            MA
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="https://drive.google.com/file/d/1Azd-6TJSUGc3A9NHCwgchrhcq-QCgDBp/view?usp=sharing"
              className="text-sm px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-colors"
            >
              Resume
            </Link>
          </li>
          <li>
            <ThemeToggle />
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
        <ul className="px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="https://drive.google.com/file/d/1Azd-6TJSUGc3A9NHCwgchrhcq-QCgDBp/view?usp=sharing"
              className="inline-block px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-colors"
            >
              Resume
            </Link>
          </li>
        </ul>
      </div>

      {/* Profile Picture Modal */}
      {isProfileModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsProfileModalOpen(false)}
        >
          <div className="relative max-w-lg max-h-[80vh] p-4">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute -top-2 -right-2 z-10 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close profile picture"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/profile/profile.png"
                alt="Mohammad Ali - Full Profile Picture"
                width={400}
                height={400}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
