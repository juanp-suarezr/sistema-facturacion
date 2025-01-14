import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import Home from "../views/Home.vue";
import Factura from "../views/Facturas/Factura.vue";
import GenerarFactura from "../views/Facturas/Generar-factura.vue";
import Login from "../views/Auth/Login.vue";
import VerFactura from "../views/Facturas/ver-factura.vue";

// Función para verificar si el token ha expirado
const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiry = payload.exp * 1000;
  return Date.now() > expiry;
};

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    return false;
  }
  return !isTokenExpired(token);
};

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", component: Home, meta: { title: "Dashboard" } },
      { path: "facturas", component: Factura, meta: { title: "Facturas" } },
      {
        path: "ver-factura/:number",
        name: "VerFactura",
        component: VerFactura,
        props: true,
        meta: { title: "Ver Factura", parent: "facturas" },
      },
      {
        path: "generar-factura",
        component: GenerarFactura,
        meta: { title: "Generar facturas" },
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    component: AuthLayout,
    children: [{ path: "", component: Login }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardias de navegación globales
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
