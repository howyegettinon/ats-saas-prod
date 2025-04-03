import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (type === 'analysis') {
      const analyses = await prisma.analysis.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          resume: true,
          result: true,
          createdAt: true,
        }
      })

      const total = await prisma.analysis.count({
        where: { userId: user.id }
      })

      return NextResponse.json({
        items: analyses,
        total,
        pages: Math.ceil(total / limit)
      })

    } else if (type === 'cover-letter') {
      const coverLetters = await prisma.coverLetter.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: {
          id: true,
          resume: true,
          jobDescription: true,
          coverLetter: true,
          createdAt: true,
        }
      })

      const total = await prisma.coverLetter.count({
        where: { userId: user.id }
      })

      return NextResponse.json({
        items: coverLetters,
        total,
        pages: Math.ceil(total / limit)
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid type parameter' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Error fetching history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (data.type === 'cover-letter') {
      const coverLetter = await prisma.coverLetter.create({
        data: {
          userId: user.id,
          resume: data.resume,
          jobDescription: data.jobDescription,
          coverLetter: data.coverLetter,
        },
      })
      return NextResponse.json(coverLetter)
    } else if (data.type === 'analysis') {
      const analysis = await prisma.analysis.create({
        data: {
          userId: user.id,
          resume: data.resume,
          result: data.result,
        },
      })
      return NextResponse.json(analysis)
    } else {
      return NextResponse.json(
        { error: 'Invalid type parameter' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Error saving to history:', error)
    return NextResponse.json(
      { error: 'Failed to save to history' },
      { status: 500 }
    )
  }
}
