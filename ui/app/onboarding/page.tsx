"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Wallet,
  Globe,
  ArrowRight,
  Code2,
  Building2,
  ExternalLink,
  TrendingUp,
  LayoutGrid,
  Zap,
  Coins,
  Activity,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DotPattern } from "@/components/dot-pattern"
import { PageTransition } from "@/components/page-transition"
const NUMBERS_HEADLINE = "Let's build something great."
const NUMBERS_DESCRIPTION =
  "Stellar powers fast, low-cost payments and DeFi at scale. Join thousands of projects and developers building on a network designed for the real world."

const ORBIT_DISCORD_URL = "https://discord.gg/stellardev"
const ORBIT_X_URL = "https://x.com/StellarOrg"
const ORBIT_WEBSITE_URL = "https://orbitkit.fun"

// Standalone logo links with shiny/glass effect (no button look)
function JoinOrbitLogoLink({
  href,
  ariaLabel,
  children,
  external = true,
}: {
  href: string
  ariaLabel: string
  children: ReactNode
  external?: boolean
}) {
  const className =
    "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-white/20 hover:bg-white/10 sm:h-16 sm:w-16"
  const content = <>{children}</>
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className={className}>
        {content}
      </a>
    )
  }
  return (
    <Link href={href} aria-label={ariaLabel} className={className}>
      {content}
    </Link>
  )
}

const PATHS = [
  {
    id: "beginners",
    title: "New to Crypto",
    subtitle: "New to crypto (and Stellar)?",
    description:
      "Complete beginner's guide to crypto on Stellar — learn to set up your wallet, get XLM, and explore your first DeFi apps.",
    bullets: ["Set up wallet", "Get XLM tokens", "Explore Decentralized Finance"],
    cta: "Get Started",
    href: "/onboarding/beginners",
    icon: Wallet,
    percentage: 10,
  },
  {
    id: "explore",
    title: "Seasoned Web3 Users",
    subtitle: "Explore the Stellar Ecosystem",
    description:
      "Already familiar with crypto? Explore what makes Stellar unique and bridge your assets today.",
    bullets: ["Bridge assets", "Trade tokens", "Explore DeFi"],
    cta: "Explore Now",
    href: "/onboarding/explore",
    icon: Globe,
    percentage: 25,
  },
  {
    id: "developers",
    title: "Developers",
    subtitle: "Ready to Build?",
    description:
      "Access comprehensive documentation, DevKit tools, and community support for building on Stellar.",
    bullets: ["Technical docs", "Development tools", "Community support"],
    cta: "Start Building",
    href: "/onboarding/developers",
    icon: Code2,
    percentage: 50,
  },
  {
    id: "enterprise",
    title: "Businesses",
    subtitle: "Enterprise Solution?",
    description:
      "Discover how leading enterprises leverage Stellar for scalable blockchain solutions.",
    bullets: ["Enterprise partnerships", "Scalable solutions", "Professional support"],
    cta: "Learn More",
    href: "/onboarding/enterprise",
    icon: Building2,
    percentage: 75,
  },
]

// Stats with icons for the two-column layout (headline left, 2x2 grid right)
const STATS = [
  { value: "500+", label: "Projects", icon: LayoutGrid },
  { value: "< 5s", label: "Finality", icon: Zap },
  { value: "< $0.01", label: "Fees", icon: Coins },
  { value: "1,000+", label: "TPS", icon: Activity },
]

// Worldwide Adoption — company name + logo (Clearbit). Fallback to name if image fails.
const ADOPTION_PARTNERS: { name: string; domain: string }[] = [
  { name: "Stellar Development Foundation", domain: "stellar.org" },
  { name: "Circle", domain: "circle.com" },
  { name: "MoneyGram", domain: "moneygram.com" },
  { name: "Visa", domain: "visa.com" },
  { name: "IBM", domain: "ibm.com" },
  { name: "BlackRock", domain: "blackrock.com" },
  { name: "Franklin Templeton", domain: "franklintempleton.com" },
]
const CLEARBIT_LOGO = (domain: string) => `https://logo.clearbit.com/${domain}`

function AdoptionPartnerLogo({ name, domain }: { name: string; domain: string }) {
  const [failed, setFailed] = useState(false)
  const logoUrl = CLEARBIT_LOGO(domain)
  if (failed) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-5 py-3 text-sm font-medium text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200">
        {name}
      </div>
    )
  }
  return (
    <div className="flex h-20 w-36 min-w-36 items-center justify-center rounded-xl border border-zinc-800 bg-white/5 px-6 py-5 transition-colors hover:border-zinc-600 hover:bg-white/10 sm:h-24 sm:w-44 sm:min-w-44 sm:px-8 sm:py-6">
      <Image
        src={logoUrl}
        alt={name}
        width={160}
        height={64}
        className="h-12 w-auto max-w-[140px] object-contain object-center grayscale opacity-90 hover:opacity-100 sm:h-14 sm:max-w-[160px]"
        onError={() => setFailed(true)}
        unoptimized
      />
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <PageTransition>
        <main>
          {/* Hero — Stellar logo + Welcome + tagline */}
          <section className="relative overflow-hidden border-b border-zinc-800/50">
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-screen" aria-hidden>
              <DotPattern
                fixed={false}
                baseColor="#52525b"
                glowColor="#71717a"
                gap={22}
                dotSize={2.5}
                proximity={140}
                waveSpeed={0.4}
                baseOpacityMin={0.28}
                baseOpacityMax={0.48}
              />
            </div>
            <div className="relative z-10 mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
              <Image
                src="/stellar-logo.png"
                alt="Stellar"
                width={380}
                height={98}
                className="mx-auto h-20 w-auto sm:h-24 md:h-28 lg:h-32 xl:h-36 object-contain"
                priority
              />
              <h1
                className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Welcome to Stellar
              </h1>
              <p className="mt-4 text-lg text-zinc-400 sm:text-xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                The fast, scalable network for payments and DeFi. Choose your path to join the future of decentralized applications.
              </p>
            </div>
          </section>

          {/* Choose Your Path */}
          <section id="paths" className="relative scroll-mt-24 border-b border-zinc-800/50 px-4 py-20 sm:py-28">
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-screen bg-black/40" aria-hidden />
            <div className="relative z-10 mx-auto max-w-6xl">
              <div className="space-y-3 text-center">
                <h2
                  className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Choose Your Path
                </h2>
                <p className="mx-auto max-w-xl text-zinc-400">
                  Find the right resources for your Stellar journey
                </p>
              </div>
              <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PATHS.map((path) => {
                  const Icon = path.icon
                  const percentage = path.percentage ?? 10
                  const desc = path.description
                  const dashIdx = desc.indexOf("—")
                  const boldLead = dashIdx > 0 ? desc.slice(0, dashIdx).trim() : desc.slice(0, 50).trim()
                  const restDesc = dashIdx > 0 ? desc.slice(dashIdx + 1).trim() : desc.slice(boldLead.length).trim()
                  return (
                    <Link
                      key={path.id}
                      href={path.href}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-800/80 bg-black text-left transition-all duration-300 hover:border-zinc-600 hover:shadow-xl hover:shadow-black/20"
                    >
                      {/* Glass / shiny effect: dark gradient + soft highlight top-left */}
                      <div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background:
                            "linear-gradient(165deg, rgba(255,255,255,0.07) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.4) 100%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
                          boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.04)",
                        }}
                        aria-hidden
                      />
                      <div className="relative z-10 flex flex-1 flex-col p-6">
                        {/* Top tag */}
                        <div className="mb-4 flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                            <Icon className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                          </span>
                          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                            {path.subtitle}
                          </span>
                        </div>
                        {/* Large percentage + arrow */}
                        <div className="mb-4 flex items-baseline gap-2">
                          <span className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            {percentage}%
                          </span>
                          <TrendingUp className="h-5 w-5 text-zinc-500 group-hover:text-zinc-300 transition-colors" aria-hidden />
                        </div>
                        {/* Description: bold lead + rest */}
                        <p className="flex-1 text-sm leading-relaxed text-zinc-400">
                          <span className="font-semibold text-white">{boldLead}</span>
                          {restDesc && (
                            <>
                              {" "}
                              {restDesc}
                            </>
                          )}
                        </p>
                        {/* CTA */}
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white group-hover:underline">
                          {path.cta}
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Stellar by the Numbers — two columns: big headline + paragraph left, 2x2 stats right */}
          <section id="numbers" className="relative scroll-mt-24 border-b border-zinc-800/50 px-4 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-8 sm:p-10 lg:p-12">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
                  {/* Left: big headline (home page font) + paragraph */}
              <div className="space-y-4">
                <h2
                  className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {NUMBERS_HEADLINE}
                </h2>
                    <p
                      className="max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {NUMBERS_DESCRIPTION}
                    </p>
                  </div>
                  {/* Right: 2x2 stats — icon, value, label */}
                  <div className="grid grid-cols-2 gap-8 sm:gap-10">
                    {STATS.map((stat) => {
                      const Icon = stat.icon
                      return (
                        <div key={stat.label} className="flex flex-col gap-2">
                          <span className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500">
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <div
                            className="text-2xl font-bold tracking-tight text-white sm:text-3xl"
                            style={{ fontFamily: "var(--font-space-grotesk)" }}
                          >
                            {stat.value}
                          </div>
                          <div className="text-sm font-medium text-zinc-400">{stat.label}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Worldwide Adoption */}
          <section className="border-b border-zinc-800/50 px-4 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="space-y-3 text-center">
                <h2
                  className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Worldwide Adoption
                </h2>
                <p className="mx-auto max-w-xl text-zinc-400">
                  Some of the many global enterprises and financial institutions using Stellar
                </p>
              </div>
              <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                {ADOPTION_PARTNERS.map((partner) => (
                  <AdoptionPartnerLogo
                    key={partner.domain}
                    name={partner.name}
                    domain={partner.domain}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Join Orbit */}
          <section id="join" className="relative scroll-mt-24 px-4 py-20 sm:py-28">
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-screen bg-zinc-950/50" aria-hidden />
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <div className="space-y-4">
                <h2
                  className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Join Orbit
                </h2>
                <p className="text-zinc-400">
                  Connect with the global Stellar community. Orbit is building the future of decentralized applications together.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
                <JoinOrbitLogoLink href={ORBIT_DISCORD_URL} ariaLabel="Join Discord" external>
                  <svg className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </JoinOrbitLogoLink>
                <JoinOrbitLogoLink href={ORBIT_X_URL} ariaLabel="Follow on X" external>
                  <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </JoinOrbitLogoLink>
                <JoinOrbitLogoLink href={ORBIT_WEBSITE_URL} ariaLabel="Orbit website (orbitkit.fun)" external>
                  <ExternalLink className="h-6 w-6 sm:h-7 sm:w-7 text-zinc-300" aria-hidden />
                </JoinOrbitLogoLink>
              </div>
              <footer className="mt-14 border-t border-zinc-800 pt-10">
                <p className="text-sm text-zinc-500">
                  © Orbit. All rights reserved.
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                  <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
                    Privacy Policy
                  </Link>
                  <span aria-hidden>•</span>
                  <Link href="/docs" className="hover:text-zinc-300 transition-colors">
                    FAQ
                  </Link>
                  <span aria-hidden>•</span>
                  <Link href="/docs" className="hover:text-zinc-300 transition-colors">
                    Disclaimer
                  </Link>
                </div>
              </footer>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </div>
  )
}
