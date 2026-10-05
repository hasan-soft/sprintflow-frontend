import { cookies } from "next/headers";

const supportedRoles = ["ADMIN", "MANAGER", "MEMBER"] as const;
type Role = (typeof supportedRoles)[number];
type RecordValue = Record<string, unknown>;

function asRecord(value: unknown): RecordValue | undefined {
  return value && typeof value === "object"
    ? (value as RecordValue)
    : undefined;
}

function readRoleFromToken(token: string): string | undefined {
  try {
    const payload = token.split(".")[1];
    if (!payload) return undefined;
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as RecordValue;
    const user = asRecord(decoded.user);
    const role = decoded.role ?? user?.role;
    return typeof role === "string" ? role.toUpperCase() : undefined;
  } catch {
    return undefined;
  }
}

export async function saveAuthSession(payload: unknown, roleOverride?: Role) {
  const root = asRecord(payload);
  const data = asRecord(root?.data) ?? root;
  const result = asRecord(data?.result) ?? data;
  const tokens = asRecord(result?.tokens) ?? asRecord(root?.tokens) ?? result;
  const accessToken =
    tokens?.accessToken ??
    tokens?.access_token ??
    result?.accessToken ??
    result?.access_token;
  const refreshToken =
    tokens?.refreshToken ??
    tokens?.refresh_token ??
    result?.refreshToken ??
    result?.refresh_token;
  const user =
    asRecord(result?.user) ?? asRecord(data?.user) ?? asRecord(root?.user);

  if (typeof accessToken !== "string" || accessToken.length === 0)
    return undefined;

  const candidateRole =
    roleOverride ??
    String(
      user?.role ?? result?.role ?? readRoleFromToken(accessToken) ?? "",
    ).toUpperCase();
  if (!supportedRoles.includes(candidateRole as Role)) return undefined;

  const secure = process.env.NODE_ENV === "production";
  const cookieStore = await cookies();
  cookieStore.set("sprintflow-access-token", accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
    secure,
  });
  if (typeof refreshToken === "string" && refreshToken.length > 0) {
    cookieStore.set("sprintflow-refresh-token", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secure,
    });
  }
  cookieStore.set("sprintflow-role", candidateRole, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
    secure,
  });

  return { role: candidateRole as Role, user };
}

export async function clearAuthSession() {
  const cookieStore = await cookies();
  cookieStore.delete("sprintflow-access-token");
  cookieStore.delete("sprintflow-refresh-token");
  cookieStore.delete("sprintflow-role");
}
