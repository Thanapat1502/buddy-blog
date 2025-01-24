<template>
  <!-- Search -->
  <div>
    <nav class="flex flex-col gap-4 p-4 bg-[#F9F8F6]">
      <h3 class="font-semibold text-xl mb-4">Lastest article</h3>
      <div
        class="search-section-main rounded-2xl flex flex-col gap-4 w-full p-4 bg-[#EFEEEB] lg:flex-row-reverse lg:justify-between">
        <div class="search-bar-container relative w-full h-12 lg:w-1/3 top-3">
          <input
            type="text"
            placeholder="Search"
            class="border rounded-lg py-3 px-4 w-full" />
          <button class="absolute right-3 top-4 cursor-pointer">
            <SearchIcon />
          </button>
        </div>
        <div class="dropdown-container lg:hidden">
          <label htmlFor="category" class="lg:hidden mb-2"> Category </label>
          <Select onValueChange="{handleSelector}">
            <SelectTrigger class="w-full h-12 rounded-lg border">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="cate in refCategories"
                :key="cate.id"
                :value="cate.id">
                {{ cate.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div
          class="category-dropdown-main rounded-lg py-3 px-4 relative hidden lg:flex lg:items-center">
          <button
            v-for="cate in refCategories"
            :key="cate.id"
            :value="cate.id"
            class="font-medium text-base rounded-lg hover:bg-[#DAD6D1] active:bg-[#F9F8F6] px-5 py-3">
            {{ cate.name }}
          </button>
        </div>
      </div>
    </nav>
  </div>
  <!-- -->

  <div
    class="gride-area flex flex-col justify-center items-center px-4 pt-6 pb-20 gap-12 lg:grid lg:grid-cols-2 lg:container lg:mx-auto">
    <div v-for="post in refPosts">
      <ArticleCard :post="post" />
    </div>
  </div>
  <div></div>
  <!--Area -->
</template>

<script lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ArticleCard from "@/components/landing_page_component/ArticleCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

interface Category {
  id: string;
  name: string;
}

export default {
  name: "ArticleSection",
  data() {
    return {
      mockCatagory: ["Highlight", "Inspiration", "Cat", "Space"],
    };
  },
  components: {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    ArticleCard,
  },
  setup() {
    const refPosts = ref([]);
    const refCategories = ref([]);
    onMounted(async () => {
      console.log("mounted");
      try {
        const respond = await axios.get("/api/allposts/getposts");
        refPosts.value = respond.data.data;
        const cateRes = await axios.get("/api/categories");
        refCategories.value = cateRes.data.categories;
        console.log("posts: ", typeof refPosts, refPosts);
        console.log("categories: ", typeof refCategories, refCategories);
      } catch (e) {
        const er = e as Error;
        console.log(er.message);
      }
      console.log("fetched");
    });
    return {
      refPosts,
      refCategories,
    };
  },
};
</script>
