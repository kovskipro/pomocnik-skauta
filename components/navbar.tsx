"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import {
  NAVBAR_HEIGHT_PX,
  NAVBAR_SCROLL_OFFSET_PX,
  scrollToPosition,
} from "@/lib/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isMenuOpen) {
      return
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [isMenuOpen])

  const handleFunctionsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMenuOpen(false)

    if (pathname === '/') {
      // If on homepage, scroll to functions section with offset for navbar
      const functionsSection = document.getElementById('functions-section')
      if (functionsSection) {
        const elementPosition = functionsSection.offsetTop - NAVBAR_SCROLL_OFFSET_PX
        scrollToPosition(elementPosition)
      }
    } else {
      // If on other page, navigate to homepage with hash
      router.push('/#functions-section')
    }
  }



  const navLinks = [
    { href: "/", label: "Strona główna" },
    { href: "#", label: "Funkcje", onClick: handleFunctionsClick },
    { href: "/wkrotce", label: "Dla zastępowych" },
    { href: "/wkrotce", label: "Panel" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full bg-black">
        <nav
          className="max-w-6xl mx-auto px-4 flex items-center justify-between text-white"
          style={{ height: NAVBAR_HEIGHT_PX }}
        >
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
              <Image src="/croix-agse.png" alt="Logo Skautów Europy" width={28} height={28} className="h-7 w-7 select-none" draggable={false} />
              <span className="text-lg font-medium hidden sm:inline-block">Pomocnik Skauta</span>
            </Link>
          </div>

          {/* Center Links for Desktop */}
          <div className="hidden xl:flex flex-1 justify-center items-center gap-5 text-sm">
            {navLinks.map((link) => (
              link.onClick ? (
                <button
                  key={link.label}
                  onClick={link.onClick}
                  className="text-neutral-400 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </button>
              ) : (
                <Link key={link.label} href={link.href} className="text-neutral-400 hover:text-white transition-colors whitespace-nowrap">
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right Actions for Desktop */}
          <div className="hidden xl:flex items-center gap-4">
            <Link href="/wkrotce" className="text-sm text-neutral-400 hover:text-white transition-colors px-3 py-1.5 whitespace-nowrap">Zarejestruj się</Link>
            <Button asChild variant="default" className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 h-auto whitespace-nowrap">
              <Link href="/wkrotce">Zaloguj się</Link>
            </Button>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="xl:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-11 w-11 p-0 text-white hover:bg-white/10 rounded-xl"
              aria-label="Otwórz menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 bg-black z-40 border-t border-neutral-900 xl:hidden"
          style={{ top: NAVBAR_HEIGHT_PX }}
        >
          <nav className="h-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center gap-8">
            <div className="flex flex-col items-center gap-5">
              {navLinks.map((link) => (
                link.onClick ? (
                  <button
                    key={link.label}
                    onClick={link.onClick}
                    className="text-lg text-neutral-300 hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg text-neutral-300 hover:text-white transition-colors whitespace-nowrap"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>

            <div className="w-24 h-[1px] bg-neutral-800" />

            <div className="flex flex-col items-center gap-5">
              <Link href="/wkrotce" className="text-lg text-neutral-300 hover:text-white transition-colors whitespace-nowrap" onClick={() => setIsMenuOpen(false)}>
                Zarejestruj się
              </Link>
              <Button
                asChild
                variant="default"
                className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-6 py-2 h-auto whitespace-nowrap"
              >
                <Link href="/wkrotce" onClick={() => setIsMenuOpen(false)}>
                  Zaloguj się
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}