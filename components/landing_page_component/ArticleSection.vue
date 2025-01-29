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
          <Select
            v-model="selectedCategory"
            @update:modelValue="handleSelector">
            <SelectTrigger class="w-full h-12 rounded-lg border">
              <SelectValue placeholder="Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="cate in refCate"
                :key="cate.id"
                :value="cate.name">
                {{ cate.name }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div
          class="category-dropdown-main rounded-lg py-3 px-4 relative hidden lg:flex lg:items-center">
          <button
            v-for="cate in refCate"
            :key="cate.id"
            :value="cate.id"
            @click="
              () => {
                handleCateClick(cate.name);
              }
            "
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
    <div v-for="post in refPosts" :key="post.id">
      <ArticleCard :post="post" />
    </div>
  </div>

  <!--Area -->
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
import ArticleCard from "@/components/landing_page_component/ArticleCard.vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const refPosts = ref([]);
const refCate = ref([]);
let postLimit = ref(10);
let inputKeyword = ref("");
let inputCate = ref("highlight");

const handleSelector = (selectedValue: string) => {
  inputCate.value = selectedValue.toLowerCase();
  console.log(inputCate);
};

const handleCateClick = (value: string) => {
  inputCate.value = value.toLowerCase();
  console.log(inputCate);
};

const getAllPosts = async () => {
  try {
    const respond = await axios.get(`/api/allposts/getposts?limit=10`);
    refPosts.value = respond.data.data;
    console.log("posts: ", refPosts);
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
  }
};

const getCategories = async () => {
  try {
    const cateRes = await axios.get("/api/categories");
    refCate.value = cateRes.data.categories;
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
  }
};

const filterPosts = async (newCate, newKeyword) => {
  try {
    console.log("Filtered");
    let endpoint = ``;
    if (inputCate.value !== "highlight" && inputKeyword.value.trim() !== "") {
      console.log(`F Condition I`);
      endpoint = `/api/allposts/getposts?limit=${postLimit.value}&category=${inputCate.value}&keyword=${inputKeyword.value}`;
    }
    if (inputCate.value !== "highlight" && inputKeyword.value.trim() === "") {
      console.log(`F Condition II`);
      endpoint = `/api/allposts/getposts?limit=${postLimit.value}&category=${inputCate.value}`;
    }
    if (inputCate.value === "highlight" && inputKeyword.value.trim() !== "") {
      console.log(`F Condition III`);
      endpoint = `/api/allposts/getposts?limit=${postLimit.value}&keyword=${inputKeyword.value}`;
    }
    console.log("endpoint: ");
    console.log(endpoint);
    const res = await axios.get(endpoint);
    refPosts.value = res.data.data;
    console.log("filtered:", refPosts.value);
  } catch (e) {
    const error = e as Error;
    console.log(error.message);
  }
};

onMounted(async () => {
  getCategories();
  getAllPosts();
});

watch(
  [inputCate, inputKeyword],
  async ([newCate, newKeyword], [oldCate, oldKeyword]) => {
    console.log(`Cate change: `, newCate);
    console.log(`Keyword change: `, newKeyword);
    filterPosts(newCate, newKeyword);
  }
);
</script>
<!-- <script lang="ts">
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
    let postCategory = ref(null);
    let postKeyword = ref(null);
    let postLimit = ref(10);
    return {
      limit: postLimit,
      keyword: postKeyword,
      category: postCategory,
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
        const respond = await axios.get(`/api/allposts/getposts?limit=10`);
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
  methods: {
    async filterPosts() {
      const postLimit = this.limit;
      const postCategory = this.category;
      const postKeyword = this.keyword;
      const res = await axios.get(
        `/api/allposts/getposts?limit=${postLimit}&category=${postCategory}&keyword=${postKeyword}`
      );
      this.refPosts.values = res.data.data;
      console.log(
        `limit: ${postLimit}, cate: ${postCategory}, keyword: ${postKeyword}, res: ${res.data.data}`
      );
      console.log("res: ", res.data.data);
    },
  },
};
</script> -->
