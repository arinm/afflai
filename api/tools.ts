import { defineEventHandler } from 'h3'
import type { ToolsResponse } from '~/types/tool'

export default defineEventHandler(async (event): Promise<ToolsResponse> => {
  try {
    // In a real app, this would be a database query with pagination
    const tools: ToolsResponse = {
      featuredTools: [
        {
          id: 'chatgpt',
          title: 'ChatGPT',
          description:
            'Powerful AI assistant for text generation, answering questions, and creative writing.',
          link: 'https://chat.openai.com/',
          pricing: 'Free tier available, ChatGPT Plus at $20/month',
          tags: ['conversational AI', 'content generation', 'writing assistant'],
          categoryId: 'text-generation',
          imageUrl: '/images/tools/chatgpt.jpg',
          features: [
            'Natural language conversations',
            'Code generation and explanation',
            'Content creation and editing',
          ],
          rating: 4.8,
          reviewCount: 1245,
        },
        {
          id: 'midjourney',
          title: 'Midjourney',
          description:
            'AI image generator creating stunning, high-quality visuals from text descriptions.',
          link: 'https://www.midjourney.com/',
          pricing: 'Basic plan at $10/month, Standard at $30/month',
          tags: ['image generation', 'artistic', 'design'],
          categoryId: 'image-generation',
          imageUrl: '/images/tools/midjourney.jpg',
          features: [
            'Text-to-image generation',
            'Multiple art styles',
            'High-resolution outputs',
          ],
          rating: 4.7,
          reviewCount: 893,
        },
        {
          id: 'elevenlabs',
          title: 'ElevenLabs',
          description:
            'Advanced voice AI platform for realistic text-to-speech and voice cloning.',
          link: 'https://elevenlabs.io/',
          pricing: 'Free tier available, Starter plan at $5/month',
          tags: ['voice synthesis', 'text-to-speech', 'voice cloning'],
          categoryId: 'audio-voice',
          imageUrl: '/images/tools/elevenlabs.jpg',
          features: [
            'Natural-sounding voices',
            'Voice cloning',
            'Emotion and intonation control',
          ],
          rating: 4.5,
          reviewCount: 421,
        },
        {
          id: 'github-copilot',
          title: 'GitHub Copilot',
          description:
            'AI pair programmer that suggests code completions based on context.',
          link: 'https://github.com/features/copilot',
          pricing: 'Individual plan at $10/month, Business plan at $19/user/month',
          tags: ['code generation', 'pair programming', 'developer tool'],
          categoryId: 'coding',
          imageUrl: '/images/tools/github-copilot.jpg',
          features: [
            'Code completion',
            'Multiple language support',
            'VS Code and JetBrains integration',
          ],
          rating: 4.6,
          reviewCount: 1567,
        },
      ],
      total: 4,
      page: 1,
      limit: 10,
    }

    return tools
  } catch (error) {
    console.error('Error fetching tools:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch tools',
    })
  }
})
