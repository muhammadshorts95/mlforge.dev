// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Set initial theme based on system preference
if (prefersDarkScheme.matches) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Typing Animation for Hero Section
const typingEffect = () => {
    const text = "AI/ML Engineer | Python Developer | Creative Problem Solver";
    const typingElement = document.querySelector('.tagline');
    const typingDelay = 100;
    
    // Clear any existing text first
    typingElement.textContent = '';
    
    function type() {
        if (typingElement.textContent === text) return;
        
        const currentText = typingElement.textContent;
        if (currentText.length < text.length) {
            typingElement.textContent = text.substring(0, currentText.length + 1);
            setTimeout(type, typingDelay);
        }
    }

    type();
};

// Run typing animation when page loads
document.addEventListener('DOMContentLoaded', typingEffect);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form with EmailJS
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const form = this;
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Hide any existing messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Prepare template parameters
    const templateParams = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        message: form.querySelector('#message').value,
        time: new Date().toLocaleString()
    };

    // Send email using EmailJS
    emailjs.send('service_z22sefj', 'template_1knn0vo', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            successMessage.style.display = 'block';
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
            errorMessage.style.display = 'block';
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
});

// Intersection Observer for reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and project cards
document.querySelectorAll('section, .project-card').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
});