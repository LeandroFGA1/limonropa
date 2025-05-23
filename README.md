# front-app

## Introducción General

Se ha inferido que la tienda en línea `front-app` podría estar relacionada con productos o servicios del sector del reciclaje o la ecología, dado el uso de la URL base `elmundodelreciclaje.cl` para sus interacciones con la API. El propósito principal de la aplicación es ofrecer una plataforma donde los usuarios puedan explorar estos productos o servicios, gestionar su selección a través de un carrito de compras y completar transacciones.

## Tecnologías Utilizadas

*   **React:** Se elige React por su eficiencia en la creación de interfaces de usuario dinámicas y reutilizables a través de su sistema de componentes. Facilita la gestión del estado de la UI y la lógica asociada, resultando en una experiencia de usuario fluida.
*   **Vite:** Seleccionado como herramienta de construcción por su excepcional velocidad tanto en el servidor de desarrollo (con Hot Module Replacement instantáneo) como en la generación de builds optimizadas para producción. Su configuración simplificada acelera el flujo de trabajo.
*   **Tailwind CSS:** Utilizado por su enfoque 'utility-first', que permite construir diseños complejos y personalizados directamente en el HTML de forma rápida y eficiente, sin necesidad de escribir CSS convencional extensivamente. Promueve la consistencia y facilita el diseño responsivo.
*   **Material Tailwind:** Integra los principios de Material Design con la flexibilidad de Tailwind CSS. Proporciona una biblioteca de componentes UI pre-diseñados y listos para usar (botones, menús, tarjetas, etc.), acelerando el desarrollo y asegurando una estética moderna y coherente.
*   **Redux Toolkit:** Es la opción recomendada para la gestión del estado global de la aplicación. Simplifica la lógica de Redux, reduce el código boilerplate y facilita la creación de 'slices' para manejar diferentes partes del estado de forma organizada y predecible.
*   **Redux Persist:** Complementa a Redux Toolkit para persistir el estado global (o partes de él, como el carrito de compras o la información de sesión del usuario) en el almacenamiento local del navegador. Esto mejora la experiencia del usuario al recordar sus datos entre sesiones.
*   **React Router DOM:** Es la biblioteca estándar para el enrutamiento en aplicaciones React. Permite definir rutas navegables, gestionar el historial del navegador y renderizar diferentes componentes de página según la URL, creando una experiencia de Single Page Application (SPA).
*   **Axios:** Cliente HTTP basado en promesas, utilizado para realizar peticiones a la API del backend (ej: para obtener datos de productos, enviar pedidos, etc.). Su API es fácil de usar y permite una gestión sencilla de las respuestas y errores.
*   **ESLint:** Herramienta esencial para mantener la calidad y consistencia del código. Analiza el código JavaScript/JSX en busca de errores, problemas de estilo y malas prácticas, ayudando a prevenir bugs y mejorar la legibilidad.
*   **GSAP (GreenSock Animation Platform):** Una potente biblioteca de animación JavaScript. Se incluye para implementar animaciones más complejas y sofisticadas que podrían ser difíciles de lograr solo con CSS y las utilidades de animación de Tailwind. Permite un control detallado sobre los timelines y propiedades de animación.

## Estructura del Proyecto

La aplicación sigue una estructura de carpetas organizada para facilitar el desarrollo y mantenimiento:

*   `public/`: Contiene archivos estáticos que se sirven directamente al navegador, como el `vite.svg` (icono de Vite) y el `index.html` base.
*   `src/`: Es el corazón de la aplicación y contiene todo el código fuente.
    *   `src/assets/`: Almacena todos los activos estáticos utilizados por la aplicación.
        *   `css/`: Incluye archivos CSS globales, como `index.css` donde se importan las directivas de Tailwind CSS y se definen estilos base.
        *   `data/`: Contiene archivos de datos locales en formato JSON, por ejemplo, `data.json` que puede albergar información sobre productos, categorías, etc.
        *   `imgs/`: Directorio para todas las imágenes utilizadas en la aplicación (logos, banners, imágenes de productos). Dentro de `src/assets/imgs/`, existe un archivo `directory.js` (y potencialmente otros similares como `ExternalDirectory.js` o `directoryVideo.js` para videos) que actúa como un módulo central para la gestión de activos visuales. Importa las imágenes/videos y los exporta en un objeto, permitiendo que los componentes los referencien de forma más limpia y centralizada (ej: `import images from './assets/imgs/directory'; <img src={images.logo} />`) en lugar de usar rutas relativas largas.
        *   `videos/`: Almacena archivos de video que puedan ser utilizados en la aplicación.
    *   `src/components/`: Contiene componentes de React reutilizables que conforman la interfaz de usuario. Estos se organizan a menudo en subcarpetas según su funcionalidad o tipo:
        *   `banners/`: Componentes relacionados con banners promocionales o informativos.
        *   `cards/`: Componentes de tarjetas para mostrar productos, información, etc.
        *   `checkout/`: Componentes específicos para el proceso de pago.
        *   `forms/`: Componentes de formularios (login, registro, contacto).
        *   `header/`: Componentes para la cabecera de la aplicación (navegación, logo). En `src/components/header/`, el archivo `HeaderFunctions.js` encapsula lógica específica del comportamiento del encabezado, como la función `handleScroll` que ajusta dinámicamente la apariencia de la barra de navegación (tamaño, opacidad) basándose en el desplazamiento (scroll) del usuario en la página. Esto ayuda a mantener el componente `Header.jsx` más limpio y enfocado en la presentación.
        *   `pageCardComp/`: Componentes especializados para tarjetas dentro de páginas específicas.
    *   `src/layout/`: Define los componentes de diseño estructural de la aplicación, como `MainLayout.jsx`, que suele incluir el Header, Footer y el contenedor para el contenido principal de las páginas.
    *   `src/pages/`: Contiene los componentes de React que representan cada una de las páginas o vistas principales de la aplicación (ej: `Home.jsx`, `Products.jsx`, `Cart.jsx`).
    *   `src/router/`: Configura el enrutamiento de la aplicación. El archivo `Router.jsx` define las rutas y qué componente de página se renderiza para cada URL.
    *   `src/store/`: Contiene toda la configuración relacionada con Redux Toolkit para el manejo del estado global. Esto incluye la creación del store, los "slices" (reductores y acciones), y la configuración de `redux-persist`.
        *   `authSlice.js`: Gestiona el estado de autenticación del usuario, incluyendo email y tokens (access y refresh). Proporciona acciones para `loginSuccess` y `logoutSuccess` (que también limpia el carrito).
        *   `cartSlice.js`: Administra el estado del carrito de compras: lista de ítems, método de pago, monto total, estado de envío de PDF de confirmación y código de orden. Incluye acciones para añadir, actualizar cantidad, eliminar productos, y resetear el carrito.
        *   `chileSlice.js`: Almacena datos geográficos de Chile, específicamente regiones y comunas, probablemente para su uso en formularios de dirección. Contiene acciones para establecer estas listas.
        *   `orderSlice.js`: Maneja la información relacionada con los pedidos una vez realizados, incluyendo los datos retornados por la API de pedidos (`pedido`) y la información de usuarios invitados (`guestData`).
        *   `profileSlice.js`: Se encarga de la gestión de perfiles de usuario, principalmente almacenando y actualizando los avatares asociados a los correos electrónicos de los usuarios.
    *   `src/text/`: Puede contener archivos JavaScript con constantes de texto o mensajes utilizados en la aplicación, como `textGeneral.js`, para facilitar la internacionalización o la gestión de textos comunes.
*   `vite.config.js`: Archivo de configuración para Vite. Permite personalizar el proceso de construcción y el servidor de desarrollo (plugins, alias, etc.).
*   `tailwind.config.js`: Archivo de configuración para Tailwind CSS. Aquí se personaliza el framework, extendiendo la paleta de colores, fuentes, breakpoints, y más.
*   `package.json`: Archivo estándar de Node.js que define las dependencias del proyecto, así como los scripts para desarrollo, construcción, linting, etc.
*   **Archivos de Configuración en la raíz:**
    *   `eslint.config.js`: Archivo de configuración para ESLint. Define las reglas de linting para JavaScript y JSX, utilizando plugins para React (`eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`) para asegurar la calidad y consistencia del código. Ignora el directorio `dist` y personaliza reglas específicas.
    *   `postcss.config.js`: Configura PostCSS. Utiliza los plugins `tailwindcss` para procesar las clases de Tailwind CSS y `autoprefixer` para añadir automáticamente prefijos de vendor a las propiedades CSS, asegurando una mayor compatibilidad entre navegadores.
    *   `tsconfig.json`: Archivo de configuración del compilador TypeScript. Especifica opciones como el target de ECMAScript (`ESNext`), las bibliotecas a incluir (`DOM`, `ESNext`), y habilita la comprobación estricta de tipos (`strict: true`). Indica que los archivos fuente están en `src/` y que no se deben emitir archivos de compilación (`noEmit: true`), ya que Vite se encarga del proceso de build. Confirma el uso de TypeScript en el proyecto.
    *   `vercel.json`: Archivo de configuración para despliegues en la plataforma Vercel. Incluye reescrituras (`rewrites`) que dirigen todas las solicitudes al punto de entrada principal (`/`), una configuración típica para Single Page Applications (SPAs) donde el enrutamiento es gestionado en el lado del cliente por React Router.

## Configuración y Estilo (Tailwind CSS)

La apariencia de la aplicación se gestiona principalmente con Tailwind CSS, configurado a través del archivo `tailwind.config.js`.

Las personalizaciones clave incluyen:

*   `content`: Especifica las rutas de los archivos (`./index.html`, `./src/**/*.{js,ts,jsx,tsx}`) donde Tailwind CSS buscará clases para generar solo el CSS necesario.
*   `theme.extend`: Permite añadir o modificar las utilidades de Tailwind sin sobreescribir las predeterminadas.
    *   `fontFamily`: Define familias de fuentes personalizadas. Por ejemplo, se utiliza `Inter` como fuente principal.
        ```javascript
        fontFamily: {
          Inter: ['Inter', 'sans-serif'],
        }
        ```
    *   `screens`: Permite definir breakpoints personalizados para el diseño responsivo. Se ha añadido un breakpoint específico `videopoint`.
        ```javascript
        screens: {
          'videopoint': '845px',
        }
        ```
    *   `colors`: Define una paleta de colores personalizada para la aplicación, asegurando consistencia en el diseño.
        ```javascript
        colors: {
          'main': '#000000',      // Negro principal
          'main2': '#1d1d1d',     // Un tono de gris oscuro
          'main3': '#313131',     // Otro tono de gris
          'bg-body': '#ffffff',   // Blanco para el fondo del cuerpo
          'crimson': '#dc143c',   // Color carmesí
        }
        ```
    *   `keyframes` y `animation`: Permiten definir animaciones CSS personalizadas.
        ```javascript
        keyframes: {
          slideDown: {
            '0%': { transform: 'translateY(-100%)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          // ... otras animaciones
        },
        animation: {
          slideDown: 'slideDown 0.5s ease-out forwards',
          // ... otras asignaciones de animación
        }
        ```

Además, se utiliza **Material Tailwind** como biblioteca de componentes UI, que proporciona elementos pre-estilizados basados en Material Design y construidos con Tailwind CSS, acelerando el desarrollo de la interfaz.
El archivo `tailwind.config.js` está envuelto con la utilidad `withMT` (proveniente de `@material-tailwind/react/utils/withMT`). Esta función se encarga de fusionar la configuración específica de Material Tailwind (como sus temas y plugins) con la configuración personalizada del proyecto, asegurando que ambas funcionen correctamente en conjunto.

## Manejo de Datos

La aplicación maneja diferentes fuentes de datos:

*   **Datos de productos/categorías:** La información principal sobre productos, categorías, y posiblemente otros datos relevantes para la tienda, se encuentra actualmente en un archivo JSON local: `src/assets/data/data.json`. Este archivo es importado directamente en los componentes que lo necesitan. Es probable que este archivo `data.json` se utilice para fines de desarrollo, prototipado rápido o para una cantidad limitada de datos que no cambian con frecuencia. En una aplicación de producción a mayor escala, la información de productos y categorías normalmente vendría de un sistema de gestión de contenidos (CMS) o una API de backend dedicada, lo que permitiría una gestión de datos más dinámica y robusta.
*   **Datos de regiones/comunas (Chile):** Para funcionalidades que requieren información geográfica de Chile, como la selección de región y comuna en formularios de dirección, la aplicación consume una API externa: `https://elmundodelreciclaje.cl/api/RegionYComunaCL/region/`. Las peticiones a esta API se realizan utilizando Axios.
*   **Estado de la aplicación:** El estado global de la aplicación es gestionado por **Redux Toolkit**. Esto incluye:
    *   El carrito de compras.
    *   El estado de autenticación del usuario.
    *   Preferencias del usuario.
    *   Otros estados globales necesarios para el funcionamiento de la aplicación.
    La configuración de Redux se encuentra en `src/store/`. Se utiliza **Redux Persist** para guardar ciertas partes del estado (como el carrito y la autenticación) en el almacenamiento local del navegador, permitiendo que esta información persista entre sesiones del usuario. El store de Redux también incluye un `asyncDispatchMiddleware` personalizado. Este middleware inspecciona las acciones despachadas; si una acción contiene una propiedad `asyncDispatch` que es una función, el middleware le inyecta la verdadera función `dispatch` del store. Esto permite que algunas acciones encapsulen lógica asíncrona o secuencial más compleja, dándoles la capacidad de despachar otras acciones por sí mismas.

## Scripts Disponibles

El archivo `package.json` define varios scripts útiles para el ciclo de desarrollo de la aplicación:

*   `npm run dev` o `yarn dev`:
    Inicia el servidor de desarrollo de Vite. Esto compila la aplicación en modo de desarrollo, habilita Hot Module Replacement (HMR) para actualizaciones instantáneas en el navegador sin recargar la página, y sirve la aplicación localmente (generalmente en `http://localhost:5173`).

*   `npm run build` o `yarn build`:
    Genera la versión de producción de la aplicación. Vite compila y optimiza el código (JavaScript, CSS, assets) en la carpeta `dist/` (configurable), dejándolo listo para ser desplegado en un servidor web.

*   `npm run lint` o `yarn lint`:
    Ejecuta ESLint en el código fuente del proyecto (archivos `.js`, `.jsx`, etc.). Ayuda a identificar y corregir problemas de calidad de código, errores de sintaxis y adherencia a las reglas de estilo configuradas.

*   `npm run preview` o `yarn preview`:
    Este comando permite previsualizar la build de producción localmente. Después de ejecutar `npm run build`, se puede usar `npm run preview` para iniciar un servidor estático que sirve los archivos de la carpeta `dist/`, simulando un entorno de producción.

## Jerarquía de Componentes (Ejemplo)

La aplicación sigue una jerarquía de componentes típica en React, donde los componentes se anidan para construir la interfaz de usuario completa:

1.  **`index.html` (en `public/`)**: Es el punto de entrada HTML. Contiene un `<div id="root"></div>` donde se montará la aplicación React.
2.  **`src/main.jsx`**: Es el punto de entrada de JavaScript.
    *   Importa el componente principal `App.jsx`.
    *   Utiliza `ReactDOM.createRoot()` para obtener el elemento `root` del DOM.
    *   Renderiza el componente `App` dentro del `root`, envolviéndolo con los proveedores necesarios.
3.  **`App.jsx`**: Es el componente raíz de la aplicación.
    *   Configura los Providers globales que envuelven toda la aplicación:
        *   `<Provider store={store}>` de `react-redux` para hacer disponible el store de Redux a todos los componentes.
        *   `<PersistGate loading={null} persistor={persistor}>` de `redux-persist` para manejar la carga del estado persistido.
        *   `<ThemeProvider>` de `Material Tailwind` para aplicar el tema y estilos de Material Tailwind.
        *   `<BrowserRouter>` (o el enrutador elegido) de `react-router-dom` para habilitar el enrutamiento.
    *   Usualmente renderiza el componente de layout principal (ej: `MainLayout.jsx`) o directamente el sistema de rutas.
4.  **`src/layout/MainLayout.jsx`**: Define la estructura visual principal de la aplicación.
    *   Suele incluir componentes comunes como `Header.jsx` (cabecera con navegación) y `Footer.jsx` (pie de página).
    *   Contiene un `<Outlet />` de `react-router-dom` que actúa como marcador de posición donde se renderizarán los componentes de página según la ruta activa.
5.  **`src/router/Router.jsx`**: Define las rutas de la aplicación.
    *   Utiliza componentes como `<Routes>` y `<Route>` de `react-router-dom`.
    *   Mapea las URLs a los componentes de página específicos que se deben mostrar (ej: la ruta `/` puede mostrar `Home.jsx`, la ruta `/productos` puede mostrar `ProductsPage.jsx`).
    *   Puede estar anidado dentro de `MainLayout` o ser parte de la estructura definida en `App.jsx`.
6.  **Páginas (ej: `src/pages/Home.jsx`, `src/pages/ProductDetail.jsx`)**: Son componentes que representan vistas completas de la aplicación.
    *   Estas páginas, a su vez, importan y utilizan múltiples componentes reutilizables de la carpeta `src/components/` (como `ProductCard.jsx`, `SearchBar.jsx`, `BannerSlider.jsx`) para construir su contenido y funcionalidad. Por ejemplo, la página `Home.jsx` (`src/pages/Home.jsx`) compone su interfaz utilizando varios componentes como:
        *   `CarouselBanner` (`src/components/Carousel.jsx`): Para mostrar un carrusel de banners promocionales.
        *   `Info` (`src/components/Info.jsx`): Para mostrar secciones de información destacada.
        *   `CardCategoryGenerator` (`src/components/CardCategoryGenerator.jsx`): Para generar y mostrar tarjetas de categorías de productos.
        *   `UnderlineTabs` (`src/components/UnderlineTabs.jsx`): Para crear una interfaz de pestañas para filtrar o mostrar contenido.
        *   `OtherBanner` (`src/components/OtherBanner.jsx`): Otro componente de banner.
        *   `VideoPrueba` (`src/components/VideoPrueba.jsx`): Para incrustar y mostrar un video.
        *   `BannerECO` (`src/components/banners/BannerECO.jsx`): Un banner específico, posiblemente con temática ecológica.
        *   `StoreAddress` (`src/components/StoreAddress.jsx`): Para mostrar la dirección de la tienda o puntos de venta.
    Esta composición de componentes permite construir vistas complejas de manera modular y mantenible.

## Consideraciones Adicionales

*   **Constante `BASE_URL`**: En el archivo `src/App.jsx` (o en un archivo de configuración dedicado), se define una constante `BASE_URL`.
    ```javascript
    export const BASE_URL = "https://nombre-api-deploy.onrender.com/api/v1";
    ```
    Esta constante tiene el propósito de centralizar la URL base del backend o API a la que la aplicación frontend realiza peticiones. Utilizar una constante facilita la configuración y modificación de la URL del servidor en diferentes entornos (desarrollo, producción) sin tener que cambiarla en múltiples lugares del código. Axios y otros clientes HTTP la utilizan para construir las URLs completas de los endpoints.
*   **Despliegue en Vercel:** El proyecto incluye un archivo `vercel.json` con configuraciones de reescritura (`rewrites`) para manejar el enrutamiento del lado del cliente. Esto indica que la aplicación está preparada y probablemente destinada a ser desplegada en la plataforma Vercel, que ofrece integración directa con proyectos frontend y optimizaciones para SPAs.
*   **Uso de TypeScript:** Aunque gran parte del código base puede ser JavaScript, la presencia de un archivo `tsconfig.json` y archivos con extensión `.tsx` (como `src/components/cards/ProductCard.tsx` y `src/components/cards/ProductCardGenerator.tsx`) y dependencias de desarrollo como `@types/react` y `typescript` confirman que TypeScript se utiliza en partes del proyecto. Esto aporta seguridad de tipos y mejora la mantenibilidad y escalabilidad del código en esas secciones.
*   **Variables de Entorno:** Para la gestión de configuraciones sensibles o específicas del entorno (como URLs de API para desarrollo y producción, claves de API, etc.), Vite soporta el uso de archivos `.env` (por ejemplo, `.env`, `.env.local`, `.env.production`). Aunque no se ha inspeccionado un archivo `.env` directamente, es una práctica recomendada para este tipo de configuraciones en lugar de incrustarlas directamente en el código. La variable `BASE_URL` encontrada en `src/App.jsx` es un candidato ideal para ser gestionada de esta manera.
