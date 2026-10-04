import { NextResponse, type NextRequest } from "next/server";

const roleByPath = {
  "/admin": "ADMIN",
  "/manager": "MANAGER",
  "/member": "MEMBER",
} as const;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const requiredRole = Object.entries(roleByPath).find(
    ([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )?.[1];

  if (!requiredRole) return NextResponse.next();

  const currentRole = request.cookies.get("sprintflow-role")?.value;
  if (currentRole === requiredRole) return NextResponse.next();

  const destination = currentRole && currentRole in roleByPath
    ? `/${currentRole.toLowerCase()}`
    : "/login";
  return NextResponse.redirect(new URL(destination, request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/manager/:path*", "/member/:path*"],
};