<!-- components/category/CategoryAgent.vue -->
<template>
  <div class="category-agent">
    <div class="category-agent__header">
      <h3>{{ categoryName }} AI Assistant</h3>
      <p>
        Ask me specific questions about {{ categoryName.toLowerCase() }} tools
      </p>
    </div>

    <div class="category-agent__chat" ref="chatContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['agent-message', `agent-message--${message.role}`]"
        v-show="message.role !== 'system'"
      >
        <div class="agent-message__avatar" v-if="message.role === 'assistant'">
          <component :is="categoryIcon" />
        </div>
        <div
          class="agent-message__content"
          v-html="formatMessage(message.content)"
        ></div>
      </div>

      <div v-if="isLoading" class="agent-message agent-message--assistant">
        <div class="agent-message__avatar">
          <component :is="categoryIcon" />
        </div>
        <div class="agent-message__content">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="category-agent__input">
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        :placeholder="`Ask about ${categoryName.toLowerCase()} tools...`"
        :disabled="isLoading"
      />
      <button
        @click="sendMessage"
        :disabled="isLoading || !userInput.trim()"
        class="category-agent__send"
      >
        Send
      </button>
    </div>

    <div class="category-agent__suggestions">
      <button
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="useQuickQuestion(suggestion)"
        class="suggestion-button"
      >
        {{ suggestion }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import DOMPurify from "dompurify";
import { marked } from "marked";

const props = defineProps({
  categoryName: {
    type: String,
    required: true,
  },
  categoryData: {
    type: Object,
    required: true,
  },
});

// Determine icon based on category
const categoryIcon = computed(() => {
  const category = props.categoryName.toLowerCase();
  if (category.includes("text")) return resolveComponent("IconText");
  if (category.includes("image")) return resolveComponent("IconImage");
  if (category.includes("audio") || category.includes("voice"))
    return resolveComponent("IconAudio");
  if (category.includes("video")) return resolveComponent("IconVideo");
  if (category.includes("code")) return resolveComponent("IconCode");
  return resolveComponent("IconDefault");
});

// Generate suggestions based on category
const suggestions = computed(() => {
  const category = props.categoryName.toLowerCase();

  if (category.includes("text")) {
    return [
      "What's the best free text generator?",
      "Compare ChatGPT vs Claude",
      "Which tool is best for creative writing?",
    ];
  }
  if (category.includes("image")) {
    return [
      "Which tool creates the most realistic images?",
      "Best tool for artistic styles?",
      "Free alternatives to Midjourney?",
    ];
  }
  // Add more categories...

  return [
    "What's the most popular tool?",
    "Which tool has the best free tier?",
    "Best tool for beginners?",
  ];
});

// State
const userInput = ref("");
const isLoading = ref(false);
const chatContainer = ref(null);

// Generate system prompt based on category data
const systemPrompt = computed(() => {
  const toolsInfo = props.categoryData.tools
    .map((tool) => {
      return `[[${tool.title}]] - ${tool.description} Pricing: ${
        tool.pricing
      }. Tags: ${tool.tags.join(", ")}.`;
    })
    .join("\n\n");

  return `You are an AI assistant specializing in ${props.categoryName} tools. 
    Be knowledgeable, concise, and helpful. When referencing specific tools, format the name as [[ToolName]].
    Here are the ${props.categoryName} tools you know about:
    
    ${toolsInfo}
    
    If asked to compare tools, create a simple comparison highlighting their key differences. 
    If asked for recommendations, suggest 2-3 specific tools that best match the user's needs.`;
});

const messages = ref([
  { role: "system", content: systemPrompt.value },
  {
    role: "assistant",
    content: `Hi there! 👋 I'm your ${
      props.categoryName
    } AI assistant. I can help you find the right tools, compare options, or answer specific questions about ${props.categoryName.toLowerCase()} tools. How can I help you today?`,
  },
]);

// Methods
function formatMessage(content) {
  // Convert markdown to HTML
  let html = marked(content);

  // Find tool references [[ToolName]] and convert to links
  html = html.replace(
    /\[\[(.*?)\]\]/g,
    '<a href="/tools/$1" class="tool-link">$1</a>'
  );

  // Sanitize HTML
  return DOMPurify.sanitize(html);
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}

function useQuickQuestion(question) {
  userInput.value = question;
  sendMessage();
}

async function sendMessage() {
  if (!userInput.value.trim() || isLoading.value) return;

  // Add user message
  const userMessage = userInput.value.trim();
  messages.value.push({ role: "user", content: userMessage });
  userInput.value = "";
  scrollToBottom();

  // Set loading state
  isLoading.value = true;

  try {
    // Call API
    const response = await fetch("/api/category-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.value,
        category: props.categoryName,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response");
    }

    const data = await response.json();

    // Add assistant response
    messages.value.push({ role: "assistant", content: data.message });
  } catch (error) {
    console.error("Category Agent error:", error);
    messages.value.push({
      role: "assistant",
      content: "Sorry, I encountered an error. Please try again.",
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
}

// Watch for changes
watch(() => messages.value.length, scrollToBottom);
watch(
  () => props.categoryName,
  () => {
    // Reset conversation when category changes
    messages.value = [
      { role: "system", content: systemPrompt.value },
      {
        role: "assistant",
        content: `Hi there! 👋 I'm your ${
          props.categoryName
        } AI assistant. I can help you find the right tools, compare options, or answer specific questions about ${props.categoryName.toLowerCase()} tools. How can I help you today?`,
      },
    ];
  }
);
</script>

<style lang="scss">
.category-agent {
  @include card;
  margin: $spacing-xl 0;
  max-width: 800px;

  &__header {
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-md;
    border-bottom: 1px solid $border-color;

    h3 {
      margin-bottom: $spacing-xs;
      color: $primary-color;
    }

    p {
      color: $text-color-secondary;
      margin: 0;
    }
  }

  &__chat {
    height: 350px;
    overflow-y: auto;
    padding: $spacing-sm;
    background-color: $bg-color-secondary;
    border-radius: $border-radius;
    margin-bottom: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__input {
    display: flex;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;

    input {
      flex: 1;
      padding: $spacing-sm $spacing-md;
      border: 1px solid $border-color;
      border-radius: $border-radius;

      &:focus {
        outline: none;
        border-color: $primary-color;
        box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
      }
    }

    button {
      @include button-variant($primary-color, white);
    }
  }

  &__suggestions {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
  }
}

.agent-message {
  display: flex;
  gap: $spacing-sm;
  max-width: 85%;

  &--user {
    align-self: flex-end;
    flex-direction: row-reverse;

    .agent-message__content {
      background-color: $primary-color;
      color: white;
      border-radius: $border-radius $border-radius 0 $border-radius;
    }
  }

  &--assistant {
    align-self: flex-start;

    .agent-message__content {
      background-color: white;
      border-radius: 0 $border-radius $border-radius $border-radius;
    }
  }

  &__avatar {
    width: 36px;
    height: 36px;
    background-color: $primary-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      color: white;
    }
  }

  &__content {
    padding: $spacing-sm $spacing-md;
    border-radius: $border-radius;
    box-shadow: $card-shadow;

    p {
      margin: 0 0 $spacing-xs;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .tool-link {
      color: $primary-color;
      font-weight: $font-weight-medium;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.suggestion-button {
  font-size: $font-size-sm;
  padding: $spacing-xs $spacing-sm;
  background-color: $bg-color-secondary;
  border: 1px solid $border-color;
  border-radius: $border-radius-full;
  transition: all $transition-normal;
  cursor: pointer;

  &:hover {
    background-color: $primary-color;
    color: white;
    border-color: $primary-color;
  }
}

.typing-indicator {
  display: flex;
  gap: 4px;

  span {
    width: 8px;
    height: 8px;
    background-color: $primary-color;
    border-radius: 50%;
    opacity: 0.6;
    animation: dot-pulse 1.5s infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes dot-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
