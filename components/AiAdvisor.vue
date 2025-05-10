<!-- components/AiAdvisor.vue -->
<template>
  <div class="ai-advisor">
    <div class="ai-advisor__chat">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', `message--${message.role}`]"
        v-show="message.role !== 'system'"
      >
        <div class="message__content">
          {{ message.content }}
        </div>
      </div>
    </div>

    <div class="ai-advisor__input">
      <input
        v-model="userInput"
        @keyup.enter="handleSend"
        placeholder="What kind of AI tool are you looking for?"
        :disabled="isLoading"
      />
      <button
        @click="handleSend"
        :disabled="isLoading || !userInput.trim()"
        class="btn btn-primary"
      >
        {{ isLoading ? "Thinking..." : "Send" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAiAgentStore } from "~/store/useAiAgentStore";

const aiAgentStore = useAiAgentStore();
const userInput = ref("");
const { messages, isLoading, error } = storeToRefs(aiAgentStore);

async function handleSend() {
  if (!userInput.value.trim() || isLoading.value) return;

  const input = userInput.value;
  userInput.value = "";

  await aiAgentStore.sendMessage(input);
}
</script>

<style lang="scss">
.ai-advisor {
  display: flex;
  flex-direction: column;
  height: 500px;
  border-radius: $border-radius-lg;
  background-color: white;
  box-shadow: $card-shadow;
  overflow: hidden;

  &__chat {
    flex: 1;
    overflow-y: auto;
    padding: $spacing-md;
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
  }

  &__input {
    display: flex;
    padding: $spacing-md;
    border-top: 1px solid $border-color;

    input {
      flex: 1;
      padding: $spacing-sm $spacing-md;
      border: 1px solid $border-color;
      border-radius: $border-radius;
      margin-right: $spacing-sm;

      &:focus {
        outline: none;
        border-color: $primary-color;
        box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
      }
    }
  }
}

.message {
  max-width: 80%;

  &--user {
    align-self: flex-end;

    .message__content {
      background-color: $primary-color;
      color: white;
      border-radius: $border-radius-lg $border-radius-lg 0 $border-radius-lg;
    }
  }

  &--assistant {
    align-self: flex-start;

    .message__content {
      background-color: $bg-color-secondary;
      border-radius: 0 $border-radius-lg $border-radius-lg $border-radius-lg;
    }
  }

  &__content {
    padding: $spacing-sm $spacing-md;
  }
}
</style>
