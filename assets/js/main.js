const fechaEvento = document.getElementById("fecha_evento");

if (fechaEvento) {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  fechaEvento.min = `${anio}-${mes}-${dia}`;
}
