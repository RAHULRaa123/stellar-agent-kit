import { NextRequest, NextResponse } from 'next/server'
import { SoroSwapClient } from '@/lib/agent-kit/defi/soroSwapClient'
import { getNetworkConfig } from '@/lib/agent-kit/config/networks'

function normalizeNetwork(name: string): "testnet" | "mainnet" {
  const n = name?.toLowerCase().trim() ?? ""
  return n === "testnet" ? "testnet" : "mainnet"
}

export async function POST(request: NextRequest) {
  try {
    const { signedXdr, network } = await request.json()

    if (!signedXdr) {
      return NextResponse.json(
        { error: 'Missing required parameter: signedXdr' },
        { status: 400 }
      )
    }

    const networkName = normalizeNetwork(network ?? "mainnet")
    const networkConfig = getNetworkConfig(networkName)
    const apiKey = process.env.SOROSWAP_API_KEY
    const soroSwapClient = new SoroSwapClient(networkConfig, apiKey)

    const result = await soroSwapClient.submitSignedTransaction(
      signedXdr,
      networkName
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Submit swap error:', error)
    const message = error instanceof Error ? error.message : 'Failed to submit swap'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
