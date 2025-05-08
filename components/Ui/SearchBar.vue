<template>
  <div class="search-bar">
    <div class="search-bar__container">
      <input
        type="text"
        class="search-bar__input"
        :placeholder="placeholder"
        :value="modelValue"
        @input="updateValue"
        @keyup.enter="emitSearch"
      />
      <button
        class="search-bar__button"
        @click="emitSearch"
        aria-label="Search"
      >
        <Icon-Search class="search-bar__icon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Search...",
  },
});

const emit = defineEmits(["update:modelValue", "search"]);

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const emitSearch = () => {
  emit("search", props.modelValue);
};
</script>

<style lang="scss">
.search-bar {
  width: 100%;
  max-width: 500px;

  &__container {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__input {
    width: 100%;
    padding: $spacing-sm $spacing-md;
    padding-right: 3rem; // Make room for the button
    border: 1px solid $border-color;
    border-radius: $border-radius;
    font-size: $font-size-base;
    line-height: 1.5;
    transition: border-color $transition-normal, box-shadow $transition-normal;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    }

    &::placeholder {
      color: $text-color-secondary;
    }
  }

  &__button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    background: none;
    border: none;
    cursor: pointer;
    color: $text-color-secondary;
    transition: color $transition-normal;

    &:hover {
      color: $primary-color;
    }
  }

  &__icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
