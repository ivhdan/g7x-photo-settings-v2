// app.js - File principale dell'applicazione

import { data } from './data.js';
import { generateCardContent } from './generators.js';

// Stato dell'applicazione
let currentLanguage = 'it';
let currentSection = 'aperture';

// Funzione per mostrare una sezione
function showSection(section) {
    // Aggiorna la sezione corrente
    currentSection = section;
    
    // Ottiene il contenitore e lo pulisce
    const content = document.getElementById('content');
    content.innerHTML = '';

    // Aggiorna i pulsanti di navigazione
    document.querySelectorAll('.nav-btn').forEach(btn => {
        const isActive = btn.dataset.section === section;
        btn.classList.toggle('active', isActive);
    });

    // Genera le card per la sezione
    data[currentLanguage][section].forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = generateCardContent(item, section);
        content.appendChild(card);
    });
}

// Funzione per cambiare lingua
function toggleLanguage() {
    currentLanguage = currentLanguage === 'it' ? 'en' : 'it';
    showSection(currentSection);
}

// Inizializzazione dell'applicazione
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

    // Service Worker Registration per PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    }
});
