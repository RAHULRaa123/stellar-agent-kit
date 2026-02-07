"use client"

import { useState, useEffect } from "react"
import { isConnected, isAllowed, getAddress, getNetwork, requestAccess } from "@stellar/freighter-api"

export interface AccountData {
  publicKey: string
  displayName: string
  network: string
}

export function useAccount() {
  const [account, setAccount] = useState<AccountData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check if we're in a browser environment
        if (typeof window === 'undefined') {
          setAccount(null)
          setIsLoading(false)
          return
        }

        // Check if Freighter API is available using the proper API method
        const connected = await isConnected()
        
        if (connected) {
          // Check if user has granted permission to this app
          const allowed = await isAllowed()
          
          if (allowed) {
            const addressResult = await getAddress()
            
            if (addressResult.error) {
              console.error("Error getting address:", addressResult.error)
              setAccount(null)
            } else {
              const networkResult = await getNetwork()
              const networkName = typeof networkResult === 'object' && networkResult.network 
                ? networkResult.network 
                : networkResult
              
              const newAccount = {
                publicKey: addressResult.address,
                displayName: `${addressResult.address.slice(0, 4)}...${addressResult.address.slice(-4)}`,
                network: networkName,
              }
              
              // Only update if account data has actually changed
              setAccount(prevAccount => {
                if (!prevAccount || 
                    prevAccount.publicKey !== newAccount.publicKey || 
                    prevAccount.network !== newAccount.network) {
                  console.log("Connected to wallet:", addressResult.address, "Network:", networkName)
                  return newAccount
                }
                return prevAccount
              })
            }
          } else {
            // User hasn't granted permission yet
            setAccount(null)
          }
        } else {
          // Freighter not connected/available
          setAccount(null)
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error)
        setAccount(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkConnection()

    // Freighter doesn't have a built-in event listener, so we'll poll less frequently
    const interval = setInterval(checkConnection, 30000) // Check every 30 seconds

    return () => {
      clearInterval(interval)
    }
  }, []) // Empty dependency array to prevent infinite loops

  const connect = async () => {
    try {
      setIsLoading(true)
      const accessResult = await requestAccess()
      
      if (accessResult.error) {
        throw new Error(accessResult.error)
      }
      
      const networkResult = await getNetwork()
      const networkName = typeof networkResult === 'object' && networkResult.network 
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
  }

  const disconnect = () => {
    setAccount(null)
  }

  return {
    account,
    isLoading,
    connect,
    disconnect,
  }
}