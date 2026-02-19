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

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        const checkbox = form.querySelector('input[type="checkbox"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const successMessage = form.querySelector('#form-success');

        if (checkbox && submitBtn) {
            // Bloqueo inicial del botón si el checkbox no está marcado
            submitBtn.disabled = !checkbox.checked;
            submitBtn.style.opacity = checkbox.checked ? "1" : "0.5";

            checkbox.addEventListener('change', () => {
                submitBtn.disabled = !checkbox.checked;
                submitBtn.style.opacity = checkbox.checked ? "1" : "0.5";
            });
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // Evitamos que la página se recargue

            if (form.checkValidity()) {
                // Cambiamos el estado del botón mientras se envía
                submitBtn.innerText = "Enviando...";
                submitBtn.disabled = true;

                // Recogemos los datos del formulario
                const data = new FormData(form);

                try {
                    // Realizamos la petición real a Formspree
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: data,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        // Si el envío es exitoso
                        form.reset(); // Limpia los campos
                        if (successMessage) successMessage.style.display = 'block';
                        submitBtn.innerText = "Enviar Mensaje";

                        // Ocultar el mensaje de éxito tras 5 segundos
                        setTimeout(() => {
                            if (successMessage) successMessage.style.display = 'none';
                            // Re-evaluamos el botón (estará deshabilitado porque el reset desmarca el checkbox)
                            submitBtn.disabled = !checkbox.checked;
                            submitBtn.style.opacity = checkbox.checked ? "1" : "0.5";
                        }, 5000);
                    } else {
                        // Si Formspree devuelve un error
                        alert("Error al enviar: Por favor, inténtelo de nuevo.");
                        submitBtn.disabled = false;
                        submitBtn.innerText = "Enviar Mensaje";
                    }
                } catch (error) {
                    // Error de conexión o red
                    alert("Error de conexión. Revise su internet e inténtelo de nuevo.");
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Enviar Mensaje";
                }
            }
        });
    });
    
});