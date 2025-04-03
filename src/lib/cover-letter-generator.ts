
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCoverLetter(jobDescription: string, resume: string) {
  try {
    const prompt = `
Job Description:
${jobDescription}

Resume:
${resume}

Based on the provided job description and resume, generate a professional cover letter that:
1. Matches the candidate's experience with job requirements
2. Highlights relevant skills and achievements
3. Shows enthusiasm for the role
4. Maintains a professional tone
5. Is concise but comprehensive
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: "You are a professional cover letter writer. Create a compelling cover letter that matches the candidate's experience with the job requirements."
      }, {
        role: "user",
        content: prompt
      }],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    throw new Error('Cover letter generation failed: ' + error.message);
  }
}
