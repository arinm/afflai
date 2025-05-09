import { OpenAI } from 'openai';
import fs from 'fs/promises';
import path from 'path';

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
    let systemMessageAdded = false;
    
    // Check if we have a system message
    const systemMessageIndex = messages.findIndex(msg => msg.role === 'system');
    
    if (systemMessageIndex >= 0) {
      // System message exists, update it if it doesn't have tools info
      if (!messages[systemMessageIndex].content.includes('available AI tools')) {
        messages[systemMessageIndex].content += `\n\nHere are the available AI tools:\n${toolsInfo}`;
      }
    } else {
      // No system message found, add one
      messages.unshift({
        role: 'system',
        content: `You are an AI Tool Advisor specializing in helping people find the right AI tools. 
          Focus on providing specific recommendations from our catalog. When recommending tools, 
          include both the tool name and a brief reason why it's suitable. Format tool names as 
          [[ToolName]] so they can be turned into links. Be concise but helpful.
          
          Here are the available AI tools:
          ${toolsInfo}`
      });
      systemMessageAdded = true;
    }
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 500,
      temperature: 0.7
    });
    
    return {
      message: completion.choices[0].message.content,
      systemMessageAdded
    };
  } catch (error) {
    console.error('AI Advisor API error:', error);
    throw createError({
      statusCode: 500,
      message: 'Error generating AI response'
    });
  }
});

// Helper function to get tool information from JSON files
async function getToolsInfo(): Promise<string> {
  const dataDir = 'public/data';
  const jsonFiles = [];
  let toolsInfoList: string[] = [];
  
  try {
    // Check if the directory exists
    try {
      await fs.access(dataDir);
    } catch (error) {
      console.error(`Data directory ${dataDir} not found.`);
      return "No tools data available.";
    }
    
    // Read all files in the directory
    const files = await fs.readdir(dataDir);
    
    // Filter for JSON files
    const jsonFileNames = files.filter(file => 
      file.endsWith('.json') && file !== 'json-master-file.json'
    );
    
    // Read each file
    for (const fileName of jsonFileNames) {
      try {
        const filePath = path.join(dataDir, fileName);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        
        // Check if it has the expected structure
        if (data.category && data.tools && Array.isArray(data.tools)) {
          // Add category and its tools to the list
          const category = data.category;
          
          data.tools.forEach((tool: any) => {
            if (tool.title && tool.description && tool.pricing) {
              toolsInfoList.push(`[[${tool.title}]] - ${category}: ${tool.description.substring(0, 100)}... Pricing: ${tool.pricing}`);
            }
          });
        }
      } catch (error) {
        console.error(`Error processing file ${fileName}:`, error);
      }
    }
    
    // If we couldn't find any tools, return a default message
    if (toolsInfoList.length === 0) {
      return "No specific tool data available. I can still provide general advice about AI tools.";
    }
    
    return toolsInfoList.join('\n');
  } catch (error) {
    console.error('Error gathering tools information:', error);
    return "Unable to access tools database. I can still provide general advice about AI tools.";
  }
}