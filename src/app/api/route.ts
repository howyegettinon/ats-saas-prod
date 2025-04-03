import { NextResponse } from 'next/server'
import { analyzeResume } from '@/lib/cv-analyzer'

export async function POST(req: Request) {
  try {
    const { resume } = await req.json()
    
    if (!resume) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    const result = await analyzeResume(resume)
    return NextResponse.json({ result })

  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
