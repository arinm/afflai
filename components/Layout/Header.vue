<template>
  <header class="site-header" :class="{ 'scrolled': isScrolled }">
    <div class="site-header__container">
      <div class="site-header__content">
        <div class="site-header__logo">
          <NuxtLink to="/" class="logo-link">
            <!-- <img src="/images/logo.svg" alt="Afflai Logo" class="logo-image" /> -->
            <span class="logo-text">affAi</span>
          </NuxtLink>
        </div>
        
        <nav class="site-header__nav">
          <ul class="nav-list">
            <li class="nav-item">
              <NuxtLink to="/categories" class="nav-link" active-class="nav-link--active">Categories</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/about" class="nav-link" active-class="nav-link--active">About</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/blog" class="nav-link" active-class="nav-link--active">Blog</NuxtLink>
            </li>
          </ul>
        </nav>
        
        <div class="site-header__actions">
          <button class="action-button action-button--secondary">
            <span class="action-button__text">Log in</span>
          </button>
          <button class="action-button action-button--primary">
            <span class="action-button__text">Get started</span>
          </button>
        </div>
        
        <button class="mobile-menu-toggle" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
          <span class="mobile-menu-toggle__line"></span>
          <span class="mobile-menu-toggle__line"></span>
          <span class="mobile-menu-toggle__line"></span>
        </button>
      </div>
    </div>
    
    <!-- Mobile menu overlay -->
    <div class="mobile-menu" :class="{ 'mobile-menu--open': isMobileMenuOpen }">
      <div class="mobile-menu__content">
        <ul class="mobile-menu__nav">
          <li class="mobile-menu__item">
            <NuxtLink to="/categories" class="mobile-menu__link" @click="closeMobileMenu">Categories</NuxtLink>
          </li>
          <li class="mobile-menu__item">
            <NuxtLink to="/about" class="mobile-menu__link" @click="closeMobileMenu">About</NuxtLink>
          </li>
          <li class="mobile-menu__item">
            <NuxtLink to="/blog" class="mobile-menu__link" @click="closeMobileMenu">Blog</NuxtLink>
          </li>
          <li class="mobile-menu__item mobile-menu__item--divider"></li>
          <li class="mobile-menu__item">
            <a href="#" class="mobile-menu__link">Log in</a>
          </li>
          <li class="mobile-menu__item">
            <a href="#" class="mobile-menu__link mobile-menu__link--highlight">Get started</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Reactive state
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  // Prevent scrolling when mobile menu is open
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : '';
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Initial check
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  // Reset body overflow in case component is unmounted with menu open
  document.body.style.overflow = '';
});
</script>

<style lang="scss" scoped>
.site-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  max-height: 100px;
  background-color: white;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
  z-index: 100;
  transition: all 0.2s ease;
  
  &.scrolled {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  &__container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    height: 100%;
  }
  
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  
  &__logo {
    display: flex;
    align-items: center;
    z-index: 101;
  }
  
  &__nav {
    display: flex;
    align-items: center;
    margin-left: 40px;
    flex: 1;
  }
  
  &__actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #111;
  font-weight: 600;
  font-size: 1.25rem;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
}

.logo-image {
  height: 32px;
  margin-right: 10px;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 32px;
}

.nav-item {
  position: relative;
}

.nav-link {
  position: relative;
  display: inline-block;
  padding: 8px 0;
  color: #555;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #111;
  }
  
  &--active {
    color: #111;
    font-weight: 600;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #111;
      border-radius: 1px;
    }
  }
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &--secondary {
    background: none;
    color: #555;
    border: none;
    
    &:hover {
      color: #111;
    }
  }
  
  &--primary {
    background-color: #111;
    color: white;
    border: none;
    
    &:hover {
      background-color: #333;
    }
  }
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 101;
  
  &__line {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #111;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  
  &.active {
    .mobile-menu-toggle__line {
      &:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      
      &:nth-child(2) {
        opacity: 0;
      }
      
      &:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }
}

.mobile-menu {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: white;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  overflow-y: auto;
  
  &--open {
    opacity: 1;
    visibility: visible;
  }
  
  &__content {
    padding: 24px;
  }
  
  &__nav {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  &__item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    
    &--divider {
      height: 16px;
      border-bottom: none;
    }
  }
  
  &__link {
    display: block;
    font-size: 1.125rem;
    font-weight: 500;
    color: #555;
    text-decoration: none;
    padding: 16px 0;
    transition: color 0.2s ease;
    
    &:hover {
      color: #111;
    }
    
    &--highlight {
      color: #111;
      font-weight: 600;
    }
  }
}

// Responsive styles
@media (max-width: 992px) {
  .site-header {
    &__nav {
      display: none;
    }
    
    &__actions {
      display: none;
    }
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
}
</style>
