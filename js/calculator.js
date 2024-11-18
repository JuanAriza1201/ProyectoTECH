document.addEventListener('DOMContentLoaded', function() {
    const calculatorForm = document.getElementById('calculatorForm');
    
    calculatorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const consumption = parseFloat(document.getElementById('consumption').value);
        const region = document.getElementById('region').value;
        
        if (isNaN(consumption) || !region) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        // Lógica de cálculo según la región
        let renewablePercentage;
        switch (region) {
            case 'north':
                renewablePercentage = 0.6; // 60% de energía renovable
                break;
            case 'center':
                renewablePercentage = 0.4; // 40% de energía renovable
                break;
            case 'south':
                renewablePercentage = 0.8; // 80% de energía renovable
                break;
            default:
                renewablePercentage = 0;
        }

        // Calcular consumos renovable y convencional
        const renewableConsumption = consumption * renewablePercentage;
        const conventionalConsumption = consumption * (1 - renewablePercentage);
        const co2Saved = renewableConsumption * 0.5; // Asumiendo que se evitan 0.5 kg de CO₂ por kWh

        // Mostrar resultados
        document.getElementById('renewableConsumption').textContent = renewableConsumption.toFixed(2);
        document.getElementById('conventionalConsumption').textContent = conventionalConsumption.toFixed(2);
        document.getElementById('co2Saved').textContent = co2Saved.toFixed(2);

        const renewableBar = document.getElementById('renewablePercentage');
        renewableBar.style.width = (renewablePercentage * 100) + '%';
        renewableBar.textContent = (renewablePercentage * 100).toFixed(0) + '%';

        // Mostrar la sección de resultados
        document.getElementById('results').style.display = 'block';
    });
});
