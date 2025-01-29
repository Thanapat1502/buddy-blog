<script setup lang="ts">
interface Category {
  id: number;
  name: string;
}

interface Article {
  id: number;
  title: string;
  image: string;
  description: string;
  date: string;
  content: string;
  likes_count: number;
  author: string;
  categories: {
    name: string;
  };
  statuses: {
    status: string;
  };
}

import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const categories = ref<Category[]>([]);
const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/admin/category");
    categories.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const articles = ref<Article[]>([]);
const fetchArticles = async () => {
  try {
    const response = await axios.get("/api/admin/article");
    articles.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const isLoading = ref(true);
const searchQuery = ref('');
const selectedStatus = ref('');
const selectedCategory = ref('');

// ใช้ computed property เพื่อกรองบทความตามเงื่อนไข
const filteredArticles = computed(() => {
  return articles.value.filter(article => 
    // ตรวจสอบว่า ชื่อบทความตรงกับคำค้นหาหรือไม่ (ไม่สนใจตัวพิมพ์ใหญ่/เล็ก)
    article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&

    // ถ้ามีการเลือกสถานะให้กรองบทความที่สถานะตรงกับที่เลือก
    // ถ้ายังไม่ได้เลือกสถานะ (selectedStatus เป็นค่าว่าง) จะไม่กรองสถานะ
    (selectedStatus.value === '' || article.statuses.status === selectedStatus.value) &&

    // ถ้ามีการเลือกหมวดหมู่ให้กรองบทความที่หมวดหมู่ตรงกับที่เลือก
    // ถ้ายังไม่ได้เลือกหมวดหมู่ (selectedCategory เป็นค่าว่าง) จะไม่กรองหมวดหมู่
    (selectedCategory.value === '' || article.categories.name === selectedCategory.value)
  );
})

const handleDelete = async (id: number) => {
  try {
    await axios.delete(`/api/admin/article/${id}`);
    articles.value = articles.value.filter(article => article.id !== id);
  } catch (error) {
    console.error(error);
  }
};

const router = useRouter();
const navigate = (path: string) => {
  router.push(path);
};

onMounted(async () => {
  isLoading.value = true;
  await Promise.all([fetchCategories(), fetchArticles()]);
  isLoading.value = false;
});
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <main class="flex-1 p-8 overflow-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Article management</h2>
        <Button class="px-8 py-2 rounded-full" @click="navigate('/admin/create')">
          Create article
        </Button>
      </div>
      <div class="flex space-x-4 mb-6">
        <div class="flex-1">
          <Input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
          />
        </div>
        <Select v-model="selectedStatus">
          <SelectTrigger class="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="publish">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Select v-model="selectedCategory">
          <SelectTrigger class="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="cat in categories" :key="cat.id" :value="cat.name">
              {{ cat.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[50%]">Article title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead class="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="isLoading">
            <TableRow v-for="index in 9" :key="index">
              <TableCell>
                <Skeleton class="h-6 w-[250px] bg-[#EFEEEB]" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-6 w-[150px] bg-[#EFEEEB]" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-6 w-[100px] bg-[#EFEEEB]" />
              </TableCell>
              <TableCell>
                <Skeleton class="h-6 w-[50px] bg-[#EFEEEB]" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="filteredArticles.length > 0">
            <TableRow v-for="article in filteredArticles" :key="article.id">
              <TableCell class="font-medium">{{ article.title }}</TableCell>
              <TableCell>{{ article.categories.name }}</TableCell>
              <TableCell>
                <span
                  :class="`inline-flex capitalize items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    article.statuses.status === 'draft'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`"
                >
                  {{ article.statuses.status }}
                </span>
              </TableCell>
              <TableCell class="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  @click="navigate(`/admin/article-management/edit/${article.id}`)"
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  @click="handleDelete(article.id)"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell colspan="4" class="text-center font-medium pt-8">
                No articles found matching your search.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </main>
  </div>
</template>