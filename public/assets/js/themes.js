const changetheme = (theme) => {
    const root = document.documentElement;
    root.className = theme;
}

const changeTheme = () => {
    const selectedOption = document.getElementById('themeSelector').value;

    localStorage.setItem('theme', selectedOption);
    changetheme(selectedOption);
}

window.addEventListener('storage', (e) => {
    if (e.key === 'theme' && e.newValue) changetheme(newTheme);
});

const theme = localStorage.getItem('theme');
changetheme(theme);

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');

    if (theme) {
        if (document.getElementById('themeSelector')) document.getElementById('themeSelector').value = theme;
    }
});