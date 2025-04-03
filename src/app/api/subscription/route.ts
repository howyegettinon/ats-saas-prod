import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const SUBSCRIPTION_TIERS = {
  FREE: {
    credits: 3,
    price: 0,
  },
  BASIC: {
    credits: 25,
    price: 9.99,
  },
  PRO: {
    credits: -1, // Unlimited
    price: 29.99,
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { usageCredits: true }
  })

  return NextResponse.json({ credits: user?.usageCredits ?? 0 })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { action } = await req.json()
  
  if (action === 'use') {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.usageCredits === -1) {
      return NextResponse.json({ credits: -1 })
    }

    if (user.usageCredits <= 0) {
      return NextResponse.json({ error: 'No credits remaining' }, { status: 403 })
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { usageCredits: { decrement: 1 } }
    })

    return NextResponse.json({ credits: updatedUser.usageCredits })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
