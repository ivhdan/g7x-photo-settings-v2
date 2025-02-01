// generators.js
import { segmentConfigs } from './data.js';

// Stili CSS per i segmenti
const styles = `
    <style>
        .segment.optimal { 
            background: var(--primary);
            box-shadow: 0 0 15px rgba(255,152,0,0.3);
        }
        .segment.warning { 
            background: #FFC107;
            box-shadow: 0 0 10px rgba(255,193,7,0.2);
        }
        .segment.inactive { 
            background: #666666;
            opacity: 0.8;
        }
    </style>
`;

// Aggiunge gli stili al documento
document.head.insertAdjacentHTML('beforeend', styles);

// Funzione per generare la barra segmentata
function generateSegmentedBar(type, currentValue) {
    const config = segmentConfigs[type];
    
    // Genera i segmenti della barra
    const segments = config.values.map(value => {
        const state = config.states[value];
        return `<div class="segment ${state}"></div>`;
    }).join('');

    // Genera le etichette alternate sopra e sotto
    const labels = config.values.map((value, index) => {
        const prefix = type === 'aperture' ? 'f/' : '';
        const position = index % 2 === 0 ? 'top' : 'bottom';
        const left = (index / (config.values.length - 1)) * 100;
        return `<span class="label-${position}" style="left: ${left}%">${prefix}${value}</span>`;
    }).join('');

    return `
        <div class="segments-container">
            ${segments}
        </div>
        <div class="aperture-labels">
            ${labels}
        </div>
    `;
}

// Funzioni specifiche per ogni tipo di barra
function generateApertureBar(value) {
    return generateSegmentedBar('aperture', value);
}

function generateShutterBar(value) {
    return generateSegmentedBar('shutter', value);
}

function generateISOBar(value) {
    return generateSegmentedBar('iso', value);
}

// Funzione per generare il contenuto di una card
function generateCardContent(item, section) {
    if (!item.iso) {
        return `
            <h2>${item.value}</h2>
            <p>${item.settings}</p>
        `;
    }

    return `
        <h2>${item.value}</h2>
        <p>${item.conditions}</p>
        <div class="details">
            ${section === 'aperture' 
                ? generateApertureBar(item.value.replace('f/', ''))
                : section === 'shutter'
                    ? generateShutterBar(item.value)
                    : generateApertureBar(item.aperture.replace('f/', ''))}
            ${generateISOBar(item.iso)}
            ${section === 'shutter' 
                ? `<span>Diaframma: ${item.aperture}</span>`
                : `<span>Tempo: ${item.shutter}</span>`
            }
        </div>
    `;
}

export { generateCardContent };
