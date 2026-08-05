const CACHE_NAME = 'caca-desperdicios-v1';

// Lista de arquivos e bibliotecas que precisam funcionar offline
const urlsToCache = [
    './', // Guarda a página inicial
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js',
    'https://cdn.jsdelivr.net/npm/jszip/dist/jszip.min.js',
    'https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/dist/pptxgen.bundle.js'
];

// Instalação: Baixa os arquivos na primeira vez
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptação: Tenta carregar do cache primeiro (Offline First)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se achou no cache, retorna o arquivo salvo offline
                if (response) {
                    return response;
                }
                // Se não achou, tenta baixar da internet
                return fetch(event.request);
            })
    );
});
