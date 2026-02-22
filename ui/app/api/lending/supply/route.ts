import { NextRequest, NextResponse } from "next/server"
import {
  TransactionBuilder,
  Networks,
  xdr,
  Horizon,
  rpc,
} from "@stellar/stellar-sdk"
import { PoolContractV2, RequestType, type Request } from "@blend-capital/blend-sdk"
import { getNetworkConfig } from "stellar-agent-kit"

/** Default active pool (FixedV2). Frozen pool: YieldBloxV2 = CCCCIQSDILITHMM7PBSLVDT5MISSY7R26MNZXCX4H7J5JQ5FPIYOGYFS */
const DEFAULT_POOL_ID = "CAJJZSGMMM3PD7N33TAPHGBUGTB43OC73HVIK2L2G6BNGGGYOSSYBXBD"

/** Amount in human form (e.g. "10") → smallest units (7 decimals) for Stellar assets. */
function toSmallestUnits(amount: string): string {
  const num = parseFloat(amount)
  if (!Number.isFinite(num) || num < 0) {
    throw new Error("Invalid amount")
  }
  const scaled = Math.round(num * 1e7).toString()
  return scaled
}

export async function POST(request: NextRequest) {
  try {
    const { publicKey, asset, amount, network = "mainnet", poolId } = await request.json()

    if (!publicKey || !asset || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: publicKey, asset, amount" },
        { status: 400 }
      )
    }

    const assetContractId = String(asset).trim()
    const amountInSmallestUnit = toSmallestUnits(String(amount))
    const amountBigInt = BigInt(amountInSmallestUnit)

    // Validate minimum amount (e.g., at least 0.0000001 units)
    if (amountBigInt <= 0n) {
      return NextResponse.json(
        { error: "Amount must be greater than 0" },
        { status: 400 }
      )
    }

    const networkConfig = getNetworkConfig(network)
    const effectivePoolId = (typeof poolId === "string" && poolId.trim()) ? poolId.trim() : DEFAULT_POOL_ID
    const pool = new PoolContractV2(effectivePoolId)

    const requests: Request[] = [
      {
        request_type: RequestType.SupplyCollateral,
        address: assetContractId,
        amount: amountBigInt,
      },
    ]

    const submitOpXdr = pool.submit({
      from: publicKey,
      spender: publicKey,
      to: publicKey,
      requests,
    })

    const op = xdr.Operation.fromXDR(submitOpXdr, "base64")
    // Always use PUBLIC network for Blend Protocol (mainnet only)
    const networkPassphrase = Networks.PUBLIC
    const horizon = new Horizon.Server(networkConfig.horizonUrl)
    const sourceAccount = await horizon.loadAccount(publicKey)

    const tx = new TransactionBuilder(sourceAccount, {
      fee: "10000",
      networkPassphrase,
    })
      .addOperation(op)
      .setTimeout(180)
      .build()

    const server = new rpc.Server(networkConfig.sorobanRpcUrl, {
      allowHttp: networkConfig.sorobanRpcUrl.startsWith("http:"),
    })
    const prepared = await server.prepareTransaction(tx)

    return NextResponse.json({
      xdr: prepared.toXDR(),
      asset: assetContractId,
      amount: amountInSmallestUnit,
      operation: "supply",
    })
  } catch (error) {
    console.error("Supply API error:", error)
    const message = error instanceof Error ? error.message : "Failed to build supply transaction"
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
