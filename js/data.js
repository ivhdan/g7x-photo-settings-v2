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

// Configurazione dei segmenti
const segmentConfigs = {
    shutter: {
        values: ['1/2000', '1/1000', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15'],
        states: {
            '1/2000': 'inactive',
            '1/1000': 'warning',
            '1/500': 'warning',
            '1/250': 'optimal',
            '1/125': 'optimal',
            '1/60': 'warning',
            '1/30': 'warning',
            '1/15': 'inactive'
        }
    },
    aperture: {
        values: ['1.8', '2.8', '4', '5.6', '8'],
        states: {
            '1.8': 'warning',
            '2.8': 'warning',
            '4': 'optimal',
            '5.6': 'warning',
            '8': 'warning'
        }
    },
    iso: {
        values: ['100', '200', '400', '800', '1600'],
        states: {
            '100': 'warning',
            '200': 'optimal',
            '400': 'optimal',
            '800': 'warning',
            '1600': 'inactive'
        }
    }
};
export { data, segmentConfigs };
