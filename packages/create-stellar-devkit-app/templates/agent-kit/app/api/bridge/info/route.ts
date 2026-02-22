import { NextRequest, NextResponse } from "next/server";
import { AllbridgeCoreSdk, nodeRpcUrlsDefault } from "@allbridge/bridge-core-sdk";

export async function GET(request: NextRequest) {
  try {
    // Initialize Allbridge SDK
    const sdk = new AllbridgeCoreSdk(nodeRpcUrlsDefault);

    // Get supported chains and tokens
    const chains = await sdk.chainDetailsMap();
    const tokens = await sdk.tokens();

    // Format chains for frontend
    const supportedChains = Object.values(chains).map(chain => ({
      id: chain.chainSymbol.toLowerCase(),
      name: chain.name,
      symbol: chain.chainSymbol,
      chainId: chain.chainId,
    }));

    // Get unique tokens across all chains
    const allTokens = Object.values(tokens).flat();
    const uniqueTokens = Array.from(
      new Map(allTokens.map(token => [token.symbol, token])).values()
    ).map(token => ({
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
    }));

    return NextResponse.json({
      success: true,
      chains: supportedChains,
      tokens: uniqueTokens,
    });
  } catch (error: unknown) {
    console.error("Bridge info error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Failed to get bridge info: ${message}` },
      { status: 500 }
    );
  }
}