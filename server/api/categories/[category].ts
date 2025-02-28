import fs from 'fs';
import path from 'path';
import { defineEventHandler, createError } from 'h3';
import type { Category } from '~/types';

export default defineEventHandler(async (event) => {
  // Get category parameter from URL
  const category = getRouterParam(event, 'category');
  
  if (!category) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Category parameter is required'
    });
  }
  
  try {
    // First load the master file to find the correct JSON file name
    const masterFilePath = path.resolve('./public/data/json-master-file.json');
    const masterFileContent = await fs.promises.readFile(masterFilePath, 'utf-8');
    const masterData = JSON.parse(masterFileContent);
    
    // Get the file name for the requested category
    const fileName = masterData.categoryFiles[category];
    
    if (!fileName) {
      throw createError({
        statusCode: 404,
        statusMessage: `Category "${category}" not found`
      });
    }
    
    // Read the category data file
    const filePath = path.resolve(`./public/data/${fileName}.json`);
    const fileContent = await fs.promises.readFile(filePath, 'utf-8');
    const categoryData = JSON.parse(fileContent) as Category;
    
    // Set cache headers for better performance
    setResponseHeaders(event, {
      'Cache-Control': 'public, max-age=3600, s-maxage=86400'
    });
    
    return categoryData;
  } catch (error: any) {
    // Handle file system errors
    if (error.code === 'ENOENT') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Category data not found'
      });
    }
    
    // Handle other errors
    console.error(`Error fetching category ${category}:`, error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    });
  }
});