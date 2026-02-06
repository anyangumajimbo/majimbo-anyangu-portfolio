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
