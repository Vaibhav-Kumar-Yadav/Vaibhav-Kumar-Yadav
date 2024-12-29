document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    function getCurrentTheme() {
        return localStorage.getItem('theme') || 
               (prefersDarkScheme.matches ? 'dark' : 'light');
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Initialize theme
    setTheme(getCurrentTheme());

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = getCurrentTheme();
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && 
            !mobileMenu.contains(e.target) && 
            !themeToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }, 250);
    });

    // Skills highlight effect
    const skillTags = document.querySelectorAll('.skills span');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseover', () => {
            tag.classList.add('highlight');
        });
        tag.addEventListener('mouseout', () => {
            tag.classList.remove('highlight');
        });
    });

    // Mobile touch support
    let touchStartX = null;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (!touchStartX) return;

        const touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;
        const swipeThreshold = 50;

        if (swipeDistance > swipeThreshold && touchStartX < 30) {
            // Swipe right to open menu
            navLinks.classList.add('active');
            mobileMenu.classList.add('active');
        } else if (swipeDistance < -swipeThreshold && navLinks.classList.contains('active')) {
            // Swipe left to close menu
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }

        touchStartX = null;
    }, { passive: true });

    // Update copyright year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Handle loading state
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Add theme transition after page load
        setTimeout(() => {
            document.body.classList.add('theme-transition');
        }, 300);
    });

    // Initialize tooltips if any
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseover', (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            if (tooltipText) {
                const tooltipElement = document.createElement('div');
                tooltipElement.className = 'tooltip';
                tooltipElement.textContent = tooltipText;
                document.body.appendChild(tooltipElement);

                const rect = e.target.getBoundingClientRect();
                tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
                tooltipElement.style.left = `${rect.left + (rect.width - tooltipElement.offsetWidth) / 2}px`;
            }
        });

        tooltip.addEventListener('mouseout', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Prevent transition on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.classList.remove('no-transition');
    }, 300);
});