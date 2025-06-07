import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { coins } = await req.json()

    return NextResponse.json({
      success: true,
      message: `Claimed ${coins} coins!`,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to claim" }, { status: 500 })
  }
}
