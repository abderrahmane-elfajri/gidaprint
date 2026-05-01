// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scroll for anchor links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar Sticky Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// WhatsApp Integration
const phoneNumber = '212786620720'; // Without + sign

function openWhatsApp() {
    const message = encodeURIComponent('Bonjour GIDAPRINT, je serais intéressé par vos services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Form Submission
const devisForm = document.getElementById('devisForm');

if (devisForm) {
    devisForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(devisForm);
        const data = {
            nom: formData.get('nom'),
            telephone: formData.get('telephone'),
            email: formData.get('email'),
            service: formData.get('service'),
            quantite: formData.get('quantite'),
            format: formData.get('format'),
            message: formData.get('message')
        };
        
        // Create WhatsApp message
        const whatsappMessage = `
*Nouvelle Demande de Devis GIDAPRINT*

👤 *Nom:* ${data.nom}
📞 *Téléphone:* ${data.telephone}
📧 *Email:* ${data.email}
🎯 *Service:* ${data.service}
📦 *Quantité:* ${data.quantite}
📏 *Format:* ${data.format || 'Non spécifié'}

📝 *Message:*
${data.message}
        `;
        
        // Also send email notification
        try {
            // Note: For production, you'll need a backend service to send emails
            // This is just a placeholder
            console.log('Form data:', data);
        } catch (error) {
            console.error('Error:', error);
        }
        
        // Send to WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        
        // Show success message
        showNotification('Demande envoyée! Nous vous contacterons bientôt.');
        
        // Reset form
        devisForm.reset();
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and other elements
document.querySelectorAll('.service-card, .step-card, .portfolio-item, .testimonial-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav link
updateActiveNavLink();

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Service Filter (Future Enhancement)
function filterServices(category) {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            }, 10);
        } else {
            card.style.display = 'none';
        }
    });
}

// Smooth Scroll Behavior Enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Portfolio Filter (Future Enhancement)
const portfolioItems = document.querySelectorAll('.portfolio-item');

function filterPortfolio(filter) {
    portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.filter === filter) {
            item.style.opacity = '1';
            item.style.pointerEvents = 'auto';
        } else {
            item.style.opacity = '0.3';
            item.style.pointerEvents = 'none';
        }
    });
}

// Counter Animation for Stats (if needed)
function animateCounter(element, target, duration = 2000) {
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShapes = document.querySelectorAll('.hero-shape');
    
    heroShapes.forEach((shape, index) => {
        const yOffset = scrolled * (0.5 + index * 0.1);
        shape.style.transform = `translateY(${yOffset}px)`;
    });
});

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });
    
    return isValid;
}

// Enhanced Focus Management
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Print Functionality
function printPage() {
    window.print();
}

// Share Functionality
function shareService(serviceName) {
    if (navigator.share) {
        navigator.share({
            title: 'GIDAPRINT - ' + serviceName,
            text: 'Découvrez nos services de ' + serviceName,
            url: window.location.href
        });
    } else {
        alert('Partage non supporté sur ce navigateur');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('GIDAPRINT Website Loaded Successfully');
    
    // Add any initialization code here
    // Example: Load testimonials, portfolio items, etc.
    
    // Add smooth entrance animation to hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInDown 0.8s ease';
    }
});

// Service Card Click Handler
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h5').textContent;
        const message = `Je suis intéressé par: ${serviceName}`;
        scrollToSection('devis');
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.value = message;
            messageField.focus();
        }
    });
});

// WhatsApp Button Visibility
const whatsappButton = document.getElementById('whatsappButton');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        whatsappButton.style.animation = 'none';
    }
});

// Add Analytics Tracking (optional)
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent;
        trackEvent('button', 'click', text);
    });
});

// Service Card Analytics
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function() {
        const serviceName = this.querySelector('h5').textContent;
        trackEvent('service', 'click', serviceName);
    });
});

// Export functions for global use
window.openWhatsApp = openWhatsApp;
window.scrollToSection = scrollToSection;
window.filterServices = filterServices;
window.filterPortfolio = filterPortfolio;
window.shareService = shareService;
window.printPage = printPage;
