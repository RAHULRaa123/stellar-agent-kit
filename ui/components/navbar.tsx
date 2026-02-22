"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { GlassSurface } from "./glass-surface"
import { MobileMenu } from "./mobile-menu"
import { WalletData } from "./wallet-data"

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/docs", label: "Docs" },
  { href: "/devkit", label: "DevKit" },
  { href: "/protocols", label: "Protocols" },
  { href: "/swap", label: "Swap" },
  { href: "/protocols-ui", label: "Try Protocols" },
  { href: "/chat", label: "Chat" },
  { href: "/pricing", label: "Pricing" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const last = lastScrollYRef.current

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < last || currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > last && currentScrollY > 100) {
        setIsVisible(false)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-5xl transition-all duration-700 ease-in-out ${
        isVisible ? "top-6 opacity-100" : "-top-24 opacity-0"
      }`}
    >
      <GlassSurface
        width="100%"
        height={64}
        borderRadius={9999}
        backgroundOpacity={0.08}
        saturation={1.2}
        forceDark
        simpleGlass
        className="px-6 sm:px-8 py-4 flex items-center justify-between sm:justify-center min-w-0 w-full shadow-lg shadow-black/20"
        contentClassName="p-0 w-full flex items-center justify-between sm:justify-center gap-4 sm:gap-6 min-w-0"
      >
        {/* Centered on desktop: Logo + Nav + Wallet */}
        <div className="hidden sm:flex items-center justify-center gap-6 flex-wrap min-w-0 flex-1">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-white hover:text-zinc-200 transition-colors duration-300 shrink-0"
          >
            <Image src="/brand/orbit/orbit.png" alt="Orbit" width={28} height={28} className="shrink-0" />
            Orbit
          </Link>
          <span className="hidden md:block w-px h-5 bg-zinc-700 shrink-0" aria-hidden />
          <nav className="flex items-center gap-0.5" aria-label="Main">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href + "/"))
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors duration-300 ${
                    isActive
                      ? "text-white font-medium"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
          <span className="hidden md:block w-px h-5 bg-zinc-700 shrink-0" aria-hidden />
          <div className="shrink-0">
            <WalletData />
          </div>
        </div>

        {/* Mobile: logo left, menu right */}
        <div className="flex sm:hidden items-center w-full justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-white hover:text-zinc-200 transition-colors duration-300"
          >
            <Image src="/brand/orbit/orbit.png" alt="Orbit" width={24} height={24} className="shrink-0" />
            Orbit
          </Link>
          <MobileMenu />
        </div>
      </GlassSurface>
    </nav>
  )
}
