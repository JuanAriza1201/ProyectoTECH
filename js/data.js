// Datos históricos de energía renovable por año (Aprox.)
const renewableData = [
    { year: 2000, solar: 0.01, wind: 0.03, hydro: 2.2, geo: 0.03, total: 2.27 },
    { year: 2005, solar: 0.06, wind: 0.12, hydro: 2.4, geo: 0.04, total: 2.62 },
    { year: 2010, solar: 0.6, wind: 1.2, hydro: 3.2, geo: 0.06, total: 5.06 },
    { year: 2015, solar: 4.0, wind: 8.5, hydro: 3.5, geo: 0.1, total: 16.1 },
    { year: 2020, solar: 20.0, wind: 30.0, hydro: 4.0, geo: 0.15, total: 54.15 },
    { year: 2022, solar: 25.0, wind: 35.0, hydro: 4.5, geo: 0.2, total: 64.7 }
  ];
  
  // Función para llenar los select de años (Inicio y Fin)
  function populateYearSelect() {
    const yearStart = document.getElementById("yearStart");
    const yearEnd = document.getElementById("yearEnd");
  
    for (let year = 2000; year <= 2022; year++) {
      const optionStart = document.createElement("option");
      optionStart.value = year;
      optionStart.textContent = year;
      yearStart.appendChild(optionStart);
  
      const optionEnd = document.createElement("option");
      optionEnd.value = year;
      optionEnd.textContent = year;
      yearEnd.appendChild(optionEnd);
    }
  }
  
  // Función para aplicar los filtros
  function filterData() {
    const yearStart = parseInt(document.getElementById("yearStart").value);
    const yearEnd = parseInt(document.getElementById("yearEnd").value);
    const energyType = document.getElementById("energyType").value;
  
    let filteredData = renewableData.filter(item => item.year >= yearStart && item.year <= yearEnd);
  
    if (energyType !== "all") {
      filteredData = filteredData.map(item => {
        const filteredItem = { year: item.year, total: item.total };
        filteredItem[energyType] = item[energyType];
        return filteredItem;
      });
    }
  
    updateDataTable(filteredData);
  }
  
  // Función para actualizar la tabla con los datos filtrados
  function updateDataTable(data) {
    const tableBody = document.querySelector("#renewableDataTable tbody");
    tableBody.innerHTML = '';
  
    data.forEach(item => {
      const row = document.createElement("tr");
  
      const yearCell = document.createElement("td");
      yearCell.textContent = item.year;
      row.appendChild(yearCell);
  
      const solarCell = document.createElement("td");
      solarCell.textContent = item.solar || "-";
      row.appendChild(solarCell);
  
      const windCell = document.createElement("td");
      windCell.textContent = item.wind || "-";
      row.appendChild(windCell);
  
      const hydroCell = document.createElement("td");
      hydroCell.textContent = item.hydro || "-";
      row.appendChild(hydroCell);
  
      const geoCell = document.createElement("td");
      geoCell.textContent = item.geo || "-";
      row.appendChild(geoCell);
  
      const totalCell = document.createElement("td");
      totalCell.textContent = item.total;
      row.appendChild(totalCell);
  
      tableBody.appendChild(row);
    });
  }
  
  // Inicializar los select de año y cargar la tabla con todos los datos
  window.onload = function() {
    populateYearSelect();
    updateDataTable(renewableData);  // Muestra todos los datos inicialmente
  };
  