import { NextRequest, NextResponse } from 'next/server'
import { requireActivePlan } from '@/lib/require-active-plan'
import { StellarClient } from '@/lib/agent-kit/core/stellarClient'
import { getNetworkConfig } from '@/lib/agent-kit/config/networks'

export async function POST(request: NextRequest) {
  const auth = requireActivePlan(request)
  if (auth instanceof NextResponse) return auth
  try {
    const { publicKey, network = 'mainnet' } = await request.json()

    if (!publicKey) {
      return NextResponse.json(
        { error: 'Missing required parameter: publicKey' },
        { status: 400 }
      )
    }

    const networkConfig = getNetworkConfig(network)
    const stellarClient = new StellarClient(networkConfig)
    
    const balances = await stellarClient.getBalance(publicKey)

    return NextResponse.json(balances)
  } catch (error) {
    console.error('Balance error:', error)
    const message = error instanceof Error ? error.message : 'Failed to fetch balances'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}