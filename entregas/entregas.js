// File: entregas.js

// Helpers para localStorage, debounce y formateo
function loadJSON(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
function saveJSON(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
const fmt = dt => ({
  fecha: dt.toLocaleDateString('es-PE'),
  hora:  dt.toLocaleTimeString('es-PE', { hour:'2-digit', minute:'2-digit' })
});

// Estado global
let beneficiaries = loadJSON('beneficiarios');
let history       = loadJSON('deliveriesHistory');
let fDNI = '', fName = '', fCom = '';

// Filtrado de beneficiarios
function filterList(list) {
  return list.filter(b => {
    const d = (b.numeroDocumento || b.dni || '').toLowerCase();
    const n = ((b.nombres ? b.nombres+' '+(b.apellidos||'') : b.nombre) || '').toLowerCase();
    const c = (b.comedor || '').toLowerCase();
    return (!fDNI   || d.includes(fDNI))
        && (!fName  || n.includes(fName))
        && (!fCom   || c.includes(fCom));
  });
}

// Render de la tabla principal
function render() {
  beneficiaries = loadJSON('beneficiarios');
  history       = loadJSON('deliveriesHistory');

  const tbody = document.getElementById('entregas-body');
  tbody.innerHTML = '';

  const list = filterList(beneficiaries);
  if (!list.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="py-4 text-center text-gray-500">
          No hay beneficiarios
        </td>
      </tr>`;
    return;
  }

  list.forEach((b, i) => {
    const dni     = b.numeroDocumento || b.dni;
    const nombre  = b.nombres ? `${b.nombres} ${b.apellidos||''}` : b.nombre;
    const comedor = b.comedor;
    const tipo    = b.mealType || '-';

    // Recalculamos desde historial
    const entries = history.filter(h => h.dni === dni);
    const cnt     = entries.length;
    let fecha = '', hora = '';
    if (entries.length) {
      const last = entries[entries.length - 1];
      fecha = last.fecha;
      hora  = last.hora;
    }

    const tr = document.createElement('tr');
    tr.className = 'border-b';
    tr.innerHTML = `
      <td class="py-2 px-4">${dni}</td>
      <td class="py-2 px-4">${nombre}</td>
      <td class="py-2 px-4">${comedor}</td>
      <td class="py-2 px-4">${tipo}</td>
      <td class="py-2 px-4">${fecha}</td>
      <td class="py-2 px-4">${hora}</td>
      <td class="py-2 px-4">${cnt}</td>
      <td class="py-2 px-4 flex space-x-2">
        <button id="btn-${i}"
                class="bg-callaoYellow text-white px-3 py-1 rounded hover:scale-105 cursor-pointer">
          Entregar
        </button>
        <button id="hist-${i}"
                class="bg-callaoPurple text-white px-3 py-1 rounded hover:scale-105 cursor-pointer">
          Historial
        </button>
      </td>`;
    tbody.appendChild(tr);
  });

  attachHandlers(list);
}

// Configurar inputs de filtro con debounce
['filterDni','filterName','filterComedor'].forEach(id => {
  document.getElementById(id).addEventListener('input', debounce(e => {
    const v = e.target.value.trim().toLowerCase();
    if (id === 'filterDni')    fDNI  = v;
    if (id === 'filterName')   fName = v;
    if (id === 'filterComedor')fCom  = v;
    render();
  }, 300));
});

// Adjuntar eventos a botones de cada fila
function attachHandlers(list) {
  list.forEach((b, i) => {
    document.getElementById(`btn-${i}`).onclick  = entregarHandler(b);
    document.getElementById(`hist-${i}`).onclick = historialHandler(b);
  });
}

// Controlador del botón "Entregar"
function entregarHandler(b) {
  return () => {
    Swal.fire({
      title: 'Seleccione tipo de comida',
      input: 'select',
      inputOptions: { Desayuno:'Desayuno', Almuerzo:'Almuerzo', Cena:'Cena' },
      showCancelButton: true
    }).then(r => {
      if (!r.isConfirmed) return;
      const now = new Date();
      const dt  = fmt(now);
      b.mealType     = r.value;
      b.fechaEntrega = now.toISOString();
      saveJSON('beneficiarios', beneficiaries);

      history.push({
        dni:     b.numeroDocumento || b.dni,
        nombre:  b.nombres ? `${b.nombres} ${b.apellidos||''}` : b.nombre,
        tipo:    r.value,
        fecha:   dt.fecha,
        hora:    dt.hora,
        comedor: b.comedor
      });
      saveJSON('deliveriesHistory', history);
      render();
    });
  };
}

// Controlador del botón "Historial"
function historialHandler(b) {
  return () => {
    history = loadJSON('deliveriesHistory');
    const his = history
      .map((h,idx) => ({ ...h, idx }))
      .filter(h => h.dni === (b.numeroDocumento || b.dni));

    if (!his.length) {
      Swal.fire('Sin historial','No hay registros','info');
      return;
    }

    const buildRows = list => list.map(h => `
      <tr class="border-b">
        <td class="py-1 px-2">${h.dni}</td>
        <td class="py-1 px-2">${h.nombre}</td>
        <td class="py-1 px-2">${h.tipo}</td>
        <td class="py-1 px-2">${h.fecha}</td>
        <td class="py-1 px-2">${h.hora}</td>
        <td class="py-1 px-2">${h.comedor}</td>
        <td class="py-1 px-2">
          <button data-idx="${h.idx}"
                  class="del-btn bg-red-500 text-white px-2 py-1 rounded hover:scale-105 cursor-pointer">
            Eliminar
          </button>
        </td>
      </tr>`).join('');

    Swal.fire({
      title: 'Historial',
      html: `
        <div class="mb-3">
          <input id="hist-filter"
                 class="w-full p-2 border rounded"
                 placeholder="Buscar fecha, hora o tipo..." />
        </div>
        <div class="max-h-80 overflow-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-callaoBlue text-white"><tr>
              <th class="py-2 px-2">DNI</th>
              <th class="py-2 px-2">Nombre</th>
              <th class="py-2 px-2">Tipo</th>
              <th class="py-2 px-2">Fecha</th>
              <th class="py-2 px-2">Hora</th>
              <th class="py-2 px-2">Comedor</th>
              <th class="py-2 px-2">Acciones</th>
            </tr></thead>
            <tbody id="hist-body">${buildRows(his)}</tbody>
          </table>
        </div>`,
      width: '80%',
      showCloseButton: true,
      showConfirmButton: false,
      didOpen: () => {
        const c   = Swal.getHtmlContainer();
        const inp = c.querySelector('#hist-filter');
        const tb  = c.querySelector('#hist-body');
        let cur   = his.slice();

        // Filtrar dentro del modal
        inp.addEventListener('input', debounce(e => {
          const t = e.target.value.toLowerCase();
          tb.innerHTML = buildRows(cur.filter(x =>
            x.fecha.includes(t) ||
            x.hora.includes(t)  ||
            x.tipo.toLowerCase().includes(t)
          ));
          attachDelete();
        }, 300));

        // Función para enlazar botones Eliminar
        function attachDelete() {
          c.querySelectorAll('.del-btn').forEach(btn => {
            btn.onclick = () => {
              Swal.fire({
                title: 'Confirmar eliminación',
                html: `
                  <input id="res-name" class="swal2-input" placeholder="Nombre responsable"/>
                  <input id="res-dni"  class="swal2-input" placeholder="DNI responsable"/>
                `,
                showCancelButton: true,
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                preConfirm: () => {
                  const pop = Swal.getPopup();
                  const n = pop.querySelector('#res-name').value;
                  const d = pop.querySelector('#res-dni').value;
                  if (!n||!d) {
                    Swal.showValidationMessage('Nombre y DNI requeridos');
                    return;
                  }
                  return { n, d };
                }
              }).then(res => {
                if (res.isConfirmed) {
                  // Eliminar registro
                  history.splice(btn.dataset.idx, 1);
                  saveJSON('deliveriesHistory', history);

                  // Re-render de tabla principal
                  render();

                  // Reabrir modal con el mismo beneficiario
                  historialHandler(b)();
                }
              });
            };
          });
        }
        attachDelete();
      }
    });
  };
}

// Render inicial
render();
