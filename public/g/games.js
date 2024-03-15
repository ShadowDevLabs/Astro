(async () => {
    const response = await fetch('games.json');
    const games = await response.json();
    const container = document.querySelector('.gcontainer');
    const gamecdn = "/g/files/";

    function renderGame(game) {
        var gameUrl = gamecdn + game.root + "/" + game.file;
        const link = document.createElement('a');
        link.className = 'game';
        link.addEventListener('click', (event) => {
            localStorage.setItem('url', `${gameUrl}`);
            window.location.href = '/go';
        });

        const img = document.createElement('img');
        img.dataset.src = gamecdn + game.root + "/" + game.img;
        img.loading = 'lazy';
        img.classList.add('lazy');

        const h3 = document.createElement('h3');
        h3.textContent = game.name;

        link.appendChild(img);
        link.appendChild(h3);
        link.dataset.gameName = game.name;
        container.appendChild(link);
    }

    function loadAllGames() {
        container.innerHTML = '';
        games.forEach(renderGame);
        lazyLoadImages(); 
    }

    function searchGames(query) {
        container.innerHTML = '';
        games.forEach(game => {
            const gameMatches = game.name.toLowerCase().includes(query.toLowerCase());
            if (gameMatches) {
                renderGame(game);
            }
        });
        lazyLoadImages(); 
    }

    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('.lazy');
        const lazyImgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImgObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(image => {
            lazyImgObserver.observe(image);
        });
    }

    const searchInput = document.querySelector('#gsearch');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query === '') {
            loadAllGames();
        } else {
            searchGames(query);
        }
    });

    loadAllGames();

    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.display = 'none'; 
})().catch(error => console.error('Error fetching games:', error));
