<template>
  <div class="p-6 min-h-screen bg-slate-800 text-white">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">Detalle de la Factura</h1>
    <button @click="goBack" class="mb-4 p-2 bg-blue-800 text-white rounded-md">Regresar</button>
    <div v-if="loading" class="text-center text-gray-600">Cargando...</div>
    <div v-else>
      <!-- Información de la Factura -->
      <div class="mb-6 p-4 bg-slate-600 rounded-lg flex justify-between">
        <div>
        <h2 class="text-2xl font-bold mb-4">Información de la Factura</h2>
        <p><strong>Número:</strong> {{ factura.bill.number }}</p>
        <p><strong>Estado:</strong> {{ factura.bill.status === 1 ? 'Activo' : 'Inactivo' }}</p>
        <p><strong>Total:</strong> {{ factura.bill.total }}</p>

        </div>
        <div>
            <img class="w-32 object-contain" :src="factura.bill.qr_image" alt="Código QR de la Factura">
        </div>
      </div>

      <!-- Cliente -->
      <div class="mb-6 p-4 bg-slate-600 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Cliente</h2>
        <p><strong>Nombre:</strong> {{ factura.customer.graphic_representation_name }}</p>
        <p><strong>Identificación:</strong> {{ factura.customer.identification }}</p>
      </div>

      <!-- Periodo de Facturación -->
      <div class="mb-6 p-4 bg-slate-600 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Periodo de Facturación</h2>
        <p><strong>Desde:</strong> {{ factura.billing_period.start_date }} {{ factura.billing_period.start_time }}</p>
        <p><strong>Hasta:</strong> {{ factura.billing_period.end_date }} {{ factura.billing_period.end_time }}</p>
      </div>

      <!-- Empresa -->
      <div class="mb-6 p-4 bg-slate-600 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Empresa</h2>
        <img :src="factura.company.url_logo" alt="Logo de la Empresa" class="mb-4 w-32 h-32 object-contain">
        <p><strong>Nombre:</strong> {{ factura.company.name }}</p>
        <p><strong>NIT:</strong> {{ factura.company.nit }}-{{ factura.company.dv }}</p>
      </div>

      <!-- Items -->
      <div class="mb-6 p-4 bg-slate-600 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Productos</h2>
        <ul>
          <li v-for="item in factura.items" :key="item.id" class="mb-2">
            <p><strong>nombre:</strong> {{ item.name }}</p>
            <p><strong>codigo:</strong> {{ item.code_reference }}</p>
            <p><strong>Cantidad:</strong> {{ item.quantity }}</p>
            <p><strong>Precio:</strong> {{ item.price }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '../../axios';

const route = useRoute();
const router = useRouter();
const factura = ref(null);
const loading = ref(true);

const fetchFactura = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`/v1/bills/show/${route.params.number}`);
    factura.value = response.data.data;
    sessionStorage.setItem('factura', JSON.stringify(factura.value));
  } catch (error) {
    console.error('Error al obtener la factura:', error);
  } finally {
    loading.value = false;
  }
};

const loadFacturaFromStorage = () => {
  const storedFactura = sessionStorage.getItem('factura');
  if (storedFactura) {
    factura.value = JSON.parse(storedFactura);
    loading.value = false;
  } else {
    fetchFactura();
  }
};

const goBack = () => {
    sessionStorage.removeItem('factura');
  router.push({ path: '/facturas' });
};

onMounted(loadFacturaFromStorage);
</script>

<style scoped>
/* Estilos específicos para la vista de factura */
</style>