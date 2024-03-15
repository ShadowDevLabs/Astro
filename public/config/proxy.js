const proxyDropdown = document.getElementById('proxyDropdown');
proxyDropdown.addEventListener('change', () => {
    localStorage.setItem('proxy', proxyDropdown.value);
});

const proxy = localStorage.getItem('proxy');
if (proxy) {
    proxyDropdown.value = proxy;
}