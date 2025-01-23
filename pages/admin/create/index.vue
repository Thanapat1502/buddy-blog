<script setup lang="ts">
import { ref } from "vue";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Quill from '~/components/Quill.vue';
const introduction = ref('');
const content = ref('');
const a = ["1", "2", "3"]
</script>

<template>
  <main class="flex-1 p-8 bg-gray-50 overflow-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Create article</h2>
      <div class="space-x-2">
        <Button class="px-8 py-2 rounded-full" variant="outline">
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
            class="flex justify-center items-center w-full max-w-lg h-80 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
          </div>
          <label for="file-upload"
            class="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer">
            <span>Upload thumbnail image</span>
            <input id="file-upload" name="file-upload" type="file" class="sr-only" />
          </label>
        </div>
      </div>

      <div>
        <label for="category">Category</label>
        <Select value={post.category}>
          <SelectTrigger
            class="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="item in a" :key="item" :value="item">
              {{ item }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label for="author">Author name</label>
        <Input id="author" name="author" value={state.user.name} class="mt-1 max-w-lg" disabled />
      </div>

      <div>
        <label for="title">Title</label>
        <Input id="title" name="title" placeholder="Article title"
          class="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground" />
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
