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
     
      <!-- Carousel -->
      <Carousel>
          <Slide class="bg-red-400 h-[530px] w-10 shadow-lg lg:w-10 mx-4 mb-8 lg:mb-0">
             <img src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
             alt="Person with a cat" 
             class="h-full w-96 rounded-xl object-cover"/>      
          </Slide>
          <Slide class="bg-red-400 h-[530px] w-10 shadow-lg lg:w-10 mx-4 mb-8 lg:mb-0">
             <img src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
             alt="Person with a cat" 
             class="h-full w-96 rounded-xl object-cover"/>      
          </Slide>
          <Slide class="bg-red-400 h-[530px] w-10 shadow-lg lg:w-10 mx-4 mb-8 lg:mb-0">
             <img src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
             alt="Person with a cat" 
             class="h-full w-96 rounded-xl object-cover"/>      
          </Slide>
          <Slide class="bg-red-400 h-[530px] w-10 shadow-lg lg:w-10 mx-4 mb-8 lg:mb-0">
             <img src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg" 
             alt="Person with a cat" 
             class="h-full w-96 rounded-xl object-cover"/>      
          </Slide>
          <Navigation />
          <Pagination />
        </Carousel>
      
        <div class="lg:w-1/3 lg:pl-8">
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
export default {
  name: "HeroSection",
};
</script>
