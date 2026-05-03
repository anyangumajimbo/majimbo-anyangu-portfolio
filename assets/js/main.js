document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme-preference');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', function () {
            const isDark = themeToggle.checked;
            body.classList.toggle('dark-theme', isDark);
            localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navToggle && navToggle.checked) {
                navToggle.checked = false;
            }
        });
    });
});

// Navbar color change on scroll to bright section
const navbarWrapper = document.querySelector('.navbar-wrapper');
const aboutSection = document.querySelector('#about');
const ctaSection = document.querySelector('.cta-section');

if (navbarWrapper) {
    window.addEventListener('scroll', function() {
        let shouldBeBright = false;
        
        if (aboutSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            if (aboutRect.top <= 100) {
                shouldBeBright = true;
            }
        }
        
        if (ctaSection) {
            const ctaRect = ctaSection.getBoundingClientRect();
            if (ctaRect.top <= 100) {
                shouldBeBright = true;
            }
        }
        
        if (shouldBeBright) {
            navbarWrapper.classList.add('navbar-bright-section');
        } else {
            navbarWrapper.classList.remove('navbar-bright-section');
        }
    });
}

// Language Switcher
(function() {
    const langData = {
        en: { flag: 'https://flagcdn.com/w40/gb.png', label: 'EN' },
        fr: { flag: 'https://flagcdn.com/w40/fr.png', label: 'FR' }
    };

    let currentLanguage = localStorage.getItem('language-preference') || 'en';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        setLanguage(currentLanguage);

        const toggleBtn = document.getElementById('lang-toggle-btn');
        const switcher = document.getElementById('language-switcher');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                switcher.classList.toggle('open');
            });
        }

        document.querySelectorAll('.lang-option').forEach(function(btn) {
            btn.addEventListener('click', function() {
                setLanguage(btn.getAttribute('data-lang'));
                switcher.classList.remove('open');
            });
        });

        document.addEventListener('click', function(e) {
            if (switcher && !switcher.contains(e.target)) {
                switcher.classList.remove('open');
            }
        });
    }

    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language-preference', lang);
        updateAllTranslations(lang);
        updateSwitcherUI();
        document.documentElement.lang = lang;
    }

    function updateAllTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(function(element) {
            const key = element.getAttribute('data-i18n');
            if (translations && translations[lang] && translations[lang][key]) {
                const text = translations[lang][key];
                if (element.getAttribute('data-html') === 'true') {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    function updateSwitcherUI() {
        const flagEl = document.getElementById('lang-current-flag');
        const labelEl = document.getElementById('lang-current-label');
        if (flagEl) flagEl.src = langData[currentLanguage].flag;
        if (labelEl) labelEl.textContent = langData[currentLanguage].label;

        document.querySelectorAll('.lang-option').forEach(function(btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLanguage);
        });
    }

    window.getCurrentLanguage = function() {
        return currentLanguage;
    };
})()
