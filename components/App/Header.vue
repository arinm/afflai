<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__logo">
          <NuxtLink to="/" class="logo">
            <span class="logo__text">AI Tools Directory</span>
          </NuxtLink>
        </div>

        <nav class="header__nav" :class="{ 'header__nav--open': isMenuOpen }">
          <ul class="nav__list">
            <li class="nav__item">
              <NuxtLink to="/" class="nav__link" @click="closeMenu"
                >Home</NuxtLink
              >
            </li>
            <li class="nav__item">
              <NuxtLink to="/categories" class="nav__link" @click="closeMenu"
                >Categories</NuxtLink
              >
            </li>
            <li class="nav__item">
              <NuxtLink to="/blog" class="nav__link" @click="closeMenu"
                >Blog</NuxtLink
              >
            </li>
            <li class="nav__item">
              <NuxtLink to="/about" class="nav__link" @click="closeMenu"
                >About</NuxtLink
              >
            </li>
          </ul>
        </nav>

        <div class="header__search">
          <button
            class="search-toggle"
            @click="toggleSearch"
            aria-label="Toggle search"
          >
            <IconSearch class="search-toggle__icon" />
          </button>

          <div class="search-dropdown" v-show="isSearchOpen">
            <SearchBar
              v-model="searchQuery"
              placeholder="Search for AI tools..."
              @search="handleSearch"
            />
          </div>
        </div>

        <button
          class="header__menu-toggle"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <span class="menu-toggle__bar"></span>
          <span class="menu-toggle__bar"></span>
          <span class="menu-toggle__bar"></span>
        </button>
      </div>
    </div>

    <!-- Mobile search - shows when search is toggled on mobile -->
    <div class="mobile-search" v-show="isSearchOpen && isMobileView">
      <div class="container">
        <SearchBar
          v-model="searchQuery"
          placeholder="Search for AI tools..."
          @search="handleSearch"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const router = useRouter();

// State
const isMenuOpen = ref(false);
const isSearchOpen = ref(false);
const searchQuery = ref("");
const isMobileView = ref(false);

// Check window width on client-side to determine mobile view
onMounted(() => {
  updateViewState();
  window.addEventListener("resize", updateViewState);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateViewState);
});

function updateViewState() {
  isMobileView.value = window.innerWidth < 768;
}

// Methods
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    // Prevent body scrolling when menu is open
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

function closeMenu() {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
}

function toggleSearch() {
  isSearchOpen.value = !isSearchOpen.value;
}

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/search?q=${encodeURIComponent(searchQuery.value)}`);
    isSearchOpen.value = false;
    searchQuery.value = "";
  }
}

// Close menu when route changes
watch(
  () => router.currentRoute.value.path,
  () => {
    closeMenu();
  }
);
</script>

<style lang="scss">
.header {
  background-color: #060a1d;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #101a3d;

  &__inner {
    height: 70px;
    @include flex-between;
  }

  &__logo {
    z-index: 110;
  }

  &__nav {
    @include breakpoint(md) {
      display: block;
    }

    // Mobile menu
    @media (max-width: #{$breakpoint-md - 1px}) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: white;
      padding-top: 70px;
      z-index: 100;
      transform: translateX(100%);
      transition: transform $transition-normal ease;
      overflow-y: auto;

      &--open {
        transform: translateX(0);
      }
    }
  }

  &__search {
    position: relative;
    z-index: 110;
  }

  &__menu-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
    margin-left: 10px;
    z-index: 110;

    @include breakpoint(md) {
      display: none;
    }
  }
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;

  &__text {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    color: $primary-color;
  }
}

.nav {
  &__list {
    @media (max-width: #{$breakpoint-md - 1px}) {
      display: flex;
      flex-direction: column;
      padding: $spacing-lg;
    }

    @include breakpoint(md) {
      display: flex;
    }
  }

  &__item {
    @media (max-width: #{$breakpoint-md - 1px}) {
      margin-bottom: $spacing-md;
    }

    @include breakpoint(md) {
      margin-right: $spacing-md;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__link {
    display: block;
    padding: $spacing-xs $spacing-sm;
    color: $text-color;
    text-decoration: none;
    font-weight: $font-weight-medium;
    transition: color $transition-normal;

    @media (max-width: #{$breakpoint-md - 1px}) {
      font-size: $font-size-xl;
      padding: $spacing-sm 0;
    }

    &.router-link-active {
      color: $primary-color;
    }

    &:hover {
      color: $primary-color;
    }
  }
}

.search-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: $spacing-xs;
  color: $text-color;
  transition: color $transition-normal;

  &:hover {
    color: $primary-color;
  }

  &__icon {
    width: 20px;
    height: 20px;
  }
}

.search-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  padding: $spacing-sm;
  background-color: white;
  border-radius: $border-radius;
  box-shadow: $dropdown-shadow;
  margin-top: $spacing-sm;

  @media (max-width: #{$breakpoint-md - 1px}) {
    display: none;
  }
}

.mobile-search {
  padding: $spacing-sm 0;
  border-top: 1px solid $border-color;
  display: none;

  @media (max-width: #{$breakpoint-md - 1px}) {
    display: block;
  }
}

.menu-toggle {
  &__bar {
    display: block;
    width: 24px;
    height: 2px;
    margin: 4px 0;
    background-color: $text-color;
    transition: transform 0.3s ease, opacity 0.3s ease;

    .header__menu-toggle[aria-expanded="true"] & {
      &:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
      }

      &:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }
    }
  }
}
</style>
