const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

async function handleSubmit(event) {
  event.preventDefault();
  try {
    await registerServiceWorker;
    const url = search(address.value, searchEngine.value);
    location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
}

async function openURL(link) {
  try {
    await registerServiceWorker;
    const url = search(link, "https://www.google.com/search?q=%s");
    location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
}

const registerServiceWorker = registerSW().catch((err) => {
  error.textContent = "Failed to register service worker.";
  errorCode.textContent = err.toString();
  throw err;
});

form.addEventListener("submit", handleSubmit);


if ('serviceWorker' in navigator) {
  var proxySetting = localStorage.getItem('proxy') || 'uv';
  let swConfig = {
    'uv': { file: '/uv.js', config: __uv$config },
    'dynamic': { file: '/dyn.js', config: __dynamic$config }
  };

  let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

  navigator.serviceWorker.register(swFile, { scope: swConfigSettings.prefix })
    .then((registration) => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        let encodedUrl = swConfigSettings.prefix + crypts.encode(search(address.value));;
        location.href = encodedUrl;
      });
    })
    .catch((error) => {
      console.error('ServiceWorker registration failed:', error);
    });
}
