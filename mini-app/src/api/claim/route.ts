import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface IClaimRequest {
  nullifierHash: string
  amount: number // jumlah koin yang mau diklaim, misal fixed 10
}

export async function POST(req: NextRequest) {
  try {
    const { nullifierHash, amount } = (await req.json()) as IClaimRequest

    if (!nullifierHash || amount <= 0) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
    }

    // Cari user berdasarkan nullifierHash
    const user = await prisma.user.findUnique({
      where: { nullifierHash },
    })

    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 })
    }

    // Contoh cek kondisi, misal energy atau cooldown, sesuaikan dengan logika kamu
    // if (user.energy < amount) {
    //   return NextResponse.json({ success: false, error: 'Not enough energy' }, { status: 400 })
    // }

    // Update saldo koin user, misal add amount ke walletBalance (pastikan ada kolom walletBalance di model User)
    const updatedUser = await prisma.user.update({
      where: { nullifierHash },
      data: {
        walletBalance: {
          increment: amount,
        },
        // misal kurangi energy, update lastClaimTime dsb sesuai kebutuhan
      },
    })

    return NextResponse.json({
      success: true,
      message: `Claimed ${amount} coins successfully!`,
      walletBalance: updatedUser.walletBalance,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    )
  }
}
