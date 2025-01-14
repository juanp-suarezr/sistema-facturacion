import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./tailwind.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// theme
import Aura from "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css"; // Estilos de PrimeVue
import "primeicons/primeicons.css"; // Iconos de PrimeVue

import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";

createApp(App)
  .use(router)
  .use(VueSweetalert2)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: "p",
        darkModeSelector: "system",
        cssLayer: false,
      },
    },
  })
  .directive("tooltip", Tooltip)
  .mount("#app");
