# KoalaSan · Web de fotografía

Web profesional en español para KoalaSan: portafolio, presencia en Instagram y contacto directo por WhatsApp. HTML, CSS y JavaScript puro, sin dependencias ni compilación. Alojada gratis en GitHub Pages.

**Web pública:** https://koalasan.github.io/portfolio-fotografia/
**Instagram:** https://www.instagram.com/ElKoalaSan · **WhatsApp:** https://wa.me/717703689

## Estructura de páginas

Cada apartado vive en su propia URL para que se pueda compartir y posicionar en Google:

| Página | Contenido |
| --- | --- |
| `index.html` | Inicio / hero con llamada a reservar |
| `sobre-mi.html` | Sobre mí, filosofía y cifras |
| `servicios.html` | Bodas, eventos, retratos y comercial |
| `galeria.html` | Galería con filtros y lightbox |
| `instagram.html` | Fotos reales de @ElKoalaSan con enlace a cada post |
| `redes.html` | Instagram, WhatsApp y portafolio |
| `testimonios.html` | Opiniones de clientes |
| `contacto.html` | WhatsApp directo y formulario con tipo de sesión y fecha |

El menú, el pie, el botón flotante de WhatsApp y el panel de administración se comparten en todas las páginas; el enlace activo queda marcado.

## Fotos

Las fotos son **reales del perfil público de @ElKoalaSan**, descargadas de los posts públicos y guardadas en `assets/img/` (`ig-*.jpg`). No hay imágenes de stock ni URLs externas de Unsplash.

- La galería y la página de Instagram se generan desde `assets/js/comun.js` (listas `FOTOS` e `INSTA`).
- La imagen del hero está en `assets/css/estilos.css` (`.hero-bg`).
- Las fotos de "Sobre mí" están en `sobre-mi.html`.

Los posts de origen están en `assets/img/instagram.json` con su caption y enlace permanente. Para ampliar la galería, añade el archivo en `assets/img/` y una entrada en esas listas.

> Antes de usar las fotos con fines comerciales, asegúrate de tener permiso de las personas retratadas si no son tuyas.

## Cambiar los datos

- WhatsApp: busca `717703689` en los archivos HTML y en `assets/js/comun.js` (`DEFAULTS.wa`).
- Instagram: busca `ElKoalaSan` en los HTML y en `assets/js/comun.js` (`DEFAULTS.ig`).
- Título principal y texto de "Sobre mí": `DEFAULTS.hero` y `DEFAULTS.about` en `assets/js/comun.js`.
- Cifras: `data-contador="350"`, `120` y `8` en `sobre-mi.html`. Pon tus números reales.
- Testimonios: `testimonios.html`. Las citas actuales son de ejemplo; cámbialas por opiniones reales antes de dar publicidad al sitio.

## Panel de administración

Botón ⚙ abajo a la izquierda, disponible en todas las páginas. La primera vez pide crear una contraseña; la guarda como hash SHA-256 en `localStorage` (`fv_settings`) y la sesión en `sessionStorage` (`fv_admin`). Permite cambiar título, texto, WhatsApp, Instagram y visibilidad de enlaces del menú.

Es una barrera práctica, **no un acceso seguro**: cualquiera con acceso a tu navegador o que borre el almacenamiento puede crear otra contraseña. Los cambios solo afectan a ese navegador; para que los vean los visitantes hay que editar el código y publicarlo.

## Formulario de contacto

El formulario de `contacto.html` recoge nombre, email, tipo de sesión y fecha del evento. Al enviarlo abre WhatsApp con el mensaje ya redactado; la persona decide si lo envía. No hay correo falsos ni cuentas de terceros.

## SEO

Cada página tiene título, descripción, canonical, og: tags y datos estructurados (`ProfessionalService`). Hay un `sitemap.xml` y un `robots.txt` apuntando a él. Para que Google lo indexe antes, envía el sitemap desde Google Search Console: https://search.google.com/search-console

## Verlo en local

Abre `index.html` en un navegador o ejecuta `python3 -m http.server 8000` y visita `http://localhost:8000`.

## Publicar en GitHub Pages

El repositorio se publica desde `main`, en la raíz: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Main / (root)**. La URL es `https://koalasan.github.io/portfolio-fotografia/`. Tras cambiar archivos, si Pages sirve contenido antiguo, dispara un build desde **Settings → Pages → Build and deployment → Build site** (o la API `POST /pages/builds`).
