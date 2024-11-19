// Ruta base de los archivos CSV
const rutaBase = 'archive/'; // Define la ruta base aquí

const archivosCSV = [
  { fuente: 'solar', archivo: '12 solar-energy-consumption.csv' },
  { fuente: 'eolica', archivo: '11 share-electricity-wind.csv' },
  { fuente: 'hidro', archivo: '05 hydropower-consumption.csv' },
  { fuente: 'geotermica', archivo: '17 installed-geothermal-capacity.csv' },
  { fuente: 'biocombustible', archivo: '16 biofuel-production.csv' }
];

let datos = [];

// Función para cargar y procesar los archivos CSV
function cargarDatos() {
  let archivosCargados = 0;
  let erroresCarga = []; // Array para almacenar errores de carga

  archivosCSV.forEach(({ fuente, archivo }) => {
    Papa.parse(rutaBase + archivo, { // ruta completa del archivo
      download: true,
      header: true,
      complete: function(result) {
        if (result.errors.length > 0) {
          erroresCarga.push({ archivo: archivo, errores: result.errors });
        } else {
          result.data.forEach(row => {
            // Manejo de posibles valores nulos o undefined
            const anio = row['Año'] || null;
            const produccion = row['Producción (GWh)'] || null; // Ajustar según tus columnas

            datos.push({
              anio: anio,
              fuente: fuente,
              produccion: produccion
            });
          });
        }
        archivosCargados++;
        if (archivosCargados === archivosCSV.length) {
          if (erroresCarga.length > 0) {
            mostrarErrores(erroresCarga); // Mostrar los errores de carga
          }
          filtrarDatos();
        }
      },
      error: function(error) {
        erroresCarga.push({ archivo: archivo, errores: [error] }); // Agregar error a la lista
        archivosCargados++; // Incrementar el contador incluso en caso de error
        if (archivosCargados === archivosCSV.length) {
          mostrarErrores(erroresCarga); // Mostrar los errores de carga
          filtrarDatos(); // Ejecutar filtrarDatos() de todas formas
        }
      }
    });
  });
}

// Función para mostrar los errores de carga
function mostrarErrores(errores) {
  const errorContainer = document.getElementById('errores-carga'); // Crea un elemento para mostrar errores
  if(errorContainer){ // Verifica si existe el contenedor de errores
      errorContainer.innerHTML = ''; // Limpiar el contenedor
      errores.forEach(error => {
          const mensajeError = document.createElement('p');
          mensajeError.textContent = `Error al cargar ${error.archivo}: ${JSON.stringify(error.errores)}`;
          errorContainer.appendChild(mensajeError);
      });
  }else{
      console.error("No se encontró el elemento con id 'errores-carga'.");
  }
}


// Función para filtrar y mostrar los datos
function filtrarDatos() {
  const filtro = document.getElementById("filtro-datos").value || "todos"; // Manejo de valor nulo
  const tabla = document.getElementById("tabla-datos");
  tabla.innerHTML = "";

  const datosFiltrados = filtro === "todos" ? datos : datos.filter(dato => dato.fuente === filtro);

  datosFiltrados.forEach(dato => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td>${dato.anio}</td>
        <td>${dato.fuente.charAt(0).toUpperCase() + dato.fuente.slice(1)}</td>
        <td>${dato.produccion}</td>
    `;
    tabla.appendChild(fila);
  });
}

// Cargar los datos al iniciar la página
window.onload = cargarDatos;