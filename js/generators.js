// generators.js - Gestisce la generazione dell'HTML per l'interfaccia
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
        .labels-top, .labels-bottom {
            display: flex;
            justify-content: space-between;
            font-size: 32px;
            padding: 0.5rem 0;
        }
        .labels-top span, .labels-bottom span {
            flex: 2;
            text-align: center;
        }
    </style>
`;

// Aggiunge gli stili al documento
document.head.insertAdjacentHTML('beforeend', styles);

function generateShutterBar(value) {
    const config = segmentConfigs.shutter;
    
    const segments = config.values.map(value => {
        const state = config.states[value];
        return `<div class="segment ${state}"></div>`;
    }).join('');

    const topLabels = config.values.filter((_, i) => i % 2 === 0)
        .map(value => `<span>${value}</span>`).join('');
    const bottomLabels = config.values.filter((_, i) => i % 2 === 1)
        .map(value => `<span>${value}</span>`).join('');

    return `
        <div class="labels-top">${topLabels}</div>
        <div class="segments-container">${segments}</div>
        <div class="labels-bottom">${bottomLabels}</div>
    `;
}

function generateApertureBar(value) {
    return generateSegmentedBar('aperture', value);
}

function generateISOBar(value) {
    return generateSegmentedBar('iso', value);
}

function generateSegmentedBar(type, currentValue) {
    if (type === 'shutter') return generateShutterBar(currentValue);

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
