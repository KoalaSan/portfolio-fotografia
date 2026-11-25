const fechaEvento = document.getElementById("fecha_evento");

if (fechaEvento) {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  fechaEvento.min = `${anio}-${mes}-${dia}`;
}

const revelables = document.querySelectorAll(
  ".cabecera-seccion, .rejilla figure, .sobre-mi p, .contacto-directo, form, .pie"
);

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revelables.forEach((elemento, indice) => {
    elemento.classList.add("revelar");
    elemento.style.setProperty("--retraso", `${(indice % 4) * 80}ms`);
    observador.observe(elemento);
  });
} else {
  revelables.forEach((elemento) => elemento.classList.add("visible"));
}
