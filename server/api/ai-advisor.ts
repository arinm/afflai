// server/api/ai-advisor.ts (Mock version)
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { messages } = body;
    
    // Get the last user message
    const lastUserMessage = messages
      .filter(msg => msg.role === "user")
      .pop()?.content || "";
    
    // Simple keyword-based responses
    let response = "I'm not sure about that. Let me suggest some popular AI tools:";
    
    const userMessageLower = lastUserMessage.toLowerCase();
    
    if (userMessageLower.includes("text") || userMessageLower.includes("writing") || userMessageLower.includes("content")) {
      response = "For text generation and content creation, I recommend trying [[ChatGPT]] which has a robust free tier. If you need more advanced features, [[Claude]] is an excellent alternative with strong reasoning capabilities. For specialized writing, [[Jasper]] is popular among marketing professionals.";
    } 
    else if (userMessageLower.includes("image") || userMessageLower.includes("art") || userMessageLower.includes("picture")) {
      response = "For image generation, [[Midjourney]] is fantastic for artistic styles, while [[DALL-E]] excels at realistic imagery. If you're looking for a free option, try [[Stable Diffusion]] which you can run locally.";
    }
    else if (userMessageLower.includes("video") || userMessageLower.includes("animation")) {
      response = "For video generation, check out [[Runway]] which offers amazing text-to-video capabilities. [[Synthesia]] is great for creating videos with AI avatars, and [[D-ID]] specializes in talking head videos with realistic digital humans.";
    }
    else if (userMessageLower.includes("code") || userMessageLower.includes("programming") || userMessageLower.includes("developer")) {
      response = "For coding assistance, [[GitHub Copilot]] is the leading AI pair programmer that integrates with most IDEs. [[Tabnine]] offers a robust free tier for code completions, and [[Replit Ghostwriter]] is perfect if you work in Replit's online environment.";
    }
    else if (userMessageLower.includes("audio") || userMessageLower.includes("voice") || userMessageLower.includes("speech")) {
      response = "For voice and audio AI, [[ElevenLabs]] offers incredibly realistic voice synthesis. [[Play.ht]] is great for text-to-speech with many voice options, and [[Descript]] provides excellent audio editing capabilities with AI.";
    }
    else if (userMessageLower.includes("compare") || userMessageLower.includes("difference") || userMessageLower.includes("versus") || userMessageLower.includes("vs")) {
      response = "When comparing AI tools, it's important to consider your specific needs. For example, [[ChatGPT]] has a broader knowledge base while [[Claude]] tends to be better at following instructions. [[Midjourney]] excels at artistic imagery while [[DALL-E]] is often better for realistic photos. Would you like me to compare specific tools?";
    }
    else if (userMessageLower.includes("free") || userMessageLower.includes("cost") || userMessageLower.includes("pricing")) {
      response = "Several AI tools offer free tiers. [[ChatGPT]] has a solid free version, [[Stable Diffusion]] can be run locally for free, and [[Tabnine]] offers a free tier for code completion. Most premium tools like [[Midjourney]] and [[Claude]] offer trial credits so you can test before subscribing.";
    }
    else {
      response = "I can help you find the right AI tools! We have options for text generation, image creation, video production, coding assistance, and much more. What specific task are you trying to accomplish?";
    }
    
    // Add a small delay to simulate processing time (between 1-2.5 seconds)
    const responseTime = Math.floor(Math.random() * 1500) + 1000;
    await new Promise(resolve => setTimeout(resolve, responseTime));
    
    return { message: response };
  } catch (error) {
    console.error("Mock AI error:", error);
    return { message: "Sorry, I encountered an error. Please try again later." };
  }
});