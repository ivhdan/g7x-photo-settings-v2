// generators.js - Gestisce la generazione dell'HTML per l'interfaccia

import { segmentConfigs } from './data.js';

// Stili CSS per i segmenti - verranno inseriti dinamicamente
const styles = `
    <style>
        .segment.optimal { 
            background: var(--primary);
            box-shadow: 0 0 10px rgba(255,152,0,0.3);
        }
        .segment.warning { 
            background: var(--warning);
        }
        .segment.inactive { 
            background: var(--inactive);
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

    // Genera le etichette sotto la barra
    const labels = config.values.map(value => {
        const prefix = type === 'aperture' ? 'f/' : '';
        return `<span>${prefix}${value}</span>`;
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
    // Per le scene, che non hanno ISO
    if (!item.iso) {
        return `
            <h2>${item.value}</h2>
            <p>${item.settings}</p>
        `;
    }

    // Per apertura e tempi
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

// Esporta solo la funzione necessaria all'app
export { generateCardContent };
