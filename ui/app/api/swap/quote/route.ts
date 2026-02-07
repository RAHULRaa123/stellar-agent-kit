import { NextRequest, NextResponse } from 'next/server'
import { SoroSwapClient } from '@/lib/agent-kit/defi/soroSwapClient'
import { getNetworkConfig } from '@/lib/agent-kit/config/networks'

function normalizeNetwork(name: string): "testnet" | "mainnet" {
  const n = name?.toLowerCase().trim() ?? ""
  return n === "testnet" ? "testnet" : "mainnet"
}

export async function POST(request: NextRequest) {
  try {
    const { fromAsset, toAsset, amount, network } = await request.json()

    if (!fromAsset || !toAsset || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters: fromAsset, toAsset, amount' },
        { status: 400 }
      )
    }

    const networkName = normalizeNetwork(network ?? "mainnet")
    const networkConfig = getNetworkConfig(networkName)
    const apiKey = process.env.SOROSWAP_API_KEY

    const soroSwapClient = new SoroSwapClient(networkConfig, apiKey)
    
    const quote = await soroSwapClient.getQuote(
      fromAsset,
      toAsset,
      amount
    )

    return NextResponse.json(quote)
  } catch (error) {
    console.error('Quote error:', error)
    const message = error instanceof Error ? error.message : 'Failed to get quote'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}