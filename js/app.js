// data.js v- Contiene tutti i dati e le configurazioni dell'app

// Dati principali dell'applicazione
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

// Configurazione delle barre segmentate
const segmentConfigs = {
    aperture: {
        values: ['1.8', '2.8', '4', '5.6', '8'],
        states: {
            '1.8': 'warning',    // utilizzabile in casi estremi
            '2.8': 'warning',    // utilizzabile
            '4': 'optimal',      // valore ottimale
            '5.6': 'warning',    // utilizzabile
            '8': 'inactive'      // da evitare se possibile
        }
    },
    iso: {
        values: ['100', '200', '400', '800', '1600'],
        states: {
            '100': 'inactive',   // troppo basso per uso generale
            '200': 'warning',    // utilizzabile
            '400': 'optimal',    // valore ottimale
            '800': 'warning',    // utilizzabile con cautela
            '1600': 'inactive'   // da evitare
        }
    },
    shutter: {
        values: ['1/2000', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15'],
        states: {
            '1/2000': 'inactive',  // raramente necessario
            '1/1000': 'warning',   // sport/azione
            '1/500': 'warning',    // movimento veloce
            '1/250': 'optimal',    // uso generale
            '1/125': 'optimal',    // uso generale
            '1/60': 'warning',     // limite inferiore sicuro
            '1/30': 'inactive',    // rischio mosso
            '1/15': 'inactive'     // necessita supporto
        }
    }
};

// Esportiamo i dati per l'uso negli altri moduli
export { data, segmentConfigs };
