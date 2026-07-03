import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const results = await searchProducts(q);
  return NextResponse.json({ results });
}
