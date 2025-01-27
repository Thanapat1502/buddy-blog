<template>
  <main class="container md:px-8 px-4 py-8 lg:py-16 mx-auto">
    <div class="flex flex-col lg:flex-row items-center">
      <div class="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
        <h1 class="text-4xl lg:text-5xl font-bold mb-4">
          Stay <br class="hidden lg:block" />
          Informed, <br />
          Stay Inspired,
        </h1>
        <p class="text-lg text-muted-foreground">
          Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
          Inspiration and Information.
        </p>
      </div>
      <!--Carousel-->
      <Carousel class="lg:w-2/5">
        <CarouselContent>
          <CarouselItem
            ><img
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
              alt="Person with a cat"
              class="h-[530px] object-cover rounded-lg shadow-lg mb-8 lg:mb-0"
          /></CarouselItem>
          <CarouselItem
            ><img
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
              alt="Person with a cat"
              class="h-[530px] object-cover rounded-lg shadow-lg mb-8 lg:mb-0"
          /></CarouselItem>
          <CarouselItem
            ><img
              src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
              alt="Person with a cat"
              class="h-[530px] object-cover rounded-lg shadow-lg mb-8 lg:mb-0"
          /></CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <!-- <img
src=""
alt="Person with a cat"
class="h-[530px] object-cover rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0" /> -->

      <div class="lg:w-1/3 lg:pl-8 lg:ml-10">
        <h2 class="text-xl font-semibold mb-2">-Author</h2>
        <h3 class="text-2xl font-bold mb-4">Thompson P.</h3>
        <p class="text-muted-foreground mb-4">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
        </p>
        <p class="text-muted-foreground">
          When I&apos;m not writing, I spend time volunteering at my local
          animal shelter, helping cats find loving homes.
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ref, onMounted } from "vue";
import axios from "axios";
// interface Posts {
//   id: string;
//   title: string;
//   description: string;
//   likesCount: number;
//   category: string;
//   status: string;
// }
// interface Category {
//   id: string;
//   name: string;
// }

export default {
  name: "HeroSection",
  components: {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  },
  setup() {
    const posts = ref([]);
    const categories = ref([]);
    onMounted(async () => {
      try {
        const respond = await axios.get("/api/allposts/getposts");
        posts.value = respond.data.data;
        const cateRes = await axios.get("/api/categories");
        categories.value = cateRes.data.categories;
        console.log(posts, categories);
      } catch (e) {
        console.log(e.message);
      }
    });
    return { posts, categories };
  },
};
</script>
