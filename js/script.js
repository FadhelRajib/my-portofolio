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

    // ---------- Scroll Reveal Animation ----------
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
        // delay bertahap untuk elemen dalam grid/list yang sama (efek stagger halus)
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    });

    if ('IntersectionObserver' in window && revealEls.length) {
        const revealObserver = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        obs.unobserve(entry.target); // animasi cukup sekali
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
        );

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        // fallback browser lama: langsung tampilkan
        revealEls.forEach((el) => el.classList.add('in-view'));
    }
});