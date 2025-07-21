import { NextResponse } from "next/server";

export async function middleware(request) {
  // Allow all requests to pass through without authentication
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};