<template>
  <div class="flex flex-col items-center justify-center h-full p-6">
    <h1 class="text-4xl font-bold text-blue-600">Dashboard del Sistema de Facturación</h1>
    <p class="mt-4 text-lg text-gray-200">Bienvenido al sistema de facturación. Aquí puedes gestionar tus facturas y clientes.</p>
    
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div class="bg-slate-600 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-200">Facturas</h2>
        <p class="mt-2 text-gray-200">Gestiona todas tus facturas desde aquí.</p>
        <router-link to="/facturas" class="mt-4 inline-block text-blue-600 hover:underline">Ver más</router-link>
      </div>
      <div class="bg-slate-600 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-200">Clientes</h2>
        <p class="mt-2 text-gray-200">Gestiona la información de tus clientes.</p>
        <router-link to="/clientes" class="mt-4 inline-block text-blue-600 hover:underline">Ver más</router-link>
      </div>
      <div class="bg-slate-600 p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-200">Reportes</h2>
        <p class="mt-2 text-gray-200">Genera reportes detallados de tus facturas.</p>
        <router-link to="/generar-factura" class="mt-4 inline-block text-blue-600 hover:underline">Ver más</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Estilos específicos para la vista de inicio */
</style>