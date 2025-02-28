<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__logo">
          <NuxtLink to="/" class="logo">
            <span class="logo__text">AI Tools Directory</span>
          </NuxtLink>
          <p class="footer__description">
            Discover and compare the best AI tools and applications to enhance
            your productivity.
          </p>
        </div>

        <div class="footer__nav">
          <div class="footer__nav-group">
            <h3 class="footer__heading">Categories</h3>
            <ul class="footer__list">
              <li
                v-for="category in popularCategories"
                :key="category.slug"
                class="footer__item"
              >
                <NuxtLink
                  :to="`/categories/${category.slug}`"
                  class="footer__link"
                >
                  {{ category.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="footer__nav-group">
            <h3 class="footer__heading">Company</h3>
            <ul class="footer__list">
              <li class="footer__item">
                <NuxtLink to="/about" class="footer__link">About Us</NuxtLink>
              </li>
              <li class="footer__item">
                <NuxtLink to="/blog" class="footer__link">Blog</NuxtLink>
              </li>
              <li class="footer__item">
                <NuxtLink to="/contact" class="footer__link">Contact</NuxtLink>
              </li>
              <li class="footer__item">
                <NuxtLink to="/advertise" class="footer__link"
                  >Advertise</NuxtLink
                >
              </li>
            </ul>
          </div>

          <div class="footer__nav-group">
            <h3 class="footer__heading">Legal</h3>
            <ul class="footer__list">
              <li class="footer__item">
                <NuxtLink to="/privacy-policy" class="footer__link"
                  >Privacy Policy</NuxtLink
                >
              </li>
              <li class="footer__item">
                <NuxtLink to="/terms-of-service" class="footer__link"
                  >Terms of Service</NuxtLink
                >
              </li>
              <li class="footer__item">
                <NuxtLink to="/cookie-policy" class="footer__link"
                  >Cookie Policy</NuxtLink
                >
              </li>
              <li class="footer__item">
                <NuxtLink to="/affiliate-disclosure" class="footer__link"
                  >Affiliate Disclosure</NuxtLink
                >
              </li>
            </ul>
          </div>

          <div class="footer__nav-group">
            <h3 class="footer__heading">Subscribe</h3>
            <p class="footer__text">
              Get the latest updates on AI tools and technology.
            </p>
            <form class="footer__form" @submit.prevent="subscribeToNewsletter">
              <div class="footer__input-group">
                <input
                  type="email"
                  v-model="emailInput"
                  class="footer__input"
                  placeholder="Your email"
                  required
                />
                <button type="submit" class="footer__button">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__copyright">
          &copy; {{ currentYear }} AI Tools Directory. All rights reserved.
        </div>

        <div class="footer__social">
          <a
            href="https://twitter.com/youraccount"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="Twitter"
          >
            <IconTwitter />
          </a>
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="Facebook"
          >
            <IconFacebook />
          </a>
          <a
            href="https://linkedin.com/company/yourcompany"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="LinkedIn"
          >
            <IconLinkedin />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__social-link"
            aria-label="YouTube"
          >
            <IconYoutube />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Email subscription
const emailInput = ref("");

// Get current year for copyright
const currentYear = new Date().getFullYear();

// Popular categories for footer links
const popularCategories = ref([
  { name: "Text Generation", slug: "text-generation" },
  { name: "Image Generation", slug: "image-generation" },
  { name: "Audio & Voice", slug: "audio-voice" },
  { name: "Video Creation", slug: "video-generation" },
  { name: "Coding Tools", slug: "code-development" },
]);

// Methods
const subscribeToNewsletter = () => {
  // In a real implementation, this would send the email to your API
  console.log("Subscribing email:", emailInput.value);
  // Show success message
  alert("Thank you for subscribing to our newsletter!");
  // Reset the form
  emailInput.value = "";
};
</script>

<style lang="scss">
.footer {
  background-color: $bg-color-secondary;
  padding: $spacing-2xl 0 $spacing-xl;
  margin-top: $spacing-3xl;

  &__top {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-xl;
    margin-bottom: $spacing-xl;

    @include breakpoint(md) {
      grid-template-columns: 1fr 2fr;
    }
  }

  &__logo {
    margin-bottom: $spacing-md;
  }

  &__description {
    color: $text-color-secondary;
    margin-top: $spacing-sm;
    max-width: 300px;
  }

  &__nav {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-lg;

    @include breakpoint(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include breakpoint(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__heading {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $heading-color;
    margin-bottom: $spacing-md;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__item {
    margin-bottom: $spacing-xs;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__link {
    color: $text-color-secondary;
    text-decoration: none;
    transition: color $transition-normal;
    font-size: $font-size-sm;

    &:hover {
      color: $primary-color;
    }
  }

  &__text {
    color: $text-color-secondary;
    font-size: $font-size-sm;
    margin-bottom: $spacing-md;
  }

  &__input-group {
    display: flex;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  &__input {
    flex: 1;
    padding: $spacing-xs $spacing-sm;
    border: 1px solid $border-color;
    border-radius: $border-radius 0 0 $border-radius;
    font-size: $font-size-sm;

    @media (max-width: 480px) {
      border-radius: $border-radius $border-radius 0 0;
    }

    &:focus {
      outline: none;
      border-color: $primary-color;
    }
  }

  &__button {
    background-color: $primary-color;
    color: white;
    border: none;
    padding: $spacing-xs $spacing-md;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    border-radius: 0 $border-radius $border-radius 0;
    cursor: pointer;
    transition: background-color $transition-normal;

    @media (max-width: 480px) {
      border-radius: 0 0 $border-radius $border-radius;
    }

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: $spacing-lg;
    border-top: 1px solid $border-color;

    @include breakpoint(md) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__copyright {
    color: $text-color-secondary;
    font-size: $font-size-xs;
    margin-bottom: $spacing-md;

    @include breakpoint(md) {
      margin-bottom: 0;
    }
  }

  &__social {
    display: flex;
    gap: $spacing-md;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    color: $text-color-secondary;
    border-radius: 50%;
    transition: color $transition-normal, background-color $transition-normal;

    &:hover {
      color: $primary-color;
      background-color: rgba($primary-color, 0.1);
    }
  }
}
</style>
