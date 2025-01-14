<template>
  <aside
    :class="['bg-slate-900 shadow-md border border-slate-600 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out', { '-translate-x-full': !sidebarOpen }]">
    <div class="text-lg font-bold px-4">Admin Panel</div>
    <nav>
      <ul>
        <li :class="{ 'bg-gray-700': $route.path === '/' }">
          <router-link to="/"
            class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Home</router-link>
        </li>
        <li :class="{ 'bg-gray-700': $route.path === '/facturas' || $route.name === 'VerFactura' }">
          <router-link to="/facturas"
            class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Facturas</router-link>
        </li>
        <li :class="{ 'bg-gray-700': $route.path === '/generar-factura' }">
          <router-link to="/generar-factura"
            class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">Generar facturas</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  sidebarOpen: Boolean
});
</script>

<style scoped>
/* Estilos específicos para el sidebar */
</style>