import apiClient from "@/lib/apiClient";
import type { ApiEnvelope, PaymentRecord } from "@/types";

async function postPayment<T>(route: string, payload: unknown) {
  const response = await fetch(`/api/payment/${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? "Payment request failed.");
  return result as T;
}

export function initiatePayment(payload: {
  organizationId: string;
  plan: "PRO" | "ENTERPRISE";
}) {
  return postPayment<{ checkoutUrl: string; sessionId: string }>(
    "initiate",
    payload,
  );
}

export function confirmPayment(sessionId: string) {
  return postPayment<{ success: boolean; message: string }>("confirm", {
    sessionId,
  });
}

export function getPaymentStatus(id: string) {
  return apiClient<ApiEnvelope<PaymentRecord>>(
    `/payments/${encodeURIComponent(id)}`,
  );
}
