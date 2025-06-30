const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

tailwind.config = {
    theme: {
        extend: {
            colors: {
                'audio-purple': '#8B5CF6',
                'audio-blue': '#081c37',
            }
        }
    }
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');
const menuLinks = mobileMenu.querySelectorAll('a');

// Fonction pour ouvrir le menu
function openMenu() {
    mobileMenu.classList.add('active');
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Empêche le scroll
}

// Fonction pour fermer le menu
function closeMenu() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = ''; // Restaure le scroll
}

// Event listeners
mobileMenuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Fermer le menu en cliquant sur l'overlay
menuOverlay.addEventListener('click', closeMenu);

// Fermer le menu quand on clique sur un lien
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Fermer le menu avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu();
    }
});

// Fermer le menu si on redimensionne vers desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
        closeMenu();
    }
});