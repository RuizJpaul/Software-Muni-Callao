document.getElementById("btnGuardar").addEventListener("click", () => {
      const beneficiario = {
        tipoDocumento: document.getElementById("tipoDocumento").value,
        numeroDocumento: document.getElementById("numeroDocumento").value,
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        edad: document.getElementById("edad").value,
        sexo: document.getElementById("sexo").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value,
        estadoCivil: document.getElementById("estadoCivil").value,
        hijos: document.getElementById("hijos").value,
        condicion: document.getElementById("condicion").value,
        comedor: document.getElementById("comedor").value,
        estado: document.getElementById("estado").value,
      };

      if (!beneficiario.numeroDocumento) {
        alert("El número de documento es obligatorio.");
        return;
      }

      let beneficiarios; // creo variable que contendra a todos los beneficiarios

      if( localStorage.getItem("beneficiarios")){ //busco la key beneficiarios
        beneficiarios = JSON.parse(localStorage.getItem("beneficiarios")) ; // si existe,obtengo beneficiarios parseado
      }else{
        beneficiarios=[]; // en la primera vez , como no existe, creara beneficios = []
      }

    





    let yaExiste = false;

    // Recorremos todos los beneficiarios guardados
      for (let i = 0; i < beneficiarios.length; i++) {
      let beneficiarioGuardado = beneficiarios[i];

      // Comparamos si el número de documento ya existe
      if (beneficiarioGuardado.numeroDocumento === beneficiario.numeroDocumento) {
      yaExiste = true; // Ya está registrado
      break; // No hace falta seguir buscando
         }
     }

    // Validamos antes de guardar
    if (yaExiste) {
      alert("Este número de documento ya está registrado.");
      } else {
      beneficiarios.push(beneficiario); // Lo agregamos al array
      localStorage.setItem("beneficiarios", JSON.stringify(beneficiarios)); // Guardamos en localStorage
      alert("¡Beneficiario registrado con éxito!");

      // Si quieres limpiar el formulario
      document.getElementById("formulario").reset();
    }

});