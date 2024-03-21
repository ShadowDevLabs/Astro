const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

async function handleSubmit(event) {
  event.preventDefault();
  try {
    const url = search(address.value, searchEngine.value);
    let encodedUrl;
    const proxy = localStorage.getItem('prxy');
    if (proxy === 'ultraviolet' || proxy === null) {
      encodedUrl = window.__uv$config.prefix + window.__uv$config.encodeUrl(url);
    } else if (proxy === 'dynamic') {
      encodedUrl = __dynamic$config.prefix + window.__uv$config.encodeUrl(url);
    }
    localStorage.setItem('url', encodedUrl);
    location.href="/go/"
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
}

async function openURL(link) {
  try {
    const url = search(link, "https://www.google.com/search?q=%s");
    let encodedUrl;
    const proxy = localStorage.getItem('prxy');
    if (proxy === 'ultraviolet' || proxy === null) {
      encodedUrl = window.__uv$config.prefix + window.__uv$config.encodeUrl(url);
    } else if (proxy === 'dynamic') {
      encodedUrl = __dynamic$config.prefix + "route?url=" + url;
    }
    localStorage.setItem('url', encodedUrl);
    location.href="/go/"
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
}


form.addEventListener("submit", handleSubmit);

console.log('%cAstro', "color: #037ef9; font-size: 100px; font-family: 'Poppins', sans-serif; font-weight:bold;");

