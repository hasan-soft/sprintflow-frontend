import { type NextRequest, NextResponse } from "next/server";

const roleByPath = {
  "/admin": "ADMIN",
  "/manager": "MANAGER",
  "/member": "MEMBER",
} as const;

const homeByRole = {
  ADMIN: "/admin",
  MANAGER: "/manager",
  MEMBER: "/member",
} as const;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requiredRole = Object.entries(roleByPath).find(
    ([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )?.[1];

  if (!requiredRole) return NextResponse.next();

  const currentRole = request.cookies.get("sprintflow-role")?.value;
  const accessToken = request.cookies.get("sprintflow-access-token")?.value;
  if (currentRole === requiredRole && accessToken) return NextResponse.next();

  const destination =
    currentRole && currentRole in homeByRole
      ? homeByRole[currentRole as keyof typeof homeByRole]
      : "/login";
  return NextResponse.redirect(new URL(destination, request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/manager/:path*", "/member/:path*"],
};
