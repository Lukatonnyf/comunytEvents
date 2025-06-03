import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { text } = body;

  return NextResponse.json({ message: `funcionou ${text}` });
}
