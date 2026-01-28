document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');
    const slides = document.querySelectorAll('.gallery-slide');
    const counter = document.querySelector('.gallery-counter');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const prevBtn = document.querySelector('.gallery-nav.prev');

    if (menuToggle && mainNav) {
        // Abrir menú
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            menuToggle.classList.add('hidden-icon');
            header.classList.add('menu-open');
        });

        // Cerrar menú con el icono de abajo
        menuClose?.addEventListener('click', () => {
            mainNav.classList.remove('is-active');
            menuToggle.classList.remove('hidden-icon');
            header.classList.remove('menu-open');
        });

        // Cerrar menú si se hace clic en un enlace
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-active');
                menuToggle.classList.remove('hidden-icon');
                header.classList.remove('menu-open');
            });
        });
    }
    
    if (slides.length > 0) {
        let currentIndex = 0;

        const updateGallery = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            if (counter) {
                counter.textContent = `${index + 1} / ${slides.length}`;
            }
        };

        nextBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateGallery(currentIndex);
        });

        prevBtn?.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateGallery(currentIndex);
        });

        // Soporte para flechas del teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === "ArrowRight") nextBtn?.click();
            if (e.key === "ArrowLeft") prevBtn?.click();
        });
    }
});