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

// Make "Get Started" button highlight when any nav link is hovered (keeping text white)
const navLinkItems = document.querySelectorAll('.nav-links a:not(.btn-nav)');
const getStartedBtn = document.querySelector('.btn-nav');

navLinkItems.forEach(link => {
    link.addEventListener('mouseenter', () => {
        getStartedBtn.style.background = '#fff';
        getStartedBtn.style.color = 'var(--accent)';
        getStartedBtn.style.borderColor = 'var(--accent)';
    });
    link.addEventListener('mouseleave', () => {
        getStartedBtn.style.background = 'var(--accent)';
        getStartedBtn.style.color = '#fff';
        getStartedBtn.style.borderColor = 'var(--accent)';
    });
});