(async () => {
    const response = await fetch('games.json');
    const games = await response.json();
    const container = document.querySelector('.gcontainer');
    const gamecdn = "https://assets.3kh0.net/";

    function renderGame(game) {
        const gameUrl = gamecdn + game.root + "/" + game.file;
        const link = document.createElement('a');
        link.className = 'game';
        link.href = gameUrl;

        const img = document.createElement('img');
        img.dataset.src = gamecdn + game.root + "/" + game.img;
        img.loading = 'lazy';
        img.classList.add('lazy');

        const h3 = document.createElement('h3');
        h3.textContent = game.name;

        link.appendChild(img);
        link.appendChild(h3);
        container.appendChild(link);
    }

    function renderGames(query) {
        container.innerHTML = '';
        games.forEach(game => {
            if (game.name.toLowerCase().includes(query.toLowerCase())) {
                renderGame(game);
            }
        });
    }

    const searchInput = document.querySelector('#gsearch');
    searchInput.addEventListener('input', () => {
        renderGames(searchInput.value);
    });

    renderGames('');

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

    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.display = 'none'; 
})().catch(error => console.error('Error fetching games:', error));
