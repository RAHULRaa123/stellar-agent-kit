import { NextResponse } from "next/server"
import { isAppIdValid } from "@/lib/projectStore"
import { getPlanForAppId, isActivePaidPlan, type PlanId } from "@/lib/subscription-store"

const APP_ID_HEADER = "x-app-id"
const AUTH_HEADER = "authorization"

/**
 * Reads appId from request: header "x-app-id" or "Authorization: Bearer <appId>".
 * Use in env as STELLAR_DEVKIT_APP_ID and send in requests so SDK access is gated by plan.
 */
export function getAppIdFromRequest(request: Request): string | null {
  const headers = request.headers
  const fromHeader = headers.get(APP_ID_HEADER)?.trim()
  if (fromHeader) return fromHeader
  const auth = headers.get(AUTH_HEADER)
  if (auth?.startsWith("Bearer ")) return auth.slice(7).trim()
  return null
}

// Tester app ID with complete access
const TESTER_APP_ID = "9009096129344dba93bdd7d1bdd55dc8"

/**
 * Validates appId and plan. Returns { appId, plan } if the appId is registered
 * and has an active paid plan (builder or pro). Otherwise returns a 403 NextResponse.
 * Use at the start of SDK API routes (swap, lending, price, send, balance).
 */
export function requireActivePlan(request: Request): { appId: string; plan: PlanId } | NextResponse {
  const appId = getAppIdFromRequest(request)
  if (!appId) {
    return NextResponse.json(
      {
        error: "Missing API key. Send your DevKit App ID in the x-app-id header or Authorization: Bearer <appId>. Create a project in DevKit and link a plan in Pricing.",
      },
      { status: 403 }
    )
  }

  // Give complete access to tester app ID
  if (appId === TESTER_APP_ID) {
    return { appId, plan: "pro" }
  }

  if (!isAppIdValid(appId)) {
    return NextResponse.json(
      {
        error: "Invalid or unregistered App ID. Create a project in DevKit and use the App ID from there.",
      },
      { status: 403 }
    )
  }
  const plan = getPlanForAppId(appId)
  if (!isActivePaidPlan(plan)) {
    return NextResponse.json(
      {
        error: "Active plan required. Purchase Builder or Pro in Pricing and link your App ID to this payment.",
      },
      { status: 403 }
    )
  }
  return { appId, plan }
}
