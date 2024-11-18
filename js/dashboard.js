// Datos de ejemplo (puedes usar datos reales en tu aplicación)
const years = ['2018', '2019', '2020', '2021', '2022'];
const dashboardData = {
    production: {
        2018: { solar: 350.2, wind: 1100.4, hydro: 4000.5, geothermal: 80.3 },
        2019: { solar: 450.6, wind: 1250.8, hydro: 4100.7, geothermal: 85.1 },
        2020: { solar: 724.1, wind: 1592.3, hydro: 4297.3, geothermal: 95.1 },
        2021: { solar: 850.0, wind: 1750.2, hydro: 4400.4, geothermal: 100.0 },
        2022: { solar: 1000.0, wind: 1900.5, hydro: 4500.6, geothermal: 105.2 }
    },
    capacityTrend: {
        labels: years,
        solar: [400, 500, 724, 850, 1000],
        wind: [1200, 1350, 1592, 1750, 1900],
        hydro: [4000, 4100, 4297, 4400, 4500]
    },
    comparison: {
        labels: years,
        renewable: [5000, 5500, 6000, 6500, 7000],
        conventional: [8000, 7500, 7000, 6500, 6000]
    }
};

// Variables para almacenar las referencias de los gráficos
let productionChart, distributionChart, capacityTrendChart, comparisonChart;

// Inicializar selectores de año y energía
document.addEventListener('DOMContentLoaded', function() {
    const yearFilter = document.getElementById('yearFilter');
    const energyFilter = document.getElementById('energyFilter');

    // Poblar los selectores
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });

    const energyTypes = ['solar', 'wind', 'hydro', 'geothermal'];
    energyTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        energyFilter.appendChild(option);
    });

    // Inicializar gráficos
    initializeCharts();
    updateDashboard();
});

// Función para inicializar los gráficos
function initializeCharts() {
    const productionCtx = document.getElementById('productionChart').getContext('2d');
    productionChart = new Chart(productionCtx, {
        type: 'bar',
        data: {
            labels: ['Solar', 'Eólica', 'Hidroeléctrica', 'Geotérmica'],
            datasets: [{
                label: 'Producción (TWh)',
                data: [],
                backgroundColor: ['#ffd700', '#90caf9', '#4caf50', '#f44336']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const distributionCtx = document.getElementById('distributionChart').getContext('2d');
    distributionChart = new Chart(distributionCtx, {
        type: 'pie',
        data: {
            labels: ['Solar', 'Eólica', 'Hidroeléctrica', 'Geotérmica'],
            datasets: [{
                data: [],
                backgroundColor: ['#ffd700', '#90caf9', '#4caf50', '#f44336']
            }]
        },
        options: { responsive: true }
    });

    const capacityCtx = document.getElementById('capacityTrendChart').getContext('2d');
    capacityTrendChart = new Chart(capacityCtx, {
        type: 'line',
        data: {
            labels: dashboardData.capacityTrend.labels,
            datasets: [
                {
                    label: 'Solar',
                    data: [],
                    borderColor: '#ffd700',
                    fill: false
                },
                {
                    label: 'Eólica',
                    data: [],
                    borderColor: '#90caf9',
                    fill: false
                },
                {
                    label: 'Hidroeléctrica',
                    data: [],
                    borderColor: '#4caf50',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
    comparisonChart = new Chart(comparisonCtx, {
        type: 'line',
        data: {
            labels: dashboardData.comparison.labels,
            datasets: [
                {
                    label: 'Energía Renovable',
                    data: [],
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderColor: '#4caf50',
                    fill: true
                },
                {
                    label: 'Energía Convencional',
                    data: [],
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    borderColor: '#f44336',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

// Función para actualizar el dashboard
function updateDashboard() {
    const yearFilter = document.getElementById('yearFilter');
    const energyFilter = document.getElementById('energyFilter');

    if (!yearFilter || !energyFilter) {
        console.error("No se encontraron los filtros de año o energía");
        return;
    }

    const selectedYear = yearFilter.value;
    const selectedEnergy = energyFilter.value;
    const productionData = dashboardData.production[selectedYear];

    // Actualizar datos de producción
    productionChart.data.datasets[0].data = [
        productionData.solar,
        productionData.wind,
        productionData.hydro,
        productionData.geothermal
    ];
    productionChart.update();

    // Actualizar datos de distribución
    distributionChart.data.datasets[0].data = [
        productionData.solar,
        productionData.wind,
        productionData.hydro,
        productionData.geothermal
    ];
    distributionChart.update();

    // Actualizar datos de capacidad (tendencia) solo para el tipo de energía seleccionado
    capacityTrendChart.data.datasets.forEach(dataset => {
        if (dataset.label.toLowerCase() === selectedEnergy) {
            dataset.hidden = false; // Mostrar el conjunto de datos seleccionado
        } else {
            dataset.hidden = true; // Ocultar los demás conjuntos de datos
        }
    });
    capacityTrendChart.update();

    // Actualizar datos de comparación (en este ejemplo, no se filtra por tipo de energía)
    comparisonChart.data.datasets[0].data = dashboardData.comparison.renewable;
    comparisonChart.data.datasets[1].data = dashboardData.comparison.conventional;
    comparisonChart.update();

    console.log(`Dashboard actualizado para el año ${selectedYear} y energía ${selectedEnergy}`);
}
