import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Mock bridge information
    // In a real implementation, you would fetch from Allbridge Core SDK
    const bridgeInfo = {
      chains: [
        { id: "stellar", name: "Stellar", symbol: "XLM" },
        { id: "ethereum", name: "Ethereum", symbol: "ETH" },
        { id: "bsc", name: "BNB Chain", symbol: "BNB" },
        { id: "polygon", name: "Polygon", symbol: "MATIC" },
        { id: "avalanche", name: "Avalanche", symbol: "AVAX" },
      ],
      tokens: [
        { symbol: "USDT", name: "Tether USD", chains: ["stellar", "ethereum", "bsc", "polygon"] },
        { symbol: "USDC", name: "USD Coin", chains: ["stellar", "ethereum", "bsc", "polygon"] },
        { symbol: "BTC", name: "Bitcoin", chains: ["stellar", "ethereum"] },
      ],
      fees: {
        stellar: "0.1%",
        ethereum: "0.2%",
        bsc: "0.15%",
        polygon: "0.15%",
        avalanche: "0.2%"
      }
    }

    return NextResponse.json(bridgeInfo)
  } catch (error) {
    console.error("Bridge info API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch bridge information" },
      { status: 500 }
    )
  }
}