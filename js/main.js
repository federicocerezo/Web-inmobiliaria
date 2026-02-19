document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL MENÚ ---
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.site-header');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
            menuToggle.classList.add('hidden-icon');
            header.classList.add('menu-open');
        });

        menuClose?.addEventListener('click', () => {
            mainNav.classList.remove('is-active');
            menuToggle.classList.remove('hidden-icon');
            header.classList.remove('menu-open');
        });

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
    // Actualiza esta sección en tu js/main.js
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.add('is-active');
            header.classList.add('menu-open');
            document.body.classList.add('menu-open-fixed'); // Bloquea scroll
            menuToggle.classList.add('hidden-icon');
        });

        menuClose?.addEventListener('click', () => {
            mainNav.classList.remove('is-active');
            header.classList.remove('menu-open');
            document.body.classList.remove('menu-open-fixed'); // Libera scroll
            menuToggle.classList.remove('hidden-icon');
        });

        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-active');
                header.classList.remove('menu-open');
                document.body.classList.remove('menu-open-fixed');
                menuToggle.classList.remove('hidden-icon');
            });
        });
    }
});