"use client"

import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { isConnected, isAllowed, getAddress, getNetwork, requestAccess, signTransaction } from "@stellar/freighter-api"

export interface AccountData {
  publicKey: string
  displayName: string
  network: string
}

interface AccountContextType {
  account: AccountData | null
  isLoading: boolean
  connect: () => Promise<void>
  disconnect: () => void
  refreshAccount: () => Promise<void>
  signTransaction: (xdr: string, options?: { networkPassphrase?: string }) => Promise<string>
  publicKey: string | null
  isConnected: boolean
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

async function checkConnection(): Promise<AccountData | null> {
  if (typeof window === "undefined") return null

  const connected = await isConnected()
  if (!connected) return null

  const allowed = await isAllowed()
  if (!allowed) return null

  const addressResult = await getAddress()
  const address = addressResult.error ? null : (addressResult.address?.trim() || null)
  if (!address) return null

  const networkResult = await getNetwork()
  const networkName =
    typeof networkResult === "object" && networkResult.network
      ? networkResult.network
      : networkResult

  return {
    publicKey: address,
    displayName: `${address.slice(0, 4)}...${address.slice(-4)}`,
    network: networkName,
  }
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<AccountData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const refreshAccount = useCallback(async () => {
    try {
      const next = await checkConnection()
      setAccount(next)
    } catch (error) {
      console.error("Error checking wallet connection:", error)
      setAccount(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    checkConnection()
      .then((next) => {
        if (!cancelled) setAccount(next)
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Error checking wallet connection:", error)
          setAccount(null)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      checkConnection()
        .then((next) => {
          setAccount((prev) => {
            // Don’t restore account from poll when user has disconnected (prev === null)
            if (prev === null) return null
            
            // Check if network changed and notify user
            if (prev && next && prev.network !== next.network) {
              console.log(`Wallet network changed from ${prev.network} to ${next.network}`)
              // The network mismatch dialogs in components will handle this
            }
            
            return next
          })
        })
        .catch(() => {
          setAccount((prev) => (prev !== null ? null : prev))
        })
    }, 5000) // Check more frequently (5s instead of 30s) to catch network changes faster
    return () => clearInterval(interval)
  }, [])

  // Listen for Freighter extension events for faster network change detection
  useEffect(() => {
    const handleFreighterEvent = () => {
      console.log("Freighter event detected, refreshing account...")
      refreshAccount()
    }

    // Try to listen for Freighter extension events
    if (typeof window !== "undefined" && window.addEventListener) {
      window.addEventListener("freighter-network-changed", handleFreighterEvent)
      window.addEventListener("freighter-account-changed", handleFreighterEvent)
    }

    return () => {
      if (typeof window !== "undefined" && window.removeEventListener) {
        window.removeEventListener("freighter-network-changed", handleFreighterEvent)
        window.removeEventListener("freighter-account-changed", handleFreighterEvent)
      }
    }
  }, [refreshAccount])

  const connect = useCallback(async () => {
    setIsLoading(true)
    try {
      // Always request fresh permission on manual connection
      const accessResult = await requestAccess()
      if (accessResult.error) throw new Error(accessResult.error)

      const networkResult = await getNetwork()
      const networkName =
        typeof networkResult === "object" && networkResult.network
          ? networkResult.network
          : networkResult

      setAccount({
        publicKey: accessResult.address,
        displayName: `${accessResult.address.slice(0, 4)}...${accessResult.address.slice(-4)}`,
        network: networkName,
      })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    setIsLoading(false)
    setAccount(null)
  }, [])

  const handleSignTransaction = useCallback(async (xdr: string, options?: { networkPassphrase?: string }) => {
    if (!account) {
      throw new Error("No wallet connected")
    }

    const networkPassphrase = options?.networkPassphrase || "Public Global Stellar Network ; September 2015"

    try {
      const result = await signTransaction(xdr, {
        networkPassphrase,
        address: account.publicKey,
      })

      if (result.error) {
        const err = result.error
        const message =
          typeof err === "object" && err !== null && "message" in err && typeof (err as { message?: unknown }).message === "string"
            ? (err as { message: string }).message
            : typeof err === "string"
              ? err
              : "Transaction signing failed"
        throw new Error(message)
      }

      const signed = (result as { signedTxXdr?: string }).signedTxXdr ?? (result as { signedXDR?: string }).signedXDR
      if (!signed) {
        throw new Error("Wallet did not return a signed transaction")
      }
      return signed
    } catch (error) {
      console.error("Error signing transaction:", error)
      throw error
    }
  }, [account])

  const value: AccountContextType = {
    account,
    isLoading,
    connect,
    disconnect,
    refreshAccount,
    signTransaction: handleSignTransaction,
    publicKey: account?.publicKey || null,
    isConnected: !!account,
  }

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

export function useAccountContext() {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider")
  }
  return context
}
