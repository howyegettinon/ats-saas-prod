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

    // Check and use credit
    const creditResponse = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'use' })
    })

    if (!creditResponse.ok) {
      const error = await creditResponse.json()
      return NextResponse.json(
        { error: error.error, redirect: error.redirect },
        { status: creditResponse.status }
      )
    }

    const { resume } = await req.json()
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    const result = await analyzeResume(resume)

    // Save to history
    await prisma.analysis.create({
      data: {
        userId: session.user.id,
        resume,
        result,
      }
    })

    return NextResponse.json({ result })

  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
