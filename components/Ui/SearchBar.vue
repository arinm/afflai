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
        <IconSearch class="search-bar__icon" />
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
    padding: $spacing-md $spacing-lg;
    padding-right: 3.5rem; // Make room for the button
    border: 1px solid $border-color;
    border-radius: $border-radius-lg;
    font-size: $font-size-lg;
    line-height: 1.5;
    transition: border-color $transition-normal, box-shadow $transition-normal;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.2);
    }

    &::placeholder {
      color: $text-color-secondary;
    }
  }

  &__button {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    background: linear-gradient(135deg, $primary-color, $secondary-color);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    color: $text-color-light;
    transition: background $transition-normal, transform $transition-normal;

    &:hover {
      background: linear-gradient(135deg, $secondary-color, $primary-color);
      transform: scale(1.05);
    }
  }

  &__icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
