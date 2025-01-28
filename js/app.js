// Configurazione e dati
const data = {
    it: {
        aperture: [
            { value: 'f/1.8', conditions: 'Poca luce, effetto bokeh', iso: '100-400', shutter: '1/60-1/250' },
            { value: 'f/2.8-4', conditions: 'Uso generale, ritratti', iso: '100-400', shutter: '1/125-1/500' },
            { value: 'f/5.6', conditions: 'Paesaggi, maggiore profondità', iso: '100-200', shutter: '1/60-1/250' },
            { value: 'f/8', conditions: 'Massima nitidezza, HDR', iso: '100', shutter: '1/30-1/125' }
        ],
        shutter: [
            { value: '1/1000+', conditions: 'Azione veloce, sport', iso: '400-800', aperture: 'f/1.8-4' },
            { value: '1/125-1/500', conditions: 'Uso generale', iso: '100-400', aperture: 'f/2.8-5.6' },
            { value: '1/60-1/125', conditions: 'Soggetti statici', iso: '100-200', aperture: 'f/4-8' },
            { value: '<1/30', conditions: 'Richiesto treppiede', iso: '100', aperture: 'f/5.6-8' }
        ],
        scenes: [
            { value: 'Paesaggio', settings: 'f/8, ISO 100, bracketing se necessario' },
            { value: 'Street', settings: 'f/5.6, ISO 400, 1/125s' },
            { value: 'Poca Luce', settings: 'f/1.8, ISO 800, 1/60s' },
            { value: 'HDR', settings: 'f/8, ISO 100, ±2 stop' }
        ]
    },
    en: {
        aperture: [
            { value: 'f/1.8', conditions: 'Low light, bokeh effect', iso: '100-400', shutter: '1/60-1/250' },
            { value: 'f/2.8-4', conditions: 'General purpose, portraits', iso: '100-400', shutter: '1/125-1/500' },
            { value: 'f/5.6', conditions: 'Landscapes, more depth', iso: '100-200', shutter: '1/60-1/250' },
            { value: 'f/8', conditions: 'Maximum sharpness, HDR', iso: '100', shutter: '1/30-1/125' }
        ],
        shutter: [
            { value: '1/1000+', conditions: 'Fast action, sports', iso: '400-800', aperture: 'f/1.8-4' },
            { value: '1/125-1/500', conditions: 'General purpose', iso: '100-400', aperture: 'f/2.8-5.6' },
            { value: '1/60-1/125', conditions: 'Static subjects', iso: '100-200', aperture: 'f/4-8' },
            { value: '<1/30', conditions: 'Tripod required', iso: '100', aperture: 'f/5.6-8' }
        ],
        scenes: [
            { value: 'Landscape', settings: 'f/8, ISO 100, bracket if needed' },
            { value: 'Street', settings: 'f/5.6, ISO 400, 1/125s' },
            { value: 'Low Light', settings: 'f/1.8, ISO 800, 1/60s' },
            { value: 'HDR', settings: 'f/8, ISO 100, ±2 stops' }
        ]
    }
};

let currentLanguage = 'it';
let currentSection = 'aperture';

// Funzioni di utilità per calcoli
function getApertureSegments(value) {
    const apertures = ['1.8', '2.8', '4', '5.6', '8'];
    const currentValue = parseFloat(value.replace('f/', '').split('-')[0]);
    const currentIndex = apertures.findIndex(a => parseFloat(a) >= currentValue);
    
    return apertures.map((a, index) => {
        if (index === currentIndex) return 'active';
        if (index < currentIndex) return 'past';
        return '';
    });
}

function getShutterSegments(value) {
    const shutterSpeeds = ['1/1000', '1/500', '1/125', '1/60', '1/30'];
    // Normalizza il valore (rimuove il '+' e prende il primo numero se c'è un range)
    const currentValue = value.replace('+', '').split('-')[0];
    const currentIndex = shutterSpeeds.findIndex(speed => {
        const speedValue = parseFloat(speed.replace('1/', ''));
        const valueToCheck = parseFloat(currentValue.replace('1/', ''));
        return valueToCheck >= speedValue;
    });
    
    return shutterSpeeds.map((_, index) => {
        if (index === currentIndex) return 'active';
        if (index < currentIndex) return 'past';
        return '';
    });
}

function getISOSegments(value) {
    const isoValues = ['100', '200', '400', '800', '1600'];
    const currentValue = value.split('-')[0]; // Prende il primo valore se è un range
    const currentIndex = isoValues.findIndex(iso => parseInt(iso) >= parseInt(currentValue));
    
    return isoValues.map((_, index) => {
        if (index === currentIndex) return 'active';
        if (index < currentIndex) return 'past';
        return '';
    });
}

function getApertureProgress(value) {
    const number = parseFloat(value.replace('f/', '').split('-')[0]);
    return Math.max(0, Math.min(100, (8 - number) / (8 - 1.8) * 100));
}

// Funzioni di generazione HTML
function generateISOSegments(iso) {
    const isoValues = ['100', '200', '400', '800', '1600'];
    const segments = getISOSegments(iso)
        .map((className, i) => `<div class="segment ${className}"></div>`)
        .join('');
        
    return `
        <div class="segments-container">
            ${segments}
        </div>
        <div class="iso-labels">
            <span>100</span>
            <span>200</span>
            <span>400</span>
            <span>800</span>
            <span>1600</span>
        </div>
    `;
}

function generateShutterSegments(value) {
    const segments = getShutterSegments(value)
        .map((className, i) => `<div class="segment ${className}"></div>`)
        .join('');
        
    return `
        <div class="segments-container">
            ${segments}
        </div>
        <div class="shutter-labels">
            <span>1/1000</span>
            <span>1/500</span>
            <span>1/125</span>
            <span>1/60</span>
            <span>1/30</span>
        </div>
    `;
}

function generateISOSegments(iso) {
    const isoValues = ['100', '200', '400', '800', '1600'];
    const segments = getISOSegments(iso)
        .map((className, i) => `
            <div class="segment-wrapper">
                <div class="iso-value">${isoValues[i]}</div>
                <div class="segment ${className}"></div>
            </div>`)
        .join('');
        
    return `
        <div class="iso-container">
            <div class="iso-label">ISO</div>
            <div class="segments-container">
                ${segments}
            </div>
        </div>
    `;
}

function generateApertureProgress(value) {
    return `
        <div class="progress-container">
            <div class="progress-label">
                <span>f/1.8</span>
                <span class="value-label">${value}</span>
                <span>f/8</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${getApertureProgress(value)}%"></div>
            </div>
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
    const visualComponent = section === 'aperture' 
        ? generateApertureSegments(item.value)
        : section === 'shutter' 
            ? generateShutterSegments(item.value)
            : generateApertureProgress(item.aperture || item.value);
    return `
        <h2>${item.value}</h2>
        <p>${item.conditions}</p>
        <div class="details">
            ${visualComponent}
            ${generateISOSegments(item.iso)}
            ${section === 'shutter' 
                ? `<span>Diaframma: ${item.aperture}</span>`
                : `<span>Tempo: ${item.shutter}</span>`
            }
        </div>
    `;
}

// Funzioni principali
function showSection(section) {
    currentSection = section;
    const content = document.getElementById('content');
    content.innerHTML = '';

    document.querySelectorAll('.nav-btn').forEach(btn => {
        const isActive = btn.dataset.section === section;
        btn.classList.toggle('active', isActive);
    });

    data[currentLanguage][section].forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = generateCardContent(item, section);
        content.appendChild(card);
    });
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'it' ? 'en' : 'it';
    showSection(currentSection);
}

// Inizializzazione e gestione eventi
document.addEventListener('DOMContentLoaded', () => {
    // Gestione click sui pulsanti di navigazione
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            showSection(section);
        });
    });

    // Gestione cambio lingua
    document.querySelector('.language-switch').addEventListener('click', toggleLanguage);

    // Caricamento iniziale
    showSection('aperture');

    // Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});
