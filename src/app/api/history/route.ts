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
    const type = searchParams.get('type') || 'analysis'
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
      const [items, total] = await Promise.all([
        prisma.analysis.findMany({
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
        }),
        prisma.analysis.count({
          where: { userId: user.id }
        })
      ])

      return NextResponse.json({
        items,
        total,
        pages: Math.ceil(total / limit)
      })
    }

    if (type === 'cover-letter') {
      const [items, total] = await Promise.all([
        prisma.coverLetter.findMany({
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
        }),
        prisma.coverLetter.count({
          where: { userId: user.id }
        })
      ])

      return NextResponse.json({
        items,
        total,
        pages: Math.ceil(total / limit)
      })
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })

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
    
    if (!data.type || !['analysis', 'cover-letter'].includes(data.type)) {
      return NextResponse.json(
        { error: 'Invalid type parameter' },
        { status: 400 }
      )
    }

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
          coverLetter: data.result
        },
      })
      return NextResponse.json(coverLetter)
    }

    const analysis = await prisma.analysis.create({
      data: {
        userId: user.id,
        resume: data.resume,
        result: data.result,
      },
    })
    return NextResponse.json(analysis)

  } catch (error) {
    console.error('Error saving to history:', error)
    return NextResponse.json(
      { error: 'Failed to save to history' },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
