import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ module: string }> }
) {
  const { module } = await params;

  return NextResponse.json({
    success: true,
    module,
    data: [],
  });
}
