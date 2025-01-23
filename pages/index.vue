<!-- Legacy code <template>
    <div>
      <NuxtRouteAnnouncer />
      <NuxtWelcome />
    </div>
  </template> -->

<template>
  <div class="flex flex-col min-h-screen bg-[#F9F8F6]">
    <!-- <NavBar /> -->
    <div class="flex-grow">
      <HeroSection />
      <ArticleSection />
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import HeroSection from "./components/landing_page_component/HeroSection.vue";
import ArticleSection from "./components/landing_page_component/ArticleSection.vue";

export default {
  name: "app",
  components: {
    HeroSection,
    ArticleSection,
  },
};
</script>
