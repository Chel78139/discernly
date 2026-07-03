import { NextResponse } from "next/server";
import { saveEmailSignup } from "@/lib/db";
import { sendUnlockConfirmationEmail } from "@/lib/email";
import { UNLOCK_COOKIE } from "@/lib/unlock";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const sourceProductSlug =
    typeof body?.sourceProductSlug === "string" ? body.sourceProductSlug : undefined;

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  await saveEmailSignup(email, sourceProductSlug);
  await sendUnlockConfirmationEmail(email);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(UNLOCK_COOKIE, "1", {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365 * 5,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
