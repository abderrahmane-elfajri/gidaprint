(() => {
    const phoneNumber = '212786620720';

    const body = document.body;
    const nav = document.querySelector('.site-nav');
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('[data-nav-toggle]');
    const megaTriggers = document.querySelectorAll('[data-mega-trigger]');
    const whatsappButton = document.querySelector('.whatsapp-fab');
    const currentPath = window.location.pathname.replace(/\\/g, '/').split('/').pop() || 'index.html';

    const closeNavigation = () => {
        if (navMenu) navMenu.classList.remove('is-open');
        if (navToggle) navToggle.classList.remove('is-open');
        megaTriggers.forEach(trigger => trigger.classList.remove('is-open'));
        body.classList.remove('nav-open');
    };

    const openWhatsApp = (message) => {
        const text = encodeURIComponent(message || 'Bonjour GIDAPRINT, je souhaite obtenir un devis.');
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank', 'noopener');
    };

    const buildFormMessage = (form, title) => {
        const formData = new FormData(form);
        const lines = [title, ''];

        const fieldMap = [
            ['nom', 'Nom complet'],
            ['telephone', 'Téléphone'],
            ['email', 'Email'],
            ['service', 'Type de service'],
            ['quantite', 'Quantité'],
            ['format', 'Format'],
            ['message', 'Message']
        ];

        fieldMap.forEach(([name, label]) => {
            const value = formData.get(name);
            if (value) {
                lines.push(`${label}: ${value}`);
            }
        });

        const fileInput = form.querySelector('input[type="file"]');
        if (fileInput && fileInput.files && fileInput.files.length) {
            lines.push(`Fichier joint: ${fileInput.files[0].name}`);
        }

        const checked = form.querySelector('input[type="checkbox"]:checked');
        if (checked && checked.name && !lines.some(line => line.includes(checked.name))) {
            lines.push(`${checked.name}: oui`);
        }

        return lines.join('\n');
    };

    const notify = (message, kind = 'success') => {
        const toast = document.createElement('div');
        toast.className = `site-toast ${kind}`;
        toast.textContent = message;
        toast.style.cssText = [
            'position:fixed',
            'top:20px',
            'right:20px',
            'z-index:2000',
            'padding:14px 18px',
            'border-radius:16px',
            'color:#fff',
            'background:' + (kind === 'error' ? 'linear-gradient(135deg,#b93838,#f28f63)' : 'linear-gradient(135deg,#0a5ea8,#11a7c7)'),
            'box-shadow:0 16px 30px rgba(9,25,44,.18)',
            'max-width:min(420px,calc(100vw - 32px))'
        ].join(';');

        document.body.appendChild(toast);
        window.setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-8px)';
            window.setTimeout(() => toast.remove(), 220);
        }, 2600);
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.classList.toggle('is-open', isOpen);
            body.classList.toggle('nav-open', isOpen);
        });
    }

    megaTriggers.forEach(trigger => {
        trigger.addEventListener('click', event => {
            if (window.innerWidth > 860) return;
            event.preventDefault();
            const open = !trigger.classList.contains('is-open');
            megaTriggers.forEach(item => item.classList.remove('is-open'));
            trigger.classList.toggle('is-open', open);
        });
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.site-nav')) {
            closeNavigation();
        }
    });

    document.querySelectorAll('.nav-link, .mega-links a, [data-close-nav]').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 860) {
                closeNavigation();
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const targetSelector = anchor.getAttribute('href');
            if (!targetSelector || targetSelector === '#') return;
            const target = document.querySelector(targetSelector);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeNavigation();
        });
    });

    if (nav) {
        const updateNavState = () => {
            if (window.scrollY > 12) {
                nav.classList.add('is-scrolled');
            } else {
                nav.classList.remove('is-scrolled');
            }
        };

        updateNavState();
        window.addEventListener('scroll', updateNavState, { passive: true });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        const normalized = href.replace(/^\.\//, '').split('#')[0] || 'index.html';
        const anchor = href.includes('#') ? href.split('#')[1] : '';
        const matchesPage = normalized === currentPath;
        const matchesHomeAnchor = currentPath === 'index.html' && href.startsWith('#');

        if (matchesPage || matchesHomeAnchor) {
            link.classList.add('is-active');
        }

        if (currentPath === 'index.html' && anchor && document.getElementById(anchor)) {
            const section = document.getElementById(anchor);
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const activate = () => {
                const inView = window.scrollY + 160 >= sectionTop;
                if (inView) {
                    document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('is-active'));
                    link.classList.add('is-active');
                }
            };
            window.addEventListener('scroll', activate, { passive: true });
        }
    });

    document.querySelectorAll('[data-whatsapp-open]').forEach(button => {
        button.addEventListener('click', () => {
            const message = button.getAttribute('data-whatsapp-open') || 'Bonjour GIDAPRINT, je souhaite un devis rapide.';
            openWhatsApp(message);
        });
    });

    document.querySelectorAll('form[data-whatsapp-form]').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const title = form.getAttribute('data-whatsapp-title') || 'Nouvelle demande GIDAPRINT';
            const message = buildFormMessage(form, title);
            openWhatsApp(message);
            form.reset();
            notify('Votre demande a été préparée pour WhatsApp.');
        });
    });

    document.querySelectorAll('form[data-toast]').forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault();
            notify('Merci, votre message a bien été pris en compte.');
            form.reset();
        });
    });

    document.querySelectorAll('[data-copy]').forEach(button => {
        button.addEventListener('click', async () => {
            const text = button.getAttribute('data-copy') || '';
            try {
                await navigator.clipboard.writeText(text);
                notify('Coordonnée copiée dans le presse-papiers.');
            } catch (error) {
                notify('Impossible de copier automatiquement.', 'error');
            }
        });
    });

    document.querySelectorAll('.reveal-on-load').forEach((element, index) => {
        element.style.animationDelay = `${index * 90}ms`;
        element.classList.add('reveal');
    });

    if (whatsappButton) {
        whatsappButton.setAttribute('aria-label', 'Contacter GIDAPRINT sur WhatsApp');
    }

    window.openWhatsApp = openWhatsApp;
    window.scrollToSection = sectionId => {
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
})();