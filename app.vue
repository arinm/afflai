<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// Define structured data for the entire site
const config = useRuntimeConfig();
const siteUrl = config.public.siteUrl;

// Add global schema.org structured data
useSchemaOrg([
  defineWebSite({
    name: "AI Tools Directory",
    url: siteUrl,
    description:
      "Discover the best AI tools and applications to enhance your productivity. Our curated directory features the top AI tools across various categories.",
    inLanguage: "en-US",
  }),
  defineOrganization({
    name: "AI Tools Directory",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      "https://twitter.com/yourcompany",
      "https://facebook.com/yourcompany",
      "https://linkedin.com/company/yourcompany",
    ],
  }),
]);
</script>
