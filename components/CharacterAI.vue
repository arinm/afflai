<template>
  <div class="character-ai-container">
    <iframe
      :src="characterUrl"
      frameborder="0"
      height="700px"
      width="100%"
    ></iframe>
  </div>
</template>

<script setup>
const props = defineProps({
  characterId: {
    type: String,
    required: true,
  },
});

const characterUrl = computed(() => {
  // connsole.console.log('props.characterId', props.characterId);
  return `https://beta.character.ai/chat?char=${props.characterId}`;
});
</script>

<style lang="scss">
.character-ai-container {
  border-radius: $border-radius-lg;
  box-shadow: $card-shadow;
  overflow: hidden;
  margin: $spacing-lg 0;
}
</style>
