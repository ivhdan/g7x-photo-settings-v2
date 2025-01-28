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

function getApertureProgress(value) {
    const number = parseFloat(value.replace('f/', '').split('-')[0]);
    return Math.max(0, Math.min(100, (8 - number) / (8 - 1.8) * 100));
}

function getISOProgress(value) {
    const number = parseInt(value.split('-')[0]);
    return Math.max(0, Math.min(100, (number - 100) / (800 - 100) * 100));
}

// Funzioni di generazione HTML
function generateApertureSegments(value) {
    const segments = getApertureSegments(value)
        .map((className, i) => `<div class="segment ${className}"></div>`)
        .join('');
        
    return `
        <div class="segments-container">
            ${segments}
        </div>
        <div class="aperture-labels">
            <span>f/1.8</span>
            <span>f/2.8</span>
            <span>f/4</span>
            <span>f/5.6</span>
            <span>f/8</span>
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
function generateISOProgress(iso) {
    return `
        <div class="progress-container">
            <div class="progress-label">
                <span>ISO 100</span>
                <span class="value-label">ISO ${iso}</span>
                <span>ISO 800</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${getISOProgress(iso)}%"></div>
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

    const apertureVisual = section === 'aperture' 
        ? generateApertureSegments(item.value)
        : generateApertureProgress(item.aperture || item.value);

    return `
        <h2>${item.value}</h2>
        <p>${item.conditions}</p>
        <div class="details">
            ${apertureVisual}
            ${generateISOProgress(item.iso)}
            <span>${item.shutter ? 'Tempo: '+item.shutter : 'Diaframma: '+item.aperture}</span>
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
