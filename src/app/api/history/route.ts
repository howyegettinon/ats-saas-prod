import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        analyses: {
          orderBy: { createdAt: 'desc' },
          take: 20, // Increased from 10 to show more history
        },
        coverLetters: {
          orderBy: { createdAt: 'desc' },
          take: 20, // Increased from 10 to show more history
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({
      analyses: user.analyses,
      coverLetters: user.coverLetters,
    })

  } catch (error: any) {
    console.error('History error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { type, data } = body

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (type === 'analysis') {
      const analysis = await prisma.analysis.create({
        data: {
          userId: user.id,
          resume: data.resume,
          result: data.result,
        },
      })
      return NextResponse.json(analysis)
    }

    if (type === 'coverLetter') {
      const coverLetter = await prisma.coverLetter.create({
        data: {
          userId: user.id,
          jobDescription: data.jobDescription,
          resume: data.resume,
          result: data.result,
        },
      })
      return NextResponse.json(coverLetter)
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })

  } catch (error: any) {
    console.error('Save history error:', error)
    return NextResponse.json(
      { error: 'Failed to save to history' },
      { status: 500 }
    )
  }
}
