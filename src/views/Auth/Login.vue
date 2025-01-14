<template>
  <div>

    <div class="w-full flex justify-center">
      <logo class="w-2/6" />
    </div>

    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="username" class="block text-sm font-medium text-blue-200">Usuario</label>
        <input v-model="username" type="text" id="username"
          class="mt-1 block bg-transparent text-gray-200 w-full border border-blue-400 rounded-md shadow-lg p-2"
          required />
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-blue-200">Contraseña</label>
        <input v-model="password" type="password" id="password"
          class="mt-1 block bg-transparent text-gray-200 w-full border border-blue-400 rounded-md shadow-lg p-2"
          required />
      </div>
      <div class="w-full flex justify-center">
        <button type="submit" :class="{'opacity-25': loading}" :disabled="loading"
          class="w-auto bg-blue-600 text-white p-2 px-4 rounded-md shadow-xl hover:bg-transparent border border-blue-400">Iniciar
          Sesión</button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Logo from '../../components/logo.vue';
import axios from '../../axios';
import { useRouter } from 'vue-router';
import { inject } from 'vue';

const swal = inject('$swal');

const username = ref('');
const password = ref('');
const router = useRouter();
const loading = ref(false);
const login = async () => {
  loading.value = true;
  try {
    const response = await axios.post('/oauth/token', {
      username: username.value,
      password: password.value,
      grant_type: 'password',
      client_id: process.env.VUE_APP_CLIENT_ID,
      client_secret: process.env.VUE_APP_CLIENT_SECRET,
    });
    console.log('Iniciado sesión con éxito:', response.data);
    // Guarda el token en sessionStorage o localStorage
    loading.value = false;
    sessionStorage.setItem('authToken', response.data.access_token);
    // Redirige al usuario a la página principal
    router.push('/');
  } catch (error) {
    loading.value = false;
    swal({
      title: "Error al iniciar sesión",
      text: "el usuario o la contraseña son incorrectos",
      icon: "error",
      customClass: {
        popup: 'bg-slate-700 text-white',
        title: 'text-white',
        content: 'text-white',
        confirmButton: 'bg-blue-600 text-white',
      },
      background: '#1f2937',
    });
    console.error('Error al iniciar sesión:', error);
  }
};

</script>

<style scoped>
/* Estilos específicos para la vista de inicio de sesión */
</style>