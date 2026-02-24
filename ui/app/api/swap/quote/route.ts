import { NextRequest, NextResponse } from 'next/server'
import { requireActivePlan } from '@/lib/require-active-plan'
import { SoroSwapClient } from '@/lib/agent-kit/defi/soroSwapClient'
import { getNetworkConfig } from '@/lib/agent-kit/config/networks'

export async function POST(request: NextRequest) {
  const auth = requireActivePlan(request)
  if (auth instanceof NextResponse) return auth
  try {
    const { fromAsset, toAsset, amount, network = "mainnet" } = await request.json()

    if (!fromAsset || !toAsset || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters: fromAsset, toAsset, amount' },
        { status: 400 }
      )
    }

    const networkKey = (network === "testnet" ? "testnet" : "mainnet") as "mainnet" | "testnet"
    const networkConfig = getNetworkConfig(networkKey)
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