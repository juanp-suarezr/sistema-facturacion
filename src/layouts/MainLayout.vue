<template>
  <div class="flex w-full h-screen bg-slate-800 font-roboto">
    <Sidebar :sidebarOpen="sidebarOpen" />

    <div class="flex flex-1 flex-col overflow-hidden">
      <Header :sidebarOpen="sidebarOpen" @toggleSidebar="toggleSidebar" />

      <div class="flex-1 overflow-x-hidden bg-gray-800">
        <div class="bg-blue-800 text-white p-2 hidden lg:flex justify-between items-center">
          <div class="text-lg font-bold">{{ pageTitle }}</div>
        </div>
        <div class="px-6">

          <main class="flex-grow p-4">
            <router-view></router-view>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
import Header from '@/components/Header.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const pageTitle = ref(route.meta.title);
const sidebarOpen = ref(false);

watch(route, (newRoute) => {
  pageTitle.value = newRoute.meta.title;
});

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

</script>
