(function () {
    'use strict';

    const translations = {
        RU: {
            ogTitle: 'chilloweak | Мои ссылки',
            ogDescription: 'Добро пожаловать в мой мир.',
            ogLocale: 'ru_RU',
            pageTitle: 'chilloweak | Мои ссылки',
        },
        ENG: {
            ogTitle: 'chilloweak | My links',
            ogDescription: 'Welcome to my world.',
            ogLocale: 'en_US',
            pageTitle: 'chilloweak | My links',
        },
    };

    const switcher        = document.getElementById('languageSwitcher');
    const selectedDisplay = document.getElementById('selectedLang');
    const dropdownItems   = document.querySelectorAll('.lang-switcher__dropdown li');

    function setLanguage(lang) {
        selectedDisplay.textContent = lang;
        dropdownItems.forEach(item => {
            item.classList.toggle('active', item.dataset.lang === lang);
        });

        document.documentElement.lang = lang.toLowerCase();

        const dict = translations[lang];
        if (dict) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (dict[key] !== undefined) el.textContent = dict[key];
            });

            const titleEl = document.querySelector('title[data-i18n-title]');
            if (titleEl) {
                const key = titleEl.dataset.i18nTitle;
                if (dict[key] !== undefined) document.title = dict[key];
            }

            const ogTitle = document.getElementById('ogTitle');
            if (ogTitle) ogTitle.setAttribute('content', dict.ogTitle);

            const ogDescription = document.getElementById('ogDescription');
            if (ogDescription) ogDescription.setAttribute('content', dict.ogDescription);

            const ogLocale = document.getElementById('ogLocale');
            if (ogLocale) ogLocale.setAttribute('content', dict.ogLocale);
        }

        localStorage.setItem('lang', lang);
    }

    function openDropdown() {
        switcher.classList.add('open');
        selectedDisplay.setAttribute('aria-expanded', 'true');
    }
    function closeDropdown() {
        switcher.classList.remove('open');
        selectedDisplay.setAttribute('aria-expanded', 'false');
    }
    function toggleDropdown() {
        switcher.classList.contains('open') ? closeDropdown() : openDropdown();
    }


    selectedDisplay.addEventListener('click', e => {
        e.stopPropagation();
        toggleDropdown();
    });

    selectedDisplay.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown(); }
        else if (e.key === 'Escape') closeDropdown();
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', e => {
            e.stopPropagation();
            setLanguage(item.dataset.lang);
            closeDropdown();
            selectedDisplay.focus();
        });
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); }
        });
    });

    document.addEventListener('click', e => {
        if (!switcher.contains(e.target)) closeDropdown();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeDropdown();
    });


    const saved = localStorage.getItem('lang');
    if (saved) {
        setLanguage(saved);
    } else {
        const browserLang = (navigator.language || '').split('-')[0].toLowerCase();
        const detected = (browserLang === 'ru') ? 'RU' : 'ENG';
        setLanguage(detected);
    }

})();