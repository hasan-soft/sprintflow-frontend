import apiClient from "@/lib/apiClient";
import type {
  AuthSessionResponse,
  LoginPayload,
  RegistrationPayload,
} from "@/types";

async function postJson<T>(path: string, payload?: unknown): Promise<T> {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload === undefined ? undefined : JSON.stringify(payload),
  });
  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error ?? "Authentication request failed.");
  return result as T;
}

export function userLogin(payload: LoginPayload) {
  return postJson<AuthSessionResponse>("/api/auth/login", payload);
}

export function userRegistration(payload: RegistrationPayload) {
  return postJson<{ success: boolean; message: string }>(
    "/api/auth/register",
    payload,
  );
}

export function googleOAuth(idToken: string) {
  return postJson<AuthSessionResponse>("/api/auth/google", { idToken });
}

export function userLogout() {
  return postJson<{ success: boolean }>("/api/auth/logout");
}

export function getAuthMe() {
  return apiClient("/auth/me");
}

export function refreshAuthToken() {
  return postJson<AuthSessionResponse>("/api/auth/refresh-token");
}

export function demoLogin(role: "ADMIN" | "MANAGER" | "MEMBER") {
  return postJson<{ success: boolean }>("/api/demo-login", { role });
}
