import { defineEventHandler } from 'h3';
import type { CategoriesResponse } from '~/types';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event): Promise<CategoriesResponse> => {
  try {
    // Get the path to the public directory
    const publicDir = path.resolve(process.cwd(), 'public');
    
    // Read the master file directly from the filesystem
    const masterFilePath = path.join(publicDir, 'data', 'json-master-file.json');
    const masterFileContent = fs.readFileSync(masterFilePath, 'utf-8');
    const masterFile = JSON.parse(masterFileContent);
    
    // Get the list of categories from the master file
    const categories = [];
    
    for (const categorySlug of masterFile.categories) {
      const fileName = masterFile.categoryFiles[categorySlug];
      
      try {
        // Read the category file directly from the filesystem
        const categoryFilePath = path.join(publicDir, 'data', `${fileName}.json`);
        const categoryFileContent = fs.readFileSync(categoryFilePath, 'utf-8');
        const categoryData = JSON.parse(categoryFileContent);
        
        // Add the category with its slug
        categories.push({
          ...categoryData,
          slug: categorySlug
        });
      } catch (err) {
        console.error(`Failed to fetch category ${categorySlug}:`, err);
      }
    }
    
    return {
      categories,
      success: true
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    return {
      categories: [],
      success: false,
      error: 'Failed to fetch categories'
    };
  }
});
