document.addEventListener('DOMContentLoaded', () => {
    console.log('Dilus Liebing site loaded');

    // Before/After Slider Logic
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        const beforeImage = sliderContainer.querySelector('.before');
        const handle = sliderContainer.querySelector('.slider-handle');
        const beforeImgElement = beforeImage.querySelector('img');

        // Initial setup ensuring the image inside the clipped container is full width
        const updateImageWidth = () => {
            beforeImgElement.style.width = `${sliderContainer.offsetWidth}px`;
        };

        window.addEventListener('resize', updateImageWidth);
        updateImageWidth();

        let isDragging = false;

        const moveSlider = (x) => {
            const rect = sliderContainer.getBoundingClientRect();
            let pos = x - rect.left;

            // Constrain
            if (pos < 0) pos = 0;
            if (pos > rect.width) pos = rect.width;

            beforeImage.style.width = `${pos}px`;
            handle.style.left = `${pos}px`;
        };

        sliderContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            moveSlider(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            moveSlider(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Touch support
        sliderContainer.addEventListener('touchstart', (e) => {
            isDragging = true;
            moveSlider(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            moveSlider(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    }
});
