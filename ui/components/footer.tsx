"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SITEMAP_LINKS = [
  { href: "/", label: "Home" },
  { href: "/docs", label: "Docs" },
  { href: "/devkit", label: "DevKit" },
  { href: "/protocols", label: "Protocols" },
  { href: "/swap", label: "Swap" },
  { href: "/pricing", label: "Pricing" },
]

const SOCIAL_LINKS = [
  { href: "https://github.com/stellar/stellar-agent-kit", label: "GitHub" },
  { href: "https://x.com/orbitdotfun", label: "Twitter" },
  { href: "https://www.instagram.com/stellarorg/", label: "Instagram" },
]

/** Orbit logo — static image (no animation) */
function FooterOrbitLogo() {
  return (
    <div className="mt-16 flex justify-center overflow-hidden">
      <Image
        src="/brand/orbit/orbit.png"
        alt="Orbit"
        width={112}
        height={112}
        className="h-24 w-auto object-contain md:h-32 lg:h-40 xl:h-44"
        style={{ maxHeight: "clamp(6rem, 14vw, 11rem)" }}
      />
    </div>
  )
}

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      // Optional: wire to newsletter API
      setEmail("")
    }
  }

  return (
    <footer className="relative z-20 w-full border-t border-zinc-800 bg-zinc-950 text-white">
      {/* Top section: newsletter + sitemap + social */}
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          {/* Newsletter */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Let&apos;s do great work together
            </h2>
            <p className="mt-2 text-zinc-400">Sign up for our updates</p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                type="email"
                placeholder="Your Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 flex-1 rounded-full border-zinc-700 bg-zinc-900/80 px-6 text-white placeholder:text-zinc-500 focus-visible:ring-[#a78bfa] sm:min-w-[260px]"
              />
              <Button
                type="submit"
                size="icon"
                className="h-12 w-12 shrink-0 rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
          </div>

          {/* Sitemap + Social */}
          <div className="flex gap-16">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Sitemap</h3>
              <ul className="mt-4 space-y-3">
                {SITEMAP_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-zinc-300 hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Social</h3>
              <ul className="mt-4 space-y-3">
                {SOCIAL_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-white transition-colors underline decoration-zinc-600 underline-offset-2 hover:decoration-zinc-400"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Large brand: Orbit animation (plays when in view) */}
        <FooterOrbitLogo />
      </div>

      {/* Bottom bar: copyright + privacy */}
      <div className="border-t border-zinc-800 px-6 py-6 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Orbit. All Rights Reserved.
          </p>
          <Link
            href="/privacy"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
