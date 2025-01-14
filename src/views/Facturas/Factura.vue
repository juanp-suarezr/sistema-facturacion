<template>
  <div class="p-6 min-h-screen">
    <h1 class="text-3xl font-bold text-blue-600 mb-6">Listado de Facturas</h1>

    <!-- Filtros -->
    <div class="mb-4 p-4 bg-slate-600 rounded-lg flex flex-wrap gap-4">
      <input @keydown.enter="fetchFacturas" v-model="filters.identification" type="text" placeholder="Identificación"
        class="p-2 border rounded-md bg-slate-800 text-white" />
      <input @keydown.enter="fetchFacturas" v-model="filters.names" type="text" placeholder="Nombre"
        class="p-2 border rounded-md bg-slate-800 text-white" />
      <input @keydown.enter="fetchFacturas" v-model="filters.number" type="text" placeholder="Número"
        class="p-2 border rounded-md bg-slate-800 text-white" />
      <input @keydown.enter="fetchFacturas" v-model="filters.reference_code" type="text"
        placeholder="Código de Referencia" class="p-2 border rounded-md bg-slate-800 text-white" />
      <select @keydown.enter="fetchFacturas" v-model="filters.status"
        class="p-2 border rounded-md bg-slate-800 text-white">
        <option value="">Estado</option>
        <option value="1">Activo</option>
        <option value="0">Inactivo</option>
      </select>
      <button @click="fetchFacturas" class="p-2 bg-blue-800 text-white rounded-md">Filtrar</button>
      <button @click="ClearAll" class="p-2 bg-blue-800 text-white rounded-md">Limpiar</button>
    </div>

    <!-- Tabla de facturas -->
    <div v-if="loading" class="text-center text-gray-600">Cargando...</div>
    <div v-else>
      <table class="min-w-full bg-slate-600 shadow-md rounded-lg overflow-hidden">
        <thead class="bg-blue-800 text-white">
          <tr>
            <th class="py-2 px-4">Número</th>
            <th class="py-2 px-4">Cliente</th>
            <th class="py-2 px-4">Identificación</th>
            <th class="py-2 px-4">Estado</th>
            <th class="py-2 px-4">Total</th>
            <th class="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="factura in facturas" :key="factura.id" class="border-b text-blue-200">
            <td class="py-2 px-4">{{ factura.number }}</td>
            <td class="py-2 px-4">{{ factura.names }}</td>
            <td class="py-2 px-4">{{ factura.identification }}</td>
            <td class="py-2 px-4">{{ factura.status === 1 ? 'Activo' : 'Inactivo' }}</td>
            <td class="py-2 px-4">{{ factura.total }}</td>
            <td class="py-2 px-4 block">
              <button @click="viewFactura(factura.number)" class="text-blue-400 hover:underline block">Ver</button>
              <button @click="downloadFactura(factura.number)"
                class="text-blue-400 hover:underline block">Descargar</button>
            </td>
          </tr>
        </tbody>
      </table>


      <!-- Paginación -->
      <div class="mt-4 flex justify-between items-center">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="p-2 bg-blue-800 text-white rounded-md cursor-pointer">Anterior</button>
        <div class="flex space-x-2">
          <button v-for="page in visiblePages" :key="page" @click="goToPage(page)"
            :class="['p-2 rounded-md', { 'bg-blue-800 text-white': currentPage === page, 'bg-slate-600 text-black': currentPage !== page }]">
            {{ page }}
          </button>
        </div>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="p-2 bg-blue-800 text-white rounded-md">Siguiente</button>
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../../axios';

const router = useRouter();
const facturas = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = ref(1);

const filters = ref({
  identification: '',
  names: '',
  number: '',
  reference_code: '',
  status: ''
});

const ClearAll = () => {
  filters.value.identification = '';
  filters.value.names = '';
  filters.value.number = '';
  filters.value.reference_code = '';
  filters.value.status = '';
  fetchFacturas();
}

const fetchFacturas = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/v1/bills', {
      params: {
        'filter[identification]': filters.value.identification,
        'filter[names]': filters.value.names,
        'filter[number]': filters.value.number,
        'filter[reference_code]': filters.value.reference_code,
        'filter[status]': filters.value.status,
        'page': currentPage.value,
        'per_page': itemsPerPage.value
      }
    });
    facturas.value = response.data.data.data;
    totalPages.value = response.data.data.pagination.last_page;
  } catch (error) {
    console.error('Error al obtener las facturas:', error);
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchFacturas();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchFacturas();
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  fetchFacturas();
};

const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 6;
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage.value - halfVisiblePages, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const viewFactura = (number) => {
  router.push({ name: 'VerFactura', params: { number } });
};

const downloadFactura = async (number) => {
  try {
    const response = await axios.get(`/v1/bills/download-pdf/${number}`);
    const pdfBase64 = response.data.data.pdf_base_64_encoded;
    const linkSource = `data:application/pdf;base64,${pdfBase64}`;
    const downloadLink = document.createElement('a');
    const fileName = `${response.data.data.file_name}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  } catch (error) {
    console.error('Error al descargar la factura:', error);
  }
};

onMounted(fetchFacturas);
</script>

<style scoped>
/* Estilos específicos para la vista de facturas */
</style>