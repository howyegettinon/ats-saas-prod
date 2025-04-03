import { NextResponse } from 'next/server'
import { analyzeResume } from '@/lib/cv-analyzer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { resume, jobDescription } = body
    
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    const result = await analyzeResume(resume, jobDescription)
    
    // Save to history
    try {
      await prisma.analysis.create({
        data: {
          userId: session.user.id,
          resume: resume,
          result: result
        }
      })
    } catch (error) {
      console.error('Failed to save to history:', error)
      // Continue even if history save fails
    }

    return NextResponse.json({ result })

  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
