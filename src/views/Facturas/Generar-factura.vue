<template>
  <div class="p-6 min-h-screen bg-slate-800 text-white">
    <h1 class="text-3xl font-bold text-blue-800 mb-6">Generar Factura Electrónica</h1>
    <form @submit.prevent="submitForm" class="bg-slate-600 p-6 rounded-lg shadow-md space-y-4">

      <!-- Info de Factura -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-3 md:col-span-2 bg-blue-900 p-2 rounded-lg flex justify-center shadow-xl">
          <h3 class="font-bold">Información factura</h3>
        </div>
        <!-- rango numeracion -->
        <div>
          <label for="numbering_range_id" class="block text-sm font-medium text-white">Rango de Numeración*</label>
          <select v-model="form.numbering_range_id" id="numbering_range_id"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" required>
            <option v-for="rango in rangoNumeracion" :key="rango.id" :value="rango.id">{{ rango.document }}</option>
          </select>
        </div>
        <!-- codigo referencia -->
        <div>
          <label for="reference_code" class="block text-sm font-medium text-white">Código de Referencia*</label>
          <input v-model="form.reference_code" type="text" id="reference_code"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" required />
        </div>
        <!-- observaciones -->
        <div>
          <label for="observation" class="block text-sm font-medium text-white">Observación</label>
          <textarea v-model="form.observation" id="observation"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2"></textarea>
        </div>
        <!-- forma de pago -->
        <div>
          <label for="payment_form" class="block text-sm font-medium text-white">Forma de Pago*</label>
          <select v-model="form.payment_form" id="payment_form"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" required>
            <option v-for="pago in mediosPago" :key="pago.code" :value="pago.code">{{ pago.name }}</option>
          </select>

        </div>
        <!-- fecha de vencimiento -->
        <div>
          <label for="payment_due_date" class="block text-sm font-medium text-white">Fecha de Vencimiento*</label>
          <input v-model="form.payment_due_date" type="date" id="payment_due_date"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" required />
        </div>
        <!-- codigo metodo de pago -->
        <div>
          <label for="payment_method_code" class="block text-sm font-medium text-white">Método de Pago*</label>
          <select v-model="form.payment_method_code" id="payment_method_code"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" required>
            <option v-for="pago in mediosPagoData.data" :key="pago.code" :value="pago.code">{{ pago.description }}
            </option>
          </select>

        </div>
        <!-- periodo de facturacion -->
        <div>
          <label for="billing_period_start_date" class="block text-sm font-medium text-white">Fecha de Inicio del
            Periodo de Facturación</label>
          <input v-model="form.billing_period.start_date" type="date" id="billing_period_start_date"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <div>
          <label for="billing_period_end_date" class="block text-sm font-medium text-white">Fecha de Fin del Periodo de
            Facturación</label>
          <input v-model="form.billing_period.end_date" type="date" id="billing_period_end_date"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
      </div>

      <!-- Info de Customer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-3 md:col-span-2 bg-blue-900 p-2 rounded-lg flex justify-center shadow-xl">
          <h3 class="font-bold">Información Cliente</h3>
        </div>
        <!-- id documento identificacion -->
        <div>
          <label for="TipoDocumento" class="block text-sm font-medium text-white">Tipo documento*</label>
          <select v-model="form.customer.identification_document_id" id="TipoDocumento"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2 max-w-xs"
            required>
            <option v-for="tipo in tipoDocumentosData.data" :key="tipo.id" :value="tipo.id">{{ tipo.name }}</option>
          </select>

        </div>
        <!-- identificacion -->
        <div>
          <label for="customer_identification" class="block text-sm font-medium text-white">Identificación del
            Cliente*</label>
          <input v-model="form.customer.identification" type="text" id="customer_identification"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" required />
        </div>
        <!-- dv -->
        <div>
          <label for="customer_dv" class="block text-sm font-medium text-white">Digíto de verificación del cliente. con
            NIT.</label>
          <input v-model="form.customer.dv" type="text" id="customer_dv"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <!-- company -->
        <div>
          <label for="customer_names" class="block text-sm font-medium text-white">Nombres</label>
          <input v-model="form.customer.names" type="text" id="customer_names"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <!-- direccion cliente -->
        <div>
          <label for="customer_address" class="block text-sm font-medium text-white">Dirección</label>
          <input v-model="form.customer.address" type="text" id="customer_address"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <!-- email -->
        <div>
          <label for="customer_email" class="block text-sm font-medium text-white">Email</label>
          <input v-model="form.customer.email" type="email" id="customer_email"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <!-- telefono -->
        <div>
          <label for="customer_phone" class="block text-sm font-medium text-white">Teléfono</label>
          <input v-model="form.customer.phone" type="text" id="customer_phone"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <!-- id organizacion legal -->
        <div>
          <label for="legal_organization_id" class="block text-sm font-medium text-white">legal_organization_ids</label>
          <select v-model="form.customer.legal_organization_id" id="legal_organization_id"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2 max-w-xs"
            required>
            <option v-for="org in legal_organization" :key="org.code" :value="org.code">{{ org.name }}
            </option>
          </select>

        </div>
        <!-- id tributo -->
        <div>
          <label for="tributo" class="block text-sm font-medium text-white">Tributos</label>
          <select v-model="form.customer.tribute_id" id="tributo"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2 max-w-xs"
            required>
            <option v-for="tributo in tributosData.data" :key="tributo.id" :value="tributo.code">{{ tributo.name }}
            </option>
          </select>
        </div>

        <!-- departamentos -->
        <div>
          <label for="departamentos" class="block text-sm font-medium text-white">Departamentos</label>
          <select v-model="departamentoSelected" id="departamentos"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2 max-w-xs"
            required>
            <option v-for="dept in departamentos" :key="dept.id" :value="dept.code">{{ dept.name }}</option>
          </select>
        </div>
        <!-- id municipio -->
        <div>
          <label for="customer_municipality_id" class="block text-sm font-medium text-white">Municipio</label>
          <select v-model="form.customer.municipality_id" id="customer_municipality_id"
            :disabled="departamentoSelected === ''"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2 max-w-xs"
            required>
            <option v-for="municipio in municipios" :key="municipio.id" :value="municipio.id">{{ municipio.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Info de Productos -->
      <!-- Info de Productos -->
      <div class="w-full bg-blue-900 p-2 rounded-lg flex justify-center shadow-xl">
        <h3 class="font-bold">Información productos</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label for="item_code_reference" class="block text-sm font-medium text-white">Código de Referencia*</label>
          <input v-model="item.code_reference" id="item_code_reference" type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <div>
          <label for="item_name" class="block text-sm font-medium text-white">Nombre*</label>
          <input v-model="item.name" id="item_name" type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <div>
          <label for="item_quantity" class="block text-sm font-medium text-white">Cantidad*</label>
          <input v-model="item.quantity" id="item_quantity" type="number"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <div>
          <label for="item_discount_rate" class="block text-sm font-medium text-white">Tasa de Descuento*</label>
          <input v-model="item.discount_rate" id="item_discount_rate" type="number"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <div>
          <label for="item_price" class="block text-sm font-medium text-white">Precio*</label>
          <input v-model="item.price" id="item_price" type="number"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <div>
          <label for="item_tax_rate" class="block text-sm font-medium text-white">Tasa de Impuesto*</label>
          <input v-model="item.tax_rate" id="item_tax_rate" type="number"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
        <div>
          <label for="unit_measure_id" class="block text-sm font-medium text-white">unidad de medidas*</label>
          <select v-model="item.unit_measure_id" id="unit_measure_id"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2 max-w-xs">
            <option v-for="medida in medidaData.data" :key="medida.id" :value="medida.code">{{ medida.name }}
            </option>
          </select>

        </div>
        <div>
          <label for="standard_code" class="block text-sm font-medium text-white">standard_code*</label>
          <select v-model="item.standard_code_id" id="standard_code"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2 max-w-xs">
            <option v-for="standard in standard_code" :key="standard.id" :value="standard.id">{{ standard.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="item_is_excluded" class="block text-sm font-medium text-white">¿Excluido?</label>
          <input type="checkbox" v-model="item.is_excluded" id="item_is_excluded"
            class="mt-1 block w-auto border-gray-300 rounded-md bg-slate-800 text-white p-2">
          <label for="item_is_excluded" class="block text-sm font-medium text-white">
            {{ item.is_excluded ? 'Sí' : 'No' }}
          </label>
        </div>
        <div>
          <label for="item_tribute_id" class="block text-sm font-medium text-white">ID de Tributo</label>
          <select v-model="item.tribute_id" id="item_tribute_id"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2 max-w-xs">
            <option v-for="tributo in tributosProdData.data" :key="tributo.id" :value="tributo.code">{{ tributo.name }}
            </option>
          </select>
        </div>
        <!-- <div>
          <label for="item_withholding_code" class="block text-sm font-medium text-white">Código de Retención</label>
          <input v-model="withholding.code" id="item_withholding_code" type="text"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2"  />
        </div> -->
        <div>
          <label for="item_withholding_tax_rate" class="block text-sm font-medium text-white">Tasa de Retención</label>
          <input v-model="withholding.withholding_tax_rate" id="item_withholding_tax_rate" type="number"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-slate-800 text-white p-2" />
        </div>
      </div>
      <button type="button" @click="addItem" class="bg-green-600 text-white p-2 rounded-md">Agregar Producto</button>

      <!-- Tabla de Previsualización -->
      <div class="mt-6 overflow-x-auto">
        <h3 class="text-xl font-bold text-blue-800 mb-4">Previsualización de Productos</h3>
        <table class="min-w-full bg-slate-700 text-white">
          <thead>
            <tr>
              <th class="py-2 px-4">Código de Referencia</th>
              <th class="py-2 px-4">Nombre</th>
              <th class="py-2 px-4">Cantidad</th>
              <th class="py-2 px-4">Tasa de Descuento</th>
              <th class="py-2 px-4">Precio</th>
              <th class="py-2 px-4">Tasa de Impuesto</th>
              <th class="py-2 px-4">ID de Unidad de Medida</th>
              <th class="py-2 px-4">ID de Código Estándar</th>
              <th class="py-2 px-4">¿Excluido?</th>
              <th class="py-2 px-4">ID de Tributo</th>
              <th class="py-2 px-4">Retenciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in form.items" :key="index">
              <td class="py-2 px-4">{{ item.code_reference }}</td>
              <td class="py-2 px-4">{{ item.name }}</td>
              <td class="py-2 px-4">{{ item.quantity }}</td>
              <td class="py-2 px-4">{{ item.discount_rate }}</td>
              <td class="py-2 px-4">{{ item.price }}</td>
              <td class="py-2 px-4">{{ item.tax_rate }}</td>
              <td class="py-2 px-4">{{ item.unit_measure_id }}</td>
              <td class="py-2 px-4">{{ item.standard_code_id }}</td>
              <td class="py-2 px-4">{{ item.is_excluded == 1 ? 'Sí' : 'No' }}</td>
              <td class="py-2 px-4">{{ item.tribute_id }}</td>
              <td class="py-2 px-4">
                <ul>
                  <li v-for="(withholding, wIndex) in item.withholding_taxes" :key="wIndex">
                    {{ withholding.code }}: {{ withholding.withholding_tax_rate }}%
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button type="submit" :class="{ 'opacity-25': loading }" :disabled="loading"
        class="bg-blue-800 text-white p-2 rounded-md mt-4">Generar Factura</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from '../../axios';
import departamentosData from '../../shared/departamentos.json';
import municipiosData from '../../shared/municipios.json';
import tributosData from '../../shared/tributos.json';
import tributosProdData from '../../shared/tributosProductos.json';
import tipoDocumentosData from '../../shared/tiposDocumento.json';
import mediosPagoData from '../../shared/mediosPagos.json';
import medidaData from '../../shared/medida.json';
import { inject } from 'vue';

const swal = inject('$swal');

const form = ref({
  numbering_range_id: 8,
  reference_code: "I3",
  observation: "",
  payment_form: "1",
  payment_due_date: "2024-12-30",
  payment_method_code: "10",
  billing_period: {
    start_date: "2024-01-10",
    start_time: '00:00:00',
    end_date: "2024-02-09",
    end_time: '23:59:59'
  },
  customer: {
    identification: "123456789",
    dv: "3",
    company: '',
    trade_name: '',
    names: "Alan Turing",
    address: "calle 1 # 2-68",
    email: "alanturing@enigmasas.com",
    phone: "1234567890",
    legal_organization_id: "2",
    tribute_id: "21",
    identification_document_id: "3",
    municipality_id: "980"
  },
  items: []
});

const item = ref({
  code_reference: "2332",
  name: "juan",
  quantity: 1,
  discount_rate: 0,
  price: 343434,
  tax_rate: 1,
  unit_measure_id: 0,
  standard_code_id: 0,
  is_excluded: false,
  tribute_id: 0,
  withholding_taxes: []
});

const mediosPago = ref([
  { code: 1, name: "Pago de contado" },
  { code: 2, name: "Pago a crédito" }
]);

const legal_organization = ref([
  { code: 1, name: "Persona Jurídica" },
  { code: 2, name: "Persona Natural" }
]);

const standard_code = ref([
  { id: 1, name: "Estándar de adopción del contribuyente" },
  { id: 2, name: "UNSPSC" },
  { id: 3, name: "Partida Arancelaria" },
  { id: 4, name: "GTIN" }
]);

const withholding = ref({
  code: "",
  withholding_tax_rate: 0
});


const rangoNumeracion = ref([]);
const departamentos = departamentosData.data;


const departamentoSelected = ref("");
const municipios = ref([]);

watch(departamentoSelected, (newVal) => {
  municipios.value = municipiosData.data.filter(municipio => municipio.code_depart === newVal);
});

const fetchRangoNumeracion = async () => {
  try {
    const response = await axios.get('/v1/numbering-ranges?filter[is_active]=1');
    rangoNumeracion.value = response.data.data;
  } catch (error) {
    console.error('Error al obtener el rango de numeración:', error);
  }
};

const submitForm = async () => {
  try {
    const response = await axios.post('https://api-sandbox.factus.com.co/v1/bills/validate', form.value);
    console.log('Factura generada con éxito:', response.data);
    swal.fire({
      icon: 'success',
      title: 'Factura generada con éxito',
      html: `
        <p>${response.data.message}</p>
        <p><strong>Empresa:</strong> ${response.data.data.company.name}</p>
        <p><strong>Cliente:</strong> ${response.data.data.customer.names}</p>
        <p><strong>Total:</strong> ${response.data.data.bill.total}</p>
        <a href="${response.data.data.bill.qr}" target="_blank" class="bg-blue-600 text-white p-2 rounded-md">Ver QR</a>
      `,
      customClass: {
        popup: 'bg-slate-700 text-white',
        title: 'text-white',
        content: 'text-white',
        confirmButton: 'bg-blue-600 text-white',
      },
      background: '#1f2937',
      didClose: () => {
        
      }
    });


    // Aquí puedes manejar la respuesta, mostrar un mensaje de éxito, etc.
  } catch (error) {
    console.error('Error al generar la factura:', error);
    swal.fire({
      icon: 'error',
      title: 'Error al generar la factura',
      text: error.response?.data?.message || 'Ocurrió un error inesperado',
      customClass: {
        popup: 'bg-slate-700 text-white',
        title: 'text-white',
        content: 'text-white',
        confirmButton: 'bg-blue-600 text-white',
      },
      background: '#1f2937',
    });
    // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
  }
};

const addItem = () => {
  withholding.value.code = item.value.tribute_id;

  console.log(item.value.is_excluded);

  item.value.is_excluded = item.value.is_excluded === true ? 1 : 0;

  form.value.items.push({ ...item.value, withholding_taxes: [] });
  console.log(form.value.items);
  item.value = {
    code_reference: "",
    name: "",
    quantity: 1,
    discount_rate: 0,
    price: 0,
    tax_rate: 0,
    unit_measure_id: 0,
    standard_code_id: 0,
    is_excluded: false,
    tribute_id: 1,
    withholding_taxes: []
  };
  withholding.value = {
    code: "",
    withholding_tax_rate: 0
  };
};

onMounted(fetchRangoNumeracion);
</script>

<style scoped>
/* Estilos específicos para la vista de generar factura */
</style>