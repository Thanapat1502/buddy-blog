<script setup lang="ts">
import { useRoute } from "vue-router"; // ใช้ Vue Router
import Article from "../svg/admin/Article.vue";
import bbWebsite from "../svg/admin/bbWebsite.vue";
import Category from "../svg/admin/Category.vue";
import LogOut from "../svg/admin/LogOut.vue";
import Notification from "../svg/admin/Notification.vue";
import Profile from "../svg/admin/Profile.vue";

const route = useRoute(); // ใช้สำหรับตรวจสอบ path ปัจจุบัน
</script>

<template>
  <aside class="flex flex-col h-screen min-w-[280px] bg-brown-200 py-4 text-brown-400">
    <div class="flex flex-col h-full w-full justify-between">
      <div class="">
        <div class="flex flex-col h-[212px] gap-3 justify-center px-5">
          <div class="text-[40px] text-brown-500">
            bb<span class="text-brand-green">.</span>
          </div>
          <div class="font-semibold text-brand-orange">Admin panel</div>
        </div>
        <div class="">
          <div
            :class="[
              'flex flex-row items-center pl-5 gap-2 transition duration-200 ',
              route.path === '/admin/article'
                ? 'bg-brown-300'
                : 'hover:bg-brown-300',
            ]"
          >
            <Article />
            <a
              href="/admin/article"
              class="flex flex-col justify-center text-brown-500 w-full h-[64px]"
            >
              Article management
            </a>
          </div>
          <div
            :class="[
              'flex flex-row items-center pl-5 gap-2 transition duration-200',
              route.path === '/admin/category'
                ? 'bg-brown-300'
                : 'hover:bg-brown-300',
            ]"
          >
            <Category />
            <a
              href="/admin/category"
              class="flex flex-col justify-center text-brown-500 w-full h-[64px]"
            >
              Category management
            </a>
          </div>
          <div
            :class="[
              'flex flex-row items-center pl-5 gap-2 transition duration-200',
              route.path === '/admin/profile'
                ? 'bg-brown-300'
                : 'hover:bg-brown-300',
            ]"
          >
            <Profile />
            <a
              href="/admin/profile"
              class="flex flex-col justify-center text-brown-500 w-full h-[64px]"
            >
              Profile
            </a>
          </div>
          <div
            :class="[
              'flex flex-row items-center pl-5 gap-2 transition duration-200',
              route.path === '/admin/notification'
                ? 'bg-brown-300'
                : 'hover:bg-brown-300',
            ]"
          >
            <Notification />
            <a
              href="/admin/notification"
              class="flex flex-col justify-center text-brown-500 w-full h-[64px]"
            >
              Notification
            </a>
          </div>
        </div>
      </div>
      <div>
        <div
          class="flex flex-row items-center pl-5 gap-2 hover:bg-brown-300 transition duration-200"
        >
          <bbWebsite />
          <a
            href="/"
            class="flex flex-col justify-center text-brown-500 w-full h-[64px]"
          >
            bb. website
          </a>
        </div>
        <div class="w-full h-px bg-brown-300"></div>
        <div
          class="flex flex-row items-center pl-5 gap-2 hover:bg-brown-300 transition duration-200"
        >
          <LogOut />
          <a
            href="/"
            class="flex flex-col justify-center text-brown-500 w-full h-[64px]"
          >
            Log out
          </a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts"></script>

<!-- No style block needed as Tailwind handles everything -->
