let tab = localStorage.getItem('tab');
const settingsDefaultTab = {
    title: 'Astro',
    icon: '/assets/icons/logo.png',
};

const setTitle = (title) => {
    if (title) document.title = title;
    else document.title = settingsDefaultTab.title;

    tab = localStorage.getItem('tab');

    if (tab) {
        try {
            var tabData = JSON.parse(tab);
        } catch {
            var tabData = {};
        }
    } else {
        var tabData = {};
    }

    if (title) {
        tabData.title = title;
    } else {
        delete tabData.title;
    }

    localStorage.setItem('tab', JSON.stringify(tabData));
}

const setFavicon = (icon) => {
    var faviconLink = document.getElementById('faviconLink');

    if (!faviconLink) {
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.id = 'faviconLink';
        document.head.appendChild(faviconLink);
    }

    faviconLink.href = icon || settingsDefaultTab.icon;

    tab = localStorage.getItem('tab');
    var tabData = {};

    if (tab) try {
        tabData = JSON.parse(tab);
    } catch {
        tabData = {};
    }

    if (icon) tabData.icon = icon;
    else delete tabData.icon;

    localStorage.setItem('tab', JSON.stringify(tabData));
}

const setCloak = () => {
    var cloak = document.getElementById('premadecloaks').value;

    switch (cloak) {
        case 'search':
            setTitle('Google Search');
            setFavicon('/assets/icons/cloaks/Google Search.ico');

            break;
        case 'drive':
            setTitle('Google Drive');
            setFavicon('/assets/icons/cloaks/Google Drive.ico');

            break;
        case 'youtube':
            setTitle('YouTube');
            setFavicon('/assets/icons/cloaks/YouTube.ico');

            break;
        case 'gmail':
            setTitle('Gmail');
            setFavicon('/assets/icons/cloaks/Gmail.ico');

            break;
        case 'calendar':
            setTitle('Google Calendar');
            setFavicon('/assets/icons/cloaks/Calendar.ico');

            break;
        case 'meets':
            setTitle('Google Meet');
            setFavicon('/assets/icons/cloaks/Meet.ico');

            break;
        case 'classroom':
            setTitle('Google Classroom');
            setFavicon('/assets/icons/cloaks/Classroom.png');

            break;
        case 'canvas':
            setTitle('Canvas');
            setFavicon('/assets/icons/cloaks/Canvas.ico');

            break;
        case 'zoom':
            setTitle('Zoom');
            setFavicon('/assets/icons/cloaks/Zoom.ico');

            break;

        case 'khan':
            setTitle('Khan Academy');
            setFavicon('/assets/icons/cloaks/Khan Academy.ico');
            break;
        
        default:
            throw 'Cloak does not exist';
    }
}

const resetTab = () => {
    setFavicon(settingsDefaultTab.icon);
    
    document.title = settingsDefaultTab.title;
    document.getElementById('title').value = '';
    document.getElementById('icon').value = '';

    localStorage.setItem('tab', JSON.stringify({}));
}

if (tab) {
    try {
        var tabData = JSON.parse(tab);
    } catch {
        var tabData = {};
    }
} else var tabData = {};

setTitle(tabData.title);

if (tabData.icon) document.getElementById('icon').value = tabData.icon;