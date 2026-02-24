"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, ExternalLink, Lightbulb, Play, Star } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { DotPattern } from "@/components/dot-pattern"
import { PageTransition } from "@/components/page-transition"

const STELLAR_LEARN = "https://developers.stellar.org/docs/learn"
const FREIGHTER = "https://www.freighter.app"
const XLM_FAUCET = "https://laboratory.stellar.org/#account-creator"

const FREIGHTER_LOGO = "/brand/partners/image.png"

const SHINY_CLASS =
  "rounded-xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-white/20 hover:bg-white/10"

const WALLET_CARDS: Array<
  | { title: string; description: string; href: string; tags: string[]; logo: string; logoClassName?: string }
  | { title: string; description: string; href: string; tags: string[] }
> = [
  { title: "Freighter", description: "Browser extension wallet. Secure and easy to use.", href: FREIGHTER, tags: ["WALLET", "BROWSER", "OFFICIAL"], logo: FREIGHTER_LOGO, logoClassName: "rounded-[1.25rem] overflow-hidden object-cover" },
  { title: "Stellar Laboratory", description: "Create a testnet account and get free test XLM.", href: XLM_FAUCET, tags: ["TESTNET", "LEARN"] },
]

const STEPS = [
  {
    step: 1,
    title: "Choose a wallet",
    description: "A wallet holds your XLM and lets you sign transactions. Freighter is a popular browser extension on Stellar.",
    links: [{ name: "Freighter", href: FREIGHTER, desc: "Browser extension" }],
  },
  {
    step: 2,
    title: "Get XLM",
    description: "You need a little XLM for transaction fees. Use the lab faucet for testnet or an exchange for mainnet.",
    links: [{ name: "Account creator (testnet)", href: XLM_FAUCET, desc: "Get test XLM" }],
  },
  {
    step: 3,
    title: "Explore DeFi on Orbit",
    description: "Swap tokens, supply or borrow, and try real Stellar apps — all from Orbit.",
    links: [{ name: "Orbit — Swap & Protocols", href: "/swap", desc: "Try it live", internal: true }],
  },
]

function StepBadge({ step }: { step: number }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-600 bg-zinc-800 text-base font-bold text-white">
      {step}
    </span>
  )
}

function TipsCard({ title, tips }: { title: string; tips: string[] }) {
  return (
    <div className={`rounded-2xl p-6 ${SHINY_CLASS}`}>
      <h3 className="flex items-center gap-2 text-base font-semibold text-white">
        <Lightbulb className="h-5 w-5 text-zinc-500" />
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {tips.map((tip) => (
          <li key={tip} className="flex items-start gap-2 text-sm text-zinc-400">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />
            {tip}
          </li>
        ))}
      </ul>
    </div>
  )
}

function WalletLogoCard({ title, href, logoUrl, logoClassName }: { title: string; href: string; logoUrl: string; logoClassName?: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        className={`flex flex-col items-center justify-center rounded-2xl p-6 ${SHINY_CLASS}`}
      >
        <span className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</span>
      </a>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      className={`flex flex-col items-center justify-center rounded-2xl p-8 ${SHINY_CLASS}`}
    >
      <span className={`block h-16 w-16 sm:h-20 sm:w-20 ${logoClassName ?? ""}`}>
        <Image
          src={logoUrl}
          alt={title}
          width={80}
          height={80}
          className={`h-full w-full object-contain ${logoClassName ?? ""}`}
          onError={() => setFailed(true)}
          unoptimized
        />
      </span>
    </a>
  )
}

function ResourceCard({ title, description, href, tags }: { title: string; description: string; href: string; tags: string[] }) {
  const tagClass = "bg-zinc-800 text-zinc-300"
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col rounded-2xl p-6 ${SHINY_CLASS}`}
    >
      <Star className="h-4 w-4 text-zinc-500" aria-hidden />
      <h3 className="mt-2 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>{title}</h3>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagClass}`}>
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm text-zinc-400">{description}</p>
    </a>
  )
}

export default function OnboardingBeginnersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <PageTransition>
        <main>
          <section className="relative overflow-hidden border-b border-zinc-800/50">
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-screen" aria-hidden>
              <DotPattern fixed={false} baseColor="#52525b" glowColor="#71717a" gap={22} dotSize={2.5} proximity={140} waveSpeed={0.4} baseOpacityMin={0.28} baseOpacityMax={0.48} />
            </div>
            <div className="relative z-10 mx-auto max-w-3xl px-4 pt-24 pb-16 text-center sm:pt-28 sm:pb-20">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                New to Crypto
              </h1>
              <p className="mt-3 text-lg text-zinc-400">A short guide to get you from zero to using Stellar and Orbit.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={FREIGHTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white ${SHINY_CLASS}`}
                >
                  <ExternalLink className="h-4 w-4" />
                  Download Freighter
                </a>
                <a
                  href={STELLAR_LEARN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white ${SHINY_CLASS}`}
                >
                  <Play className="h-4 w-4 text-zinc-400" />
                  Watch tutorial
                </a>
              </div>
            </div>
          </section>

          <section className="relative border-b border-zinc-800/50 px-4 py-12">
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-screen bg-zinc-950/50" aria-hidden />
            <div className="relative z-10 mx-auto max-w-4xl">
              <TipsCard
                title="Important tips"
                tips={[
                  "Write down your recovery phrase (12–24 words) on paper and keep it safe.",
                  "Never share your recovery phrase with anyone — not even support.",
                  "Start with small amounts to learn how it works.",
                ]}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {WALLET_CARDS.map((c) =>
                  "logo" in c && c.logo ? (
                    <WalletLogoCard key={c.title} title={c.title} href={c.href} logoUrl={c.logo} logoClassName={"logoClassName" in c ? c.logoClassName : undefined} />
                  ) : (
                    <ResourceCard key={c.title} title={c.title} description={c.description} href={c.href} tags={c.tags} />
                  )
                )}
              </div>
            </div>
          </section>

          <section className="px-4 py-12 sm:py-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Your checklist
              </h2>
              <ol className="mt-8 space-y-10">
                {STEPS.map(({ step, title, description, links }) => (
                  <li key={step} className="flex gap-6">
                    <StepBadge step={step} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                      <p className="mt-2 text-zinc-400">{description}</p>
                      <ul className="mt-4 space-y-2">
                        {links.map((link: { name: string; href: string; desc: string; internal?: boolean }) => (
                          <li key={link.name}>
                            {link.internal ? (
                              <Link
                                href={link.href}
                                className={`flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm text-white ${SHINY_CLASS}`}
                              >
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-400" />
                                <span className="font-medium">{link.name}</span>
                                <span className="text-zinc-500">— {link.desc}</span>
                                <ArrowRight className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                              </Link>
                            ) : (
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm text-white ${SHINY_CLASS}`}
                              >
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-zinc-400" />
                                <span className="font-medium">{link.name}</span>
                                <span className="text-zinc-500">— {link.desc}</span>
                                <ArrowRight className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="border-t border-zinc-800 px-4 py-10">
            <div className="mx-auto max-w-3xl">
              <div className={`rounded-2xl p-6 sm:p-8 ${SHINY_CLASS}`}>
                <h3 className="text-lg font-semibold text-white">Learn more</h3>
                <p className="mt-2 text-sm text-zinc-400">Stellar’s official docs cover concepts, wallets, and building on the network.</p>
                <a href={STELLAR_LEARN} target="_blank" rel="noopener noreferrer" className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white ${SHINY_CLASS}`}>
                  Stellar documentation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/onboarding#paths" className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-zinc-300 ${SHINY_CLASS}`}>
                  ← Back to paths
                </Link>
                <Link href="/" className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white ${SHINY_CLASS}`}>
                  Open Orbit
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
    </div>
  )
}
