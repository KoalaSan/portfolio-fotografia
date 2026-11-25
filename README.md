# Página de fotografía

Sitio de una sola página para darte a conocer y recibir solicitudes de trabajo. Está hecho con HTML, CSS y JavaScript puro: no hay dependencias ni pasos de compilación.

## Verlo en tu ordenador

Abre `index.html` en un navegador, o ejecuta:

```bash
python3 -m http.server 8000
```

y visita `http://localhost:8000`.

## Sustituir los marcadores

Busca en `index.html` y cambia:

- El nombre ya está puesto como `KoalaSan` en el HTML; puedes cambiarlo buscando ese texto.
- `TU EMAIL` por tu correo real (en los botones, el pie y el texto).
- `TU WHATSAPP` por tu número con código de país, sin espacios ni `+` (por ejemplo `34612345678`).
- `TU INSTAGRAM` por tu usuario de Instagram.
- `[TU CIUDAD]` y el párrafo de “Sobre mí” por tu texto real.

## Cambiar las fotos

Las seis imágenes de la galería son SVG de ejemplo insertados en `index.html`. Sustituye cada `<svg>` por algo como:

```html
<img src="assets/img/boda-01.jpg" alt="Descripción de la foto">
```

Coloca tus archivos en `assets/img/`. El texto `Tu foto aquí` bajo cada imagen también es editable.

## Habilitar el formulario

El formulario usa Formspree para enviarte un correo con la solicitud.

1. Crea una cuenta gratuita en https://formspree.io y añade un formulario con tu email de destino.
2. Copia el identificador que te da (algo como `xrgq1234`).
3. En `index.html`, cambia `https://formspree.io/f/TU_FORM_ID` por `https://formspree.io/f/xrgq1234`.
4. Publica el cambio y prueba enviando una solicitud.

Hasta que hagas esto, el formulario es una plantilla visible con el aviso `TU_FORM_ID`.

## Publicar en GitHub Pages

El repositorio se publica desde la rama `main`, en la raíz. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Main / (root)**.

La URL pública será `https://koalasan.github.io/portfolio-fotografia/`.
