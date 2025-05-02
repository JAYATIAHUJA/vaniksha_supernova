document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const headerButtons = document.querySelector('.header-buttons');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        headerButtons.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animations
    gsap.from('.hero-text h1', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-text p', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-buttons', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.parallax-image', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        delay: 0.6,
        ease: 'power3.out'
    });

    // Problem Section Animations
    gsap.from('.problem-text', {
        scrollTrigger: {
            trigger: '.problem-section',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.stat-card', {
        scrollTrigger: {
            trigger: '.problem-stats',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Solution Section Animations
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Impact Section Animations
    gsap.from('.impact-card', {
        scrollTrigger: {
            trigger: '.impact-stats',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
    });

    // Get Involved Section Animations
    gsap.from('.involvement-card', {
        scrollTrigger: {
            trigger: '.involvement-cards',
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // Parallax Effect for Hero Section
    gsap.to('.parallax-image', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: '30%',
        ease: 'none'
    });

    // Animated Counter for Impact Stats
    const impactStats = document.querySelectorAll('.impact-card h3');
    
    impactStats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };

        ScrollTrigger.create({
            trigger: stat,
            start: 'top center+=100',
            onEnter: () => {
                current = 0;
                updateCounter();
            }
        });
    });
});