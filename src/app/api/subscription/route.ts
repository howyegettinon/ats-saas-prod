import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { usageCredits: true }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({ credits: user.usageCredits })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { action } = await req.json()
  
  if (action === 'use') {
    return await useCredit(session.user.email)
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

async function useCredit(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: { email: userEmail }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  // Check if user has unlimited credits
  if (user.usageCredits === -1) {
    return NextResponse.json({ credits: -1 })
  }

  // Check if user has any credits left
  if (user.usageCredits <= 0) {
    return NextResponse.json(
      { error: 'No credits remaining', redirect: '/pricing' },
      { status: 403 }
    )
  }

  // Deduct credit
  const updatedUser = await prisma.user.update({
    where: { email: userEmail },
    data: { usageCredits: { decrement: 1 } },
    select: { usageCredits: true }
  })

  return NextResponse.json({ credits: updatedUser.usageCredits })
}
