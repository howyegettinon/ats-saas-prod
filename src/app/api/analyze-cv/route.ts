import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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

    const { resume } = await req.json()
    
    // Your existing analysis logic here
    const result = "Analysis result..." // Replace with your actual analysis

    await prisma.$transaction([
      prisma.analysis.create({
        data: {
          userId: user.id,
          resume,
          result
        }
      }),
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
      { error: error.message || 'Analysis failed' },
      { status: 500 }
    )
  }
}
