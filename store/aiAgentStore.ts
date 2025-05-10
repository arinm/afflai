// server/api/ai-advisor.ts
import { OpenAI } from 'openai';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { messages } = body;
    
    if (!messages || !Array.isArray(messages)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid messages format'
      });
    }
    
    const config = useRuntimeConfig();
    const openai = new OpenAI({
      apiKey: config.openaiApiKey
    });
    
    // Add tool information to system message for better recommendations
    const toolsInfo = await getToolsInfo();
    const systemMessage = messages[0];
    
    if (systemMessage.role === 'system') {
      systemMessage.content += `\n\nHere are the available AI tools:\n${toolsInfo}`;
    }
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });
    
    return {
      message: completion.choices[0].message.content
    };
  } catch (error) {
    console.error('AI Advisor API error:', error);
    throw createError({
      statusCode: 500,
      message: 'Error generating AI response'
    });
  }
});

// Helper function to get tool information from the database/files
async function getToolsInfo() {
  // In a real implementation, fetch from your database or JSON files
  // This is simplified for the example
  const categories = ['Text Generation', 'Image Generation', 'Audio & Voice', 'Video Generation'];
  const toolsInfoList = [];
  
  for (const category of categories) {
    try {
      const categoryData = await readFile(`public/data/${category.toLowerCase().replace(/\s+/g, '-')}-json.json`);
      const tools = JSON.parse(categoryData).tools;
      
      tools.forEach(tool => {
        toolsInfoList.push(`[[${tool.title}]] - ${category}: ${tool.description.slice(0, 100)}... Pricing: ${tool.pricing}`);
      });
    } catch (error) {
      console.error(`Error reading category data for ${category}:`, error);
    }
  }
  
  return toolsInfoList.join('\n');
}