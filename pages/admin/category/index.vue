<script setup lang="ts">
import Sidebar from "@/components/admin/Sidebar.vue"; // Import Sidebar
import MagnifyingGlass from "~/components/svg/admin/MagnifyingGlass.vue";
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
          <div class="text-2xl font-medium">Category management</div>
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

        <section class="m-10 flex flex-col w-[1080px] gap-4">
          <div class="flex flex-row w-full justify-start">
            <div class="flex relative">
              <input
                class="w-[360px] h-[48px] rounded-md px-9 flex items-center"
                type="text"
                placeholder="Search..."
              />
              <div class="absolute top-3 left-2">
                <MagnifyingGlass />
              </div>
            </div>
          </div>
          <div class="flex flex-col border border-brown-300 rounded-xl">
            <table class="w-full">
              <!-- Table Header -->
              <thead class=" ">
                <tr>
                  <th
                    class="px-4 py-2 flex items-start font-normal shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]"
                  >
                    Category
                  </th>
                </tr>
              </thead>
              <!-- Table Body -->
              <tbody>
                <tr>
                  <td class="px-4 py-2 flex items-start">1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<!-- justify-start items-center -->
