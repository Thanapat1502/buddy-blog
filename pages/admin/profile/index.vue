<script setup lang="ts">
import Sidebar from "@/components/admin/Sidebar.vue"; // Import Sidebar

</script>

<template>
  <div class="min-h-screen min-w-screen flex bg-brown-100 text-brown-400">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <main class="flex flex-col justify-start items-center w-full">
      <div class="w-full">
        <nav
          class="w-full flex flex-row h-[96px] justify-between items-center px-14 min-w-900px]"
        >
          <div class="text-2xl font-medium">Profile</div>
          <button
            class="px-10 bg-brown-600 text-white rounded-full py-3 flex items-center gap-2 text-start"
            type="button"
          >
            <div class="relative">
              <div class="h-[1.25px] w-3 bg-white"></div>
              <div
                class="h-[1.25px] w-3 bg-white absolute top-0 rotate-90"
              ></div>
            </div>
            Create article
          </button>
        </nav>
        <div class="h-px w-full bg-brown-300"></div>

        <section class="m-10 flex flex-col w-[1080px] gap-4"></section>
      </div>
    </main>
  </div>
</template>

<!-- justify-start items-center -->
