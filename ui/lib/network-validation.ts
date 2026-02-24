/**
 * Network validation utilities
 */

export type NetworkType = "mainnet" | "testnet"

/**
 * Normalize network name from Freighter to our standard format
 */
export function normalizeNetworkName(network: string): NetworkType {
  const normalized = network.toLowerCase()
  if (normalized.includes("testnet") || normalized.includes("test")) {
    return "testnet"
  }
  return "mainnet"
}

/**
 * Check if wallet network matches app network
 */
export function isNetworkMismatch(walletNetwork: string, appNetwork: string): boolean {
  const normalizedWallet = normalizeNetworkName(walletNetwork)
  const normalizedApp = normalizeNetworkName(appNetwork)
  return normalizedWallet !== normalizedApp
}

/**
 * Get user-friendly network name
 */
export function getNetworkDisplayName(network: string): string {
  const normalized = normalizeNetworkName(network)
  return normalized === "testnet" ? "Testnet" : "Mainnet"
}

/**
 * Get network mismatch message
 */
export function getNetworkMismatchMessage(walletNetwork: string, appNetwork: string): string {
  const walletDisplay = getNetworkDisplayName(walletNetwork)
  const appDisplay = getNetworkDisplayName(appNetwork)
  
  return `Your wallet is connected to ${walletDisplay}, but the app is set to ${appDisplay}. Please switch your wallet to ${appDisplay} or change the app network.`
}