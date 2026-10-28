import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createSession,
  isAuthConfigured,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  verifyPassword,
} from "../../../../src/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    if (!isAuthConfigured()) {
      return NextResponse.json(
        { error: "Authentication is not configured." },
        { status: 503 }
      );
    }

    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password =
      typeof body?.password === "string" ? body.password : "";

    if (
      email.length > 254 ||
      password.length > 128 ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        { error: "Enter a valid email and password." },
        { status: 400 }
      );
    }

    const configuredEmail = process.env.MESOB_DEMO_EMAIL.trim().toLowerCase();
    const emailMatches = email === configuredEmail;
    const passwordMatches = await verifyPassword(
      password,
      process.env.MESOB_DEMO_PASSWORD_HASH
    );

    if (!emailMatches || !passwordMatches) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    const token = createSession(configuredEmail);
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });

    return NextResponse.json(
      { user: { email: configuredEmail } },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to process login." },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
