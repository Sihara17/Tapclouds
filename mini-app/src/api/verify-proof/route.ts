import {
  ISuccessResult,
  IVerifyResponse,
  verifyCloudProof,
} from '@worldcoin/minikit-js'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface IRequestPayload {
  payload: ISuccessResult
  action: string
  signal: string | undefined
}

interface ISuccessResultExtended extends ISuccessResult {
  credential_type?: string
}

export async function POST(req: NextRequest) {
  try {
    const { payload, action, signal } = (await req.json()) as IRequestPayload
    const app_id = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`

    const verifyRes = await verifyCloudProof(payload, app_id, action, signal)

    if (!verifyRes.success) {
      return NextResponse.json({ success: false, error: verifyRes }, { status: 400 })
    }

    const { nullifier_hash, credential_type } = payload as ISuccessResultExtended

    await prisma.user.upsert({
      where: { nullifierHash: nullifier_hash },
      update: {},
      create: {
        nullifierHash: nullifier_hash,
        walletAddress: signal || '',
        credentialType: credential_type,
        verifiedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, verifyRes }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}
