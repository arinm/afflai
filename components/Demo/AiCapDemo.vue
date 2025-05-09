<template>
  <div class="capability-demo">
    <div class="capability-demo__header">
      <h3>{{ demoTitle }}</h3>
      <div class="capability-demo__tabs">
        <button
          v-for="tab in availableTabs"
          :key="tab.id"
          :class="['capability-demo__tab', { active: activeTab === tab.id }]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="capability-demo__content">
      <!-- Text Generation Demo -->
      <div v-if="activeTab === 'text'" class="demo-panel">
        <div class="demo-panel__input">
          <label>Enter a topic or prompt:</label>
          <textarea
            v-model="textInput"
            placeholder="Write about the future of AI in healthcare..."
            rows="3"
          ></textarea>
          <div class="demo-panel__controls">
            <button
              @click="generateText"
              :disabled="isLoading || !textInput.trim()"
              class="btn btn-primary"
            >
              {{ isLoading ? "Generating..." : "Generate Text" }}
            </button>
          </div>
        </div>

        <div class="demo-panel__output">
          <h4>Generated Result:</h4>
          <div
            class="demo-panel__result"
            v-html="formatOutput(textOutput)"
          ></div>

          <div class="demo-panel__cta">
            <p>Interested in text generation tools like this?</p>
            <NuxtLink to="/categories/text-generation" class="btn btn-outline">
              Explore Text AI Tools
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Image Prompt Demo -->
      <div v-if="activeTab === 'image'" class="demo-panel">
        <div class="demo-panel__input">
          <label>Describe an image you'd like to generate:</label>
          <textarea
            v-model="imageInput"
            placeholder="A futuristic city with flying cars and neon lights..."
            rows="3"
          ></textarea>
          <div class="demo-panel__controls">
            <button
              @click="generateImagePrompt"
              :disabled="isLoading || !imageInput.trim()"
              class="btn btn-primary"
            >
              {{ isLoading ? "Analyzing..." : "Get Optimal Prompt" }}
            </button>
          </div>
        </div>

        <div class="demo-panel__output">
          <h4>Enhanced Image Prompt:</h4>
          <div class="demo-panel__result">
            <p>{{ imageOutput }}</p>

            <div class="prompt-tags" v-if="imageOutput">
              <div class="prompt-tag">4K</div>
              <div class="prompt-tag">Highly detailed</div>
              <div class="prompt-tag">Cinematic lighting</div>
              <div class="prompt-tag">Sharp focus</div>
            </div>
          </div>

          <div class="demo-panel__cta">
            <p>Want to create amazing images with AI?</p>
            <NuxtLink to="/categories/image-generation" class="btn btn-outline">
              Explore Image AI Tools
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Code Completion Demo -->
      <div v-if="activeTab === 'code'" class="demo-panel">
        <div class="demo-panel__input">
          <label>Enter code or a coding task:</label>
          <textarea
            v-model="codeInput"
            placeholder="// Write a function to sort an array of objects by a property"
            rows="5"
          ></textarea>
          <div class="demo-panel__controls">
            <button
              @click="generateCode"
              :disabled="isLoading || !codeInput.trim()"
              class="btn btn-primary"
            >
              {{ isLoading ? "Coding..." : "Complete Code" }}
            </button>
          </div>
        </div>

        <div class="demo-panel__output">
          <h4>Generated Code:</h4>
          <div class="demo-panel__result code-result">
            <pre><code>{{ codeOutput }}</code></pre>
          </div>

          <div class="demo-panel__cta">
            <p>Need AI assistance with coding?</p>
            <NuxtLink to="/categories/code-development" class="btn btn-outline">
              Explore Coding AI Tools
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DOMPurify from "dompurify";
import { marked } from "marked";

const props = defineProps({
  demoTitle: {
    type: String,
    default: "Try AI Capabilities",
  },
  initialTab: {
    type: String,
    default: "text",
  },
});

// Available demo tabs
const availableTabs = [
  { id: "text", label: "Text Generation" },
  { id: "image", label: "Image Prompts" },
  { id: "code", label: "Code Completion" },
];

// State
const activeTab = ref(props.initialTab);
const isLoading = ref(false);

// Text demo state
const textInput = ref("");
const textOutput = ref("");

// Image demo state
const imageInput = ref("");
const imageOutput = ref("");

// Code demo state
const codeInput = ref("");
const codeOutput = ref("");

// Formatting functions
function formatOutput(text) {
  if (!text) return "";
  return DOMPurify.sanitize(marked(text));
}

// Demo functions
async function generateText() {
  if (!textInput.value.trim() || isLoading.value) return;

  isLoading.value = true;
  textOutput.value = "";

  try {
    const response = await fetch("/api/demo/text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: textInput.value }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate text");
    }

    const data = await response.json();
    textOutput.value = data.result;
  } catch (error) {
    console.error("Text generation error:", error);
    textOutput.value =
      "Sorry, an error occurred during text generation. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

async function generateImagePrompt() {
  if (!imageInput.value.trim() || isLoading.value) return;

  isLoading.value = true;
  imageOutput.value = "";

  try {
    const response = await fetch("/api/demo/image-prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: imageInput.value }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate image prompt");
    }

    const data = await response.json();
    imageOutput.value = data.enhancedPrompt;
  } catch (error) {
    console.error("Image prompt generation error:", error);
    imageOutput.value =
      "Sorry, an error occurred during prompt enhancement. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

async function generateCode() {
  if (!codeInput.value.trim() || isLoading.value) return;

  isLoading.value = true;
  codeOutput.value = "";

  try {
    const response = await fetch("/api/demo/code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: codeInput.value }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate code");
    }

    const data = await response.json();
    codeOutput.value = data.code;
  } catch (error) {
    console.error("Code generation error:", error);
    codeOutput.value =
      "// Sorry, an error occurred during code generation. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss">
.capability-demo {
  @include card;
  margin: $spacing-xl 0;
  overflow: hidden;

  &__header {
    margin-bottom: $spacing-md;

    h3 {
      margin-bottom: $spacing-sm;
      color: $heading-color;
    }
  }

  &__tabs {
    display: flex;
    border-bottom: 1px solid $border-color;
    margin-bottom: $spacing-md;
    overflow-x: auto;
    padding-bottom: 1px;
  }

  &__tab {
    padding: $spacing-sm $spacing-lg;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: $text-color-secondary;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: all $transition-normal;
    white-space: nowrap;

    &:hover {
      color: $primary-color;
    }

    &.active {
      color: $primary-color;
      border-bottom-color: $primary-color;
    }
  }
}

.demo-panel {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;

  @include breakpoint(md) {
    grid-template-columns: 1fr 1fr;
  }

  &__input,
  &__output {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: $font-weight-medium;
    margin-bottom: $spacing-xs;
  }

  textarea {
    width: 100%;
    padding: $spacing-sm;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    font-family: $font-family-sans;
    resize: vertical;
    min-height: 100px;
    margin-bottom: $spacing-sm;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
    }
  }

  &__controls {
    display: flex;
    justify-content: flex-end;
  }

  &__output h4 {
    margin-bottom: $spacing-sm;
    color: $heading-color;
  }

  &__result {
    background-color: $bg-color-secondary;
    border-radius: $border-radius;
    padding: $spacing-md;
    min-height: 150px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: $spacing-md;

    p {
      margin-bottom: $spacing-sm;
      &:last-child {
        margin-bottom: 0;
      }
    }

    &.code-result {
      font-family: $font-family-mono;
      font-size: $font-size-sm;
      white-space: pre-wrap;
      background-color: #1e1e1e;
      color: #d4d4d4;
    }
  }

  &__cta {
    background-color: rgba($primary-color, 0.05);
    border-radius: $border-radius;
    padding: $spacing-md;
    text-align: center;

    p {
      margin-bottom: $spacing-sm;
    }
  }
}

.prompt-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
  margin-top: $spacing-sm;

  .prompt-tag {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
    font-size: $font-size-xs;
    padding: $spacing-xs $spacing-sm;
    border-radius: $border-radius-full;
  }
}
</style>
