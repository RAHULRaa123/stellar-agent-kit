import { NextRequest, NextResponse } from "next/server"
import { TransactionBuilder } from "@stellar/stellar-sdk"
import { rpc } from "@stellar/stellar-sdk"
import { getNetworkConfig } from "stellar-agent-kit"

const NETWORK_PASSPHRASE = "Public Global Stellar Network ; September 2015"

/** Map Blend contract error codes to user-friendly messages (from @blend-capital/blend-sdk ContractErrorType). */
function friendlyBlendError(errorResult: string): string {
  const str = String(errorResult)
  const match = str.match(/#(\d+)\)/)
  const code = match ? parseInt(match[1], 10) : null
  const messages: Record<number, string> = {
    1205: "Health factor would be too low. Supply more collateral or borrow less.",
    1204: "This operation is not allowed in the current pool status.",
    1206: "Invalid pool status. The pool may be frozen or in a restricted state—this operation is not allowed right now. Check status at blend.capital.",
    1223: "This reserve is disabled for this operation.",
    1224: "Minimum collateral requirement not met.",
    1210: "Price is stale; try again in a moment.",
    1003: "Insufficient funds in the pool.",
    1216: "Invalid amount for this operation.",
    1208: "Maximum number of positions exceeded.",
  }
  if (code !== null && messages[code]) {
    return `Borrow failed: ${messages[code]}`
  }
  if (str.includes("Contract") && str.includes("#1205")) {
    return "Borrow failed: Health factor would be too low. Supply more collateral or borrow less."
  }
  return `Transaction failed: ${str}`
}

export async function POST(request: NextRequest) {
  try {
    const { signedXdr, network = "mainnet" } = await request.json()

    if (!signedXdr) {
      return NextResponse.json(
        { error: "Missing signed XDR" },
        { status: 400 }
      )
    }

    const networkConfig = getNetworkConfig(network)
    const server = new rpc.Server(networkConfig.sorobanRpcUrl, {
      allowHttp: networkConfig.sorobanRpcUrl.startsWith("http:"),
    })

    // Always use PUBLIC network for Blend Protocol (mainnet only)
    const networkPassphrase = NETWORK_PASSPHRASE
    const tx = TransactionBuilder.fromXDR(signedXdr, networkPassphrase)
    const result = await server.sendTransaction(tx)

    if (result.errorResult) {
      const message = friendlyBlendError(result.errorResult)
      return NextResponse.json(
        { error: message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      hash: result.hash,
      status: result.status ?? "PENDING",
    })
  } catch (error) {
    console.error("Submit API error:", error)
    const message = error instanceof Error ? error.message : "Failed to submit transaction"
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
