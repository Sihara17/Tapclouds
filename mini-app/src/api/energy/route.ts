import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { nullifierHash, energy } = await req.json()

  if (!nullifierHash || energy === undefined) {
    return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 })
  }

  try {
    await prisma.user.update({
      where: { nullifierHash },
      data: { energy },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update energy' }, { status: 500 })
  }
}
