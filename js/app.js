document.addEventListener("DOMContentLoaded", function () {
    const cuentas = document.querySelectorAll(".cuenta-opcion");
    const botonSiguiente = document.querySelector(".boton-siguiente");
    const nombreUsuarioDashboard = document.querySelector(".usuario-nombre");
    const correoGoogleConfig = document.querySelector(".correo-google-config");
    const diasTrabajo = document.querySelectorAll(".dia-trabajo");
    const interruptores = document.querySelectorAll(".interruptor")
    const diasCalendario = document.querySelectorAll(".dia-calendario");
    const cantidadDiasLaborales = document.querySelector(".cantidad-dias-laborales");
    const cantidadDiasLaboralesTexto = document.querySelector(".cantidad-dias-laborales-texto");
    const resumenCalendarioNumero = document.querySelector(".resumen-calendario-numero");
    const botonGuardarCalendario = document.querySelector(".boton-guardar-calendario");
    const abrirAyuda = document.querySelector("#abrir-ayuda");
    const cerrarAyuda = document.querySelector("#cerrar-ayuda");
    const ayudaCalendario = document.querySelector("#ayuda-calendario");

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
                const correoCuenta = cuenta.getAttribute("data-correo");
                localStorage.setItem("correoCuentaAlarya", correoCuenta);

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
    if (correoGoogleConfig) {
        const correoGuardado = localStorage.getItem("correoCuentaAlarya");

        if (correoGuardado) {
            correoGoogleConfig.textContent = correoGuardado;
        }
    }
    if (diasTrabajo.length) {
        diasTrabajo.forEach(function (dia) {
            dia.addEventListener("click", function () {
                dia.classList.toggle("dia-activo");
            });
        });
    }
    if (interruptores.length) {
        interruptores.forEach(function (interruptor) {
            interruptor.addEventListener("click", function () {
                interruptor.classList.toggle("interruptor-activo");

                const fila = interruptor.closest(".fila-configuracion");
                const icono = fila ? fila.querySelector(".fila-icono") : null;
                const estaActivo = interruptor.classList.contains("interruptor-activo");

                if (fila) {
                    if (estaActivo) {
                        fila.classList.add("fila-configuracion-activa");
                    } else {
                        fila.classList.remove("fila-configuracion-activa");
                    }
                }

                if (icono) {
                    if (estaActivo) {
                        icono.classList.add("fila-icono-activo");
                    } else {
                        icono.classList.remove("fila-icono-activo");
                    }
                }
            });
        });
    }
    function actualizarResumenCalendario() {
        const totalLaborales = document.querySelectorAll(".dia-calendario.dia-laboral").length;

        if (cantidadDiasLaborales) {
            cantidadDiasLaborales.textContent = totalLaborales;
        }

        if (cantidadDiasLaboralesTexto) {
            cantidadDiasLaboralesTexto.textContent = totalLaborales;
        }

        if (resumenCalendarioNumero) {
            resumenCalendarioNumero.textContent = totalLaborales;
        }
    }

    if (diasCalendario.length) {
        diasCalendario.forEach(function (dia) {
            dia.addEventListener("click", function () {
                dia.classList.toggle("dia-laboral");
                actualizarResumenCalendario();
            });
        });

        actualizarResumenCalendario();
    }

    if (botonGuardarCalendario) {
        botonGuardarCalendario.addEventListener("click", function () {
            const diasSeleccionados = [];

            diasCalendario.forEach(function (dia) {
                if (dia.classList.contains("dia-laboral")) {
                    diasSeleccionados.push(dia.getAttribute("data-dia"));
                }
            });

            localStorage.setItem("diasCalendarioAlarya", JSON.stringify(diasSeleccionados));
            window.location.href = "dashboard.html";
        });
    }
    if (abrirAyuda && cerrarAyuda && ayudaCalendario) {
        abrirAyuda.addEventListener("click", function () {
            ayudaCalendario.classList.add("ayuda-calendario-visible");
        });

        cerrarAyuda.addEventListener("click", function () {
            ayudaCalendario.classList.remove("ayuda-calendario-visible");
        });
    }
});
