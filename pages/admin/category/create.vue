<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios"; // นำเข้า axios
import Sidebar from "~/components/admin/Sidebar.vue";
import { useRouter } from "vue-router";

const router = useRouter();

// ประกาศ type ของ category
interface Category {
  id: number; // หรืออาจจะเป็น string หาก id ของคุณเป็น string
  name: string;
}

// สร้างตัวแปรที่จะเก็บข้อมูล category
const categories = ref<Category[]>([]);
// console.log("fetching data category", categories);

// สร้างตัวแปรสำหรับ input
const searchQuery = ref("");
console.log("searchQuery1",searchQuery.value)

// ฟังก์ชันเพื่อจัดการการส่งข้อมูล POST
const handleSubmit = async (event: Event) => {
  event.preventDefault();
  console.log("searchQuery value before submit:", searchQuery.value); // ดูค่าก่อนส่ง

  if (!searchQuery.value) {
    console.error("Name is required");
    return;
  }

  // ส่งข้อมูลที่ไม่ว่างเปล่า
  try {
    const response = await axios.post("/api/categories", {
      name: searchQuery.value,
    });
    console.log("Category saved:", response.data);
    router.push("/admin/category/create");
  } catch (error) {
    console.error("Error saving category:", error);
  }
};
onMounted(() => {
  console.log("searchQuery onMounted3:", searchQuery.value);
});
</script>

<template>
  <div class="min-h-screen min-w-screen flex bg-brown-100 text-brown-400">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <main class="flex flex-col justify-start items-center w-full">
      <form class="w-full" @submit.prevent="handleSubmit">
        <!-- navbar -->
        <nav
          class="w-full flex flex-row h-[96px] justify-between items-center px-14 min-w-[900px]"
        >
          <div class="text-2xl font-medium whitespace-nowrap">
            Category management
          </div>
          <button
            class="px-10 bg-brown-600 text-white rounded-full py-3 flex items-center gap-2 text-start"
            type="submit"
          >
            Save
          </button>
        </nav>
        <div class="flex h-px w-full bg-brown-300"></div>
        <!-- content -->
        <section class="w-full p-10 flex flex-col gap-3">
          <h1 class="text-brown-400">Category name</h1>
          <input
            class="w-[480px] h-[48px] rounded-md pl-4 flex items-center"
            type="text"
            v-model="searchQuery"
            placeholder="Search..."
            @input="console.log('Updated searchQuery2:', searchQuery)"
          />
        </section>
      </form>
    </main>
  </div>
</template>
