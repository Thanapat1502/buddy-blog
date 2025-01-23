<template>
  <div class="flex flex-col min-h-screen">
    <!-- Placeholder for NavBar component -->
    <nav-bar />
    <div class="min-h-screen md:p-8">
      <div class="max-w-4xl mx-auto overflow-hidden">
        <!-- Desktop Header -->
        <div class="hidden md:flex items-center p-6">
          <div class="h-14 w-14 rounded-full overflow-hidden">
            <img
              :src="profile.image"
              alt="Profile"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="ml-4">
            <h1 class="text-2xl font-bold">{{ profile.name }}</h1>
          </div>
        </div>

        <!-- Mobile Header -->
        <div class="md:hidden p-4">
          <div class="flex justify-start gap-12 items-center mb-4">
            <div
              class="flex items-center space-x-2 text-foreground font-medium cursor-default"
            >
              <user-icon class="h-5 w-5 mb-1" />
              <span>Profile</span>
            </div>
            <nuxt-link
              to="/reset-password"
              class="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              <lock-icon class="h-5 w-5 mb-1" />
              Reset password
            </nuxt-link>
          </div>
          <div class="flex items-center">
            <div class="h-10 w-10 rounded-full overflow-hidden">
              <img
                :src="profile.image"
                alt="Profile"
                class="object-cover w-full h-full"
              />
            </div>
            <h2 class="ml-3 text-xl font-semibold">{{ profile.name }}</h2>
          </div>
        </div>

        <div class="flex flex-col md:flex-row">
          <!-- Desktop Sidebar -->
          <aside class="hidden md:block w-64 p-6">
            <nav>
              <div class="space-y-3">
                <div
                  class="flex items-center space-x-2 text-foreground font-medium cursor-default"
                >
                  <user-icon class="h-5 w-5 mb-1" />
                  <span>Profile</span>
                </div>
                <nuxt-link
                  to="/reset-password"
                  class="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  <lock-icon class="h-5 w-5 mb-1" />
                  Reset password
                </nuxt-link>
              </div>
            </nav>
          </aside>

          <!-- Main Content -->
          <main
            class="flex-1 p-8 bg-[#EFEEEB] md:m-2 md:shadow-md md:rounded-lg"
          >
            <div
              class="flex flex-col md:flex-row items-center justify-start md:gap-6 mb-6"
            >
              <div class="h-28 w-28 rounded-full overflow-hidden mb-5">
                <img
                  :src="profile.image"
                  alt="Profile"
                  class="object-cover w-full h-full"
                />
              </div>
              <label
                class="bg-background px-8 py-2 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
              >
                Upload profile picture
                <input
                  type="file"
                  class="sr-only"
                  @change="handleFileChange"
                  accept="image/*"
                />
              </label>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  v-model="profile.name"
                  type="text"
                  class="w-full mt-1 py-3 px-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  for="username"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  v-model="profile.username"
                  type="text"
                  class="w-full mt-1 py-3 px-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  v-model="profile.email"
                  type="email"
                  disabled
                  class="w-full mt-1 py-3 px-3 rounded-sm border border-gray-300 bg-gray-100"
                />
              </div>
              <button
                type="submit"
                :disabled="isSaving"
                class="px-8 py-2 mt-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSaving ? "Saving..." : "Save" }}
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
    <!-- Placeholder for Footer component -->
    <footer-component />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { UserIcon, LockIcon, XIcon } from "lucide-vue-next";

const profile = ref({
  image: "",
  name: "",
  username: "",
  email: "",
});
const isSaving = ref(false);
const imageFile = ref(null);

onMounted(async () => {
  try {
    profile.value = {
      image: state.value.user.profilePic || "",
      name: state.value.user.name || "",
      username: state.value.user.username || "",
      email: state.value.user.email || "",
    };
  } catch (error) {}
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Check file type
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return;
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return;
  }

  imageFile.value = file;
  profile.value.image = URL.createObjectURL(file);
};

const handleSubmit = async () => {
  try {
    isSaving.value = true;

    const formData = new FormData();
    formData.append("name", profile.value.name);
    formData.append("username", profile.value.username);

    if (imageFile.value) {
      formData.append("imageFile", imageFile.value);
    }

    // Replace with your actual API endpoint
    await $fetch("https://your-api-endpoint.com/profile", {
      method: "PUT",
      body: formData,
    });
  } catch (error) {
  } finally {
    isSaving.value = false;
  }
};
</script>
