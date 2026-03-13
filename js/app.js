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
    const abrirAyudaContextos = document.querySelector("#abrir-ayuda-contextos");
    const cerrarAyudaContextos = document.querySelector("#cerrar-ayuda-contextos");
    const ayudaContextos = document.querySelector("#ayuda-contextos");
    const listaContextos = document.querySelector("#lista-contextos");
    const editorContexto = document.querySelector("#editor-contexto");
    const editorContextoTitulo = document.querySelector("#editor-contexto-titulo");
    const editorNombre = document.querySelector("#editor-nombre");
    const editorInicio = document.querySelector("#editor-inicio");
    const editorFin = document.querySelector("#editor-fin");
    const guardarContexto = document.querySelector("#guardar-contexto");
    const cancelarContexto = document.querySelector("#cancelar-contexto");
    const eliminarContexto = document.querySelector("#eliminar-contexto");
    const agregarContexto = document.querySelector("#agregar-contexto");
    const nuevoContextoBloque = document.querySelector("#nuevo-contexto-bloque");
    const nuevoNombre = document.querySelector("#nuevo-nombre");
    const nuevoInicio = document.querySelector("#nuevo-inicio");
    const nuevoFin = document.querySelector("#nuevo-fin");
    const guardarNuevoContexto = document.querySelector("#guardar-nuevo-contexto");
    const cancelarNuevoContexto = document.querySelector("#cancelar-nuevo-contexto");
    
    let cuentaSeleccionada = null;
    let contextoActual = null;

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

    if (abrirAyudaContextos && cerrarAyudaContextos && ayudaContextos) {
        abrirAyudaContextos.addEventListener("click", function () {
            ayudaContextos.classList.add("ayuda-contextos-visible");
        });

        cerrarAyudaContextos.addEventListener("click", function () {
            ayudaContextos.classList.remove("ayuda-contextos-visible");
        });
    }
    function obtenerTextoHora(inicio, fin) {
        if (inicio && fin) {
            return inicio + " - " + fin;
        }
        return "Sin horario";
    }

    function cerrarEditorContexto() {
        if (editorContexto) {
            editorContexto.classList.remove("editor-contexto-visible");
        }

        document.querySelectorAll(".contexto-item").forEach(function (item) {
            item.classList.remove("contexto-seleccionado");
        });

        contextoActual = null;
    }

    function cerrarNuevoContexto() {
        if (nuevoContextoBloque) {
            nuevoContextoBloque.classList.remove("nuevo-contexto-visible");
        }

        if (nuevoNombre) {
            nuevoNombre.value = "";
        }

        if (nuevoInicio) {
            nuevoInicio.value = "";
        }

        if (nuevoFin) {
            nuevoFin.value = "";
        }
    }

    function abrirEditorContexto(contexto) {
        if (!editorContexto || !editorContextoTitulo || !editorNombre || !editorInicio || !editorFin) {
            return;
        }

        document.querySelectorAll(".contexto-item").forEach(function (item) {
            item.classList.remove("contexto-seleccionado");
        });

        contexto.classList.add("contexto-seleccionado");
        contextoActual = contexto;

        const nombre = contexto.getAttribute("data-nombre");
        const inicio = contexto.getAttribute("data-inicio");
        const fin = contexto.getAttribute("data-fin");

        editorContextoTitulo.textContent = "Editando: " + nombre;
        editorNombre.value = nombre;
        editorInicio.value = inicio;
        editorFin.value = fin;

        editorContexto.classList.add("editor-contexto-visible");
        cerrarNuevoContexto();
    }

    function ponerEventoContexto(contexto) {
        contexto.addEventListener("click", function () {
            abrirEditorContexto(contexto);
        });
    }

    document.querySelectorAll(".contexto-item").forEach(function (contexto) {
        ponerEventoContexto(contexto);
    });

    if (guardarContexto) {
        guardarContexto.addEventListener("click", function () {
            if (!contextoActual) {
                return;
            }

            const nombreNuevo = editorNombre.value.trim();
            const inicioNuevo = editorInicio.value;
            const finNuevo = editorFin.value;

            if (nombreNuevo === "") {
                return;
            }

            contextoActual.setAttribute("data-nombre", nombreNuevo);
            contextoActual.setAttribute("data-inicio", inicioNuevo);
            contextoActual.setAttribute("data-fin", finNuevo);

            const nombreVisible = contextoActual.querySelector(".contexto-nombre");
            const horaVisible = contextoActual.querySelector(".contexto-hora");

            if (nombreVisible) {
                nombreVisible.textContent = nombreNuevo.toUpperCase();
            }

            if (horaVisible) {
                horaVisible.textContent = obtenerTextoHora(inicioNuevo, finNuevo);
            }

            cerrarEditorContexto();
        });
    }

    if (cancelarContexto) {
        cancelarContexto.addEventListener("click", function () {
            cerrarEditorContexto();
        });
    }

    if (eliminarContexto) {
        eliminarContexto.addEventListener("click", function () {
            if (contextoActual) {
                contextoActual.remove();
                cerrarEditorContexto();
            }
        });
    }

    if (agregarContexto && nuevoContextoBloque) {
        agregarContexto.addEventListener("click", function () {
            cerrarEditorContexto();
            nuevoContextoBloque.classList.add("nuevo-contexto-visible");
        });
    }

    if (guardarNuevoContexto && listaContextos) {
        guardarNuevoContexto.addEventListener("click", function () {
            const nombre = nuevoNombre.value.trim();
            const inicio = nuevoInicio.value;
            const fin = nuevoFin.value;

            if (nombre === "") {
                return;
            }

            const nuevoContexto = document.createElement("button");
            nuevoContexto.type = "button";
            nuevoContexto.className = "contexto-item";
            nuevoContexto.setAttribute("data-nombre", nombre);
            nuevoContexto.setAttribute("data-inicio", inicio);
            nuevoContexto.setAttribute("data-fin", fin);

            nuevoContexto.innerHTML =
                '<div class="contexto-icono icono-nuevo">📝</div>' +
                '<div class="contexto-textos">' +
                    '<p class="contexto-nombre">' + nombre.toUpperCase() + '</p>' +
                    '<div class="contexto-etiquetas">' +
                        '<span class="contexto-hora">' + obtenerTextoHora(inicio, fin) + '</span>' +
                        '<span class="contexto-estado">Activo</span>' +
                    '</div>' +
                '</div>';

            listaContextos.appendChild(nuevoContexto);
            ponerEventoContexto(nuevoContexto);
            cerrarNuevoContexto();
        });
    }

    if (cancelarNuevoContexto) {
        cancelarNuevoContexto.addEventListener("click", function () {
            cerrarNuevoContexto();
        });
    }
});
