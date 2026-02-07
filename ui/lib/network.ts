/**
 * Normalize wallet network string (e.g. from Freighter) to API format.
 * Freighter may return "TESTNET", "PUBLIC", "MAINNET", etc.
 */
export function normalizeNetwork(walletNetwork: string): "testnet" | "mainnet" {
  const n = walletNetwork?.toLowerCase().trim() ?? ""
  if (n === "testnet") return "testnet"
  return "mainnet"
}
