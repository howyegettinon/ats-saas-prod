import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

// This endpoint handles monthly credit resets for paying subscribers
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, lastReset: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if it's been a month since last reset
    const lastReset = new Date(user.lastReset)
    const now = new Date()
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())

    if (lastReset > monthAgo) {
      return NextResponse.json({ 
        error: 'Credits can only be reset once per month',
        nextResetDate: new Date(lastReset.getFullYear(), lastReset.getMonth() + 1, lastReset.getDate())
      }, { status: 400 })
    }

    // Reset credits based on subscription plan
    // For now, we'll reset to 25 (Basic plan)
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        usageCredits: 25,
        lastReset: now
      }
    })

    return NextResponse.json({
      credits: updatedUser.usageCredits,
      nextResetDate: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
    })

  } catch (error: any) {
    console.error('Credit reset error:', error)
    return NextResponse.json(
      { error: 'Failed to reset credits' },
      { status: 500 }
    )
  }
}
