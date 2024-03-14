// Fetch games
fetch('games.json')
    .then(response => response.json())
    .then(games => {
        games.sort((a, b) => a.name.localeCompare(b.name));

        const container = document.querySelector('.gcontainer');
        const gamecdn = "https://glcdn.githack.com/kaioxdev/legacy-assets/-/raw/main/";

        function renderGames(query) {
            container.innerHTML = '';
            games.forEach(game => {
                if (game.name.toLowerCase().includes(query.toLowerCase())) {
                    const link = document.createElement('a');
                    link.className = 'game';
                    link.href = gamecdn + game.root + "/" + game.file;
                    const img = document.createElement('img');
                    img.src = gamecdn + game.root + "/" + game.img;

                    const h3 = document.createElement('h3');
                    h3.textContent = game.name;

                    link.addEventListener('click', () => {
                        localStorage.setItem('game', JSON.stringify(game));
                    });

                    link.appendChild(img);
                    link.appendChild(h3);

                    container.appendChild(link);
                }
            });
        }

        renderGames('');

        const searchInput = document.querySelector('#gsearch');
        searchInput.addEventListener('input', () => {
            renderGames(searchInput.value);
        });
    })
    .catch(error => console.error('Error:', error));
