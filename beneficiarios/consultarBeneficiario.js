// scriptConsultarBeneficiario.js

document.addEventListener("DOMContentLoaded", () => {
  const beneficiarios = JSON.parse(localStorage.getItem("beneficiarios")) || [];
  const tabla = document.getElementById("tablaBeneficiarios");
  const buscarInput = document.getElementById("buscarInput");
  const filtroComedor = document.getElementById("filtroComedor");
  const filtroEstado = document.getElementById("filtroEstado");

  const modal = document.getElementById("modalEditar");
  const formEditar = document.getElementById("formEditar");
  const btnCancelar = document.getElementById("btnCancelar");

  let beneficiarioEditando = null;

  function renderTabla(datos) {
    tabla.innerHTML = "";
    datos.forEach(b => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td class="p-2">${b.tipoDocumento}</td>
        <td class="p-2">${b.numeroDocumento}</td>
        <td class="p-2">${b.nombres}</td>
        <td class="p-2">${b.apellidos}</td>
        <td class="p-2">${b.fechaNacimiento}</td>
        <td class="p-2">${b.edad}</td>
        <td class="p-2">${b.sexo}</td>
        <td class="p-2">${b.direccion}</td>
        <td class="p-2">${b.telefono}</td>
        <td class="p-2">${b.estadoCivil}</td>
        <td class="p-2">${b.hijos}</td>
        <td class="p-2">${b.condicion}</td>
        <td class="p-2">${b.comedor}</td>
        <td class="p-2">${b.estado}</td>
        <td class="p-2">
          <button class="old text-blue-600 underline" onclick="editarBeneficiario('${b.numeroDocumento}')">Editar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });
  }

  window.editarBeneficiario = (numeroDocumento) => {
    beneficiarioEditando = beneficiarios.find(b => b.numeroDocumento === numeroDocumento);
    if (!beneficiarioEditando) return;

    // Rellenar el formulario con los valores actuales
    document.getElementById("editTipoDocumento").value = beneficiarioEditando.tipoDocumento;
    document.getElementById("editNumeroDocumento").value = beneficiarioEditando.numeroDocumento;
    document.getElementById("editNombres").value = beneficiarioEditando.nombres;
    document.getElementById("editApellidos").value = beneficiarioEditando.apellidos;
    document.getElementById("editFechaNacimiento").value = beneficiarioEditando.fechaNacimiento;
    document.getElementById("editEdad").value = beneficiarioEditando.edad;
    document.getElementById("editSexo").value = beneficiarioEditando.sexo;
    document.getElementById("editDireccion").value = beneficiarioEditando.direccion;
    document.getElementById("editTelefono").value = beneficiarioEditando.telefono;
    document.getElementById("editEstadoCivil").value = beneficiarioEditando.estadoCivil;
    document.getElementById("editHijos").value = beneficiarioEditando.hijos;
    document.getElementById("editCondicion").value = beneficiarioEditando.condicion;
    document.getElementById("editComedor").value = beneficiarioEditando.comedor;
    document.getElementById("editEstado").value = beneficiarioEditando.estado;

    modal.classList.remove("hidden");
  };

  btnCancelar.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  formEditar.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!beneficiarioEditando) return;

    // Actualizar datos
    beneficiarioEditando.tipoDocumento = document.getElementById("editTipoDocumento").value;
    beneficiarioEditando.nombres = document.getElementById("editNombres").value;
    beneficiarioEditando.apellidos = document.getElementById("editApellidos").value;
    beneficiarioEditando.fechaNacimiento = document.getElementById("editFechaNacimiento").value;
    beneficiarioEditando.edad = document.getElementById("editEdad").value;
    beneficiarioEditando.sexo = document.getElementById("editSexo").value;
    beneficiarioEditando.direccion = document.getElementById("editDireccion").value;
    beneficiarioEditando.telefono = document.getElementById("editTelefono").value;
    beneficiarioEditando.estadoCivil = document.getElementById("editEstadoCivil").value;
    beneficiarioEditando.hijos = document.getElementById("editHijos").value;
    beneficiarioEditando.condicion = document.getElementById("editCondicion").value;
    beneficiarioEditando.comedor = document.getElementById("editComedor").value;
    beneficiarioEditando.estado = document.getElementById("editEstado").value;

    // Guardar y recargar
    localStorage.setItem("beneficiarios", JSON.stringify(beneficiarios));
    renderTabla(beneficiarios);
    modal.classList.add("hidden");
  });

  function filtrar() {
    const texto = buscarInput.value.toLowerCase();
    const comedor = filtroComedor.value;
    const estado = filtroEstado.value;

    const filtrados = beneficiarios.filter(b => {
      const coincideTexto =
        b.nombres.toLowerCase().includes(texto) ||
        b.numeroDocumento.toLowerCase().includes(texto);
      const coincideComedor = comedor === "" || b.comedor === comedor;
      const coincideEstado = estado === "" || b.estado === estado;
      return coincideTexto && coincideComedor && coincideEstado;
    });

    renderTabla(filtrados);
  }

  buscarInput.addEventListener("input", filtrar);
  filtroComedor.addEventListener("change", filtrar);
  filtroEstado.addEventListener("change", filtrar);

  renderTabla(beneficiarios);
});
