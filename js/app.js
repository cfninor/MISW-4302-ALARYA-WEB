document.addEventListener("DOMContentLoaded", function () {
    const cuentas = document.querySelectorAll(".cuenta-opcion");
    const botonSiguiente = document.querySelector(".boton-siguiente");

    if (!cuentas.length || !botonSiguiente) {
        return;
    }

    let cuentaSeleccionada = null;

    cuentas.forEach(function (cuenta) {
        cuenta.addEventListener("click", function () {
            cuentas.forEach(function (item) {
                item.classList.remove("cuenta-seleccionada");
            });

            cuenta.classList.add("cuenta-seleccionada");
            cuentaSeleccionada = cuenta;

            botonSiguiente.classList.remove("boton-siguiente-deshabilitado");
            botonSiguiente.classList.add("boton-siguiente-habilitado");
        });
    });

    botonSiguiente.addEventListener("click", function (evento) {
        if (!cuentaSeleccionada) {
            evento.preventDefault();
        }
    });
});