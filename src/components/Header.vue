<template>
  <header class="bg-slate-900 shadow-md border border-slate-600 text-white p-4 flex justify-end items-center w-full lg:w-auto">
    
    <div class="relative">
      <button @click="toggleDropdown" class="text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1 z-20">
        <a href="#" class="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-800">Perfil</a>
        <a href="#" @click="logout" class="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-800">Cerrar sesión</a>
      </div>
    </div>
    <button @click="toggleSidebar" class="text-white focus:outline-none lg:hidden">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  sidebarOpen: Boolean
});

const emit = defineEmits(['toggleSidebar']);

const toggleSidebar = () => {
  emit('toggleSidebar');
};

const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const logout = () => {
  // Eliminar credenciales del sessionStorage
  sessionStorage.removeItem('authToken');
  // Redirigir al usuario a la página de inicio de sesión
  window.location.href = '/login';
};
</script>

<style scoped>
/* Estilos específicos para el header */
</style>