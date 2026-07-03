import { NextResponse } from "next/server";
import { saveSuggestion } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const productName =
    typeof body?.productName === "string" ? body.productName.trim() : "";
  const reason = typeof body?.reason === "string" ? body.reason.trim() : "";

  if (!productName || !reason) {
    return NextResponse.json(
      { error: "Product name and reason are required." },
      { status: 400 },
    );
  }

  await saveSuggestion({
    productName,
    brand: typeof body?.brand === "string" ? body.brand.trim() : undefined,
    category:
      typeof body?.category === "string" ? body.category.trim() : undefined,
    reason,
    sourceUrl:
      typeof body?.sourceUrl === "string" ? body.sourceUrl.trim() : undefined,
  });

  return NextResponse.json({ ok: true });
}
