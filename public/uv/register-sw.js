"use strict";

async function registerSW() {
  const stockSW = "/uv/sw.js";
  const isServiceWorkerSupported = 'serviceWorker' in navigator;
  
  function isLocalhost() {
    return /^(localhost|127\.0\.0\.1|192\.168\.)$/.test(location.hostname);
  }

  if (!isServiceWorkerSupported) {
    throw new Error("Your browser doesn't support service workers.");
  }

  if (location.protocol === "https:" || isLocalhost()) {
    return navigator.serviceWorker.register(stockSW, {
      scope: __uv$config.prefix,
    });
  } else {
    throw new Error("Service workers cannot be registered without HTTPS.");
  }
}

registerSW();
