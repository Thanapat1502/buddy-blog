<script setup lang="ts">
interface Category {
  id: number;
  name: string;
}

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Quill from "~/components/Quill.vue";
import axios from "axios";

const route = useRoute(); // ใช้ Vue Router เพื่อดึง id จาก URL

const categories = ref<Category[]>([]);
const imageFile = ref<File | null>(null);
const imageUrl = ref<string | null>(null);
const introduction = ref("");
const content = ref("");
const id_category = ref<string | undefined>(undefined);
const author = ref<string>("John Doe");
const title = ref<string>("");
const id = ref<string | null>(route.params.id as string | null); // ดึงค่า id จากพารามิเตอร์ของ URL
const cat = ref("")

const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/admin/category");
    categories.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const fetchArticle = async (articleId: string) => {
  try {
    const response = await axios.get(`/api/admin/article/${articleId}`);
    const article = response.data.data[0];
    title.value = article.title;
    introduction.value = article.description;
    content.value = article.content;
    author.value = article.author;
    cat.value = article.categories.name;
    imageUrl.value = article.image;
  } catch (error) {
    console.error("Error fetching article:", error);
  }
};

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  if (file) {
    imageFile.value = file;
    imageUrl.value = URL.createObjectURL(file);
  }
};

onMounted(() => {
  fetchCategories();
  if (id.value) {
    fetchArticle(id.value);
  }
});
</script>


<template>
  <main class="flex-1 p-8 bg-gray-50 overflow-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">{{ id ? 'Edit' : 'Create' }} article</h2>
      <div class="space-x-2">
        <Button
          class="px-8 py-2 rounded-full"
          variant="outline"
        >
          Save as draft
        </Button>
        <Button class="px-8 py-2 rounded-full">
          Save and publish
        </Button>
      </div>
    </div>

    <form class="space-y-7 max-w-4xl">
      <div>
        <label for="thumbnail" class="block text-gray-700 font-medium mb-2">
          Thumbnail image
        </label>
        <div class="flex items-end space-x-4">
          <div
            class="flex justify-center items-center w-full max-w-lg h-80 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="Uploaded"
              class="rounded-md object-cover max-w-lg h-80"
            />
            <span v-else class="text-gray-500">No image uploaded</span>
          </div>
          <label
            for="file-upload"
            class="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
          >
            <span>Upload thumbnail image</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
              @change="handleImageUpload"
            />
          </label>
        </div>
      </div>

      <div>
        <label for="category">Category</label>
        <Select v-model="cat">
          <SelectTrigger
            class="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="item in categories"
              :key="item.id"
              :value="item.name"
            >
              {{ item.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label for="author">Author name</label>
        <Input id="author" name="author" class="mt-1 max-w-lg" disabled v-model="author" />
      </div>

      <div>
        <label for="title">Title</label>
        <Input
          id="title"
          name="title"
          placeholder="Article title"
          v-model="title"
          class="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
        />
      </div>

      <div>
        <label for="introduction">
          Introduction (max 120 letters)
        </label>
        <ClientOnly>
          <Quill v-model:content="introduction" />
        </ClientOnly>
      </div>

      <div>
        <label for="content">Content</label>
        <ClientOnly>
          <Quill v-model:content="content" />
        </ClientOnly>
      </div>
    </form>
  </main>
</template>