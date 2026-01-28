document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.gallery-slide');
    const counter = document.querySelector('.gallery-counter');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    
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