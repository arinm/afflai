import { OpenAI } from 'openai';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { description } = body;
    
    if (!description) {
      throw createError({
        statusCode: 400,
        message: 'Description is required'
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
          content: `You are an AI image prompt expert. You help users create detailed, effective prompts for 
          AI image generation tools like Midjourney, DALL-E, or Stable Diffusion. Enhance their basic 
          description with specific details about style, lighting, composition, etc.
          
          Format your response as a single paragraph without any explanation or introduction. 
          Focus only on the enhanced prompt text.`
        },
        {
          role: "user",
          content: `Enhance this image description for AI image generation: "${description}"`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });
    
    return {
      enhancedPrompt: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('Demo image prompt error:', error);
    throw createError({
      statusCode: 500,
      message: 'Error generating image prompt'
    });
  }
});