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
            onChange="{handleSearchInput}"
            class="border rounded-lg py-3 px-4 w-full" />
          <button
            class="absolute right-3 top-4 cursor-pointer"
            onClick="{handleSearchButton}">
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
              <SelectItem v-for="cate in mockCatagory" :key="cate">
                {{ cate }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div
          class="category-dropdown-main rounded-lg py-3 px-4 relative hidden lg:flex lg:items-center">
          <button
            v-for="item in mockCatagory"
            :key="item"
            class="font-medium text-base rounded-lg hover:bg-[#DAD6D1] active:bg-[#F9F8F6] px-5 py-3">
            {{ item }}
          </button>
        </div>
      </div>
    </nav>
  </div>

  <!--Area -->
</template>

<script>
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default {
  name: "ArticleSection",
  data() {
    return {
      mockCatagory: ["Highlight", "Inspiration", "Cat", "Space"],
    };
  },
  components: { Select, SelectContent, SelectItem, SelectTrigger, SelectValue },
};
</script>
