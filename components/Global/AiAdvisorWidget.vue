<!-- components/global/AiAdvisorWidget.vue -->
<template>
  <div>
    <!-- Floating button to open the chat -->
    <button
      v-if="!isOpen"
      @click="openChat"
      class="chat-widget-button"
      aria-label="Open AI Advisor"
    >
      <IconAssistant />
      <span>AI Advisor</span>
    </button>

    <!-- Chat window -->
    <Transition name="slide-up">
      <div v-if="isOpen" class="chat-widget">
        <div class="chat-widget__header">
          <h3>AI Tools Advisor</h3>
          <button
            @click="closeChat"
            class="chat-widget__close"
            aria-label="Close chat"
          >
            <IconClose />
          </button>
        </div>

        <div class="chat-widget__body" ref="chatBody">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['chat-message', `chat-message--${message.role}`]"
            v-show="message.role !== 'system'"
          >
            <div
              class="chat-message__avatar"
              v-if="message.role === 'assistant'"
            >
              <IconBot />
            </div>
            <div
              class="chat-message__content"
              v-html="formatMessage(message.content)"
            ></div>
          </div>

          <div v-if="isLoading" class="chat-message chat-message--assistant">
            <div class="chat-message__avatar">
              <IconBot />
            </div>
            <div class="chat-message__typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div class="chat-widget__footer">
          <input
            v-model="userInput"
            @keyup.enter="sendMessage"
            placeholder="Ask me about AI tools..."
            :disabled="isLoading"
            ref="inputField"
          />
          <button
            @click="sendMessage"
            :disabled="isLoading || !userInput.trim()"
            class="chat-widget__send"
            aria-label="Send message"
          >
            <IconSend />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import DOMPurify from "dompurify";
import { marked } from "marked";

// State
const isOpen = ref(false);
const userInput = ref("");
const messages = ref([
  {
    role: "system",
    content: `You are an AI Tool Advisor specializing in helping people find the right AI tools. 
      Focus on providing specific recommendations from our catalog. When recommending tools, 
      include both the tool name and a brief reason why it's suitable. Format tool names as 
      [[ToolName]] so they can be turned into links. Be concise but helpful.`,
  },
  {
    role: "assistant",
    content: `Hi there! 👋 I'm your AI Tool Advisor. I can help you find the perfect AI tools for your needs. What kind of AI tool are you looking for today?`,
  },
]);
const isLoading = ref(false);
const chatBody = ref(null);
const inputField = ref(null);

// Methods
function openChat() {
  isOpen.value = true;
  nextTick(() => {
    inputField.value?.focus();
    scrollToBottom();
  });
}

function closeChat() {
  isOpen.value = false;
}

function scrollToBottom() {
  nextTick(() => {
    if (chatBody.value) {
      chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
  });
}

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
    const response = await fetch("/api/ai-advisor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.value }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response");
    }

    const data = await response.json();

    // Add assistant response
    messages.value.push({ role: "assistant", content: data.message });
  } catch (error) {
    console.error("AI Advisor error:", error);
    messages.value.push({
      role: "assistant",
      content: "Sorry, I encountered an error. Please try again.",
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
}

// Watch for changes to auto-scroll
watch(() => messages.value.length, scrollToBottom);
</script>

<style lang="scss">
.chat-widget-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba($primary-color, 0.3);
  transition: all 0.3s ease;
  z-index: 999;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba($primary-color, 0.4);
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.chat-widget {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: $border-radius-lg;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;

  &__header {
    padding: 16px;
    background-color: $primary-color;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      font-size: $font-size-lg;
      color: white;
    }
  }

  &__close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &__body {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__footer {
    padding: 12px 16px;
    border-top: 1px solid $border-color;
    display: flex;
    gap: 8px;

    input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid $border-color;
      border-radius: $border-radius;

      &:focus {
        outline: none;
        border-color: $primary-color;
        box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
      }
    }
  }

  &__send {
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: $border-radius;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
}

.chat-message {
  display: flex;
  gap: 8px;
  max-width: 90%;

  &--user {
    align-self: flex-end;
    flex-direction: row-reverse;

    .chat-message__content {
      background-color: $primary-color;
      color: white;
      border-radius: 12px 12px 0 12px;
    }
  }

  &--assistant {
    align-self: flex-start;

    .chat-message__content {
      background-color: $bg-color-secondary;
      border-radius: 0 12px 12px 12px;
    }
  }

  &__avatar {
    width: 32px;
    height: 32px;
    background-color: rgba($primary-color, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 18px;
      height: 18px;
      color: $primary-color;
    }
  }

  &__content {
    padding: 10px 14px;

    p {
      margin: 0 0 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .tool-link {
      color: inherit;
      font-weight: bold;
      text-decoration: none;
      border-bottom: 1px dashed currentColor;

      &:hover {
        color: $primary-color;
      }
    }
  }

  &__typing {
    background-color: $bg-color-secondary;
    border-radius: 0 12px 12px 12px;
    padding: 16px;
    display: flex;
    gap: 4px;

    span {
      width: 8px;
      height: 8px;
      background-color: $text-color-secondary;
      border-radius: 50%;
      animation: typing 1.4s infinite both;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
}

@keyframes typing {
  0% {
    opacity: 0.3;
    transform: translateY(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px);
  }
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
