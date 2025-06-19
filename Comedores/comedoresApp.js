const sidebar = document.getElementById('sidebar');
const btnOpen = document.getElementById('btnSidebarOpen');
const btnClose = document.getElementById('btnSidebarClose');
btnOpen.addEventListener('click', () => sidebar.classList.remove('-translate-x-full'));
btnClose.addEventListener('click', () => sidebar.classList.add('-translate-x-full'));

let estado = false;
//Modal Uno
const btnAgregarComedor = document.querySelector("#boton-desplegarModalUno");
btnAgregarComedor.addEventListener("click", function () {
    estado = !estado;
    cambiarEstado("#modal-uno");
});

//Cerrar modal uno
const btnCerrarUno = document.querySelector("#boton-cerrar-uno");
btnCerrarUno.addEventListener("click", function () {
    estado = !estado;
    cambiarEstado("#modal-uno");
});

//Controlador modales
function cambiarEstado(id) {
    if (estado) {
        document.querySelector(".recuadro-modales").style = "display: flex;"
        document.querySelector(id).style = "display: flex;";
    }
    else {
        document.querySelector(".recuadro-modales").style = "display: none;"
        document.querySelector(id).style = "display: none;";
    }
}
let contador = 0;

//Agregar comedor
const btnAgregar = document.querySelector("#boton-agregar");
btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    const inputNombre = document.querySelector("#inputNombre");
    const inputCantidad = document.querySelector("#inputCantidad");
    const inputDireccion = document.querySelector("#inputDireccion");
    const inputResponsable = document.querySelector("#inputResponsable");
    const inputTelefono = document.querySelector("#inputTelefono");

    if (inputNombre.value !== "" && inputCantidad.value !== "" && inputDireccion.value !== "" && inputResponsable.value !== "" && inputTelefono.value !== "") {
        const newComedor = new Comedor(contador++, inputNombre.value.trim(), inputDireccion.value.trim(), inputCantidad.value.trim(), inputResponsable.value.trim(), inputTelefono.value.trim(), true)
        window.comedorStore.addComedor(newComedor);
        alert("Datos guardados exitosamente");
        estado = !estado;
        cambiarEstado("#modal-uno");
    }
    else {
        alert("Ingrese los datos completos");
    }

    //Limpiamos los inputs
    inputNombre.value = "";
    inputCantidad.value = "";
    inputDireccion.value = "";
    inputResponsable.value = "";
    inputTelefono.value = "";
});

document.addEventListener('DOMContentLoaded', () => {
    const buscador = document.getElementById('barraBuscador');
    const tarjetas = document.querySelectorAll('.recuadro-comedor');

    buscador.addEventListener('input', () => {
        const filtro = buscador.value.toLowerCase();

        tarjetas.forEach(card => {
            const nombreP = card.querySelector('p[id^="nombre-comedor"]');
            const direccionP = card.querySelector('p[id^="direccion-comedor"]');

            const textoNombre = nombreP ? nombreP.textContent.toLowerCase() : '';
            const textoDireccion = direccionP ? direccionP.textContent.toLowerCase() : '';

            if (textoNombre.includes(filtro) || textoDireccion.includes(filtro)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

//Renderizar contenido
function renderizarUI(state) {
    // 💚 Renderizar el arreglo dentro de mi contenedor div
    const recuadroDos = document.querySelector("#recuadro-dos")
    // Limpiar el contenedor
    recuadroDos.innerHTML = ""
    // Vamos a renderizarlo
    state.forEach((elmt, index) => {
        recuadroDos.innerHTML += `
        <div class="recuadro-comedor" id="recuadro-comedor${index}">
            <div class="recuadro-imagen-comedor" id="recuadro-imagen-comedor${index}">
                <img src="" alt="Comedor">
            </div>
            <p id="nombre-comedor${index}">Nombre: ${elmt.nombre}</p>
            <p id="direccion-comedor${index}">Direccion: ${elmt.direccion}</p>
            <button id="boton-desplegarModalDos" onclick="verModalDos(${index}, '${elmt.nombre}')">Ver</button>
            <button onclick="eliminarComedor(${index})">Eliminar</button>
        </div>
      `
        document.querySelector("#titulo-dos").textContent = `Comedor N${elmt.id} Municipalidad Provincial del callao`;
        if (elmt.estado == true) {
            document.querySelector(`#recuadro-comedor${index}`).style = "background-color: #7dfa9e;";
        }
        else {
            document.querySelector(`#recuadro-comedor${index}`).style = "background-color: #fa7d85;";
        }
    })
}

let estadoComedor;
function verModalDos(index, nombre) {
    estado = !estado;
    cambiarEstado(".modal-dos");
    const comedor = comedorStore.getComedorByName(nombre);
    document.querySelector("#inputNombre2").value = comedor.nombre;
    document.querySelector("#inputDireccion2").value = comedor.direccion;
    document.querySelector("#inputCantidad2").value = comedor.capacidad;
    document.querySelector("#inputResponsable2").value = comedor.responsable;
    document.querySelector("#inputTelefono2").value = comedor.telefono;
    if (comedor.estado == true) {
        activarSwitch();
    }
    else {
        desactivarSwitch();
    }
    estadoComedor = comedor;
}


// SWITCH ACTIVO - INACTIVO
// Obtenemos el checkbox y el label
const toggleSwitch = document.getElementById('toggleSwitch');
const labelText = document.getElementById('labelText');

// Evento cuando el usuario cambia el estado del switch
toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        console.log("El switch está ACTIVADO");
        labelText.textContent = "Activo";
        // Aquí puedes llamar cualquier función que necesites
        activarSwitch();
    } else {
        console.log("El switch está DESACTIVADO");
        labelText.textContent = "Inactivo";
        // Aquí puedes poner otro comportamiento
        desactivarSwitch();
    }
});

// Si quieres modificar el estado desde código:
function activarSwitch() {
    toggleSwitch.checked = true;
    labelText.textContent = "Activo";
}

function desactivarSwitch() {
    toggleSwitch.checked = false;
    labelText.textContent = "Inactivo";
}

const btnGuardar2 = document.querySelector("#boton-guardar2");
btnGuardar2.addEventListener("click", function (event) {
    event.preventDefault();

    const nombre2 = document.querySelector("#inputNombre2");
    const direccion2 = document.querySelector("#inputDireccion2");
    const cantidad2 = document.querySelector("#inputCantidad2");
    const responsable2 = document.querySelector("#inputResponsable2");
    const telefono2 = document.querySelector("#inputTelefono2");

    if (
        nombre2.value !== "" &&
        direccion2.value !== "" &&
        cantidad2.value !== "" &&
        responsable2.value !== "" &&
        telefono2.value !== ""
    ) {
        const newComedor = new Comedor(
            estadoComedor.id,
            nombre2.value.trim(),
            direccion2.value.trim(),
            cantidad2.value.trim(),
            responsable2.value.trim(),
            telefono2.value.trim(),
            toggleSwitch.checked
        );

        const index = window.comedorStore.getState().findIndex(
            (c) => c.id === estadoComedor.id
        );

        window.comedorStore.updateComedor(index, newComedor);
        ocultarModalDos();
        alert("Datos modificados correctamente");
    } else {
        alert("Ingrese datos completos");
    }
});


function ocultarModalDos() {
    estado = !estado;
    cambiarEstado(".modal-dos")
}

function eliminarComedor(index) {
    if (confirm("¿Estás seguro de eliminar este comedor?")) {
        window.comedorStore.deleteComedor(index);
        contador--;
    }
}

window.comedorStore.suscribe(renderizarUI);
window.comedorStore.suscribe(savePersistanceData);
renderizarUI(window.comedorStore.getState())