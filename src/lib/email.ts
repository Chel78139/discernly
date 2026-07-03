import { Resend } from "resend";

export async function sendUnlockConfirmationEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No Resend key configured yet — skip sending in local/dev mode.
    return;
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "hello@discernly.io",
    to: email,
    subject: "Your Discernly swaps are unlocked",
    html: "<p>You're in. Every Christian-made swap on Discernly is unlocked for this email, free forever.</p>",
  });
}
