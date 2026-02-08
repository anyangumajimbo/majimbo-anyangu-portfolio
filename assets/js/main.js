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
    let currentLanguage = localStorage.getItem('language-preference') || 'en';
    
    // Initialize language on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLanguage);
    } else {
        initializeLanguage();
    }
    
    function initializeLanguage() {
        setLanguage(currentLanguage);
        updateLanguageSwitcher();
    }
    
    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language-preference', lang);
        updateAllTranslations(lang);
        updateLanguageSwitcher();
        document.documentElement.lang = lang;
    }
    
    function updateAllTranslations(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations && translations[lang] && translations[lang][key]) {
                const text = translations[lang][key];
                // Check if element contains HTML
                if (element.getAttribute('data-html') === 'true') {
                    element.innerHTML = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }
    
    function updateLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === currentLanguage) {
                btn.classList.add('active');
            }
        });
    }
    
    // Attach to window for global access
    window.changeLanguage = function(lang) {
        setLanguage(lang);
    };
    
    window.getCurrentLanguage = function() {
        return currentLanguage;
    };
})()
