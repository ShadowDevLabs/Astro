const uvSearchEngine = document.getElementById('uv-search-engine');
const errorCode = document.getElementById('uv-error-code');
const address = document.getElementById('uv-address');
const error = document.getElementById('uv-error');
const iframe = document.getElementById('iframe');
const form = document.getElementById('uv-form');

const handleSubmit = (e) => {
    e.preventDefault();

    try {
        const proxy = localStorage.getItem('proxy') || localStorage.getItem('prxy');
        const url = search(address.value, uvSearchEngine.value);
        let encodedUrl;

        if (proxy === 'ultraviolet' || proxy === null) encodedUrl = window.__uv$config.prefix + window.__uv$config.encodeUrl(url);
        else if (proxy === 'dynamic') encodedUrl = __dynamic$config.prefix + window.__uv$config.encodeUrl(url);

        localStorage.setItem('url', encodedUrl);
        location.href = '/go';
    } catch (e) {
        error.textContent = 'Failed to register service worker.';
        errorCode.textContent = e;

        throw e;
    }
}

const openURL = async (link) => {
    try {
        const proxy = localStorage.getItem('proxy') || localStorage.getItem('prxy');
        const url = search(link, 'https://www.google.com/search?q=%s');
        let encodedUrl;

        if (proxy === 'ultraviolet' || proxy === null) encodedUrl = window.__uv$config.prefix + window.__uv$config.encodeUrl(url);
        else if (proxy === 'dynamic') encodedUrl = __dynamic$config.prefix + window.__uv$config.encodeUrl(url);

        localStorage.setItem('url', encodedUrl);
        location.href = '/go';
    } catch (e) {
        error.textContent = 'Failed to register service worker.';
        errorCode.textContent = e;

        throw e;
    }
}

/**
 * Encode a url or search query
 * @param {string} input
 * @param {string} template Template for a search query.
 * @returns {string} 
 */
const search = (input, template) => {
    let url;
  
    try {
      url = new URL(input);

      if (url.hostname.includes('.')) return url.toString();
    } catch { }
  
    try {
      url = new URL(`http://${input}`);

      if (url.hostname.includes('.')) return url.toString();
    } catch { }
  
    // Treat the input as a search query
    return template.replace('%s', encodeURIComponent(input));
  }

if (form) form.addEventListener('submit', handleSubmit);