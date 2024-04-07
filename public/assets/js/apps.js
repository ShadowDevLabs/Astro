const renderApps = () => fetch('/assets/JSON/apps.json')
    .then(res => res.json())
    .then(appsData => {
        const appContainer = document.querySelector('.app-container');
        const searchInput = document.getElementById('appssearch');

        const filterApps = (searchTerm) => {
            const filteredApps = appsData.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

            renderFilters(filteredApps);
        }

        const renderFilters = (apps) => {
            appContainer.innerHTML = '';

            apps.forEach(app => {
                const appLink = document.createElement('a');
                appLink.addEventListener('click', () => openURL(app.url));

                appLink.classList.add('app');

                const appImage = document.createElement('img');
                appImage.src = app.img;
                appImage.loading = 'lazy';

                const appName = document.createElement('h4');
                appName.textContent = app.name;

                appLink.appendChild(appImage);
                appLink.appendChild(appName);

                appContainer.appendChild(appLink);
            });
        }

        renderFilters(appsData);

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value;

            filterApps(searchTerm);
        });
    }).catch((e) => console.error('Error fetching apps:', e));

renderApps();