# Diseño: página web de fotografía

## Intención

El fotógrafo quiere un sitio sencillo para darse a conocer, mostrar su trabajo y que quien lo vea pueda contratarlo. Debe funcionar como una tarjeta pública: alguien entra, ve de qué hace fotos, how contactarlo y puede enviar una solicitud concreta indicando tipo de evento y fecha.

## Objetivos

- Una sola página, en español, que sirva de portafolio y presentación.
- Galería de fotos, texto breve de presentación y datos de contacto.
- Dos vías de contacto: botones directos (email / WhatsApp / Instagram) y un formulario de presupuesto con **tipo de evento, fecha y mensaje**.
- Publicarla gratis en GitHub Pages bajo la cuenta `KoalaSan`.
- Que editar fotos y textos sea trivial, sin herramientas de compilación.

## No objetivos

- Pagos, reserva de calendario ni disponibilidad en tiempo real.
- CMS, blog ni panel de administración.
- Aplicación nativa ni servicios de pago.

## Antiobjetivos

- Un sitio pesado o lleno de dependencias que tarde en cargar en el móvil.
- Pedir datos personales de más en el formulario: solo lo necesario para responder.
- Dejar la galería vacía sin indicar cómo añadir fotos.

## Restricciones

- GitHub Pages solo sirve archivos estáticos: un formulario necesita un servicio externo.
- Formspree requiere crear una cuenta gratuita y verificar el correo; hasta entonces el formulario tendrá un endpoint de ejemplo.
- Todavía no se han aportado fotos, nombre artístico ni datos reales de contacto: se usarán marcadores visibles y fácilmente reemplazables.

## Enfoques considerados

1. **HTML + CSS + JS puro (elegido).** Cero dependencias, GitHub Pages lo publica sin build, y cualquier cambio es editar un archivo de texto. Encaja con una página que debe durar y ser barata de mantener.
2. **React + Vite.** Cómodo si luego hubiera blog o gestión de fotos, pero añade compilación y paquetes que mantener sin beneficio hoy.
3. **Plantilla con CMS.** Permite editar fotos desde una interfaz, pero añade otra cuenta y configuración; retrasa el objetivo de “salir publicado ya”.

## Decisiones de implementación

- Repositorio `portfolio-fotografia`, rama principal `main`, sitio publicado desde la raíz con GitHub Pages.
- Estructura mínima: `index.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/img/` y `README.md`.
- Secciones: cabecera con nombre y especialidad, galería responsive, “Sobre mí”, “Contrátame” con botones directos y formulario, pie con enlaces.
- Formulario: nombre, correo, tipo de evento (boda, cumpleaños, retrato, otro), fecha y mensaje; envío vía Formspree con `action` configurable en un único sitio.
- Galería con imágenes de ejemplo reemplazables por archivos en `assets/img/`; sin librerías de carrusel.
- Accesibilidad básica: etiquetas en el formulario, contraste suficiente, navegación por teclado y texto alternativo en las fotos.
- SEO básico: título, descripción, idioma español y etiquetas Open Graph para compartir el enlace.
- Diseño sobrio con mucho espacio en blanco, tipografía legible y acento cálido; la paleta definitiva es decisión del implementador y se puede ajustar después.

## Queda para el implementador

- Crear el repositorio y subir los archivos tras la aprobación.
- Generar el sitio con marcadores claros para nombre, correo, WhatsApp, Instagram y fotos.
- Dejar instrucciones en el README para sustituir el endpoint de Formspree y las fotos.
- Verificar que la página se ve bien en móvil y que el formulario tiene todos los campos pedidos.
