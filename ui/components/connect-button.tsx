"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAccount } from "@/hooks/use-account"
import { useWallet } from "./wallet-provider"
import { Wallet, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface ConnectButtonProps {
  label?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
}

export function ConnectButton({ 
  label = "Connect Wallet", 
  variant = "default",
  size = "default" 
}: ConnectButtonProps) {
  const { connect, isLoading } = useAccount()
  const { isFreighterAvailable, isAllowed } = useWallet()
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    if (!isFreighterAvailable) {
      toast.error("Freighter wallet not found", {
        description: "Please install the Freighter wallet extension to continue.",
        action: {
          label: "Install Freighter",
          onClick: () => window.open("https://www.freighter.app/", "_blank"),
        },
      })
      return
    }

    try {
      setIsConnecting(true)
      await connect()
      toast.success("Wallet connected successfully!")
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)
      
      if (error.message?.includes("User declined access")) {
        toast.error("Connection cancelled", {
          description: "You declined the wallet connection request.",
        })
      } else {
        toast.error("Failed to connect wallet", {
          description: "Please try again or check your Freighter wallet.",
        })
      }
    } finally {
      setIsConnecting(false)
    }
  }

  // Always show "Connect Wallet" - handle installation check in the click handler
  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading || isConnecting}
      size={size}
      className="gap-2 px-[18px] py-[10px] rounded-full border border-[#5100fd] bg-[#5100fd]/50 text-white font-medium hover:scale-105 transition-transform duration-500 disabled:opacity-50 disabled:hover:scale-100"
    >
      <Wallet className="h-4 w-4" />
      {isConnecting ? "Connecting..." : label}
    </Button>
  )
}