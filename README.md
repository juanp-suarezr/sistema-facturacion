# Sistema de Facturación

Este es un proyecto de aplicación web desarrollado con Vue.js, Tailwind CSS y PrimeVue. La aplicación está diseñada para gestionar un sistema de facturación, proporcionando una interfaz de usuario moderna y responsiva.

## Estructura del Proyecto

El proyecto tiene la siguiente estructura de carpetas:

- **src/assets**: Recursos estáticos como imágenes y fuentes.
- **src/components**: Componentes reutilizables de Vue.
- **src/layouts**: Contiene el layout principal de la aplicación (`MainLayout.vue`).
- **src/router**: Configuración del enrutador de Vue (`index.js`).
- **src/views**: Vistas de la aplicación:
  - `Home.vue`: Vista de inicio.
  - `About.vue`: Vista "Acerca de".
  - `Contact.vue`: Vista de contacto.
- **src/App.vue**: Componente raíz de la aplicación.
- **src/main.js**: Punto de entrada de la aplicación.
- **src/tailwind.css**: Estilos de Tailwind CSS.

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm install
```
## Configuración del Entorno

añade tambien la creacion del .env y crear las variables de api client y api secret

Dentro del archivo .env, define las siguientes variables de entorno:

```bash
VUE_APP_CLIENT_ID=<tu_api_client>
VUE_APP_CLIENT_SECRET=<tu_api_secret>
```

Reemplaza <tu_api_client> y <tu_api_secret> con los valores correspondientes proporcionados por tu servicio de API.

## Ejecución

Para iniciar el servidor de desarrollo, utiliza el siguiente comando:

```bash
npm run serve
```

La aplicación estará disponible en `http://localhost:8080`.

## Construcción

Para construir la aplicación para producción, ejecuta:

```
npm run build
```

Esto generará los archivos optimizados en la carpeta `dist`.

## Tecnologías Utilizadas

- **Vue.js**: Framework progresivo para construir interfaces de usuario.
- **Tailwind CSS**: Framework de CSS para estilos personalizados.
- **PrimeVue**: Biblioteca de componentes de UI para Vue.js.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o un pull request.