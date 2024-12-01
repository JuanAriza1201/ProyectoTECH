const rutaBase = '../archive2/';
let datosCargados = false;

function cargarDatos() {
    if (datosCargados) {
        return;
    }
    Papa.parse(rutaBase + '12_solar_energy_consumption.csv', {
        download: true,
        header: true,
        complete: function (results) {
            if (results.errors.length > 0) {
                mostrarErrores(results.errors);
                return;
            }
            mostrarDatos(results.data);
            datosCargados = true;
        },
        error: function (error) {
            const errorMensaje = `Error al cargar el archivo CSV: ${error.message}`;
            mostrarErrores([{ message: errorMensaje }]);
        }
    });
}

function mostrarDatos(data) {
    const tablaDatos = document.getElementById('tabla-datos');
    if (!tablaDatos) {
        console.error("No se encontró la tabla con id 'tabla-datos'.");
        return;
    }
    tablaDatos.innerHTML = '';
    data.forEach(item => {
        const row = tablaDatos.insertRow();
        Object.values(item).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = (value === undefined || value === null) ? "" : value;
        });
    });
}

function mostrarErrores(errores) {
    const erroresContainer = document.createElement('div');
    erroresContainer.classList.add('alert', 'alert-danger');
    erroresContainer.style.marginTop = '20px';
    erroresContainer.innerHTML = '<h4>Errores al cargar los datos:</h4><ul>';
    errores.forEach(error => {
        erroresContainer.innerHTML += `<li>${error.message || error}</li>`;
    });
    erroresContainer.innerHTML += '</ul>';
    document.querySelector('main').appendChild(erroresContainer);
}

// Carga automática al iniciar
window.onload = cargarDatos;
