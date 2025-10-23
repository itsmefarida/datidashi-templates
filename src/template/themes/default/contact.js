// Contact page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous messages
        clearMessages();

        // Validate form
        if (validateForm()) {
            // Simulate form submission
            showSuccessMessage('Thank you for your message! We\'ll get back to you soon.');
            contactForm.reset();
        }
    });

    function validateForm() {
        let isValid = true;
        const requiredFields = ['name', 'email', 'subject', 'message'];

        requiredFields.forEach(field => {
            const element = document.getElementById(field);
            const formGroup = element.closest('.form-group');

            if (!element.value.trim()) {
                showFieldError(formGroup, `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
                isValid = false;
            } else {
                clearFieldError(formGroup);
            }
        });

        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value && !emailRegex.test(email.value)) {
            showFieldError(email.closest('.form-group'), 'Please enter a valid email address');
            isValid = false;
        }

        return isValid;
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

    function clearFieldError(formGroup) {
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function showSuccessMessage(message) {
        clearMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        contactForm.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    function clearMessages() {
        const messages = contactForm.querySelectorAll('.success-message, .error-message');
        messages.forEach(message => message.remove());
    }

    // Add input animations
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });

    // Animate contact items on scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.1 });

    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-20px)' : 'translateX(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});
