const data = {
    it: {
        aperture: [
            { 
                value: 'f/1.8', 
                conditions: 'Poca luce, effetto bokeh', 
                iso: '400-800',           // Aumentato per compensare la bassa luce
                shutter: '1/60'           // Tempo più lento ma ancora gestibile a mano
            },
            { 
                value: 'f/2.8-4', 
                conditions: 'Uso generale, ritratti', 
                iso: '100-400',           // Range flessibile per uso generale
                shutter: '1/125-1/500'    // Tempi sicuri per scatti a mano
            },
            { 
                value: 'f/5.6', 
                conditions: 'Paesaggi, maggiore profondità', 
                iso: '100-200',           // ISO basso per massima qualità
                shutter: '1/60-1/250'     // Flessibile con treppiede
            },
            { 
                value: 'f/8', 
                conditions: 'Massima nitidezza, HDR', 
                iso: '100',               // ISO minimo per massima qualità
                shutter: '1/30-1/125'     // Tempi più lenti, uso treppiede consigliato
            }
        ],
        shutter: [
            { 
                value: '1/1k+',           // Modificato in formato più compatto (1k = 1000)
                conditions: 'Azione veloce, sport', 
                iso: '400-800',           // ISO alto per compensare la velocità
                aperture: 'f/1.8-4'       // Apertura ampia per raccogliere più luce
            },
            { 
                value: '1/125-1/500', 
                conditions: 'Uso generale', 
                iso: '100-400', 
                aperture: 'f/2.8-5.6' 
            },
            { 
                value: '1/60-1/125', 
                conditions: 'Soggetti statici', 
                iso: '100-200',           // ISO basso per qualità ottimale
                aperture: 'f/4-8' 
            },
            { 
                value: '<1/30', 
                conditions: 'Richiesto treppiede', 
                iso: '100',               // ISO minimo per massima qualità
                aperture: 'f/5.6-8' 
            }
        ],
        scenes: [
            { value: 'Paesaggio', settings: 'f/8, ISO 100, bracketing se necessario' },
            { value: 'Street', settings: 'f/5.6, ISO 200-400, 1/125s' },
            { value: 'Poca Luce', settings: 'f/1.8, ISO 800, 1/60s' },
            { value: 'HDR', settings: 'f/8, ISO 100, ±2 stop' }
        ]
    },
    // ... la sezione 'en' deve essere aggiornata allo stesso modo
};

// Configurazione dei segmenti aggiornata per riflettere i valori reali
const segmentConfigs = {
    aperture: {
        values: ['1.8', '2.8', '4', '5.6', '8'],
        states: {
            '1.8': 'warning',    // Utilizzabile in poca luce
            '2.8': 'optimal',    // Ottimale per uso generale
            '4': 'optimal',      // Ottimale per uso generale
            '5.6': 'warning',    // Buono per paesaggi
            '8': 'warning'       // Solo per massima profondità di campo
        }
    },
    iso: {
        values: ['100', '200', '400', '800', '1600'],
        states: {
            '100': 'optimal',    // Ottimale per massima qualità
            '200': 'optimal',    // Ottimale per uso generale
            '400': 'warning',    // Utilizzabile quando necessario
            '800': 'warning',    // Solo per poca luce
            '1600': 'inactive'   // Da evitare se possibile
        }
    },
    shutter: {
        values: ['1/2k', '1/1k', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15'],
        states: {
            '1/2k': 'inactive',   // Raramente necessario
            '1/1k': 'warning',    // Sport/azione
            '1/500': 'warning',   // Movimento veloce
            '1/250': 'optimal',   // Uso generale
            '1/125': 'optimal',   // Uso generale
            '1/60': 'warning',    // Limite inferiore a mano
            '1/30': 'inactive',   // Necessita stabilizzazione
            '1/15': 'inactive'    // Necessita treppiede
        }
    }
};

export { data, segmentConfigs };
