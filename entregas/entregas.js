// Helpers
 // Funciones de carga y guarda
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

    // Datos iniciales
    let beneficiaries = loadJSON('beneficiarios');
    let history = loadJSON('deliveriesHistory');
    let fDNI = '', fName = '', fCom = '';

    // Debounce
    const debounce = (fn, d) => {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), d);
      };
    };

    // Formato fecha/hora
    const fmt = dt => ({
      fecha: dt.toLocaleDateString('es-PE'),
      hora: dt.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })
    });

    // Filtrar beneficiarios
    function filterList(list) {
      return list.filter(b => {
        const d = (b.numeroDocumento||b.dni||'').toLowerCase();
        const n = ((b.nombres? b.nombres+' '+(b.apellidos||''):b.nombre)||'').toLowerCase();
        const c = (b.comedor||'').toLowerCase();
        return (!fDNI   || d.includes(fDNI))
            && (!fName  || n.includes(fName))
            && (!fCom   || c.includes(fCom));
      });
    }

    // Render de la tabla principal
    function render() {
      beneficiaries = loadJSON('beneficiarios');
      history = loadJSON('deliveriesHistory');
      const tbody = document.getElementById('entregas-body');
      tbody.innerHTML = '';

      const list = filterList(beneficiaries);
      if (!list.length) {
        tbody.innerHTML = '<tr><td colspan="8" class="py-4 text-center text-gray-500">No hay beneficiarios</td></tr>';
        return;
      }

      list.forEach((b, i) => {
        const dni  = b.numeroDocumento||b.dni;
        const nombre = b.nombres ? `${b.nombres} ${b.apellidos||''}`.trim() : b.nombre;
        const comedor= b.comedor;
        const tipo   = b.mealType || '-';
        const cnt    = history.filter(h => h.dni===dni).length;
        const dt     = b.fechaEntrega ? fmt(new Date(b.fechaEntrega)) : {fecha:'', hora:''};

        const tr = document.createElement('tr');
        tr.className = 'border-b';
        tr.innerHTML = `
          <td class="py-2 px-4">${dni}</td>
          <td class="py-2 px-4">${nombre}</td>
          <td class="py-2 px-4">${comedor}</td>
          <td class="py-2 px-4">${tipo}</td>
          <td class="py-2 px-4">${dt.fecha}</td>
          <td class="py-2 px-4">${dt.hora}</td>
          <td class="py-2 px-4">${cnt}</td>
          <td class="py-2 px-4 flex space-x-2">
            <button id="btn-${i}"  class="bg-callaoYellow text-white px-3 py-1 rounded hover:scale-105 cursor-pointer">Entregar</button>
            <button id="hist-${i}" class="bg-callaoPurple text-white px-3 py-1 rounded hover:scale-105 cursor-pointer">Historial</button>
          </td>`;
        tbody.appendChild(tr);
      });

      attachHandlers();
    }

    // Listeners filtros
    ['filterDni','filterName','filterComedor'].forEach(id => {
      document.getElementById(id).addEventListener('input', debounce(e => {
        if (id==='filterDni')    fDNI  = e.target.value.toLowerCase();
        if (id==='filterName')   fName = e.target.value.toLowerCase();
        if (id==='filterComedor')fCom  = e.target.value.toLowerCase();
        render();
      }, 300));
    });

    // Adjuntar botones
    function attachHandlers() {
      beneficiaries.forEach((b, i) => {
        document.getElementById(`btn-${i}`).onclick  = entregarHandler(b);
        document.getElementById(`hist-${i}`).onclick = historialHandler(b);
      });
    }

    // Entregar
    function entregarHandler(b) {
      return () => {
        Swal.fire({
          title: 'Seleccione tipo de comida',
          input: 'select',
          inputOptions: {Desayuno:'Desayuno',Almuerzo:'Almuerzo',Cena:'Cena'},
          showCancelButton: true
        }).then(r => {
          if (r.isConfirmed) {
            const now = new Date(), dt = fmt(now);
            b.mealType     = r.value;
            b.fechaEntrega = now.toISOString();
            saveJSON('beneficiarios', beneficiaries);
            history.push({
              dni: b.numeroDocumento||b.dni,
              nombre: b.nombres?`${b.nombres} ${b.apellidos||''}`:b.nombre,
              tipo: r.value,
              fecha: dt.fecha,
              hora: dt.hora,
              comedor: b.comedor
            });
            saveJSON('deliveriesHistory', history);
            render();
          }
        });
      };
    }

    // Historial
    function historialHandler(b) {
      return () => {
        history = loadJSON('deliveriesHistory');
        const his = history
          .map((h,idx)=>({...h,idx}))
          .filter(h=>h.dni===(b.numeroDocumento||b.dni));

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
              <button data-idx="${h.idx}" class="del-btn bg-red-500 text-white px-2 py-1 rounded hover:scale-105 cursor-pointer">Eliminar</button>
            </td>
          </tr>`).join('');

        Swal.fire({
          title: 'Historial',
          html: `
            <div class="mb-3">
              <input id="hist-filter" class="w-full p-2 border rounded" placeholder="Buscar fecha, hora o tipo..." />
            </div>
            <div class="max-h-80 overflow-auto">
              <table class="min-w-full text-sm">
                <thead class="bg-callaoBlue text-white">
                  <tr>
                    <th class="py-2 px-2">DNI</th>
                    <th class="py-2 px-2">Nombre</th>
                    <th class="py-2 px-2">Tipo</th>
                    <th class="py-2 px-2">Fecha</th>
                    <th class="py-2 px-2">Hora</th>
                    <th class="py-2 px-2">Comedor</th>
                    <th class="py-2 px-2">Acciones</th>
                  </tr>
                </thead>
                <tbody id="hist-body">${buildRows(his)}</tbody>
              </table>
            </div>
          `,
          width: '80%',
          showCloseButton: true,
          showConfirmButton: false,
          didOpen: () => {
            const container = Swal.getHtmlContainer();
            const input     = container.querySelector('#hist-filter');
            const tbodyHist = container.querySelector('#hist-body');
            let current     = his.slice();

            // Filtrar
            const update = list => {
              tbodyHist.innerHTML = buildRows(list);
              attachDelete();
            };
            input.addEventListener('input', debounce(e => {
              const term = e.target.value.toLowerCase();
              update(current.filter(x =>
                x.fecha.includes(term) ||
                x.hora.includes(term) ||
                x.tipo.toLowerCase().includes(term)
              ));
            }, 300));

            // Eliminar
            function attachDelete() {
              container.querySelectorAll('.del-btn').forEach(btn => {
                btn.onclick = () => {
                  Swal.fire({
                    title: 'Confirmar eliminación',
                    html: `
                      <input id="res-name" class="swal2-input" placeholder="Supervisor (Nombre)" />
                      <input id="res-dni"  class="swal2-input" placeholder="Supervisor (DNI)" />
                    `,
                    showCancelButton: true,
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    preConfirm: () => {
                      const pop = Swal.getPopup();
                      const n = pop.querySelector('#res-name').value;
                      const d = pop.querySelector('#res-dni').value;
                      if (!n || !d) {
                        Swal.showValidationMessage('Nombre y DNI requeridos');
                        return;
                      }
                      return { n, d };
                    }
                  }).then(res => {
                    if (res.isConfirmed) {
                      // Borrar del historial
                      history.splice(btn.dataset.idx, 1);
                      saveJSON('deliveriesHistory', history);
                      // Refresh principal & modal
                      render();
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

    // Toggle sidebar (mobile)
    const sb = document.getElementById('sidebar');
    document.getElementById('btnSidebarOpen').onclick  = () => sb.classList.remove('-translate-x-full');
    document.getElementById('btnSidebarClose').onclick = () => sb.classList.add('-translate-x-full');

    // Inicial
    render();
