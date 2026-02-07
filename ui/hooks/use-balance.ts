"use client"

import { useState, useEffect } from "react"
import { useAccount } from "./use-account"
import { normalizeNetwork } from "@/lib/network"

interface BalanceEntry {
  code: string
  issuer: string | null
  balance: string
}

export function useBalance() {
  const { account } = useAccount()
  const [balances, setBalances] = useState<BalanceEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchBalances = async () => {
    if (!account?.publicKey) {
      setBalances([])
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicKey: account.publicKey,
          network: normalizeNetwork(account.network)
        })
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || 'Failed to fetch balances')
      }

      const balanceData = await response.json()
      setBalances(balanceData)
    } catch (err) {
      console.error("Error fetching balances:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch balances")
      setBalances([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBalances()
  }, [account?.publicKey])

  const getBalance = (assetCode: string, issuer?: string | null): string => {
    const balance = balances.find(b => 
      b.code === assetCode && 
      (issuer === undefined || b.issuer === issuer)
    )
    return balance ? parseFloat(balance.balance).toFixed(4) : "--"
  }

  return {
    balances,
    isLoading,
    error,
    getBalance,
    refetch: fetchBalances
  }
}