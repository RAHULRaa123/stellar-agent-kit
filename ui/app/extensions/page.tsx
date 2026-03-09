"use client"

import Image from "next/image"
import { useState } from "react"
import { Github, Copy, Check } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { DotPattern } from "@/components/dot-pattern"
import { toast } from "sonner"

type Extension = {
  name: string
  logo: string
  description: string
  command: string
  github: string
  official?: boolean
}

const REPO = "https://github.com/stellar/stellar-agent-kit"

const extensions: Extension[] = [
  {
    name: "SoroSwap",
    logo: "/brand/logos/soroswap.svg",
    description:
      "Integrate token swapping with deep liquidity on Stellar's native DEX directly into your dapp.",
    command: "npx create-stellar-devkit-app --template soroswap",
    github: `${REPO}/blob/main/packages/stellar-agent-kit/src/dex/soroSwap.ts`,
    official: true,
  },
  {
    name: "Blend",
    logo: "/brand/logos/blend.svg",
    description:
      "Add lending and borrowing to your dapp. Let users supply assets to earn yield or borrow against collateral on Stellar.",
    command: "npx create-stellar-devkit-app --template blend",
    github: `${REPO}/blob/main/packages/stellar-agent-kit/src/lending/blend.ts`,
    official: true,
  },
  {
    name: "Allbridge",
    logo: "/brand/logos/allbridge.svg",
    description:
      "Enable cross-chain bridging. Connect Stellar to Ethereum, Solana, and other major blockchains in your dapp.",
    command: "npx create-stellar-devkit-app --template allbridge",
    github: `${REPO}/tree/main/ui/app/api/bridge`,
    official: true,
  },
  {
    name: "FxDAO",
    logo: "/brand/logos/FxDAO.svg",
    description:
      "Integrate decentralized stablecoin minting. Let users mint stablecoins backed by Stellar assets.",
    command: "npx create-stellar-devkit-app --template fxdao",
    github: `${REPO}/blob/main/packages/stellar-agent-kit/src/config/protocols.ts`,
    official: true,
  },
  {
    name: "Reflector Oracle",
    logo: "/brand/logos/relflector.svg",
    description:
      "Plug in on-chain price feeds and real-world data from Reflector's oracle network into your Soroban contracts.",
    command: "npx create-stellar-devkit-app --template reflector",
    github: `${REPO}/blob/main/packages/stellar-agent-kit/src/oracle/reflector.ts`,
    official: true,
  },
  {
    name: "x402 API Gate",
    logo: "/stellar-logo.png",
    description:
      "Monetize your APIs with crypto micropayments. Gate any endpoint behind a pay-per-call x402 payment wall on Stellar.",
    command: "npx create-stellar-devkit-app --template x402-api",
    github: `${REPO}/tree/main/packages/x402-stellar-sdk/src`,
    official: true,
  },
  {
    name: "Stellar Agent Kit",
    logo: "/stellar-logo.png",
    description:
      "Unified TypeScript SDK for Stellar. Swap, send, lend, bridge, and interact with the entire Stellar DeFi ecosystem.",
    command: "npx create-stellar-devkit-app",
    github: `${REPO}/blob/main/packages/stellar-agent-kit/src/agent.ts`,
    official: true,
  },
  {
    name: "DevKit MCP",
    logo: "/stellar-logo.png",
    description:
      "Model Context Protocol server for Stellar DevKit. Use Stellar tools natively inside Cursor, Claude, and other AI assistants.",
    command: "npx create-stellar-devkit-app --template mcp",
    github: `${REPO}/blob/main/packages/stellar-devkit-mcp/src/index.ts`,
    official: true,
  },
]

function CopyCommandPill({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      toast.success("Copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy")
    }
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        copy()
      }}
      className="mt-4 w-full flex items-center justify-between gap-3 rounded-lg border border-zinc-700/60 bg-zinc-900/60 px-4 py-2.5 text-sm font-mono text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800/60 group"
      style={{ fontFamily: "var(--font-geist-mono)" }}
    >
      <span className="whitespace-nowrap overflow-x-auto">{command}</span>
      {copied
        ? <Check className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
        : <Copy className="h-3.5 w-3.5 shrink-0 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
      }
    </button>
  )
}

function ExtensionCard({ ext }: { ext: Extension }) {
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <div className="flex flex-col p-7 bg-zinc-950 transition-colors duration-200 hover:bg-zinc-900/60">
      {/* Name */}
      <h3
        className="text-base font-semibold text-white mb-3"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {ext.name}
      </h3>

      {/* Icon row — logo left, badge right */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {/* Logo */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center">
            {!logoFailed ? (
              <Image
                src={ext.logo}
                alt={ext.name}
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                unoptimized={ext.logo.startsWith("http")}
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-xs font-bold text-zinc-400">
                {ext.name.slice(0, 2)}
              </span>
            )}
          </div>
          {/* GitHub link */}
          <a
            href={ext.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label={`${ext.name} on GitHub`}
          >
            <Github className="h-4 w-4" />
          </a>
        </div>

        {/* Badge */}
        {ext.official && (
          <span className="inline-flex items-center rounded-full border border-zinc-700/60 bg-zinc-800/60 px-2.5 py-0.5 text-[10px] font-medium text-zinc-400 uppercase tracking-wide">
            Official
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-zinc-400 leading-relaxed flex-1">
        {ext.description}
      </p>

      {/* Install command pill */}
      <CopyCommandPill command={ext.command} />
    </div>
  )
}

export default function ExtensionsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <PageTransition>
        <main>
          {/* Header */}
          <section className="relative overflow-hidden border-b border-zinc-800/50">
            <div className="absolute inset-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none" aria-hidden>
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
            <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 pt-32 pb-16 sm:pt-36 sm:pb-20 text-center">
              <h1
                className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Ecosystem Extensions
              </h1>
              <p className="mt-4 text-lg text-zinc-400 max-w-xl mx-auto">
                Explore integrations and tools that work seamlessly with our devkit.
                <br className="hidden sm:block" />
                To install, copy and run the command provided for each extension.
              </p>
            </div>
          </section>

          {/* Grid */}
          <section className="mx-auto max-w-5xl px-6 lg:px-12 py-16 sm:py-20">
            <div className="grid grid-cols-1 gap-px bg-zinc-800/60 rounded-2xl overflow-hidden border border-zinc-800/60 sm:grid-cols-2">
              {extensions.map((ext) => (
                <ExtensionCard key={ext.name} ext={ext} />
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </PageTransition>
    </div>
  )
}
