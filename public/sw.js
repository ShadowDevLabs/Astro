importScripts('/dynamic/dynamic.config.js');
importScripts('/dynamic/dynamic.worker.js');

importScripts("/uv/uv.bundle.js"); // import our uv scripts
importScripts("/uv/uv.config.js");
importScripts(__uv$config.sw || "/uv/uv.sw.js");

const uv = new UVServiceWorker(); // init uv sw
const dynamic = new Dynamic();

self.dynamic = dynamic;

self.addEventListener('fetch',
    event => {
        event.respondWith(
            (async function() {
                if (await dynamic.route(event)) {
                    return await dynamic.fetch(event);
                }

                return await fetch(event.request);
            })()
        );
    }
);