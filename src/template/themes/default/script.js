// Global JavaScript for Default Theme
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();

    // Set up global event listeners
    setupGlobalEvents();

    // Initialize components
    initializeComponents();

    // Handle page-specific functionality
    handlePageSpecificLogic();
});

function initializeTheme() {
    // Set theme class on body
    document.body.classList.add('theme-default');

    // Add loading class initially
    document.body.classList.add('loading');

    // Remove loading class after content is loaded
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);

    // Set up viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta');
        viewport.name = 'viewport';
        viewport.content = 'width=device-width, initial-scale=1.0';
        document.head.appendChild(viewport);
    }
}

function setupGlobalEvents() {
    // Smooth scrolling for anchor links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Handle form submissions
    document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form.tagName === 'FORM') {
            handleFormSubmission(form, e);
        }
    });

    // Handle button clicks with loading states
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.btn[data-loading]');
        if (button) {
            handleButtonLoading(button);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            closeAllModals();
        }

        // Enhanced tab navigation
        if (e.key === 'Tab') {
            handleTabNavigation(e);
        }
    });

    // Window resize handling
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });

    // Scroll handling for sticky elements
    window.addEventListener('scroll', throttle(handleScroll, 16));
}

function initializeComponents() {
    // Initialize tooltips
    initializeTooltips();

    // Initialize dropdowns
    initializeDropdowns();

    // Initialize modals
    initializeModals();

    // Initialize accordions
    initializeAccordions();

    // Initialize carousels
    initializeCarousels();

    // Initialize lazy loading
    initializeLazyLoading();
}

function handlePageSpecificLogic() {
    const currentPage = getCurrentPage();

    switch (currentPage) {
        case 'home':
            initializeHomePage();
            break;
        case 'about':
            initializeAboutPage();
            break;
        case 'contact':
            initializeContactPage();
            break;
        case 'dashboard':
            initializeDashboardPage();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path.includes('/about')) return 'about';
    if (path.includes('/contact')) return 'contact';
    if (path.includes('/dashboard')) return 'dashboard';
    return 'unknown';
}

// Component Initializations
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        if (trigger) {
            trigger.addEventListener('click', () => toggleDropdown(dropdown));
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });
}

function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => openModal(trigger.dataset.modal));
    });

    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }

        // Close modal when clicking on backdrop
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
}

function initializeAccordions() {
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        const headers = accordion.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', () => toggleAccordion(header));
        });
    });
}

function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        initializeCarousel(carousel);
    });
}

function initializeLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Page-specific initializations
function initializeHomePage() {
    // Hero animations
    animateHeroElements();

    // Feature card animations
    animateFeatureCards();

    // Stats counter animations
    animateStats();

    // CTA button interactions
    setupCTAInteractions();
}

function initializeAboutPage() {
    // Team member hover effects
    setupTeamInteractions();

    // Value card animations
    animateValueCards();
}

function initializeContactPage() {
    // Form validation
    setupFormValidation();

    // Contact info animations
    animateContactInfo();
}

function initializeDashboardPage() {
    // Dashboard widget interactions
    setupDashboardInteractions();

    // Chart initializations (placeholder)
    initializeCharts();

    // Notification system
    setupNotifications();
}

// Utility Functions
function showTooltip(e) {
    const element = e.target;
    const tooltipText = element.dataset.tooltip;

    // Remove existing tooltips
    hideAllTooltips();

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;

    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';

    // Add visible class for animation
    setTimeout(() => tooltip.classList.add('visible'), 10);
}

function hideTooltip() {
    hideAllTooltips();
}

function hideAllTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => {
        tooltip.classList.remove('visible');
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 300);
    });
}

function toggleDropdown(dropdown) {
    const isOpen = dropdown.classList.contains('open');
    closeAllDropdowns();

    if (!isOpen) {
        dropdown.classList.add('open');
    }
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown.open');
    dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        document.body.classList.add('modal-open');
    }
}

function closeModal(modal) {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal.open');
    modals.forEach(modal => closeModal(modal));
}

function toggleAccordion(header) {
    const accordion = header.closest('.accordion');
    const content = header.nextElementSibling;
    const isOpen = content.classList.contains('open');

    // Close all accordion items in the same accordion
    const allContents = accordion.querySelectorAll('.accordion-content');
    allContents.forEach(content => content.classList.remove('open'));

    if (!isOpen) {
        content.classList.add('open');
    }
}

function handleTabNavigation(e) {
    // Enhanced focus management
    const focusedElement = document.activeElement;
    if (focusedElement) {
        focusedElement.classList.add('focused');
        setTimeout(() => focusedElement.classList.remove('focused'), 2000);
    }
}

function handleResize() {
    // Reposition tooltips and modals on resize
    hideAllTooltips();
    // Add other resize handlers as needed
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function handleScroll() {
    // Add scroll-based classes
    const scrollY = window.scrollY;
    const header = document.querySelector('.header');

    if (header) {
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Update active navigation link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY;

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                const rect = target.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    link.classList.add('active');
                }
            }
        }
    });
}

function handleFormSubmission(form, e) {
    e.preventDefault();

    // Add loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
    }

    // Simulate form submission
    setTimeout(() => {
        showNotification('Form submitted successfully!', 'success');
        form.reset();
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    }, 2000);
}

function handleButtonLoading(button) {
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<span class="loading"></span> Loading...';

    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalText;
    }, 2000);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${getNotificationIcon(type)}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return '✓';
        case 'error': return '✕';
        case 'warning': return '⚠';
        default: return 'ℹ';
    }
}

// Animation functions for specific pages
function animateHeroElements() {
    const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .btn');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

function animateFeatureCards() {
    const cards = document.querySelectorAll('.feature-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const duration = 2000;
    const start = performance.now();
    const startValue = 0;

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(startValue + (target - startValue) * progress);
        element.textContent = current.toLocaleString() + (element.textContent.includes('%') ? '%' : '+');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function setupCTAInteractions() {
    const ctaButtons = document.querySelectorAll('.cta .btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.innerHTML = '<span class="loading"></span> Redirecting...';
            setTimeout(() => {
                window.location.href = '/contact';
            }, 1000);
        });
    });
}

function setupTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function animateValueCards() {
    const cards = document.querySelectorAll('.value-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');

    clearFieldError(field);

    if (field.hasAttribute('required') && !value) {
        showFieldError(formGroup, `${field.name} is required`);
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(formGroup, 'Please enter a valid email address');
            return false;
        }
    }

    return true;
}

function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    let errorElement = formGroup.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    const errorElement = formGroup.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function animateContactInfo() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

function setupDashboardInteractions() {
    // Add click handlers for dashboard actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.textContent.trim();
            showNotification(`${action} functionality would be implemented here`, 'info');
        });
    });
}

function initializeCharts() {
    // Placeholder for chart initialization
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
    chartPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            showNotification('Interactive charts would be displayed here', 'info');
        });
    });
}

function setupNotifications() {
    // Mark notifications as read
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
        });
    });
}

// Add global CSS for dynamic elements
const globalStyles = `
.tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    white-space: nowrap;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
}

.tooltip.visible {
    opacity: 1;
    transform: translateY(0);
}

.notification {
    position: fixed;
    top: 20px;
    right: -300px;
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 1000;
    transition: right 0.3s ease;
    border-left: 4px solid #667eea;
}

.notification.show {
    right: 20px;
}

.notification-success {
    border-left-color: #48bb78;
}

.notification-error {
    border-left-color: #f56565;
}

.notification-warning {
    border-left-color: #ed8936;
}

.notification-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.notification-close:hover {
    color: #333;
}

.form-group.error input,
.form-group.error textarea {
    border-color: #f56565;
    box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1);
}

body.loading * {
    cursor: wait !important;
}

@media (max-width: 768px) {
    .notification {
        left: 20px;
        right: 20px;
        width: auto;
    }
}
`;

// Inject global styles
const styleSheet = document.createElement('style');
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);
