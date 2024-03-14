async function renderApps() {
    try {
        const response = await fetch('apps.json');
        const appsData = await response.json();

        const appContainer = document.querySelector('.app-container');
        const searchInput = document.getElementById('appssearch');

        function filterApps(searchTerm) {
            const filteredApps = appsData.filter(app => {
                return app.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
            renderFilters(filteredApps);
        }

        function renderFilters(apps) {
            appContainer.innerHTML = '';

            apps.forEach(app => {
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
        }

        renderFilters(appsData);

        searchInput.addEventListener('input', function(event) {
            const searchTerm = event.target.value;
            filterApps(searchTerm);
        });

    } catch (error) {
        console.error('Error fetching apps:', error);
    }
}

renderApps();
