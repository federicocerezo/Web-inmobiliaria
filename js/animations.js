(function () {

    /* ── 1. Fade-in scroll ── */
    const fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(
        'h1, h2, h3, h4, p, .kpi-item, .value-item, .project-card, .pm-card, .manifesto-text, .btn, .section-header, .footer-col'
    ).forEach(function (el) {
        // No animar elementos dentro del hero ni el header
        if (el.closest('.hero') || el.closest('.site-header') || el.closest('.cookie-banner')) return;
        el.classList.add('fade-up');
        fadeObserver.observe(el);
    });


    /* ── 2. Transición entre páginas ── */
    var overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);

    // Fade de entrada (la página aparece)
    window.addEventListener('pageshow', function () {
        overlay.classList.remove('is-entering');
    });

    // Fade de salida al hacer clic en links internos
    document.addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (!link) return;
        var href = link.getAttribute('href');
        if (!href) return;

        // Solo links internos, sin anclas ni externos
        var isInternal = !link.target &&
                         !href.startsWith('http') &&
                         !href.startsWith('mailto') &&
                         !href.startsWith('#');

        if (!isInternal) return;

        e.preventDefault();
        overlay.classList.add('is-entering');

        setTimeout(function () {
            window.location.href = href;
        }, 350);
    });

})();
