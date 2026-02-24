"use client"

import { useNetworkProfile } from "@/contexts/network-profile-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Network } from "lucide-react"

export function NetworkSelector() {
  const { network, setNetwork } = useNetworkProfile()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="shrink-0 gap-2 rounded-full h-[46px] px-4 min-w-[100px] font-semibold text-sm text-white transition-all duration-200 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa] focus-visible:ring-offset-2 focus-visible:ring-offset-black inline-flex items-center justify-center border border-white/20 bg-gradient-to-b from-[#1a1a1a] to-black shadow-[0_0_0_1px_rgba(0,0,0,0.3)]"
        >
          <Network className="h-3.5 w-3.5 shrink-0" />
          <span className="capitalize truncate max-w-[72px]">{network}</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-zinc-950 border-zinc-800">
        <DropdownMenuItem
          onClick={() => setNetwork("mainnet")}
          className={`cursor-pointer ${network === "mainnet" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}`}
        >
          Mainnet
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setNetwork("testnet")}
          className={`cursor-pointer ${network === "testnet" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}`}
        >
          Testnet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
