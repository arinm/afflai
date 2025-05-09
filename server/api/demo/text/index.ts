// // server/api/demo/text/index.ts
// import { OpenAI } from 'openai';

// export default defineEventHandler(async (event) => {
//   try {
//     const body = await readBody(event);
//     const { prompt } = body;
    
//     if (!prompt) {
//       throw createError({
//         statusCode: 400,
//         message: 'Prompt is required'
//       });
//     }
    
//     const config = useRuntimeConfig();
//     const openai = new OpenAI({
//       apiKey: config.openaiApiKey
//     });
    
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful AI assistant. Create a concise, informative response to the user's prompt. Keep it under 200 words."
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       max_tokens: 300,
//       temperature: 0.7
//     });
    
//     return {
//       result: completion.choices[0].message.content
//     };
//   } catch (error) {
//     console.error('Demo text generation error:', error);
//     throw createError({
//       statusCode: 500,
//       message: 'Error generating text response'
//     });
//   }
// });

// server/api/demo/text/index.ts (Mock version)
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { prompt } = body;
    
    // Simple responses based on keywords
    let result = "AI tools can dramatically improve productivity across many fields. They automate repetitive tasks, generate creative content, and provide insights from data. As these technologies advance, they're becoming increasingly accessible to users without technical expertise.";
    
    if (prompt.toLowerCase().includes("future")) {
      result = "The future of AI looks incredibly promising. We're seeing rapid advancements in generative models, multimodal understanding, and domain-specific applications. In coming years, expect AI to become more personalized, context-aware, and seamlessly integrated into daily workflows. The boundary between human and AI creation will continue to blur, creating new opportunities and challenges.";
    } else if (prompt.toLowerCase().includes("business") || prompt.toLowerCase().includes("company")) {
      result = "Businesses are increasingly leveraging AI tools to gain competitive advantages. From automated customer service to data-driven decision making, AI is transforming operations across industries. Companies that strategically implement AI report higher efficiency, reduced costs, and improved customer experiences. The key to success is identifying high-value use cases and thoughtfully integrating AI into existing workflows.";
    }
    
    // Add a delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return { result };
  } catch (error) {
    console.error("Mock text generation error:", error);
    return { result: "Sorry, I encountered an error generating text. Please try again with a different prompt." };
  }
});