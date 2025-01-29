// app.js

import { data } from './data.js';
import { generateCardContent } from './generators.js';

let currentLanguage = 'it';
let currentSection = 'aperture';

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
