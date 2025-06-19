---
repository:
  name: Comedores
  owner: unknown
  url: ""
generated:
  timestamp: 2025-06-19T00:38:32.872Z
  tool: FlatRepo
statistics:
  totalFiles: 6
  totalLines: 758
  languages:
    javascript: 4
    css: 1
    html: 1
  fileTypes:
    .js: 4
    .css: 1
    .html: 1
---

===  comedorPersistance.js
```javascript
function savePersistanceData(state, key = "comedores"){
    localStorage.setItem(key, JSON.stringify(state));
}

function getPersistanceData(key = "comedores"){
    const comedores = localStorage.getItem(key);
    return comedores === null ? [] : JSON.parse(comedores);
}

function deletePersistanceData(){
    localStorage.clear();
}
```
=== EOF: comedorPersistance.js

===  comedoresStyle.css
```css

#recuadro-comedores{
    width: 100%;;
    height: 100%;
}

#recuadro-uno {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem 1% 1rem;
}

#recuadro-uno button{
    padding: 0% 2% 0% 2%;
    border-radius: 0.5rem;
    background-color: #D4AF37;
    color: white;
}

#recuadro-uno input{
    background-color: whitesmoke;
}

#recuadro-uno input:hover{
    background-color: #F5F5F5;
}

#recuadro-dos{
    width: 100%;
    height: 90%;
    padding: 1rem 0 1rem 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 5%;
    overflow-y: auto;
}

.recuadro-comedor{
    width: 30%;
    height: 60%;
    padding: 1%;
    /* background-color: #fa7d85; */
    /* background-color: #7dfa9e; */
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: #fa7d85; //Este color es para los comedores inactivos */
}

.recuadro-imagen-comedor{
    width: 100%;
    height: 50%;
}

.recuadro-imagen-comedor img{
    height: 100%;
}

.recuadro-comedor p{
    text-align: center;
    font-size: 15px;
    width: 100%;
}

.recuadro-comedor button{
    color: #1A659E;
    font-size: 13px;
}

.recuadro-comedor button:hover{
    color: white;
}

.recuadro-modales {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5); /* bg-black + opacity-50 */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    display: none;
}

#modal-uno{
    width: 50%;
    height: 80%;
    padding: 2% 4% 2% 4%;
    background-color: #88C9FF;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    display: none;
}

.modal-dos{
    width: 50%;
    height: 80%;
    padding: 2% 4% 2% 4%;
    background-color: lightgray;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    display: none;
}

.encabezado-form{
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#titulo-uno{
    font-size: 3rem;
}

.encabezado-form button{
    width: 5%;
}

.encabezado-form img{
    width: 100%;
}

.form-modal{
    width: 100%;
    height: 80%;
    padding: 1rem 1.5rem 0 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
}

.form-modal p{
    font-size: 1rem;
}

.form-modal input{
    border-radius: 10px;
}

.cuerpo1-form{
    width: 100%;
    height: 20%;
    display: flex;   
    justify-content: space-between;
}

.cuerpo2-form{
    width: 100%;
    height: 20%;
}

.cuerpo2-form input{
    width: 100%;
}

.cuerpo3-form{
    width: 100%;
    height: 20%;
    display: flex;   
    justify-content: space-between;
}

#cuerpo4-form-uno{
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
}

#boton-agregar{
    padding: 0% 4% 0% 4%;
    border-radius: 0.5rem;
    background-color: #28A745;
}

#titulo-dos{
    font-size: 20px;
}

#cuerpo4-form-dos{
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    padding: 1rem 0 1rem 0;
}
.detalle-cuerpo4{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}

.detalle-botones4{
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.detalle-estado4{
    width: 35%;
    height: 100%;
}

.detalle-botones4 button{
    color: white;
    padding: 2% 3% 2% 3%;
    background-color: black;
    border-radius: 1rem;
    font-size: 1rem;
}


/* Contenedor Switch */
.contenedor-switch{
    display: flex;
    justify-content: center;
}

.switch {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 50px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fa7d85;
    transition: .4s;
    border-radius: 34px;
}

.slider:before {
    position: absolute;
    content: "";
    height: 42px;
    width: 42px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .slider {
    background-color: #7dfa9e;
}

input:checked + .slider:before {
    transform: translateX(50px);
}

.label-text {
    position: absolute;
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-weight: bold;
    color: white;
    pointer-events: none;
}
```
=== EOF: comedoresStyle.css

===  comedoresStore.js
```javascript
function createStore(initialStore = []) {
   // Vamos a crear el estado principal de mi Store
   let state = initialStore;
   // Observers => Funciones que se encargaran de los cambios
   const listeners = [];

   // Vamos a usar un metodo para mostrar el valor del state
   function getState() {
      return state;
   }

   // Esta funcion se va encargar de manipular el nuevo estado
   function setState(newState) {
      state = newState;
      listeners.forEach(function (listener) {
         listener(state);
      });
   }

   function addComedor(newTemplate) {
      // Insertar este nuevo elemento en el array state
      const newState = [...state, newTemplate]
      setState(newState)
   }

   function getComedorByName(nombre) {
      return state.find((c) => c.nombre == nombre);
   }

   function clearStorage() {
      setState([]);
   }

   function suscribe(listener) {
      listeners.push(listener);

      return () => {
         const index = listeners.indexOf(listener);
         if (index > -1) {
            listeners.splice(index, 1);
         }
      }
   }

   function updateComedor(index, nuevosDatos) {
      const newState = [...state];
      newState[index] = { ...newState[index], ...nuevosDatos };
      setState(newState);
   }


   function deleteComedor(index) {
      const newState = [...state];
      newState.splice(index, 1);
      setState(newState);
   }


   return {
      getState,
      addComedor,
      setState,
      getComedorByName,
      suscribe,
      clearStorage,
      deleteComedor,
      updateComedor,
   }
}


const comedorStore = createStore(getPersistanceData());

// Para crear una variable de manera global en todos mis archivos
window.comedorStore = comedorStore;
```
=== EOF: comedoresStore.js

===  comedoresApp.js
```javascript
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
      document.querySelector("#titulo-dos").textContent=`Comedor N${elmt.id} Municipalidad Provincial del callao`;
      if(elmt.estado==true){
        document.querySelector(`#recuadro-comedor${index}`).style = "background-color: #7dfa9e;";
      }
      else{
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
    if(comedor.estado == true){
        activarSwitch();
    }
    else{
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

// const btnGuardar2 = document.querySelector("#boton-guardar2");
// btnGuardar2.addEventListener("click", function(event){
//     event.preventDefault();
//     const nombre2 = document.querySelector("#inputNombre2");
//     const direccion2 = document.querySelector("#inputDireccion2");
//     const cantidad2 = document.querySelector("#inputCantidad2");
//     const responsable2 = document.querySelector("#inputResponsable2");
//     const telefono2 = document.querySelector("#inputTelefono2");
//     if (nombre2.value !== "" && direccion2.value !== "" && cantidad2.value !== "" && responsable2.value !== "" && telefono2.value !== ""){
//         const newComedor = new Comedor(estadoComedor.id,nombre2, direccion2,cantidad2,responsable2,telefono2,true);
//         window.comedorStore.updateComedor(estadoComedor.id,newComedor);
//         alert("Datos modificados");
//     }
//     else{
//         alert("Ingrese datos correctos");
//     }
// });

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
```
=== EOF: comedoresApp.js

===  comedores.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Gestión Comedores - Municipalidad Callao</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="./comedoresStyle.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <script>
    // Extender paleta de colores
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            callaoBlue: '#0057B7',
            callaoYellow: '#FFC20E',
            callaoPurple: '#6B21A8'
          }
        }
      }
    }
  </script>
</head>
<body class="flex h-screen bg-gradient-to-r from-blue-50 to-purple-50">
  <!-- Sidebar -->
  <aside id="sidebar" class="bg-gradient-to-b from-callaoPurple to-callaoBlue text-white w-[18%] flex-shrink-0 transform -translate-x-full lg:translate-x-0 lg:relative fixed top-0 left-0 h-full z-30 transition-transform shadow-lg">
    <div class="flex items-center justify-between h-16 px-4 border-b border-purple-700">
      <span class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-callaoYellow to-red-500">🌊 Callao</span>
      <button id="btnSidebarClose" class="lg:hidden focus:outline-none text-2xl">&times;</button>
    </div>
    <nav class="p-4 space-y-1">
      <a href="./../Index_Principal.html" class="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition">🏠 <span class="ml-2">Dashboard</span></a>
      <a href="./../Comedores/comedores.html" class="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition">🏛️ <span class="ml-2">Comedores</span></a>
      <a href="./../beneficiarios/beneficiarios.html" class="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition">👥 <span class="ml-2">Beneficiarios</span></a>
      <a href="./../entregas/entregas.html" class="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition">🍽️ <span class="ml-2">Entregas</span></a>
    </nav>
  </aside>

  <!-- Main content wrapper -->
  <div class="flex-1 flex flex-col w-[82%] h-full">
    <!-- Header -->
    <header class="w-[100%] h-[12%] bg-gradient-to-r from-pink-500 to-red-500 flex items-center px-6 shadow-md">
      <button id="btnSidebarOpen" class="lg:hidden mr-4 focus:outline-none text-2xl text-white">&#9776;</button>
      <h1 class="text-2xl font-bold text-white">Comedores 🍲</h1>
    </header>

    <!-- Main area -->
    <main class="flex-1 p-6 w-[100%] h-[78%] bg-white">
      <!-- Comedores -->
      <section id="recuadro-comedores">
        <div id="recuadro-uno">
          <button id="boton-desplegarModalUno">Agregar Comedor</button>
          <input type="text" placeholder="Buscar comedor..." id="barraBuscador"
          class="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-callaoBlue">
        </div>
        <div id="recuadro-dos">
          <!-- Cards comedores -->
        </div>
      </section>
      
      <!-- Modales -->
      <!-- Modal uno -->
      <section class="recuadro-modales">
        <div id="modal-uno">
          <div class="encabezado-form">
            <p id="titulo-uno">Nuevo Comedor</p>
            <button id="boton-cerrar-uno"><img src="./../Images/close-svgrepo-com.svg" alt="Cerrar"></button>
          </div>
          <form action="" class="form-modal">
            <div class="cuerpo1-form">
              <div>
                <p>Nombre</p>
                <input type="text" id="inputNombre">
              </div>
              <div>
                <p>Cantidad</p>
                <input type="text" id="inputCantidad">
              </div>
            </div>
            <div class="cuerpo2-form">
              <p>Direccion</p>
              <input type="text" id="inputDireccion">
            </div>
            <div class="cuerpo3-form">
              <div>
                <p>Responsable</p>
                <input type="text" id="inputResponsable">
              </div>
              <div>
                <p>Telefono</p>
                <input type="text" id="inputTelefono">
              </div>
            </div>
            <div id="cuerpo4-form-uno">
              <button id="boton-agregar">Agregar</button>              
            </div>
          </form>
        </div>

        <!-- Modal dos -->
        <div class="modal-dos">
          <div class="encabezado-form">
            <p id="titulo-dos"></p>
            <button id="boton-cerrar-dos"><img src="./../Images/close-svgrepo-com.svg" alt="Cerrar" onclick="ocultarModalDos()"></button>
          </div>
          <form action="" class="form-modal">
            <div class="cuerpo1-form">
              <div>
                <p>Nombre</p>
                <input type="text" id="inputNombre2">
              </div>
              <div>
                <p>Cantidad</p>
                <input type="text" id="inputCantidad2">
              </div>
            </div>
            <div class="cuerpo2-form">
              <p>Direccion</p>
              <input type="text" id="inputDireccion2">
            </div>
            <div class="cuerpo3-form">
              <div>
                <p>Responsable</p>
                <input type="text" id="inputResponsable2">
              </div>
              <div>
                <p>Telefono</p>
                <input type="text" id="inputTelefono2">
              </div>
            </div>
            <div id="cuerpo4-form-dos">
              <div class="detalle-cuerpo4">
                <div class="detalle-botones4">
                  <button id="boton-guardar2">Guardar cambios</button>   
                  <button>Cambiar Imagen</button>      
                </div>
                <div class="detalle-estado4">
                  <div class="contenedor-switch">
                    <label class="switch">
                      <input type="checkbox" id="toggleSwitch">
                      <span class="slider"></span>
                      <div class="label-text" id="labelText">Inactivo</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="w-[100%] h-[10%] bg-gradient-to-r from-callaoBlue to-indigo-700 flex items-center justify-center text-white">
      <span class="text-sm">v1.0 • Municipalidad Provincial del Callao</span>
    </footer>
  </div>

  <script src="./comedor.js"></script>
  <script src="./comedorPersistance.js"></script>
  <script src="./comedoresStore.js"></script>
  <script src="./comedoresApp.js"></script>
  <!-- JavaScript: Toggle Sidebar -->
  <script>

  </script>
</body>
</html>
```
=== EOF: comedores.html

===  comedor.js
```javascript
class Comedor{
    constructor(id, nombre, direccion, capacidad, responsable, telefono, estado, img){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.capacidad = capacidad;
        this.responsable = responsable;
        this.telefono = telefono;
        this.estado = estado;
        this.img = img; 
    }
}
```
=== EOF: comedor.js

