(function () {
    const DURATION = 1800; // ms

    function animateCounter(el) {
        const target   = parseFloat(el.dataset.target);
        const prefix   = el.dataset.prefix  || '';
        const suffix   = el.dataset.suffix  || '';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const start    = performance.now();

        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(now) {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / DURATION, 1);
            const value    = target * easeOut(progress);
            el.textContent = prefix + value.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.kpi-number[data-target]').forEach(function (el) {
        observer.observe(el);
    });
})();
