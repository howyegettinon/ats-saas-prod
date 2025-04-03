import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { generateCoverLetter } from '@/lib/cover-letter-generator'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, usageCredits: true }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (user.usageCredits !== -1 && user.usageCredits <= 0) {
      return NextResponse.json({ 
        error: 'No credits remaining',
        redirect: '/pricing'
      }, { status: 403 })
    }

    const { resume, jobDescription } = await req.json()
    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume and job description are required' },
        { status: 400 }
      )
    }

    const result = await generateCoverLetter(resume, jobDescription)

    // Use same pattern as CV analysis - first save, then deduct credit
    const coverLetter = await prisma.analysis.create({
      data: {
        userId: user.id,
        resume: resume,
        result: result,
      },
    })

    // Deduct credit if not unlimited (-1)
    if (user.usageCredits !== -1) {
      await prisma.user.update({
        where: { id: user.id },
        data: { usageCredits: { decrement: 1 } }
      })
    }

    return NextResponse.json({ result })

  } catch (error: any) {
    console.error('Cover letter generation error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
