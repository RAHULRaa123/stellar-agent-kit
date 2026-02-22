import { NextRequest, NextResponse } from "next/server";
import { AllbridgeCoreSdk, nodeRpcUrlsDefault } from "@allbridge/bridge-core-sdk";

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

    // Initialize Allbridge SDK
    const sdk = new AllbridgeCoreSdk(nodeRpcUrlsDefault);

    // Submit the signed transaction
    const result = await sdk.bridge.send(signedXdr);

    return NextResponse.json({
      success: true,
      hash: result,
      message: "Bridge transaction submitted successfully",
    });
  } catch (error: unknown) {
    console.error("Bridge submit error:", error);
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: `Failed to submit bridge transaction: ${message}` },
      { status: 500 }
    );
  }
}