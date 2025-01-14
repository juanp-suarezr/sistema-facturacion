<template>
  <div class="h-screen flex items-center justify-center bg-slate-700">
    <div class="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md">
      <header class="mb-6">
        <h1 class="text-2xl font-bold text-center text-gray-200">Sistema de facturación</h1>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style scoped>
/* Estilos específicos para el layout de inicio de sesión */
</style>