import { NextRequest, NextResponse } from "next/server";
import { 
  getNetworkConfig, 
  BLEND_POOLS_MAINNET,
  MAINNET_ASSETS,
} from "stellar-agent-kit";
import {
  TransactionBuilder,
  Networks,
  xdr,
  Horizon,
} from "@stellar/stellar-sdk";
import { PoolContractV2, RequestType, type Request } from "@blend-capital/blend-sdk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { asset, amount, publicKey } = body;

    if (!asset || !amount || !publicKey) {
      return NextResponse.json(
        { error: "Missing required fields: asset, amount, publicKey" },
        { status: 400 }
      );
    }

    // Get asset contract ID
    const assetContractId = MAINNET_ASSETS[asset as keyof typeof MAINNET_ASSETS]?.contractId;
    if (!assetContractId) {
      return NextResponse.json(
        { error: `Unsupported asset: ${asset}. Supported: ${Object.keys(MAINNET_ASSETS).join(", ")}` },
        { status: 400 }
      );
    }

    // Convert amount to smallest unit (7 decimals for USDC, XLM)
    const decimals = 7;
    const amountInSmallestUnit = (parseFloat(amount) * Math.pow(10, decimals)).toString();
    const amountBigInt = BigInt(amountInSmallestUnit);

    const networkConfig = getNetworkConfig("mainnet");
    const pool = new PoolContractV2(BLEND_POOLS_MAINNET);
    
    const requests: Request[] = [
      {
        request_type: RequestType.Borrow,
        address: assetContractId,
        amount: amountBigInt,
      },
    ];

    const submitOpXdr = pool.submit({
      from: publicKey,
      spender: publicKey,
      to: publicKey,
      requests,
    });

    const op = xdr.Operation.fromXDR(submitOpXdr, "base64");
    const networkPassphrase = Networks.PUBLIC;
    const horizon = new Horizon.Server(networkConfig.horizonUrl);
    const sourceAccount = await horizon.loadAccount(publicKey);
    
    const tx = new TransactionBuilder(sourceAccount, {
      fee: "10000",
      networkPassphrase,
    })
      .addOperation(op)
      .setTimeout(180)
      .build();

    return NextResponse.json({
      success: true,
      xdr: tx.toXDR(),
      message: `Transaction ready to borrow ${amount} ${asset} from Blend protocol`,
    });
  } catch (error: unknown) {
    console.error("Lending borrow build error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Failed to build borrow transaction: ${message}` },
      { status: 500 }
    );
  }
}