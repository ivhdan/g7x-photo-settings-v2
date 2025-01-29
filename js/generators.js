// generators.js

import { segmentConfigs } from './data.js';

// Stili CSS per i segmenti
const styles = `
    <style>
        .segment.optimal { background: var(--primary); }
        .segment.warning { background: #FFC107; }
        .segment.inactive { background: #4A4A4A; }
    </style>
`;

// Aggiunge gli stili al documento
document.head.insertAdjacentHTML('beforeend', styles);

// Funzione generica per creare barre segmentate
function generateSegmentedBar(type, currentValue) {
    const config = segmentConfigs[type];
    const segments = config.values.map(value => {
        const state = config.states[value];
        return `<div class="segment ${state}"></div>`;
    }).join('');

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

// Funzioni di generazione HTML specifiche
function generateApertureBar(value) {
    return generateSegmentedBar('aperture', value);
}

function generateShutterBar(value) {
    return generateSegmentedBar('shutter', value);
}

function generateISOBar(value) {
    return generateSegmentedBar('iso', value);
}

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
