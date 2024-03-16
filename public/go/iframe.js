const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const iframe = document.getElementById('iframe');
async function handleSubmit(event) {
  event.preventDefault();
  try {
    const url = search(address.value, searchEngine.value);
    let encodedUrl;
    const proxy = localStorage.getItem('proxy');
    if (proxy === 'ultraviolet' || proxy === null) {
      encodedUrl = window.__uv$config.prefix + window.__uv$config.encodeUrl(url);
    } else if (proxy === 'dynamic') {
      encodedUrl = __dynamic$config.prefix + "route?url=" + url;
    }
    iframe.src = encodedUrl;
  } catch (err) {
    throw err;
  }
}

async function openURL(link) {
  try {
    const url = search(link, "https://www.google.com/search?q=%s");
    let encodedUrl;
    const proxy = localStorage.getItem('proxy');
    if (proxy === 'ultraviolet' || proxy === null) {
      encodedUrl = window.__uv$config.prefix + window.__uv$config.encodeUrl(address.value);
    } else if (proxy === 'dynamic') {
      encodedUrl = __dynamic$config.prefix + "route?url=" + url;
    }
  } catch (err) {
    throw err;
  }
}


form.addEventListener("submit", handleSubmit);