<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <h1 class="text-2xl font-semibold text-center text-gray-900 mb-8">
          Log in
        </h1>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Email"
            />
          </div>
  
          <div>
            <label for="password" class="block text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Password"
            />
          </div>
  
          <button
            type="submit"
            class="w-full py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-150 ease-in-out"
          >
            Log in
          </button>
        </form>
  
        <p class="mt-6 text-center text-sm text-gray-600">
          Don't have any account?
          <a href="#" class="text-gray-900 hover:underline ml-1">Sign up</a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  
  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', {
      email: email.value,
      password: password.value
    })
  }
  </script>