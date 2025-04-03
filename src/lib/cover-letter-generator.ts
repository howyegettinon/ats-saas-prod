import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateCoverLetter(jobDescription: string, resume: string) {
  try {
    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: `You are an experienced Irish HR professional writing highly engaging, natural-sounding cover letters for job applicants in Ireland. 
        Your style is warm, professional, and never robotic. Avoid generic phrases like 'I am passionate' or 'I am excited' and instead use natural, confident language.
        Ensure the letter flows well and does not sound AI-generated. Incorporate minor Irish workplace nuances and professional etiquette.
        
        Guidelines:
        - Write in first person but avoid overusing "I" statements
        - Keep paragraphs concise (2-3 sentences each)
        - Never mention "attached CV" or "resume"
        - Focus on value and concrete examples
        - Use natural transitions between paragraphs
        - Include subtle Irish professional context where appropriate`
      },
      {
        role: "user",
        content: `Job Description:\n${jobDescription}\n\nCV Content:\n${resume}\n\nGenerate a concise, engaging cover letter that highlights how my experience aligns with this job. Ensure the tone feels human and Irish. End with a strong closing statement. Format with proper spacing and line breaks.`
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: messages,
      temperature: 0.7,
      max_tokens: 600,
      top_p: 0.9,
      frequency_penalty: 0.2,
      presence_penalty: 0.3
    });

    return completion.choices[0].message.content;
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    throw new Error('Cover letter generation failed: ' + error.message);
  }
}
