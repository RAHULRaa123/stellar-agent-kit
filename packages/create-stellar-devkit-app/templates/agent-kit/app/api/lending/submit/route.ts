import { NextRequest, NextResponse } from "next/server";
import { getNetworkConfig } from "stellar-agent-kit";
import { rpc } from "@stellar/stellar-sdk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { signedXdr } = body;

    if (!signedXdr) {
      return NextResponse.json(
        { error: "Missing signed transaction XDR" },
        { status: 400 }
      );
    }

    const networkConfig = getNetworkConfig("mainnet");
    const server = new rpc.Server(networkConfig.sorobanRpcUrl, {
      allowHttp: networkConfig.sorobanRpcUrl.startsWith("http:"),
    });

    const sendResult = await server.sendTransaction(signedXdr);
    
    if (sendResult.errorResult) {
      throw new Error(`Transaction failed: ${String(sendResult.errorResult)}`);
    }

    return NextResponse.json({
      success: true,
      hash: sendResult.hash,
      status: sendResult.status ?? "PENDING",
      message: "Transaction submitted successfully",
    });
  } catch (error: unknown) {
    console.error("Transaction submit error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Failed to submit transaction: ${message}` },
      { status: 500 }
    );
  }
}