<template>
  <section class="hero">
    <div class="hero__background">
      <div class="hero__gradient"></div>
      <div class="hero__particles">
        <div v-for="n in 20" :key="n" class="particle" :class="`particle-${n % 5}`"></div>
      </div>
    </div>
    <div class="container">
      <div class="hero__content">
        <div class="hero__title-wrapper">
          <div class="hero__badge">
            <span class="hero__badge-pulse"></span>
            <span class="hero__badge-text">AI Directory</span>
          </div>
          <h1 class="hero__title">
            <span class="hero__title-highlight">Discover</span> the Best 
            <span class="hero__title-ai">AI Tools</span> for Any Task
          </h1>
        </div>
        <p class="hero__subtitle">
          Explore our curated collection of cutting-edge AI tools and applications to
          enhance your workflow and supercharge your productivity.
        </p>
        <div class="hero__search">
          <slot name="search"></slot>
        </div>
        <div class="hero__actions">
          <NuxtLink to="/categories" class="btn btn-primary">
            <span class="btn-text">Explore Categories</span>
            <span class="btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </NuxtLink>
          <NuxtLink to="/about" class="btn btn-outline">
            <span class="btn-text">Learn More</span>
            <span class="btn-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </NuxtLink>
        </div>
      </div>
      <!-- <div class="hero__visual">
        <div class="hero__visual-container">
          <div class="hero__visual-glow"></div>
          <div class="hero__visual-main">
            <div class="hero__visual-circle"></div>
            <div class="hero__visual-grid">
              <div v-for="n in 16" :key="n" class="hero__visual-cell"></div>
            </div>
            <div class="hero__visual-dots">
              <div v-for="n in 8" :key="n" class="hero__visual-dot" :style="{ 
                animationDelay: `${(n * 0.2)}s`,
                transform: `rotate(${n * 45}deg) translateX(${80 + (n % 3) * 15}px)`
              }"></div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script setup>
// Expose search slot for parent component to inject search functionality
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  background: linear-gradient(135deg, #0a0f1a, #1a1f2f);
  padding: 4rem 0;
  margin-bottom: 4rem;
  overflow: hidden;
  min-height: 85vh;
  display: flex;
  align-items: center;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    overflow: hidden;
  }

  &__gradient {
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(125, 90, 255, 0.15), transparent 60%);
    filter: blur(40px);
    animation: pulse-slow 8s ease-in-out infinite alternate;
  }

  &__particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    .particle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.3;
      animation: float 15s infinite ease-in-out;

      &-0 {
        top: 10%;
        left: 10%;
        width: 8px;
        height: 8px;
        background: #7d5aff;
        animation-delay: 0s;
        animation-duration: 20s;
      }

      &-1 {
        top: 20%;
        left: 80%;
        width: 12px;
        height: 12px;
        background: #5a9fff;
        animation-delay: 1s;
        animation-duration: 25s;
      }

      &-2 {
        top: 70%;
        left: 20%;
        width: 15px;
        height: 15px;
        background: #ff5a8f;
        animation-delay: 2s;
        animation-duration: 18s;
      }

      &-3 {
        top: 40%;
        left: 90%;
        width: 10px;
        height: 10px;
        background: #5affb8;
        animation-delay: 3s;
        animation-duration: 22s;
      }

      &-4 {
        top: 80%;
        left: 60%;
        width: 6px;
        height: 6px;
        background: #ffcc5a;
        animation-delay: 4s;
        animation-duration: 19s;
      }
    }
  }

  .container {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  &__content {
    flex: 1;
    max-width: 650px;
    text-align: left;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      text-align: center;
      margin: 0 auto;
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    background: rgba(125, 90, 255, 0.1);
    border: 1px solid rgba(125, 90, 255, 0.2);
    border-radius: 30px;
    padding: 8px 16px;
    margin-bottom: 1.5rem;
    position: relative;

    &-pulse {
      width: 8px;
      height: 8px;
      background: #7d5aff;
      border-radius: 50%;
      margin-right: 10px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #7d5aff;
        animation: pulse 2s infinite;
      }
    }

    &-text {
      font-size: 0.875rem;
      font-weight: 600;
      color: #7d5aff;
      letter-spacing: 0.5px;
    }
  }

  &__title-wrapper {
    position: relative;
    margin-bottom: 1.5rem;
  }

  &__title {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    color: white;
    margin-bottom: 1.5rem;
    font-weight: 800;
    line-height: 1.2;
    position: relative;
    letter-spacing: -0.5px;

    &-highlight {
      background: linear-gradient(90deg, #7d5aff, #5a9fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }

    &-ai {
      position: relative;
      display: inline-block;
      color: white;
      z-index: 1;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: -5px;
        right: -5px;
        height: 12px;
        background: linear-gradient(90deg, #7d5aff, #5a9fff);
        z-index: -1;
        opacity: 0.3;
        border-radius: 10px;
      }
    }
  }

  &__subtitle {
    font-size: clamp(1.125rem, 2vw, 1.25rem);
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2rem;
    line-height: 1.6;
    font-weight: 400;
    max-width: 90%;

    @media (max-width: 768px) {
      max-width: 100%;
    }
  }

  &__search {
    max-width: 600px;
    margin-bottom: 2rem;
    position: relative;

    @media (max-width: 768px) {
      margin: 0 auto 2rem;
    }
  }

  &__actions {
    display: flex;
    gap: 1rem;
    align-items: center;

    @media (max-width: 576px) {
      flex-direction: column;
      align-items: stretch;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 14px 28px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 12px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      text-decoration: none;

      @media (max-width: 576px) {
        width: 100%;
      }

      &-primary {
        background: linear-gradient(90deg, #7d5aff, #5a9fff);
        border: none;
        color: white;
        box-shadow: 0 4px 15px rgba(125, 90, 255, 0.25);

        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(125, 90, 255, 0.35);

          .btn-icon {
            transform: translateX(3px);
          }
        }
      }

      &-outline {
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);

        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);

          .btn-icon {
            transform: translateX(3px);
          }
        }
      }
    }
  }

  &__visual {
    flex: 1;
    max-width: 500px;
    height: 500px;
    position: relative;
    z-index: 1;

    @media (max-width: 992px) {
      max-width: 400px;
      height: 400px;
    }

    @media (max-width: 768px) {
      display: none;
    }

    &-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-glow {
      position: absolute;
      width: 300px;
      height: 300px;
      background: radial-gradient(circle, rgba(125, 90, 255, 0.2), transparent 70%);
      filter: blur(40px);
      animation: pulse-slow 4s ease-in-out infinite alternate;
    }

    &-main {
      position: relative;
      width: 300px;
      height: 300px;
    }

    &-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.1);
      animation: rotate 20s linear infinite;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 250px;
        height: 250px;
        border-radius: 50%;
        border: 1px dashed rgba(255, 255, 255, 0.1);
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }

    &-grid {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 200px;
      height: 200px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(4, 1fr);
      gap: 4px;
      animation: pulse-slow 8s ease-in-out infinite alternate;

      .hero__visual-cell {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.05);
        border-radius: 4px;
        transition: all 0.5s ease;

        &:nth-child(odd) {
          animation: cell-pulse 4s ease-in-out infinite alternate;
        }

        &:nth-child(even) {
          animation: cell-pulse 4s ease-in-out infinite alternate-reverse;
        }

        &:hover {
          background: rgba(125, 90, 255, 0.1);
        }
      }
    }

    &-dots {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;

      .hero__visual-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #7d5aff;
        transform-origin: center;
        animation: dot-pulse 2s ease-in-out infinite alternate;
      }
    }
  }
}

// Animations
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse-slow {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(10px, 10px);
  }
  50% {
    transform: translate(15px, -5px);
  }
  75% {
    transform: translate(-5px, 10px);
  }
  100% {
    transform: translate(0, 0);
  }
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes cell-pulse {
  0% {
    background: rgba(255, 255, 255, 0.03);
  }
  50% {
    background: rgba(125, 90, 255, 0.08);
  }
  100% {
    background: rgba(255, 255, 255, 0.03);
  }
}

@keyframes dot-pulse {
  0% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.5);
  }
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
}
</style>
