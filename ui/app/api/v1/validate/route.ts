import { NextResponse } from "next/server"
import { isAppIdValid } from "@/lib/projectStore"
import { getPlanForAppId, isActivePaidPlan } from "@/lib/subscription-store"

/**
 * Validate a DevKit project appId. Returns valid: true only if the appId is registered
 * AND has an active paid plan (Builder or Pro). SDK access is gated on this.
 * Use this endpoint in your server/config with the appId from env (STELLAR_DEVKIT_APP_ID).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const appId = searchParams.get("appId")?.trim() ?? null
  const registered = isAppIdValid(appId)
  const plan = getPlanForAppId(appId)
  const valid = registered && isActivePaidPlan(plan)

  return NextResponse.json({
    valid,
    appId,
    plan: registered ? plan : null,
    message: valid
      ? "App ID is registered and has an active plan."
      : !registered
        ? "App ID not found. Create a project in DevKit and use the API endpoint shown there."
        : "Active plan required. Purchase Builder or Pro in Pricing and link your App ID.",
  })
}
