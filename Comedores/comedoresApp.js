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

//Modal Dos
// const btnVer = document.querySelector("#boton-desplegarModalDos");
// btnVer.addEventListener("click", function(event){
//     event.preventDefault();
//     estado = !estado;
//     cambiarEstado("#modal-dos");
// });

//Cerrar modal uno
const btnCerrarUno = document.querySelector("#boton-cerrar-uno");
btnCerrarUno.addEventListener("click", function () {
    estado = !estado;
    cambiarEstado("#modal-uno");
});

//Cerrar modal dos
// const btnCerrarDos = document.querySelector("#boton-cerrar-dos");
// btnCerrarDos.addEventListener("click", function(event){
//     event.preventDefault();
//     estado = !estado;
//     cambiarEstado("#modal-dos");
// });

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
        const newComedor = new Comedor(inputNombre.value.trim(), inputDireccion.value.trim(), inputCantidad.value.trim(), inputResponsable.value.trim(), inputTelefono.value.trim(), true)
        window.comedorStore.addComedor(newComedor);
        alert("Datos guardados exitosamente");
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
            <button id="boton-desplegarModalDos" onclick="verModalDos(${index}, ${elmt.nombre})">Ver</button>
            <button onclick="eliminarComedor(${index})">Eliminar</button>
        </div>
      `
    })
}

function verModalDos(index, nombre) {
    estado = !estado;
    cambiarEstado(".modal-dos");
}

function ocultarModalDos() {
    estado = !estado;
    cambiarEstado(".modal-dos")
}

function eliminarComedor(index) {
    if (confirm("¿Estás seguro de eliminar este comedor?")) {
        window.comedorStore.deleteComedor(index);
    }
}

window.comedorStore.suscribe(renderizarUI);
window.comedorStore.suscribe(savePersistanceData);
renderizarUI(window.comedorStore.getState())