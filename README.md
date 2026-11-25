# KoalaSan · Página de fotografía

Sitio de una sola página para darte a conocer y recibir solicitudes de trabajo. HTML, CSS y JavaScript puro, sin dependencias ni compilación.

Web pública: https://koalasan.github.io/portfolio-fotografia/

## Secciones

Inicio, sobre mí, servicios, galería con filtros y lightbox, Instagram, redes, testimonios y contacto. El contacto incluye WhatsApp directo, Instagram y un formulario con tipo de sesión y fecha del evento; al enviarlo se abre WhatsApp con los datos ya escritos.

## Verlo en local

Abre `index.html` en un navegador o ejecuta `python3 -m http.server 8000` y visita `http://localhost:8000`.

## Cambiar los datos

En `index.html` busca:

- `717703689` para el WhatsApp (en los botones, `FV.wa` y los enlaces).
- `ElKoalaSan` para Instagram.
- `FV_DEFAULTS.hero` y `FV_DEFAULTS.about` para el título principal y el texto "Sobre mí".
- `data-contador="350"`, `120` y `8` para las cifras. Pon tus números reales.

El panel de administración (botón ⚙ abajo a la izquierda) permite cambiar el título, el texto, WhatsApp, Instagram y la visibilidad de algunas secciones. La primera vez te pedirá crear una contraseña; se guarda como hash en `localStorage` de **tu navegador** (`fv_settings`). Es una barrera práctica, **no un acceso seguro**: cualquier persona con acceso a tu navegador o que borre el almacenamiento puede crear otra contraseña. Los cambios del panel solo afectan a quien los hace; para que los vean los visitantes hay que editar el código y publicarlo.

## Cambiar las fotos

Las fotos son de ejemplo (Unsplash) y están en dos listas dentro del `<script>` final:

- `fotos`: galería principal. Cada objeto tiene categoría (`bodas`, `retratos`, `eventos`, `comercial`), título y URL.
- `instaFotos`: miniaturen del feed de Instagram.

Sustituye esas URL por tus imágenes. Si las subes al repo, ponlas en `assets/img/` y usa rutas relativas, por ejemplo `assets/img/boda-01.jpg`. La imagen del hero y la foto de "Sobre mí" también son de ejemplo y están en CSS/HTML.

Los testimonios son texto de ejemplo; cambia las citas y los nombres por opiniones reales antes de dar publicidad al sitio.

## Publicar en GitHub Pages

El repositorio se publica desde `main`, en la raíz: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Main / (root)**. La URL es `https://koalasan.github.io/portfolio-fotografia/`.

## Si quieres un formulario que envíe correo

Ahora el formulario abre WhatsApp. Para recibir correos, crea un formulario gratuito en https://formspree.io con tu email de destino y cambia el `submit` del formulario para enviar los datos a `https://formspree.io/f/TU_FORM_ID` con `fetch`. Necesitas un email real: la web no muestra ninguno hasta que me lo des.
