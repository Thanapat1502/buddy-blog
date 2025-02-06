<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios"; // นำเข้า axios
import Sidebar from "~/components/admin/Sidebar.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const id = ref(route.params.id);

// ประกาศ type ของ category
interface Category {
  id: number; // หรืออาจจะเป็น string หาก id ของคุณเป็น string
  name: string;
}

// สร้างตัวแปรที่จะเก็บข้อมูล category
const categories = ref<Category[]>([]);
// console.log("fetching data category", categories.value);
// console.log("Category Name:", categories.value[0].name);

// ใช้ watch เพื่อติดตามการเปลี่ยนแปลงของ categories
watch(
  categories,
  (newCategories) => {
    if (newCategories.length > 0) {
      console.log("Category Name:", newCategories[0].name);
    }
  },
  { immediate: true }
);

// สร้างตัวแปรสำหรับ input
const searchQuery = ref("");
console.log("searchQuery1", searchQuery.value);

// ฟังก์ชันเพื่อจัดการการส่งข้อมูล POST
const handleSubmit = async (event: Event) => {
  event.preventDefault();
  console.log("searchQuery value before submit:", searchQuery.value); // ดูค่าก่อนส่ง

  if (!searchQuery.value) {
    console.error("Name is required");
    return;
  }

  try {
    const response = await axios.put("/api/categories", {
      id: id.value,
      name: searchQuery.value,
    });
    // เมื่อการอัปเดตสำเร็จ
    console.log("Category updated successfully:", response.data);
    router.push("/admin/category");
  } catch (error) {
    // หากเกิดข้อผิดพลาด
    console.error("Error updating category:", error);
  }
};

// ใช้ onMounted เพื่อดึงข้อมูลจาก API ตอนที่เปิดหน้า
onMounted(async () => {
  try {
    const response = await axios.get(`/api/categories?id=${id.value}`);
    console.log("Fetched Categories:", response.data);
    categories.value = response.data.categories;

    // หาก categories มีข้อมูลและมีค่าของ category ที่ดึงมา
    if (categories.value.length > 0) {
      searchQuery.value = categories.value[0].name; // กำหนดค่าให้ searchQuery
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
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
            Edit category
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
