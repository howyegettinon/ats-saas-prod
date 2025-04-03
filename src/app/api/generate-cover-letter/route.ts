import { NextResponse } from 'next/server'
import { generateCoverLetter } from '@/lib/cover-letter-generator'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { jobDescription, resume } = body
    
    if (!jobDescription || !resume) {
      return NextResponse.json(
        { error: 'Both job description and resume are required' },
        { status: 400 }
      )
    }

    const result = await generateCoverLetter(jobDescription, resume)
    return NextResponse.json({ result })

  } catch (error: any) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
