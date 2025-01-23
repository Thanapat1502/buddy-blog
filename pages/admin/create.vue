<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
</script>

<template>
     <main class="flex-1 p-8 bg-gray-50 overflow-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold">Create article</h2>
            <div class="space-x-2">
              <Button
                class="px-8 py-2 rounded-full"
                variant="outline"
              >
                Save as draft
              </Button>
              <Button
                class="px-8 py-2 rounded-full"
              >
                Save and publish
              </Button>
            </div>
          </div>

          <form class="space-y-7 max-w-4xl">
            <div>
              <label
                for="thumbnail"
                class="block text-gray-700 font-medium mb-2"
              >
                Thumbnail image
              </label>
              <div class="flex items-end space-x-4">
                <div className="flex justify-center items-center w-full max-w-lg h-80 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                    <div className="text-center space-y-2">
                      <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                    </div>
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
                  />
                </label>
              </div>
            </div>

            <div>
              <label for="category">Category</label>
              <Select
                value={post.category}
              >
                <SelectTrigger class="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem key={cat.id} value={cat.name}>
                      1
                    </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label for="author">Author name</label>
              <Input
                id="author"
                name="author"
                value={state.user.name}
                class="mt-1 max-w-lg"
                disabled
              />
            </div>

            <div>
              <label for="title">Title</label>
              <Input
                id="title"
                name="title"
                placeholder="Article title"
                class="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>

            <div>
              <label for="introduction">
                Introduction (max 120 letters)
              </label>
              <Textarea
                id="introduction"
                name="description"
                placeholder="Introduction"
                rows={3}
                class="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
                maxLength={120}
              ></Textarea>
            </div>

            <div>
              <label for="content">Content</label>
              <Textarea
                id="content"
                name="content"
                placeholder="Content"
                rows={20}
                class="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              ></Textarea>
            </div>
          </form>
        </main>
</template>
