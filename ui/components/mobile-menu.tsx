"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button"
import { WalletData } from "./wallet-data"

const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/devkit", label: "DevKit" },
  { href: "/protocols", label: "Protocols" },
  { href: "/swap", label: "Swap" },
  { href: "/protocols-ui", label: "Try Protocols" },
  { href: "/chat", label: "Chat" },
  { href: "/pricing", label: "Pricing" },
]

export function MobileMenu() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-white hover:text-zinc-300 transition-colors" aria-label="Menu">
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-zinc-950 border-zinc-800 w-full max-w-xs">
        <div className="flex flex-col gap-1 pt-8">
          <div className="pb-4 mb-2 border-b border-zinc-800">
            <WalletData />
          </div>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`text-left py-3 px-3 text-base transition-colors duration-500 ease-out ${
              pathname === "/" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </Link>
          <span className="mt-2 mb-1 px-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
            Resources
          </span>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/")
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`text-left py-3 px-3 text-base transition-colors duration-500 ease-out ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {label}
              </Link>
            )
          })}
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <LiquidMetalButton
              href="https://github.com/stellar/stellar-agent-kit"
              label="Get started"
              onClick={() => setOpen(false)}
              fullWidth
              width={280}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
