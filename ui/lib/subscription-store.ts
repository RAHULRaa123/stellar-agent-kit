/**
 * Minimal subscription state for Dodo Payments plans.
 * - Order/payment ID → plan (set by webhook or verify).
 * - App ID → plan (set when user links a payment to their DevKit project).
 * In production replace with a database.
 */

export type PlanId = "free" | "builder" | "pro";

const activePlansByOrderId = new Map<string, PlanId>();
const activePlansByAppId = new Map<string, PlanId>();

export function setPlanForOrder(orderId: string, plan: PlanId): void {
  activePlansByOrderId.set(orderId, plan);
}

export function getPlanForOrder(orderId: string): PlanId | undefined {
  return activePlansByOrderId.get(orderId);
}

/** Use for access gating: pass order_id from client (e.g. stored in localStorage after checkout). */
export function getPlan(orderId: string | null | undefined): PlanId {
  if (!orderId) return "free";
  return activePlansByOrderId.get(orderId) ?? "free";
}

/** Bind a DevKit appId to a plan (after user links a successful payment). */
export function setPlanForAppId(appId: string, plan: PlanId): void {
  activePlansByAppId.set(appId.trim(), plan);
}

/** Get plan for an appId. Used by validate and SDK gating. */
export function getPlanForAppId(appId: string | null | undefined): PlanId {
  if (!appId || typeof appId !== "string") return "free";
  return activePlansByAppId.get(appId.trim()) ?? "free";
}

/** True if plan is a paid active plan (SDK access allowed). */
export function isActivePaidPlan(plan: PlanId): boolean {
  return plan === "builder" || plan === "pro";
}
