// import { OpenAI } from 'openai';

// export default defineEventHandler(async (event) => {
//   try {
//     const body = await readBody(event);
//     const { messages, category } = body;
    
//     if (!messages || !Array.isArray(messages) || !category) {
//       throw createError({
//         statusCode: 400,
//         message: 'Invalid request format. Both messages and category are required.'
//       });
//     }
    
//     const config = useRuntimeConfig();
//     const openai = new OpenAI({
//       apiKey: config.openaiApiKey
//     });
    
//     // Get category-specific tools information if not already in the system message
//     let systemMessageUpdated = false;
//     const systemMessageIndex = messages.findIndex(msg => msg.role === 'system');
    
//     if (systemMessageIndex >= 0) {
//       // If the system message doesn't already contain tools info, we'll add it
//       if (!messages[systemMessageIndex].content.includes('tools you know about')) {
//         try {
//           const categoryTools = await getCategoryTools(category);
//           messages[systemMessageIndex].content += `\n\nHere are the ${category} tools you know about:\n\n${categoryTools}`;
//           systemMessageUpdated = true;
//         } catch (error) {
//           console.error(`Error loading category data for ${category}:`, error);
//         }
//       }
//     }
    
//     // If we couldn't update the system message, we'll continue with what we have
    
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: messages,
//       max_tokens: 500,
//       temperature: 0.7
//     });
    
//     return {
//       message: completion.choices[0].message.content,
//       systemMessageUpdated
//     };
//   } catch (error) {
//     console.error('Category Agent API error:', error);
//     throw createError({
//       statusCode: 500,
//       message: 'Error generating AI response'
//     });
//   }
// });

// // Helper function to get category tools information
// async function getCategoryTools(category: string): Promise<string> {
//   // Format the category name to match file structure
//   const formattedCategory = category.toLowerCase().replace(/\s+/g, '-');
  
//   try {
//     // In a real implementation, this would be more robust
//     // For this example, we'll assume the JSON is in the public directory
//     const categoryDataPath = `./public/data/${formattedCategory}-json.json`;
    
//     // Check if file exists
//     const fs = await import('fs/promises');
//     await fs.access(categoryDataPath);
    
//     // Read the file
//     const fileContent = await fs.readFile(categoryDataPath, 'utf-8');
//     const categoryData = JSON.parse(fileContent);
    
//     if (!categoryData.tools || !Array.isArray(categoryData.tools)) {
//       return "No tools data available for this category.";
//     }
    
//     // Format tool information for the AI
//     const toolsInfo = categoryData.tools.map((tool: any) => {
//       return `[[${tool.title}]] - ${tool.description} Pricing: ${tool.pricing}. Tags: ${tool.tags.join(', ')}.`;
//     }).join('\n\n');
    
//     return toolsInfo;
//   } catch (error) {
//     console.error(`Error loading category data for ${category}:`, error);
//     return "Unable to load tools for this category.";
//   }
// }

// server/api/category-agent.ts (Mock version)
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { messages, category } = body;
    
    // Get the last user message
    const lastUserMessage = messages
      .filter(msg => msg.role === "user")
      .pop()?.content || "";
    
    const userMessageLower = lastUserMessage.toLowerCase();
    let response = "";
    
    // Provide category-specific responses
    if (category.toLowerCase().includes("text")) {
      if (userMessageLower.includes("best") || userMessageLower.includes("top")) {
        response = "The top text generation tools right now are [[ChatGPT]], [[Claude]], and [[Gemini]]. ChatGPT is the most versatile, Claude excels at following instructions, and Gemini has strong multimodal capabilities.";
      } else if (userMessageLower.includes("free")) {
        response = "For free text generation, [[ChatGPT]] offers a solid free tier. [[Gemini]] also has a free version with good capabilities. If you need coding help, [[GitHub Copilot]] offers a free tier for students.";
      } else {
        response = "I can help you find the right text generation tool! Popular options include [[ChatGPT]], [[Claude]], [[Gemini]], [[Jasper]], and [[Copy.ai]]. What specific writing or content needs do you have?";
      }
    } 
    else if (category.toLowerCase().includes("image")) {
      if (userMessageLower.includes("realistic")) {
        response = "For realistic image generation, [[DALL-E]] by OpenAI produces some of the most photorealistic results. [[Midjourney]] version 6 has also greatly improved in realism.";
      } else if (userMessageLower.includes("artistic") || userMessageLower.includes("art")) {
        response = "For artistic styles, [[Midjourney]] is widely regarded as the best option, with exceptional aesthetic quality. [[Stable Diffusion]] with specific checkpoints like Dreamshaper also creates beautiful artistic renderings.";
      } else {
        response = "Popular image generation tools include [[Midjourney]], [[DALL-E]], [[Stable Diffusion]], and [[Leonardo.AI]]. Each has different strengths - Midjourney for artistic quality, DALL-E for realism, and Stable Diffusion for customization.";
      }
    }
    // Add more categories as needed
    else {
      response = `I'm your ${category} specialist! I can help you find the perfect tools in this category based on your specific needs. What are you looking to accomplish?`;
    }
    
    // Add a small delay
    const responseTime = Math.floor(Math.random() * 1500) + 1000;
    await new Promise(resolve => setTimeout(resolve, responseTime));
    
    return { message: response };
  } catch (error) {
    console.error("Mock Category Agent error:", error);
    return { message: "Sorry, I encountered an error. Please try again later." };
  }
});