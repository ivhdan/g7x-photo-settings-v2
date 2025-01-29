// data.js

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
        // ... english data remains the same
    }
};

// Configurazione dei segmenti con la nuova logica
const segmentConfigs = {
    aperture: {
        values: ['1.8', '2.8', '4', '5.6', '8'],
        states: {
            '1.8': 'warning',    // utilizzabile ma estremo
            '2.8': 'warning',    // utilizzabile
            '4': 'optimal',      // valore ottimale
            '5.6': 'warning',    // utilizzabile
            '8': 'inactive'      // da evitare
        }
    },
    iso: {
        values: ['100', '200', '400', '800', '1600'],
        states: {
            '100': 'inactive',   // troppo basso
            '200': 'warning',    // utilizzabile
            '400': 'optimal',    // valore ottimale
            '800': 'warning',    // utilizzabile ma rumoroso
            '1600': 'inactive'   // da evitare
        }
    },
    shutter: {
        values: ['1/2000', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15'],
        states: {
            '1/2000': 'inactive',  // troppo veloce
            '1/1000': 'warning',   // utilizzabile per sport
            '1/500': 'warning',    // utilizzabile azione
            '1/250': 'optimal',    // valore ottimale
            '1/125': 'optimal',    // valore ottimale
            '1/60': 'warning',     // utilizzabile con attenzione
            '1/30': 'inactive',    // rischio mosso
            '1/15': 'inactive'     // richiede treppiede
        }
    }
};

export { data, segmentConfigs };
