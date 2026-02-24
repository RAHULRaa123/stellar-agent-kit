import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { ResourceCard } from "@/components/resource-card"

const ORBIT_URL = "https://orbitkit.fun"
const STELLAR_LEARN = "https://developers.stellar.org/docs/learn"
const FREIGHTER = "https://www.freighter.app"
const LOBSTR = "https://lobstr.co"
const XLM_FAUCET = "https://laboratory.stellar.org/#account-creator"

const STEPS = [
  {
    step: 1,
    title: "Choose a wallet",
    description:
      "A wallet holds your XLM and lets you sign transactions. Freighter (browser extension) and LOBSTR (mobile) are popular on Stellar.",
    links: [
          { name: "Freighter", href: FREIGHTER, desc: "Browser extension" },
          { name: "LOBSTR", href: LOBSTR, desc: "Mobile & web" },
        ],
  },
  {
    step: 2,
    title: "Get XLM",
    description:
      "You need a little XLM to pay for transaction fees. Use a Stellar laboratory faucet (testnet) or buy on an exchange and withdraw to your wallet.",
    links: [
          { name: "Account creator (testnet)", href: XLM_FAUCET, desc: "Get test XLM" },
        ],
  },
  {
    step: 3,
    title: "Explore DeFi on Orbit",
    description:
      "Swap tokens, supply or borrow on lending protocols, and try real Stellar apps — all from Orbit.",
    links: [
          { name: "Orbit — Swap & Protocols", href: ORBIT_URL, desc: "Try it live" },
        ],
  },
]

export default function BeginnersPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          New to Crypto
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          A short guide to get you from zero to using Stellar and Orbit.
        </p>
      </div>

      <ol className="space-y-10">
        {STEPS.map(({ step, title, description, links }) => (
          <li key={step} className="relative pl-8">
            <span className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-600 bg-zinc-900 text-sm font-semibold text-white">
              {step}
            </span>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-zinc-400">{description}</p>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white transition-colors hover:border-zinc-600 hover:bg-zinc-900"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="font-medium">{link.name}</span>
                    <span className="text-zinc-500">— {link.desc}</span>
                    <ArrowRight className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-white">Learn more</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Stellar’s official docs cover concepts, wallets, and building on the network.
        </p>
        <a
          href={STELLAR_LEARN}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white hover:underline"
        >
          Stellar documentation
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white"
        >
          ← Back to paths
        </Link>
        <a
          href={ORBIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
        >
          Open Orbit
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </main>
  )
}
