<!-- pages/categories.vue -->
<template>
  <div class="container">
    <header>
      <h1>AI Tools & Apps Categories</h1>
      <p class="subtitle">
        Discover the best AI tools and applications organized by category. Find
        exactly what you need with our powerful search and filtering system.
      </p>
    </header>

    <div class="search-container">
      <input
        type="text"
        v-model="searchTerm"
        class="search-input"
        placeholder="Search categories..."
      />
      <div class="search-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>

    <div class="filters">
      <button
        v-for="filter in filters"
        :key="filter.id"
        class="filter-btn"
        :class="{ active: activeFilter === filter.id }"
        @click="activeFilter = filter.id"
      >
        {{ filter.name }}
      </button>
    </div>

    <div v-if="filteredCategories.length > 0" class="categories-grid">
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        class="category-card"
      >
        <div class="category-icon">
          <component :is="category.icon" />
        </div>
        <div class="category-content">
          <h2 class="category-title">{{ category.title }}</h2>
          <p class="category-description">{{ category.description }}</p>
          <div class="category-meta">
            <span class="tool-count">{{ category.toolCount }} tools</span>
            <NuxtLink :to="`/category/${category.slug}`">View All</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-results">
      <h3>No categories found</h3>
      <p>
        Try adjusting your search query or filters to find what you're looking
        for.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Define the available filters
const filters = [
  { id: "all", name: "All Categories" },
  { id: "content", name: "Content Generation" },
  { id: "image", name: "Image & Design" },
  { id: "coding", name: "Coding & Development" },
  { id: "assistant", name: "Personal Assistants" },
  { id: "business", name: "Business & Productivity" },
  { id: "education", name: "Education & Learning" },
];

// Icons as Vue components
const TextIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  `,
});

const StoryIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  `,
});

const ImageIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  `,
});

const DesignIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </svg>
  `,
});

const CodeIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  `,
});

const DevIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  `,
});

const ChatbotIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `,
});

const VoiceIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="22"></line>
    </svg>
  `,
});

const ProductivityIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  `,
});

const AnalyticsIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
      <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
    </svg>
  `,
});

const LearningIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  `,
});

const LanguageIcon = defineComponent({
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
      <line x1="4" y1="22" x2="4" y2="15"></line>
    </svg>
  `,
});

// Define categories data
const categories = ref([
  {
    id: 1,
    title: "Text Generation",
    slug: "text-generation",
    description:
      "AI tools that help you create high-quality written content for various purposes, including articles, blogs, and marketing copy.",
    icon: TextIcon,
    type: "content",
    toolCount: 48,
  },
  {
    id: 2,
    title: "Storytelling",
    slug: "storytelling",
    description:
      "Create compelling narratives, stories, scripts, and creative fiction using AI-powered storytelling tools.",
    icon: StoryIcon,
    type: "content",
    toolCount: 26,
  },
  {
    id: 3,
    title: "Image Generation",
    slug: "image-generation",
    description:
      "Create stunning images, artwork, and illustrations using AI algorithms that transform text prompts into visual content.",
    icon: ImageIcon,
    type: "image",
    toolCount: 35,
  },
  {
    id: 4,
    title: "Design Tools",
    slug: "design-tools",
    description:
      "AI-powered design solutions to help create logos, UI/UX elements, graphics, and other visual assets for your projects.",
    icon: DesignIcon,
    type: "image",
    toolCount: 29,
  },
  {
    id: 5,
    title: "Code Assistants",
    slug: "code-assistants",
    description:
      "Boost your coding productivity with AI tools that help write, debug, and optimize code across various programming languages.",
    icon: CodeIcon,
    type: "coding",
    toolCount: 31,
  },
  {
    id: 6,
    title: "Developer Tools",
    slug: "developer-tools",
    description:
      "AI-powered tools that enhance your development workflow, including code generation, refactoring, and documentation assistance.",
    icon: DevIcon,
    type: "coding",
    toolCount: 24,
  },
  {
    id: 7,
    title: "Chatbots & Assistants",
    slug: "chatbots-assistants",
    description:
      "AI chatbots and virtual assistants that can answer questions, provide information, and help with various tasks through natural conversation.",
    icon: ChatbotIcon,
    type: "assistant",
    toolCount: 42,
  },
  {
    id: 8,
    title: "Voice Assistants",
    slug: "voice-assistants",
    description:
      "AI tools that process and respond to voice commands, making it easier to interact with technology through speech.",
    icon: VoiceIcon,
    type: "assistant",
    toolCount: 18,
  },
  {
    id: 9,
    title: "Productivity Tools",
    slug: "productivity-tools",
    description:
      "AI tools designed to boost your productivity by automating repetitive tasks, managing schedules, and organizing information.",
    icon: ProductivityIcon,
    type: "business",
    toolCount: 38,
  },
  {
    id: 10,
    title: "Business Analytics",
    slug: "business-analytics",
    description:
      "AI-powered analytics tools that help businesses make data-driven decisions through insights, predictions, and visualizations.",
    icon: AnalyticsIcon,
    type: "business",
    toolCount: 27,
  },
  {
    id: 11,
    title: "Learning Tools",
    slug: "learning-tools",
    description:
      "AI-powered educational tools that personalize learning experiences, provide explanations, and help with studying and knowledge retention.",
    icon: LearningIcon,
    type: "education",
    toolCount: 33,
  },
  {
    id: 12,
    title: "Language Learning",
    slug: "language-learning",
    description:
      "AI tools that help you learn new languages through personalized lessons, conversation practice, and grammar feedback.",
    icon: LanguageIcon,
    type: "education",
    toolCount: 21,
  },
]);

// Reactive state
const searchTerm = ref("");
const activeFilter = ref("all");

// Computed property to filter categories based on search and active filter
const filteredCategories = computed(() => {
  return categories.value.filter((category) => {
    const matchesSearch =
      category.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      category.description
        .toLowerCase()
        .includes(searchTerm.value.toLowerCase());

    const matchesFilter =
      activeFilter.value === "all" || category.type === activeFilter.value;

    return matchesSearch && matchesFilter;
  });
});

// SEO meta tags
useHead({
  title: "AI Tools & Apps Categories",
  meta: [
    {
      name: "description",
      content:
        "Discover the best AI tools and applications organized by category",
    },
  ],
});
</script>

<style scoped>
:root {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --bg-color: #f9fafb;
  --card-bg: #ffffff;
  --text-color: #1f2937;
  --border-color: #e5e7eb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto 2rem auto;
}

.search-container {
  display: flex;
  margin-bottom: 2rem;
  position: relative;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.search-icon {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  color: #4b5563;
}

.filter-btn:hover {
  background-color: #f3f4f6;
}

.filter-btn.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.category-card {
  background-color: var(--card-bg);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.category-icon {
  height: 120px;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.category-icon svg {
  width: 50px;
  height: 50px;
  color: var(--primary-color);
}

.category-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.category-description {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.category-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #9ca3af;
}

.tool-count {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
}

.no-results {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  background-color: var(--card-bg);
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  h1 {
    font-size: 2rem;
  }
}
</style>
