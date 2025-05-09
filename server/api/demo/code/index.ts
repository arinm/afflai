// server/api/demo/code/index.ts
import { OpenAI } from 'openai';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { prompt } = body;
    
    if (!prompt) {
      throw createError({
        statusCode: 400,
        message: 'Prompt is required'
      });
    }
    
    const config = useRuntimeConfig();
    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    });
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert coding assistant. Generate clean, efficient, and well-commented code based on the user's request.
          Return only the code without explanations or markdown formatting.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.3
    });
    
    return {
      code: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('Demo code generation error:', error);
    throw createError({
      statusCode: 500,
      message: 'Error generating code'
    });
  }
});