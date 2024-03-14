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
