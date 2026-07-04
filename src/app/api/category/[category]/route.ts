import { NextResponse } from "next/server";
import { getProductsByCategory } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> },
) {
  const { category } = await params;
  const products = await getProductsByCategory(decodeURIComponent(category));
  return NextResponse.json({ products });
}
