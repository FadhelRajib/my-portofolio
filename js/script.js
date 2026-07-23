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
    
// ---------- Project Gallery Lightbox ----------
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxCounter = document.getElementById('lightboxCounter');
        const closeBtn = document.getElementById('lightboxClose');
        const prevBtn = document.getElementById('lightboxPrev');
        const nextBtn = document.getElementById('lightboxNext');

        let currentImages = [];
        let currentIndex = 0;

        const showImage = (i) => {
            currentIndex = (i + currentImages.length) % currentImages.length;
            const target = currentImages[currentIndex];
            lightboxImg.src = target.src;
            lightboxImg.alt = target.alt;
            lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
            prevBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
            nextBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
        };

        const openLightbox = (images, startIndex) => {
            currentImages = images;
            lightbox.hidden = false;
            document.body.style.overflow = 'hidden';
            showImage(startIndex);
        };

        const closeLightbox = () => {
            lightbox.hidden = true;
            document.body.style.overflow = '';
        };

        document.querySelectorAll('.project-gallery-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-gallery-target');
                const galleryEl = document.getElementById(targetId);
                if (!galleryEl) return;
                const images = Array.from(galleryEl.querySelectorAll('img'));
                if (!images.length) return;
                openLightbox(images, 0);
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
        nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.hidden) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        });
    }
    
});