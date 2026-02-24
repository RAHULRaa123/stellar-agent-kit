"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react"

const STORAGE_KEY = "orbit-network-profile"

export type NetworkProfile = "mainnet" | "testnet"

interface NetworkProfileContextType {
  network: NetworkProfile
  setNetwork: (network: NetworkProfile) => void
  isTestnet: boolean
}

const NetworkProfileContext = createContext<NetworkProfileContextType | undefined>(undefined)

function readStored(): NetworkProfile {
  if (typeof window === "undefined") return "mainnet"
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === "testnet" || v === "mainnet") return v
  } catch {
    // ignore
  }
  return "mainnet"
}

export function NetworkProfileProvider({ children }: { children: React.ReactNode }) {
  const [network, setNetworkState] = useState<NetworkProfile>("mainnet")

  useEffect(() => {
    setNetworkState(readStored())
  }, [])

  const setNetwork = useCallback((next: NetworkProfile) => {
    setNetworkState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const value: NetworkProfileContextType = {
    network,
    setNetwork,
    isTestnet: network === "testnet",
  }

  return (
    <NetworkProfileContext.Provider value={value}>
      {children}
    </NetworkProfileContext.Provider>
  )
}

export function useNetworkProfile(): NetworkProfileContextType {
  const ctx = useContext(NetworkProfileContext)
  if (ctx === undefined) {
    throw new Error("useNetworkProfile must be used within NetworkProfileProvider")
  }
  return ctx
}
