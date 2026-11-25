# Página de fotografía Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar en GitHub Pages una página de una sola sección que muestre el portafolio del fotógrafo y permita contactarlo directamente o enviar una solicitud con tipo de evento y fecha.

**Architecture:** Sitio estático sin compilación: un `index.html` con cuatro secciones, una hoja CSS y un pequeño JS para la fecha mínima del formulario. El formulario envía a un endpoint de Formspree configurable en un solo lugar; las fotos son SVG de ejemplo reemplazables.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla, Git/GitHub CLI, GitHub Pages, Formspree (endpoint del usuario).

**Spec:** `docs/superpowers/specs/2026-11-25-portfolio-fotografia-design.md`

## Global Constraints

- Repositorio público `portfolio-fotografia`, rama `main`, publicado desde la raíz.
- Sin dependencias ni proceso de build.
- Todo el texto visible en español.
- Marcadores reemplazables: `TU NOMBRE`, `TU EMAIL`, `TU WHATSAPP`, `TU INSTAGRAM` y `TU_FORM_ID`.
- Los botones de contacto y el formulario deben coexistar.
- El formulario debe incluir: nombre, correo, tipo de evento (boda, cumpleaños, retrato, otro), fecha y mensaje.
- La creación del repositorio, el push y la activación de Pages requieren `phone_confirm` previo.

## Review Focus

- Formspree sin configurar: el formulario no debe parecer roto ni enviar a una dirección inventada; debe quedar claro en el README y en el `action` con `TU_FORM_ID`.
- Fotos aún no reales: la galería debe mostrar marcadores con `alt` descriptivo y no imágenes rotas.
- Datos de contacto aún no reales: los enlaces deben reconocerse como pendientes de sustituir, no como definitivos.
- Vista móvil: la galería y el formulario no deben desbordar ni quedar debajo de la cabecera.
- Fecha del evento: no debe permitir elegir días pasados.

---

### Task 1: Repositorio y esqueleto de la página

**Files:**
- Create: `index.html`
- Create: `assets/css/style.css`
- Create: `assets/js/main.js`

**Interfaces:**
- Produces: `index.html` con las secciones `#inicio`, `#galeria`, `#sobre-mi`, `#contratame` y el formulario `#formulario-contratacion`.

- [ ] **Step 1: Crear la estructura base**

Escribir `index.html` con `lang="es"`, metadata título/descripción/Open Graph, cabecera con navegación a las cuatro secciones y contenedores vacíos para cada una.

- [ ] **Step 2: Añadir estilos base**

Escribir `assets/css/style.css` con paleta sobria, tipografía del sistema, layout responsive con CSS Grid/Flexbox y estados `:focus-visible`.

- [ ] **Step 3: Verificar el esqueleto**

Ejecutar `python3 -m http.server 8000` en la raíz y `curl -s http://127.0.0.1:8000/ | grep -E 'id="(inicio|galeria|sobre-mi|contratame)"'`.
Esperado: las cuatro coincidencias.

---

### Task 2: Galería, presentación y botones de contacto

**Files:**
- Modify: `index.html`
- Create: `assets/img/.gitkeep`
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: contenedores `#galeria`, `#sobre-mi` y `#contratame` de la Task 1.
- Produces: galería con seis marcadores SVG en línea y tres enlaces de contacto con marcadores de texto.

- [ ] **Step 1: Añadir la galería**

Insertar seis figuras con SVG de ejemplo en línea, `alt` descriptivo y pie con texto “Tu foto aquí”.

- [ ] **Step 2: Añadir “Sobre mí” y los botones directos**

Escribir un párrafo breve con marcador `TU NOMBRE` y tres enlaces (`mailto:TU EMAIL`, WhatsApp y Instagram) con `target="_blank"` y `rel="noopener"` donde corresponda.

- [ ] **Step 3: Verificar el contenido**

Ejecutar `curl -s http://127.0.0.1:8000/ | grep -c '<figure'`.
Esperado: `6`. Comprobar además que aparecen los tres marcadores de contacto.

---

### Task 3: Formulario de contratación y README

**Files:**
- Modify: `index.html`
- Modify: `assets/js/main.js`
- Create: `README.md`

**Interfaces:**
- Consumes: `#contratame` y `#formulario-contratacion` de la Task 1.
- Produces: formulario con `action="https://formspree.io/f/TU_FORM_ID"` y campo `fecha_evento` con `min` calculado en JS.

- [ ] **Step 1: Escribir el formulario**

Añadir campos etiquetados `nombre`, `email`, `tipo_evento` (select con boda, cumpleaños, retrato, otro), `fecha_evento` (type=date) y `mensaje`, más botón “Enviar solicitud”.

- [ ] **Step 2: Añadir la fecha mínima**

En `assets/js/main.js`, asignar `min` de `#fecha_evento` igual a la fecha local de hoy en formato `YYYY-MM-DD`.

- [ ] **Step 3: Documentar la puesta en marcha**

Escribir `README.md` con: cómo cambiar marcadores, cómo reemplazar las fotos por archivos en `assets/img/`, cómo crear Formspree y sustituir `TU_FORM_ID`, y cómo publicar con Pages desde la raíz.

- [ ] **Step 4: Verificar los campos**

Ejecutar `curl -s http://127.0.0.1:8000/ | grep -oE 'name="(nombre|email|tipo_evento|fecha_evento|mensaje)"'`.
Esperado: los cinco nombres, cada uno una vez.

---

### Task 4: Publicar en GitHub Pages

**Files:**
- Modify: repositorio remoto `KoalaSan/portfolio-fotografia`

**Interfaces:**
- Consumes: archivos de las Tasks 1-3.

- [ ] **Step 1: Confirmar la acción externa**

Llamar a `phone_confirm` con el texto exacto: “Crear el repositorio público KoalaSan/portfolio-fotografia, subir los archivos y activar GitHub Pages desde main”. Continuar solo con APPROVED.

- [ ] **Step 2: Crear y subir**

Ejecutar `git init -b main`, `git add -A`, `git commit -m "feat: sitio de fotografía con galería y formulario"`, `gh repo create portfolio-fotografia --public --source=. --remote=origin` y `git push -u origin main`.

- [ ] **Step 3: Activar Pages**

Ejecutar `printf '{"source":{"branch":"main","path":"/"}}' | gh api -X POST repos/KoalaSan/portfolio-fotografia/pages --input -`, y verificar con `gh api repos/KoalaSan/portfolio-fotografia/pages`.

---

### Task 5: Comprobación final en el navegador

**Files:**
- Ninguno.

- [ ] **Step 1: Abrir el sitio publicado**

Abrir `https://koalasan.github.io/portfolio-fotografia/` en el navegador de fondo y leer la página.

- [ ] **Step 2: Verificar secciones y formulario**

Confirmar que aparecen galería, sobre mí, botones de contacto y los cinco campos del formulario; informar de la URL pública y de lo que queda pendiente (Formspree y datos reales).
