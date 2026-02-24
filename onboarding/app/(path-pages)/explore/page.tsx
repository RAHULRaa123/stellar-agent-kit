import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ResourceCard } from "@/components/resource-card"

const ORBIT_URL = "https://orbitkit.fun"
const ORBIT_SWAP = "https://orbitkit.fun/swap"
const ORBIT_PROTOCOLS = "https://orbitkit.fun/protocols#try"
const STELLAR_DEX = "https://developers.stellar.org/docs/defi/direct-dex"
const ALLBRIDGE = "https://allbridge.io"

export default function ExplorePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Explore the Stellar Ecosystem
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          Bridge assets, trade tokens, and use DeFi on Stellar. Orbit connects you to protocols and tools in one place.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">On Orbit</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <ResourceCard
            title="Swap"
            description="Swap tokens on Stellar DEX (Soroswap) with a simple interface."
            href={ORBIT_SWAP}
          />
          <ResourceCard
            title="Try Protocols"
            description="Supply, borrow, and interact with lending and other DeFi protocols."
            href={ORBIT_PROTOCOLS}
          />
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-semibold text-white">Bridge & move assets</h2>
        <p className="text-zinc-400">
          Bring assets from other chains to Stellar or move value across the network.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <ResourceCard
            title="Allbridge"
            description="Cross-chain bridge to and from Stellar."
            href={ALLBRIDGE}
          />
          <ResourceCard
            title="Stellar DEX"
            description="Learn how the built-in DEX and liquidity pools work."
            href={STELLAR_DEX}
          />
        </div>
      </section>

      <div className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-white">One place for Stellar DeFi</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Orbit gives you swap, lending, and protocol UIs so you don’t have to jump between multiple apps.
        </p>
        <a
          href={ORBIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
        >
          Open Orbit
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
        >
          ← Back to paths
        </Link>
      </div>
    </main>
  )
}
