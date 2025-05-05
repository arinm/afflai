import { defineEventHandler } from 'h3'
import type { CategoriesResponse } from '~/types/category'

export default defineEventHandler(async (event): Promise<CategoriesResponse> => {
  try {
    // In a real app, this would be a database query
    const categories: CategoriesResponse = {
      featuredCategories: [
        {
          id: 'text-generation',
          name: 'Text Generation',
          slug: 'text-generation',
          icon: 'IconText',
          description: 'AI tools for content creation, writing assistance, and text generation.',
          toolCount: 42,
        },
        {
          id: 'image-generation',
          name: 'Image Generation',
          slug: 'image-generation',
          icon: 'IconImage',
          description: 'Create stunning visuals and artwork using AI-powered image generators.',
          toolCount: 35,
        },
        {
          id: 'audio-voice',
          name: 'Audio & Voice',
          slug: 'audio-voice',
          icon: 'IconAudio',
          description: 'Generate and manipulate audio content with AI-powered tools.',
          toolCount: 28,
        },
        {
          id: 'video-generation',
          name: 'Video Generation',
          slug: 'video-generation',
          icon: 'IconVideo',
          description: 'Create videos and animations using AI-powered video generation tools.',
          toolCount: 19,
        },
        {
          id: 'productivity',
          name: 'Productivity',
          slug: 'productivity-organization',
          icon: 'IconProductivity',
          description: 'Boost your workflow with AI assistants and automation tools.',
          toolCount: 31,
        },
        {
          id: 'coding',
          name: 'Coding & Development',
          slug: 'code-development',
          icon: 'IconCode',
          description: 'AI-powered coding assistants, bug fixers, and development tools.',
          toolCount: 27,
        },
      ],
      total: 6,
    }

    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch categories',
    })
  }
})
})
