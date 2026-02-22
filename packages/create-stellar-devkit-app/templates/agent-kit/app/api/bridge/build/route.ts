import { NextRequest, NextResponse } from "next/server";
import { AllbridgeCoreSdk, nodeRpcUrlsDefault } from "@allbridge/bridge-core-sdk";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fromChain, toChain, asset, amount, fromAddress, toAddress } = body;

    if (!fromChain || !toChain || !asset || !amount || !fromAddress || !toAddress) {
      return NextResponse.json(
        { error: "Missing required fields: fromChain, toChain, asset, amount, fromAddress, toAddress" },
        { status: 400 }
      );
    }

    if (fromChain === toChain) {
      return NextResponse.json(
        { error: "Source and destination chains must be different" },
        { status: 400 }
      );
    }

    // Initialize Allbridge SDK
    const sdk = new AllbridgeCoreSdk(nodeRpcUrlsDefault);

    // Get supported chains and tokens
    const chains = await sdk.chainDetailsMap();
    const tokens = await sdk.tokens();

    // Find source and destination chains
    const sourceChain = Object.values(chains).find(chain => 
      chain.name.toLowerCase() === fromChain.toLowerCase() || 
      chain.chainSymbol.toLowerCase() === fromChain.toLowerCase()
    );
    
    const destChain = Object.values(chains).find(chain => 
      chain.name.toLowerCase() === toChain.toLowerCase() || 
      chain.chainSymbol.toLowerCase() === toChain.toLowerCase()
    );

    if (!sourceChain || !destChain) {
      return NextResponse.json(
        { error: `Unsupported chain. Available chains: ${Object.values(chains).map(c => c.name).join(", ")}` },
        { status: 400 }
      );
    }

    // Find the token on source chain
    const sourceTokens = tokens[sourceChain.chainId] || [];
    const sourceToken = sourceTokens.find(token => 
      token.symbol.toLowerCase() === asset.toLowerCase()
    );

    if (!sourceToken) {
      return NextResponse.json(
        { error: `Token ${asset} not supported on ${sourceChain.name}. Available: ${sourceTokens.map(t => t.symbol).join(", ")}` },
        { status: 400 }
      );
    }

    // Find corresponding token on destination chain
    const destTokens = tokens[destChain.chainId] || [];
    const destToken = destTokens.find(token => 
      token.symbol.toLowerCase() === asset.toLowerCase()
    );

    if (!destToken) {
      return NextResponse.json(
        { error: `Token ${asset} not supported on ${destChain.name}. Available: ${destTokens.map(t => t.symbol).join(", ")}` },
        { status: 400 }
      );
    }

    // Convert amount to proper units
    const amountInUnits = sdk.utils.parseUnits(amount, sourceToken.decimals);

    // Build transfer parameters
    const transferParams = {
      amount: amountInUnits,
      fromChainId: sourceChain.chainId,
      fromTokenAddress: sourceToken.tokenAddress,
      toChainId: destChain.chainId,
      toTokenAddress: destToken.tokenAddress,
      messenger: "allbridge", // Use Allbridge messenger
      fromAccountAddress: fromAddress,
      toAccountAddress: toAddress,
    };

    // For Stellar, we need to build the XDR transaction
    if (sourceChain.chainSymbol === "SRB") {
      const rawTransaction = await sdk.bridge.rawTxBuilder.send(transferParams);
      
      return NextResponse.json({
        success: true,
        xdr: rawTransaction,
        transferParams,
        sourceChain: sourceChain.name,
        destChain: destChain.name,
        sourceToken: sourceToken.symbol,
        destToken: destToken.symbol,
        message: `Transaction ready to bridge ${amount} ${asset} from ${sourceChain.name} to ${destChain.name}`,
      });
    } else {
      return NextResponse.json(
        { error: "Only Stellar as source chain is currently supported" },
        { status: 400 }
      );
    }

  } catch (error: unknown) {
    console.error("Bridge build error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Failed to build bridge transaction: ${message}` },
      { status: 500 }
    );
  }
}