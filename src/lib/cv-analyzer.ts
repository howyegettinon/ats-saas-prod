import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResume(resumeText: string, jobDescription?: string) {
  try {
    const messages = [
      {
        role: "system",
        content: `You are an experienced Irish HR professional and ATS expert. 
        Analyze resumes for ATS compatibility and provide actionable, specific improvements.
        Use a warm, professional tone while maintaining technical accuracy.
        Focus on practical suggestions that will make a real difference in the Irish job market.

        Your analysis must include these sections with Irish market context:
        1. ATS Compatibility Score (0-100)
        2. Keyword Analysis & Industry Fit
        3. Format & Structure Review
        4. Content Strength Analysis
        5. Specific Action Items
        6. Impact Statement Examples`
      },
      {
        role: "user",
        content: `
        ${jobDescription ? `Job Description:\n${jobDescription}\n\n` : ''}
        CV to Analyze:\n${resumeText}
        
        Provide a detailed analysis focusing on:
        1. How well this CV will perform with ATS systems
        2. Specific keywords present and missing
        3. Formatting issues that could affect ATS scanning
        4. Content gaps and areas needing strengthening
        5. Clear, actionable improvements prioritized by impact
        6. Example achievement statements that would strengthen the CV
        
        Keep suggestions practical and relevant to the Irish market.
        Format the response with clear headings and bullet points for readability.`
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages,
      temperature: 0.7,
      max_tokens: 1200,
      top_p: 0.9,
      frequency_penalty: 0.2,
      presence_penalty: 0.3
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    throw new Error('Resume analysis failed: ' + error.message);
  }
}
