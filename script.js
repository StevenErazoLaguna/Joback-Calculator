const data = {
    "Incremento sin anillo  ": {
        "−CH3": [19.5, -0.00808, 0.000153, -9.67E-08],
        ">CH2": [-0.909, 0.095, -0.0000544, 1.19E-08],
        ">CH−": [-23, 0.204, -0.000265, 0.00000012],
        ">C<": [-66.2, 0.427, -0.000641, 0.000000301],
        "=CH2": [23.6, -0.0381, 0.000172, -0.000000103],
        "=CH−": [-8, 10.5, -0.0000963, 3.56E-08],
        "=C<": [-28.1, 0.208, -0.000306, -0.000000146],
        "=C=": [27.4, -0.0557, 0.000101, -5.02E-08],
        "≡CH": [24.5, -0.0271, 0.000111, -6.78E-08],
        "≡C−": [7.87, 0.0201, -8.33E-06, 1.39E-09],
    },
    "Incremento con anillo": {
        "−CH2−": [-6.03, 0.0854, -8E-06, -1.8E-08],
        ">CH−": [-20.5, 0.162, -0.00016, 6.24E-08],
        ">C<": [-90.9, 0.557, -0.0009, 4.69E-07],
        "=CH−": [-2.14, 0.0574, -1.64E-06, -1.59E-08],
        "−C<": [-8.25, 0.101, -0.000142, 6.78E-08],
    },
    "Incrementos de halógenos": {
        "−F": [26.5, -0.0913, 0.000191, -1.03E-07],
        "−Cl": [33.3, -0.0963, 0.000187, -9.96E-08],
        "−Br": [28.6, -0.0649, 0.000136, -7.45E-08],
        "−I": [32.1, -0.0641, 0.000126, -6.87E-08],
    },
    "Incremento de oxígeno": {
        "−OH (alcohol)": [25.7, -0.0691, 0.000177, -9.88E-08],
        "−OH (fenol)": [-2.81, 0.111, -0.000116, 4.94E-08],
        "−O− (sin anillo)": [25.5, -0.0632, 0.000111, -5.48E-08],
        "−O− (con anillo)": [12.2, -0.0126, 6.03E-05, -3.86E-08],
        ">C=O (sin anillo)": [6.45, 0.067, -3.57E-05, 2.86E-09],
        ">C=O (con anillo)": [30.4, -0.0829, 0.000236, -1.31E-07],
        "O=CH− (aldeido)": [30.9, -0.0336, 0.00016, -9.88E-08],
        "−COOH (ácido)": [24.1, 40.7, 8.04E-05, -6.87E-08],
        "−COO− (ester)": [24.5, 0.0402, 4.02E-05, -4.52E-08],
        "=O (excepto lo anterior)": [6.82, 0.0196, 1.27E-05, -1.78E-08],
    },
    "Incremento de nitrógeno": {
        "−NH2": [26.9, -0.0412, 0.000164, -9.76E-08],
        ">NH (sin anillo)": [-1.21, 0.0762, -4.86E-05, 1.05E-08],
        ">NH (con anillo)": [11.8, -0.023, 0.000107, -6.28E-08],
        ">N− (sin anillo)": [-31.1, 0.227, -0.00032, 1.46E-07],
        "−N= (sin anillo)": [0, 0, 0, 0],
        "−N= (con anillo)": [8.83, -0.00384, 4.35E-05, -2.6E-08],
        "=NH": [5.69, -0.00412, 0.000128, -8.88E-08],
        "−CN": [36.5, -0.0733, 0.000184, -1.03E-07],
        "−NO2": [25.9, -0.00374, 0.000129, -8.88E-08],
    },
    "Incremento de sulfuro": {
        "−SH": [35.3, -0.0758, 0.000185, -1.03E-07],
        "−S− (sin anillo)": [19.6, -0.00561, 4.02E-05, -2.76E-08],
        "−S− (con anillo)": [16.7, 0.00481, 2.77E-05, -2.11E-08],
    },
};

function createSection(sectionName, molecules) {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'section';
    
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = sectionName;
    sectionDiv.appendChild(title);
    
    Object.keys(molecules).forEach(molecule => {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'molecule-input';
        
        const label = document.createElement('label');
        label.innerText = molecule;
        inputDiv.appendChild(label);
        
        const input = document.createElement('input');
        input.type = 'number';
        input.value = '0';
        input.min = '0';
        input.step = 'any'; // Permite números decimales
        input.id = `${sectionName}-${molecule}`;
        inputDiv.appendChild(input);
        
        sectionDiv.appendChild(inputDiv);
    });

    return sectionDiv;
}

function populateSections() {
    const sectionsContainer = document.getElementById('sections-container');
    Object.keys(data).forEach(section => {
        const sectionElement = createSection(section, data[section]);
        sectionsContainer.appendChild(sectionElement);
    });

    const integrationSection = createIntegrationSection();
    sectionsContainer.appendChild(integrationSection);
}

function showConfirmationDialog(callback) {
    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    // Crear el diálogo
    const dialog = document.createElement('div');
    dialog.className = 'dialog';
    
    // Crear el mensaje
    const message = document.createElement('p');
    message.innerText = '¿Está seguro de que el compuesto es un gas?';
    dialog.appendChild(message);
    
    // Crear los botones
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const cancelButton = document.createElement('button');
    cancelButton.innerText = 'Cancelar';
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    const continueButton = document.createElement('button');
    continueButton.innerText = 'Continuar';
    continueButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
        callback(); // Llamar al callback si se confirma
    });

    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(continueButton);
    dialog.appendChild(buttonContainer);

    // Agregar al cuerpo del documento
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
}


function calculate() {
    showConfirmationDialog(() => {
        let total_a = 0, total_b = 0, total_c = 0, total_d = 0;

        Object.keys(data).forEach(section => {
            Object.keys(data[section]).forEach(molecule => {
                const count = parseFloat(document.getElementById(`${section}-${molecule}`).value) || 0;
                const [a, b, c, d] = data[section][molecule];
                total_a += a * count;
                total_b += b * count;
                total_c += c * count;
                total_d += d * count;
            });
        });

        // Resolvemos las operaciones dentro de los paréntesis
        const a = (total_a - 37.93).toFixed(4);
        const b = (total_b + 0.210).toFixed(4);
        const c = (total_c - 3.91e-4).toFixed(6);
        const d = (total_d + 2.06e-7).toFixed(8);

        const expandedResult = `${a} + ` +
                               `${b}T + ` +
                               `${c}T<sup>2</sup> + ` +
                               `${d}T<sup>3</sup>`;

        document.getElementById('result').innerHTML = `Resultado: ${expandedResult} J/(mol·K)`;
        const integralSection = document.getElementById('integral-section');
        integralSection.style.display = 'block';
    });
}

function calculateIntegral() {
    const resultElement = document.getElementById('result');
    const resultText = resultElement.innerHTML;
    const match = resultText.match(/Resultado:\s*(-?\d+\.?\d*)\s*\+\s*(-?\d+\.?\d*)T\s*\+\s*(-?\d+\.?\d*)T<sup>2<\/sup>\s*\+\s*(-?\d+\.?\d*)T<sup>3<\/sup>/);

    if (!match) {
        alert('Por favor, calcule primero la fórmula de Cp.');
        return;
    }

    const [, a, b, c, d] = match.map(Number);

    const temp1 = parseFloat(document.getElementById('temp1').value);
    const temp2 = parseFloat(document.getElementById('temp2').value);

    if (isNaN(temp1) || isNaN(temp2)) {
        alert('Por favor, ingrese temperaturas válidas.');
        return;
    }

    // Definir la función a integrar
    const f = (t) => a + b*t + c*Math.pow(t, 2) + d*Math.pow(t, 3);

    // Calcular la integral definida usando el método de los trapecios
    const integrate = (f, a, b, n = 1000) => {
        const h = (b - a) / n;
        let sum = 0.5 * (f(a) + f(b));
        for (let i = 1; i < n; i++) {
            sum += f(a + i * h);
        }
        return sum * h;
    };

    const result = integrate(f, temp1, temp2);

    document.getElementById('integral-result').innerHTML = `
        El resultado de la integral entre ${temp1}K y ${temp2}K es:<br>
        ${result.toFixed(2)} J/mol
    `;
}

function clearInputs() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.value = '0';
    });
    document.getElementById('result').innerText = 'Resultado: ';
    document.getElementById('integral-result').innerText = '';
    document.getElementById('integral-section').style.display = 'none';
    document.getElementById('print-results').innerHTML = '';

    
}

function createIntegrationSection() {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'section';
    sectionDiv.id = 'integral-section';
    sectionDiv.style.display = 'none';
    
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.innerText = 'Cálculo de la Integral';
    sectionDiv.appendChild(title);

    const inputDiv1 = document.createElement('div');
    inputDiv1.className = 'molecule-input';
    inputDiv1.innerHTML = '<label for="temp1">Temperatura 1 (K):</label><input type="number" id="temp1" step="any">';
    sectionDiv.appendChild(inputDiv1);

    const inputDiv2 = document.createElement('div');
    inputDiv2.className = 'molecule-input';
    inputDiv2.innerHTML = '<label for="temp2">Temperatura 2 (K):</label><input type="number" id="temp2" step="any">';
    sectionDiv.appendChild(inputDiv2);

    const calculateButton = document.createElement('button');
    calculateButton.innerText = 'Calcular Integral';
    calculateButton.addEventListener('click', calculateIntegral);
    sectionDiv.appendChild(calculateButton);

    const resultDiv = document.createElement('div');
    resultDiv.id = 'integral-result';
    sectionDiv.appendChild(resultDiv);

    return sectionDiv;
}
function printResults() {
    let usedMolecules = '';
    let cpFormula = '';
    let enthalpyResult = '';

    // Recopilar moléculas utilizadas
    Object.keys(data).forEach(section => {
        Object.keys(data[section]).forEach(molecule => {
            const count = parseFloat(document.getElementById(`${section}-${molecule}`).value) || 0;
            if (count > 0) {
                usedMolecules += `${molecule}: ${count}\n`;
            }
        });
    });

    // Obtener fórmula CP
    const resultElement = document.getElementById('result');
    cpFormula = resultElement.innerText.replace('Resultado: ', '');

    // Obtener resultado de la entalpía
    const integralResultElement = document.getElementById('integral-result');
    enthalpyResult = integralResultElement ? integralResultElement.innerText : 'No calculado';

    // Crear contenido para imprimir
    const printContent = `
        <h2>Resultados del cálculo</h2>
        <h3>Moléculas utilizadas:</h3>
        <pre>${usedMolecules}</pre>
        <h3>Fórmula CP:</h3>
        <p>${cpFormula}</p>
        <h3>Resultado de la entalpía:</h3>
        <p>${enthalpyResult}</p>
    `;

    // Mostrar resultados en la sección de impresión
    const printResultsElement = document.getElementById('print-results');
    printResultsElement.innerHTML = printContent;

    // Imprimir
    window.print();
}



document.addEventListener('DOMContentLoaded', () => {
    populateSections();
    document.getElementById('calculate-btn').addEventListener('click', calculate);
    document.getElementById('clear-btn').addEventListener('click', clearInputs);
    document.getElementById('print-btn').addEventListener('click', printResults);
});