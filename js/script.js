document.addEventListener('DOMContentLoaded', () => {

    // Tahun otomatis di footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Toggle menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
        });

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Scrollspy: highlight menu sesuai section yang sedang dilihat
    const sections = document.querySelectorAll('main .section, header.hero');
    const navLinks = document.querySelectorAll('.nav-link');

    const setActive = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    };

    if ('IntersectionObserver' in window && sections.length) {
        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
        );

        sections.forEach((section) => spyObserver.observe(section));
    }

    // ---------- Scroll Reveal Animation (berulang tiap kali discroll) ----------
    const revealSelectors = [
        '.section-title',
        '.section-subtitle',
        '.about-text',
        '.about-photo',
        '.skill-card',
        '.commit',
        '.project-card',
        '.cert-card',
        '.env-card',
        '.contact-intro'
    ];

    const revealEls = document.querySelectorAll(revealSelectors.join(','));

    revealEls.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    });

    if ('IntersectionObserver' in window && revealEls.length) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle('in-view', entry.isIntersecting);
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        );

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('in-view'));
    }
});