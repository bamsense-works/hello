// ===========================
// BAMSense Works - Enhanced Interactive Features
// ===========================

// ===========================
// Mobile Menu Toggle
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===========================
// Navbar Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// Smooth Scrolling
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Add animation class to elements
document.addEventListener('DOMContentLoaded', () => {
    // Animate cards and sections
    const animatedElements = document.querySelectorAll(
        '.product-card, .why-card, .feature-item, .visual-card, .mv-card, .contact-card'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// ===========================
// Active Nav Link on Scroll
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===========================
// Stats Counter Animation
// ===========================
function animateCounter(element, target) {
    const targetNumber = parseInt(target);
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * targetNumber);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = stat.getAttribute('data-target');
                if (target) {
                    animateCounter(stat, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// ===========================
// Demo Tab System
// ===========================
const demoTabs = document.querySelectorAll('.demo-tab');
const demoContents = document.querySelectorAll('.demo-content');

demoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetDemo = tab.getAttribute('data-demo');

        // Remove active class from all tabs
        demoTabs.forEach(t => t.classList.remove('active'));

        // Remove active class from all demo contents
        demoContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding demo content
        const targetContent = document.querySelector(`[data-demo-content="${targetDemo}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ===========================
// Scroll to Demo Function
// ===========================
window.scrollToDemo = function(productId) {
    // Find and click the corresponding demo tab
    const demoTab = document.querySelector(`.demo-tab[data-demo="${productId}"]`);
    if (demoTab) {
        demoTab.click();

        // Scroll to demos section
        const demosSection = document.getElementById('demos');
        if (demosSection) {
            const headerOffset = 80;
            const elementPosition = demosSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
};

// ===========================
// Product Card 3D Tilt Effect
// ===========================
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// Scroll Progress Indicator
// ===========================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #0066FF, #00BFFF);
    z-index: 9999;
    transition: width 0.1s ease;
    pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// ===========================
// Parallax Effect for Hero Background
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.geometric-shape');

    parallaxElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===========================
// Loading Animation
// ===========================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===========================
// Dynamic Year in Footer
// ===========================
const yearElements = document.querySelectorAll('.current-year');
if (yearElements.length > 0) {
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// ===========================
// Lazy Loading for Images
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Detect Dark/Light Mode Preference
// ===========================
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    // User prefers light mode - currently we use dark theme
    // Can be extended for theme switching
}

// ===========================
// Keyboard Navigation
// ===========================
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ===========================
// Smooth Reveal on Scroll
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.section-header, .hero-content').forEach(el => {
    revealObserver.observe(el);
});

// ===========================
// Console Easter Egg
// ===========================
console.log('%c🎓 BAMSense Works', 'font-size: 24px; font-weight: bold; color: #0066FF; text-shadow: 2px 2px 4px rgba(0,102,255,0.3);');
console.log('%c✨ Intelligence That Powers Education', 'font-size: 16px; color: #00BFFF; font-weight: 600;');
console.log('%c🚀 Transforming the future of education with AI', 'font-size: 14px; color: #B4C1D8;');
console.log('%cInterested in joining our team? Contact us at bamsense.works@gmail.com', 'font-size: 12px; color: #7B8CA3; font-style: italic;');

// ===========================
// Performance Monitoring
// ===========================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #43e97b; font-weight: bold;');
        }, 0);
    });
}

// ===========================
// Error Handling
// ===========================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// ===========================
// Accessibility Enhancements
// ===========================
// Add skip to content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: #0066FF;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);

// ===========================
// Initialize All Features
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✅ BAMSense Works website initialized successfully!', 'color: #43e97b; font-weight: bold;');
});
