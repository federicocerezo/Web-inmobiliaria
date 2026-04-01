document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL MENÚ ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');

    function preventTouchMove(e) { e.preventDefault(); }

    function openMenu() {
        mainNav.classList.add('is-active');
        header.classList.add('menu-open');
        menuToggle.classList.add('hidden-icon');
        document.body.classList.add('menu-open-fixed');
        document.addEventListener('touchmove', preventTouchMove, { passive: false });
    }

    function closeMenu() {
        mainNav.classList.remove('is-active');
        header.classList.remove('menu-open');
        menuToggle.classList.remove('hidden-icon');
        document.body.classList.remove('menu-open-fixed');
        document.removeEventListener('touchmove', preventTouchMove);
    }

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', openMenu);
        menuClose?.addEventListener('click', closeMenu);
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
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
            e.preventDefault();
            currentIndex = (currentIndex + 1) % slides.length;
            updateGallery(currentIndex);
        });

        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateGallery(currentIndex);
        });
    });

    // --- LÓGICA DE FORMULARIOS (EMAILJS) ---
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const checkbox = form.querySelector('input[type="checkbox"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const successMessage = form.querySelector('#form-success');

        if (checkbox && submitBtn) {
            submitBtn.disabled = !checkbox.checked;
            submitBtn.style.opacity = checkbox.checked ? "1" : "0.5";

            checkbox.addEventListener('change', () => {
                submitBtn.disabled = !checkbox.checked;
                submitBtn.style.opacity = checkbox.checked ? "1" : "0.5";
            });
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (form.checkValidity()) {
                const originalText = submitBtn.innerText;
                submitBtn.innerText = "Enviando...";
                submitBtn.disabled = true;

                try {
                    // Reemplaza los IDs con los de tu cuenta de EmailJS
                    const response = await emailjs.sendForm(
                        "service_g7fxl9p",
                        "template_3yadwfc", 
                        form
                    );

                    if (response.status === 200) {
                        form.reset();
                        if (successMessage) successMessage.style.display = 'block';
                        submitBtn.innerText = originalText;

                        setTimeout(() => {
                            if (successMessage) successMessage.style.display = 'none';
                            submitBtn.disabled = !checkbox.checked;
                            submitBtn.style.opacity = checkbox.checked ? "1" : "0.5";
                        }, 5000);
                    } else {
                        throw new Error("Error en el envío");
                    }
                } catch (error) {
                    console.error("EmailJS Error:", error);
                    alert("Error al enviar el mensaje. Por favor, inténtelo de nuevo.");
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                }
            }
        });
    });
});