import { NextResponse } from 'next/server'
import { analyzeResume } from '@/lib/cv-analyzer'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check credits directly with Prisma
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, usageCredits: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has credits
    if (user.usageCredits !== -1 && user.usageCredits <= 0) {
      return NextResponse.json({ 
        error: 'No credits remaining',
        redirect: '/pricing'
      }, { status: 403 })
    }

    const { resume } = await req.json()
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    const result = await analyzeResume(resume)

    // Use transaction to ensure both operations succeed
    await prisma.$transaction([
      // Create analysis record
      prisma.analysis.create({
        data: {
          userId: user.id,
          resume,
          result,
        }
      }),
      // Deduct credit if not unlimited
      ...(user.usageCredits !== -1 ? [
        prisma.user.update({
          where: { id: user.id },
          data: { usageCredits: { decrement: 1 } }
        })
      ] : [])
    ])

    return NextResponse.json({ result })

  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
