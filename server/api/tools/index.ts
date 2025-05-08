import { defineEventHandler } from 'h3';
import type { ToolsResponse, Tool } from '~/types';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event): Promise<ToolsResponse> => {
  try {
    // Get the path to the public directory
    const publicDir = path.resolve(process.cwd(), 'public');
    
    // Read the master file directly from the filesystem
    const masterFilePath = path.join(publicDir, 'data', 'json-master-file.json');
    const masterFileContent = fs.readFileSync(masterFilePath, 'utf-8');
    const masterFile = JSON.parse(masterFileContent);
    
    // Get the list of categories from the master file
    const allTools: Tool[] = [];
    const toolIds = new Set<string>();
    
    for (const categorySlug of masterFile.categories) {
      const fileName = masterFile.categoryFiles[categorySlug];
      
      try {
        // Read the category file directly from the filesystem
        const categoryFilePath = path.join(publicDir, 'data', `${fileName}.json`);
        const categoryFileContent = fs.readFileSync(categoryFilePath, 'utf-8');
        const categoryData = JSON.parse(categoryFileContent);
        
        // Add tools from this category, avoiding duplicates
        for (const tool of categoryData.tools) {
          if (!toolIds.has(tool.id)) {
            toolIds.add(tool.id);
            
            // Add category information to the tool
            allTools.push({
              ...tool,
              categories: tool.categories || [categorySlug]
            });
          }
        }
      } catch (err) {
        console.error(`Failed to fetch category ${categorySlug}:`, err);
      }
    }
    
    // Sort tools by popularity or date added (using a placeholder rating for now)
    const sortedTools = allTools.sort((a, b) => {
      // You could use a real metric here like views, ratings, etc.
      return (b.rating || 0) - (a.rating || 0);
    });
    
    // Return the top tools (e.g., top 8)
    const featuredTools = sortedTools.slice(0, 8);
    
    return {
      tools: featuredTools,
      success: true
    };
  } catch (error) {
    console.error('Error fetching tools:', error);
    
    return {
      tools: [],
      success: false,
      error: 'Failed to fetch tools'
    };
  }
});
