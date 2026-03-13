document.addEventListener("DOMContentLoaded", function () {
    const cuentas = document.querySelectorAll(".cuenta-opcion");
    const botonSiguiente = document.querySelector(".boton-siguiente");
    const nombreUsuarioDashboard = document.querySelector(".usuario-nombre");

    let cuentaSeleccionada = null;

    if (cuentas.length && botonSiguiente) {
        cuentas.forEach(function (cuenta) {
            cuenta.addEventListener("click", function () {
                cuentas.forEach(function (item) {
                    item.classList.remove("cuenta-seleccionada");
                });

                cuenta.classList.add("cuenta-seleccionada");
                cuentaSeleccionada = cuenta;

                const nombreCuenta = cuenta.getAttribute("data-nombre");
                localStorage.setItem("nombreCuentaAlarya", nombreCuenta);

                botonSiguiente.classList.remove("boton-siguiente-deshabilitado");
                botonSiguiente.classList.add("boton-siguiente-habilitado");
            });
        });

        botonSiguiente.addEventListener("click", function (evento) {
            if (!cuentaSeleccionada) {
                evento.preventDefault();
            }
        });
    }

    if (nombreUsuarioDashboard) {
        const nombreGuardado = localStorage.getItem("nombreCuentaAlarya");

        if (nombreGuardado) {
            nombreUsuarioDashboard.textContent = nombreGuardado;
        }
    }
});