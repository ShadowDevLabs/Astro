// Proxy switcher
const switcherDropdown = document.getElementById('switcherDropdown');
if (switcherDropdown) switcherDropdown.addEventListener('change', () => localStorage.setItem('proxy', switcherDropdown.value));

const proxy = localStorage.getItem('proxy') || localStorage.getItem('prxy');
if (proxy) switcherDropdown.value = proxy;

// Search Engine
const searchEngineDropdown = document.getElementById('searchEngineDropdown');
if (searchEngineDropdown) searchEngineDropdown.addEventListener('change', () => localStorage.setItem('searchEngine', searchEngineDropdown.value));

const searchEngine = localStorage.getItem('searchEngine');
if (searchEngine) searchEngineDropdown.value = searchEngine;

const abtblank = () => {
    const url = location.href;
    const width = window.innerWidth;
    const height = window.innerHeight;

    let inFrame;

    try {
        inFrame = window !== top;
    } catch {
        inFrame = true;
    }

    if (!inFrame && !navigator.userAgent.includes('Firefox')) {
        const popup = window.open('about:blank', name, `width=${width},height=${height}`);

        if (!popup || popup.closed) alert('Allow popups and redirects to hide this from showing up in your history.');
        else {
            const doc = popup.document;
            const iframe = doc.createElement('iframe');
            const style = iframe.style;
            const link = doc.createElement('link');

            iframe.src = url;
            style.position = 'fixed';
            style.top = style.bottom = style.left = style.right = 0;
            style.border = style.outline = 'none';
            style.width = style.height = '100%';

            doc.head.appendChild(link);
            doc.body.appendChild(iframe);
            window.location.replace('https://google.com');
        }
    }
}

