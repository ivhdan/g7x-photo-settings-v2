// data.js
const segmentConfigs = {
    shutter: {
        values: ['1/2k', '1/1k', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15'],
        states: {
            '1/2k': 'inactive',    // Raramente necessario
            '1/1k': 'warning',     // Sport/azione
            '1/500': 'warning',    // Movimento veloce
            '1/250': 'optimal',    // Uso generale
            '1/125': 'optimal',    // Uso generale
            '1/60': 'warning',     // Limite inferiore sicuro
            '1/30': 'inactive',    // Rischio mosso
            '1/15': 'inactive'     // Richiede treppiede
        }
    },
    aperture: {
        values: ['1.8', '2.8', '4', '5.6', '8'],
        states: {
            '1.8': 'warning',      // Minima profondità
            '2.8': 'optimal',      // Ritratti
            '4': 'optimal',        // Uso generale
            '5.6': 'warning',      // Paesaggi
            '8': 'inactive'        // Solo con treppiede
        }
    }
};

const data = {
    it: {
        aperture: [
            {
                value: 'f/1.8',
                conditions: 'Poca luce, effetto bokeh',
                iso: {
                    values: ['100', '200', '400', '800', '1600'],
                    states: {
                        '100': 'inactive',  // Troppo basso per poca luce
                        '200': 'inactive',  // Troppo basso
                        '400': 'warning',   // Minimo utilizzabile
                        '800': 'optimal',   // Ideale per poca luce
                        '1600': 'warning'   // Se necessario
                    }
                },
                shutter: {
                    values: ['1/2k', '1/1k', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15'],
                    states: {
                        '1/2k': 'inactive',
                        '1/1k': 'inactive',
                        '1/500': 'inactive',
                        '1/250': 'warning',
                        '1/125': 'warning',
                        '1/60': 'optimal',  // Con stabilizzazione
                        '1/30': 'warning',  // Rischio mosso
                        '1/15': 'inactive'
                    }
                }
            },
            {
                value: 'f/2.8-4',
                conditions: 'Uso generale, ritratti',
                iso: {
                    values: ['100', '200', '400', '800', '1600'],
                    states: {
                        '100': 'optimal',   // Massima qualità
                        '200': 'optimal',   // Ottimo bilanciamento
                        '400': 'warning',   // Accettabile
                        '800': 'warning',   // Se necessario
                        '1600': 'inactive'  // Da evitare
                    }
                },
                shutter: {
                    values: ['1/2k', '1/1k', '1/500', '1/250', '1/125', '1/60', '1/30', '1/15'],
                    states: {
                        '1/2k': 'inactive',
                        '1/1k': 'warning',
                        '1/500': 'optimal',
                        '1/250': 'optimal',
                        '1/125': 'warning',
                        '1/60': 'inactive',
                        '1/30': 'inactive',
                        '1/15': 'inactive'
                    }
                }
            }
            // Continuo con gli altri scenari?
        ]
    }
};

export { data, segmentConfigs };
