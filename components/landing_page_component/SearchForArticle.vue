<template>
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
              <!-- {categoryOptions.map((item, index) => { return (
              <SelectItem key="{index}" value="{item.toLowerCase()}">
              </SelectItem>
              ); })} -->
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SearchForArticle",
};
</script>
