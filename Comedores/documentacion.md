---
repository:
  name: Comedores
  owner: unknown
  url: ""
generated:
  timestamp: 2025-06-17T03:05:53.522Z
  tool: FlatRepo
statistics:
  totalFiles: 6
  totalLines: 518
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
    border-radius: 1rem;
    background-color: blue;
    color: white;
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
    border: solid 1px black;
    width: 30%;
    height: 60%;
    padding: 1%;
    background-color: #7dfa9e;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* background-color: #fa7d85; //Este color es para los comedores inactivos */
}

.recuadro-imagen-comedor{
    border: solid 1px black;
    width: 100%;
    height: 50%;
}

.recuadro-imagen-comedor img{
    height: 100%;
}

.recuadro-comedor p{
    font-size: 13px;
    width: 100%;
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
    background-color: gainsboro;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    display: none;
}

.modal-dos{
    width: 50%;
    height: 80%;
    padding: 2% 4% 2% 4%;
    background-color: gainsboro;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    display: none;
}

.form-modal{
    width: 100%;
    height: 80%;
    padding: 3rem 1.5rem 3rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 2rem;
}

.encabezado-form{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.encabezado-form p{
    font-size: 3rem;
}

.encabezado-form button{
    width: 5%;
}

.encabezado-form img{
    width: 100%;
}

.form-modal p{
    font-size: 1.2rem;
}

.cuerpo1-form{
    display: flex;   
    justify-content: space-between;
}

.cuerpo2-form{
    width: 100%;
}

.cuerpo2-form input{
    width: 100%;
}

.cuerpo3-form{
    display: flex;   
    justify-content: space-between;
}

#cuerpo4-form-uno{
    display: flex;
    justify-content: center;
    padding: 1rem;
}

#cuerpo4-form-uno button{
    color: white;
    padding: 2% 3% 2% 3%;
    background-color: black;
    border-radius: 1rem;
    font-size: 1rem;
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
   function setState(newState){
      state = newState;
      listeners.forEach(function (listener){
        listener(state);
      });
   }

   function addComedor(newTemplate) {
      // Insertar este nuevo elemento en el array state
      const newState = [...state, newTemplate]
      setState(newState)
   }

   function clearStorage(){
      setState([]);
   }

   function suscribe(listener){
      listeners.push(listener);

      return ()=> {
         const index = listeners.indexOf(listener);
         if(index > -1){
         listeners.splice(index,1);
         }
      }
   }

   return {
      getState,
      addComedor,
      setState,
      suscribe,
      clearStorage,
   }
}


const comedorStore = createStore();

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
btnAgregarComedor.addEventListener("click", function(){
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
btnCerrarUno.addEventListener("click", function(){
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
function cambiarEstado(id){
    if(estado){
        document.querySelector(".recuadro-modales").style = "display: flex;"
        document.querySelector(id).style = "display: flex;";
    }
    else{
        document.querySelector(".recuadro-modales").style = "display: none;"
        document.querySelector(id).style = "display: none;";
    }
}

//Agregar comedor
const btnAgregar = document.querySelector("#boton-agregar");
btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    const inputNombre = document.querySelector("#inputNombre");
    const inputCantidad = document.querySelector("#inputCantidad");
    const inputDireccion = document.querySelector("#inputDireccion");
    const inputResponsable = document.querySelector("#inputResponsable");
    const inputTelefono = document.querySelector("#inputTelefono");

    if(inputNombre.value!=="" && inputCantidad.value!=="" && inputDireccion.value!=="" && inputResponsable.value!=="" && inputTelefono.value!==""){
      const newComedor = new Comedor(inputNombre.value.trim(), inputDireccion.value.trim(), inputCantidad.value.trim(), inputResponsable.value.trim(), inputTelefono.value.trim(), true)
      window.comedorStore.addComedor(newComedor);
      alert("Datos guardados exitosamente");
   }
   else{
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
function renderizarUI(state){
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
            <p id="direccion-comedor${index}">Direccion: </p>
            <button id="boton-desplegarModalDos" onclick="verModalDos(${index}, ${elmt.nombre})">Ver</button>
        </div>
      `
   })
}

function verModalDos(index, nombre){
    estado = !estado;
    cambiarEstado(".modal-dos");
}

function ocultarModalDos(){
    estado = !estado;
    cambiarEstado(".modal-dos")
}

window.comedorStore.suscribe(renderizarUI);
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
      <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition">🍽️ <span class="ml-2">Entregas</span></a>
      <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition">🔒 <span class="ml-2">Usuarios</span></a>
      <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition">📊 <span class="ml-2">Panel</span></a>
      <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-purple-700 transition">🕵️ <span class="ml-2">Auditoría</span></a>
    </nav>
  </aside>

  <!-- Main content wrapper -->
  <div class="flex-1 flex flex-col border border-green-700 w-[82%] h-full">
    <!-- Header -->
    <header class="w-[100%] h-[12%] bg-gradient-to-r from-pink-500 to-red-500 flex items-center px-6 shadow-md">
      <button id="btnSidebarOpen" class="lg:hidden mr-4 focus:outline-none text-2xl text-white">&#9776;</button>
      <h1 class="text-2xl font-bold text-white">Comedores 🍲</h1>
    </header>

    <!-- Main area -->
    <main class="flex-1 p-6 w-[100%] h-[78%] border border-black">
      <!-- Comedores -->
      <section id="recuadro-comedores">
        <div id="recuadro-uno">
          <button id="boton-desplegarModalUno">Agregar Comedor</button>
          <input type="text">
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
            <p>Nuevo Comedor</p>
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
            <div id="cuerpo4-form">
              <button id="boton-agregar">Agregar</button>              
            </div>
          </form>
        </div>

        <!-- Modal dos -->
        <div class="modal-dos">
          <div class="encabezado-form">
            <p>Comedor</p>
            <button id="boton-cerrar-dos"><img src="./../Images/close-svgrepo-com.svg" alt="Cerrar" onclick="ocultarModalDos()"></button>
          </div>
          <form action="" class="form-modal">
            <div class="cuerpo1-form">
              <div>
                <p>Nombre</p>
                <input type="text">
              </div>
              <div>
                <p>Cantidad</p>
                <input type="text">
              </div>
            </div>
            <div class="cuerpo2-form">
              <p>Direccion</p>
              <input type="text">
            </div>
            <div class="cuerpo3-form">
              <div>
                <p>Responsable</p>
                <input type="text">
              </div>
              <div>
                <p>Telefono</p>
                <input type="text">
              </div>
            </div>
            <div id="cuerpo4-form-uno">
              <div>
                <p>Panel de control</p>
              </div>
              <div>
                <div>
                  <button>Editar</button>   
                  <button>Cambiar Imagen</button>           
                </div>
                <div>
                  <p>Estado</p>
                  <div></div>
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
    constructor(nombre, direccion, capacidad, responsable, telefono, estado){
        this.nombre = nombre;
        this.direccion = direccion;
        this.capacidad = capacidad;
        this.responsable = responsable;
        this.telefono = telefono;
        this.estado = estado;
    }
}
```
=== EOF: comedor.js

