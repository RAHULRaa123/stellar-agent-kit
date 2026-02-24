import { NextRequest, NextResponse } from "next/server";
import { requireActivePlan } from "@/lib/require-active-plan";
import { Asset, TransactionBuilder, Operation, Networks, Horizon } from "@stellar/stellar-sdk";
import { getNetworkConfig } from "@/lib/agent-kit/config/networks";

export async function POST(request: NextRequest) {
  const auth = requireActivePlan(request);
  if (auth instanceof NextResponse) return auth;
  try {
    const { fromAddress, to, amount, assetCode, assetIssuer, network } = await request.json();

    if (!fromAddress || !to || amount == null || amount === "") {
      return NextResponse.json(
        { error: "Missing required parameters: fromAddress, to, amount" },
        { status: 400 }
      );
    }

    const config = getNetworkConfig(network);
    const horizon = new Horizon.Server(config.horizonUrl);
    const networkPassphrase = network === "testnet" ? Networks.TESTNET : Networks.PUBLIC;

    const sourceAccount = await horizon.loadAccount(fromAddress);
    const asset =
      assetCode && assetIssuer
        ? new Asset(assetCode, assetIssuer)
        : Asset.native();

    const tx = new TransactionBuilder(sourceAccount, {
      fee: "100",
      networkPassphrase,
    })
      .addOperation(Operation.payment({ destination: to, asset, amount: String(amount) }))
      .setTimeout(180)
      .build();

    return NextResponse.json({ xdr: tx.toXDR() });
  } catch (error) {
    console.error("Send build error:", error);
    const message = error instanceof Error ? error.message : "Failed to build payment";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
