const storedUrl = localStorage.getItem('url');

if (storedUrl) {
    const iframe = document.getElementById('iframe');
    iframe.src = storedUrl;
}