(async () => {
    const response = await fetch('/assets/JSON/g.json');
    const gs = await response.json();
    const container = document.querySelector('.gcontainer');
    const gcdn = '/g/files/';

    function renderg(g) {
        var gUrl = gcdn + g.root + '/' + g.file;
        const link = document.createElement('a');
        link.className = 'g';
        link.addEventListener('click', (event) => {
            localStorage.setItem('url', `${gUrl}`);
            window.location.href = '/go';
        });

        const img = document.createElement('img');
        img.dataset.src = gcdn + g.root + '/' + g.img;
        img.loading = 'lazy';
        img.classList.add('lazy');

        const h3 = document.createElement('h3');
        h3.textContent = g.name;

        link.appendChild(img);
        link.appendChild(h3);
        link.dataset.gName = g.name;
        container.appendChild(link);
    }

    function loadAllgs() {
        container.innerHTML = '';
        gs.forEach(renderg);
        lazyLoadImages(); 
    }

    function searchgs(query) {
        container.innerHTML = '';
        gs.forEach(g => {
            const gMatches = g.name.toLowerCase().includes(query.toLowerCase());
            if (gMatches) {
                renderg(g);
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
            loadAllgs();
        } else {
            searchgs(query);
        }
    });

    loadAllgs();
})().catch(error => console.error('Error fetching gs:', error));