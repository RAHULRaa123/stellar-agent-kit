import { NextRequest, NextResponse } from 'next/server'
import { SoroSwapClient } from '@/lib/agent-kit/defi/soroSwapClient'
import { getNetworkConfig } from '@/lib/agent-kit/config/networks'

export async function POST(request: NextRequest) {
  try {
    const { quote, network, secretKey } = await request.json()
    const networkName = (network?.toLowerCase?.()?.trim() === "testnet" ? "testnet" : "mainnet") as "testnet" | "mainnet"

    if (!quote) {
      return NextResponse.json(
        { error: 'Missing required parameter: quote' },
        { status: 400 }
      )
    }

    if (!secretKey) {
      return NextResponse.json(
        { error: 'Secret key is required for swap execution' },
        { status: 400 }
      )
    }

    const networkConfig = getNetworkConfig(networkName)
    const apiKey = process.env.SOROSWAP_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'SOROSWAP_API_KEY is required for swap execution' },
        { status: 500 }
      )
    }

    const soroSwapClient = new SoroSwapClient(networkConfig, apiKey)
    
    const result = await soroSwapClient.executeSwap(
      secretKey,
      quote,
      networkName
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Swap execution error:', error)
    const message = error instanceof Error ? error.message : 'Failed to execute swap'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}