// Mobile menu toggle - Must be first
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const navbar = document.getElementById('navbar');

if (mobileMenuBtn && navLinks) {
    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active section in navbar
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Enhanced Scroll Animation System with Intersection Observer
const createScrollObserver = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Main scroll animation observer
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated', 'visible');
                
                // Animate child elements with stagger
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        scrollObserver.observe(element);
    });
    
    // Card animation observer
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
            }
        });
    }, { threshold: 0.2 });
    
    // Observe all cards
    document.querySelectorAll('.card, [class*="card"]').forEach(card => {
        cardObserver.observe(card);
    });
    
    // Feature items observer
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('feature-visible');
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.feature, .feature-item, .process-step, .benefit-card').forEach(item => {
        featureObserver.observe(item);
    });
};

// Animate on scroll (fallback for older browsers)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated', 'visible');
        }
    });
};

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Parallax effect for hero section
const addParallaxEffect = () => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

// Initialize functions when page loads
window.addEventListener('load', () => {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize scroll observers
    createScrollObserver();
    
    // Add parallax effect
    addParallaxEffect();
    
    // Initialize animations
    animateOnScroll();
    
    // Add scrolled class to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // Start counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
});

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Initialize navbar state
window.dispatchEvent(new Event('scroll'));

// Add CSS rules to prevent green underline and color changes on Get Started button
const style = document.createElement('style');
style.textContent = `
    /* ULTRA-AGGRESSIVE: Lock Get Started button appearance - NO CHANGES EVER */
    .btn-nav,
    * .btn-nav,
    ** .btn-nav,
    *** .btn-nav,
    **** .btn-nav,
    .nav-links .btn-nav,
    .cta .btn-nav,
    .cta-section .btn-nav,
    .navbar.scrolled .btn-nav,
    .navbar.scrolled .btn-nav:hover,
    .navbar.scrolled .btn-nav:focus,
    .navbar.scrolled .btn-nav:active,
    .scrolled-to-form .btn-nav,
    .scrolled-to-form .btn-nav:hover,
    .scrolled-to-form .btn-nav:focus,
    .scrolled-to-form .btn-nav:active,
    body.scrolled-to-form .btn-nav,
    body.scrolled-to-form .btn-nav:hover,
    body.scrolled-to-form .btn-nav:focus,
    body.scrolled-to-form .btn-nav:active,
    html.scrolled-to-form .btn-nav,
    html.scrolled-to-form .btn-nav:hover,
    html.scrolled-to-form .btn-nav:focus,
    html.scrolled-to-form .btn-nav:active,
    .scrolled-to-form .nav-links .btn-nav,
    .scrolled-to-form .nav-links .btn-nav:hover,
    .scrolled-to-form .nav-links .btn-nav:focus,
    .scrolled-to-form .nav-links .btn-nav:active,
    .scrolled-to-form .cta .btn-nav,
    .scrolled-to-form .cta .btn-nav:hover,
    .scrolled-to-form .cta .btn-nav:focus,
    .scrolled-to-form .cta .btn-nav:active,
    .scrolled-to-form .cta-section .btn-nav,
    .scrolled-to-form .cta-section .btn-nav:hover,
    .scrolled-to-form .cta-section .btn-nav:focus,
    .scrolled-to-form .cta-section .btn-nav:active,
    .btn-nav:hover,
    .btn-nav:focus,
    .btn-nav:active,
    .nav-links .btn-nav:hover,
    .nav-links .btn-nav:focus,
    .nav-links .btn-nav:active,
    .cta .btn-nav:hover,
    .cta .btn-nav:focus,
    .cta .btn-nav:active,
    .cta-section .btn-nav:hover,
    .cta-section .btn-nav:focus,
    .cta-section .btn-nav:active,
    a.btn-nav,
    a.btn-nav:hover,
    a.btn-nav:focus,
    a.btn-nav:active,
    [class*="btn-nav"],
    [class*="btn-nav"]:hover,
    [class*="btn-nav"]:focus,
    [class*="btn-nav"]:active,
    [id*="btn-nav"],
    [id*="btn-nav"]:hover,
    [id*="btn-nav"]:focus,
    [id*="btn-nav"]:active {
        color: #000 !important;
        background: var(--accent) !important;
        border-color: var(--accent) !important;
        box-shadow: 0 2px 10px rgba(0, 191, 174, 0.2) !important;
        visibility: visible !important;
        opacity: 1 !important;
        transition: none !important;
        transform: none !important;
        animation: none !important;
        text-shadow: none !important;
        filter: none !important;
        -webkit-text-fill-color: #000 !important;
        -webkit-background-clip: unset !important;
        background-clip: unset !important;
    }
    
    /* Prevent any underline or color effects on Get Started button */
    .nav-links .btn-nav::after,
    .nav-links .btn-nav:hover::after,
    .nav-links .btn-nav.active::after,
    .btn-nav::after,
    .btn-nav:hover::after,
    .btn-nav:focus::after,
    .btn-nav:active::after {
        display: none !important;
        content: none !important;
    }
    
    /* Force black text on all possible selectors */
    * .btn-nav,
    ** .btn-nav,
    *** .btn-nav,
    **** .btn-nav,
    * .btn-nav *,
    ** .btn-nav *,
    *** .btn-nav *,
    **** .btn-nav * {
        color: #000 !important;
        -webkit-text-fill-color: #000 !important;
    }
`;
document.head.appendChild(style);

// DISABLED: Remove hover effects from Get Started button - keep it static
// const navLinkItems = document.querySelectorAll('.nav-links a:not(.btn-nav)');
// const getStartedBtn = document.querySelector('.btn-nav');

// navLinkItems.forEach(link => {
//     link.addEventListener('mouseenter', () => {
//         getStartedBtn.style.background = '#fff';
//         getStartedBtn.style.color = '#000';
//         getStartedBtn.style.borderColor = 'var(--accent)';
//     });
//     link.addEventListener('mouseleave', () => {
//         getStartedBtn.style.background = 'var(--accent)';
//         getStartedBtn.style.color = '#000';
//         getStartedBtn.style.borderColor = 'var(--accent)';
//     });
// });