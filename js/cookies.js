(function () {
    'use strict';

    var CONSENT_KEY = 'dilus_cookie_consent';
    var FONTS_URL   = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap';

    /* ── Consentimiento guardado ── */
    function getConsent() {
        try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
    }

    function setConsent(value) {
        try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    }

    /* ── Carga Google Fonts (Inter + Playfair Display) ── */
    function loadFonts() {
        if (document.getElementById('dilus-google-fonts')) return;
        var link = document.createElement('link');
        link.id   = 'dilus-google-fonts';
        link.rel  = 'stylesheet';
        link.href = FONTS_URL;
        document.head.appendChild(link);
    }

    /* ── Muestra / oculta el banner ── */
    function showBanner() {
        var banner = document.getElementById('cookie-banner');
        if (banner) banner.classList.remove('cookie-banner--hidden');
    }

    function hideBanner() {
        var banner = document.getElementById('cookie-banner');
        if (banner) banner.classList.add('cookie-banner--hidden');
    }

    /* ── Construye el banner en el DOM ── */
    function buildBanner() {
        var banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Aviso de cookies');
        banner.innerHTML =
            '<div class="cookie-banner__inner">' +
                '<p class="cookie-banner__text">' +
                    'Utilizamos <strong>Google Fonts</strong> para la correcta visualización del sitio. ' +
                    'Puedes aceptar o rechazar su uso. ' +
                    '<a href="politica-cookies.html">Política de cookies</a>' +
                '</p>' +
                '<div class="cookie-banner__actions">' +
                    '<button id="cookie-reject" class="cookie-btn">Rechazar</button>' +
                    '<button id="cookie-accept" class="cookie-btn cookie-btn--accept">Aceptar</button>' +
                '</div>' +
            '</div>';

        document.body.appendChild(banner);

        document.getElementById('cookie-accept').addEventListener('click', function () {
            setConsent('accepted');
            loadFonts();
            hideBanner();
        });

        document.getElementById('cookie-reject').addEventListener('click', function () {
            setConsent('rejected');
            hideBanner();
        });

        /* Link "Gestionar cookies" del footer */
        document.querySelectorAll('.cookie-reopen').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                showBanner();
            });
        });
    }

    /* ── Init ── */
    function init() {
        buildBanner();
        var consent = getConsent();

        if (consent === 'accepted') {
            loadFonts();
            hideBanner();
        } else if (consent === 'rejected') {
            hideBanner();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
