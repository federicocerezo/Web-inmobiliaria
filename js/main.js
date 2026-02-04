document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL MENÚ ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');

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
    
    // --- LÓGICA DE MULTI-GALERÍAS ---
    const galleries = document.querySelectorAll('.gallery-container');

    galleries.forEach(gallery => {
        const slides = gallery.querySelectorAll('.gallery-slide');
        const counter = gallery.querySelector('.gallery-counter');
        const nextBtn = gallery.querySelector('.gallery-nav.next');
        const prevBtn = gallery.querySelector('.gallery-nav.prev');
        let currentIndex = 0;

        const updateGallery = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            if (counter) {
                counter.textContent = `${index + 1} / ${slides.length}`;
            }
        };

        nextBtn?.addEventListener('click', (e) => {
            e.preventDefault(); // Evita comportamientos no deseados en móviles
            currentIndex = (currentIndex + 1) % slides.length;
            updateGallery(currentIndex);
        });

        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateGallery(currentIndex);
        });
    });
});