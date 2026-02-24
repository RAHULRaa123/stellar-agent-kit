import Link from "next/link"
import { ArrowRight, Building2, Scale, Headphones } from "lucide-react"
import { ResourceCard } from "@/components/resource-card"

const ORBIT_URL = "https://orbitkit.fun"
const STELLAR_ENTERPRISE = "https://www.stellar.org/enterprise"
const STELLAR_USE_CASES = "https://www.stellar.org/use-cases"
const STELLAR_DOCS = "https://developers.stellar.org"

export default function EnterprisePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Enterprise Solutions
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          Stellar is built for fast, low-cost payments and compliant infrastructure. See how enterprises use the network and how Orbit’s DevKit can support your stack.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Why Stellar for business</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <Scale className="h-6 w-6 shrink-0 text-zinc-500" />
            <div>
              <h3 className="font-medium text-white">Scalable & low cost</h3>
              <p className="mt-1 text-sm text-zinc-400">
                High throughput and sub-cent fees for payments and settlements.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <Building2 className="h-6 w-6 shrink-0 text-zinc-500" />
            <div>
              <h3 className="font-medium text-white">Proven adoption</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Used by MoneyGram, Visa, and other institutions worldwide.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
            <Headphones className="h-6 w-6 shrink-0 text-zinc-500" />
            <div>
              <h3 className="font-medium text-white">Support & partnerships</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Stellar Development Foundation and ecosystem partners for enterprise needs.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="text-xl font-semibold text-white">Resources</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <ResourceCard
            title="Stellar for Enterprise"
            description="Official overview of Stellar for businesses and institutions."
            href={STELLAR_ENTERPRISE}
          />
          <ResourceCard
            title="Use cases"
            description="Payments, remittance, and asset issuance on Stellar."
            href={STELLAR_USE_CASES}
          />
          <ResourceCard
            title="Developer documentation"
            description="Technical docs for integrating with Stellar."
            href={STELLAR_DOCS}
          />
          <ResourceCard
            title="Orbit DevKit"
            description="SDK, APIs, and tools to build on Stellar — swap, lending, payments."
            href={`${ORBIT_URL}/devkit`}
          />
        </div>
      </section>

      <div className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 sm:p-8">
        <h3 className="text-lg font-semibold text-white">Build with Orbit</h3>
        <p className="mt-2 text-sm text-zinc-400">
          Orbit provides a unified SDK and APIs for Stellar DeFi. Integrate swaps, lending, and payments into your product.
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
