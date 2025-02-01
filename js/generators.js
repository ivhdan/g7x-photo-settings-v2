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

document.head.insertAdjacentHTML('beforeend', styles);

function generateSegmentBar(config) {
    const segments = config.values.map(value => {
        const state = config.states[value];
        return `<div class="segment ${state}"></div>`;
    }).join('');

    const labels = config.values.map(value => `<span>${value}</span>`).join('');

    return `
        <div class="segments-container">
            ${segments}
        </div>
        <div class="aperture-labels">
            ${labels}
        </div>
    `;
}

function generateISOBar(isoConfig) {
    if (typeof isoConfig === 'string') {
        // Supporto vecchio formato
        return generateSegmentBar(segmentConfigs.iso);
    }
    return generateSegmentBar(isoConfig);
}

function generateShutterBar(value) {
    return generateSegmentBar(segmentConfigs.shutter);
}

function generateApertureBar(value) {
    const config = {
        values: ['1.8', '2.8', '4', '5.6', '8'],
        states: {
            '1.8': 'warning',
            '2.8': 'optimal',
            '4': 'optimal',
            '5.6': 'warning',
            '8': 'inactive'
        }
    };
    return generateSegmentBar(config);
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
