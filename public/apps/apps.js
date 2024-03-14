async function renderApps() {
    try {
        const response = await fetch('apps.json');
        const appsData = await response.json();

        const appContainer = document.querySelector('.app-container');

        appsData.forEach(app => {

            const appLink = document.createElement('a');
            appLink.onclick = function() {
                openURL(app.url);
                return false; 
            };
            appLink.classList.add('app');

            const appImage = document.createElement('img');
            appImage.src = app.img;

            const appName = document.createElement('h4');
            appName.textContent = app.name;

            appLink.appendChild(appImage);
            appLink.appendChild(appName);

            appContainer.appendChild(appLink);
        });
    } catch (error) {
        console.error('Error fetching apps:', error);
    }
}

renderApps();