const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");

class crypts {
  static encode(str) {
    return encodeURIComponent(
      str
        .toString()
        .split("")
        .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
        .join("")
    );
  }

  static decode(str) {
    if (str.charAt(str.length - 1) === "/") {
      str = str.slice(0, -1);
    }
    return decodeURIComponent(
      str
        .split("")
        .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char))
        .join("")
    );
  }
}

if ('serviceWorker' in navigator) {
  var proxySetting = localStorage.getItem('proxy') || 'uv';
  let swConfig = {
    'uv': { file: '/uv/sw.js', config: __uv$config },
    'dynamic': { file: '/dynamic/sw.js', config: __dynamic$config }
  };

  let { file: swFile, config: swConfigSettings } = swConfig[proxySetting];

  navigator.serviceWorker.register(swFile, { scope: swConfigSettings.prefix })
}

async function handleSubmit(event) {
  event.preventDefault();
  try {
    let encodedUrl = swConfigSettings.prefix + crypts.encode(search(address.value, searchEngine.value));;
    location.href = encodedUrl;
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
}

async function openURL(link) {
  try {
    let encodedUrl = swConfigSettings.prefix + crypts.encode(search(link, "https://www.google.com/search?q=%s"));;
    location.href = encodedUrl;
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
}