import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResume(resumeText: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{
        role: "system",
        content: "Analyze this resume for Applicant Tracking System compatibility. Provide a structured analysis with these sections:\n1. Overall Score (0-100)\n2. Keyword Analysis\n3. Formatting Issues\n4. Content Gaps\n5. Specific Improvements"
      }, {
        role: "user",
        content: resumeText.substring(0, 3000)
      }],
      temperature: 0.7
    })

    return completion.choices[0].message.content
  } catch (error: any) {
    console.error('OpenAI Error:', error)
    throw new Error('Resume analysis failed: ' + error.message)
  }
}
