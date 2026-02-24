import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const ORBIT_MAIN_URL = "https://orbitkit.fun"

export function OnboardingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to Onboarding
        </Link>
        <a
          href={ORBIT_MAIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          Open Orbit
        </a>
      </div>
    </header>
  )
}
