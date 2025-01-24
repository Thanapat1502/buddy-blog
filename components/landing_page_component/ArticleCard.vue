<template>
  <!-- Map -->
  <div
    class="card-container flex flex-col justify-center w-96 h-[27rem] mt-1 mb-1 px-2 py-2 lg:w-[37rem] lg:h-[36rem] rounded-3xl">
    <img
      :src="post.image"
      alt="Post Image"
      class="rounded-2xl h-52 object-cover bg-brand-green lg:h-96 cursor-pointer" />
    <div
      class="category rounded-full bg-[#D7F2E9] text-[#12B279] font-medium text-sm text-center px-3 py-1 w-fit mt-4 mb-2">
      {{ post.categories.name }}
    </div>
    <div class="text-area w-80 h-36 flex flex-col gap-2 lg:w-[37rem]">
      <h4>{{ post.title }}</h4>
      <p class="description font-medium text-sm text-[#75716B]">
        {{ post.description }}
      </p>
    </div>

    <div class="author-and-date flex flex-row gap-8 mt-4 mb-4">
      <div class="author flex gap-1">
        <img
          src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
          alt="author-picture"
          class="w-6 h-6 rounded-full" />
        {{ post.author }}
      </div>
      <span>|</span>
      <div class="date">{{ formattedDate }}</div>
    </div>
  </div>
  <!-- Map -->
</template>

<script lang="ts">
// interface Post {
//   id: string;
//   title: string;
//  image: string;
//   description: string;
//   likesCount: number;
//   category: string;
//   status: string;
// }
export default {
  name: "ArticleCard",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      const dateObj = new Date(this.post.date);
      return dateObj.toLocaleDateString("en-US"); // Example format: 9/11/2024
    },
  },
};
</script>
