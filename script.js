// Modern JavaScript for Alfa Specialized Hospital Website

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const appointmentForm = document.querySelector('.appointment-form');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Navbar Background on Scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .doctor-card, .contact-item, .feature-item');
    animateElements.forEach(el => observer.observe(el));
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        if (target && target > 0) {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                }
            }, 30);
        }
    });
}

// Trigger counter animation when hero stats are visible
const heroStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    heroStatsObserver.observe(heroStats);
}

// Form Validation and Submission
if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const appointmentData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            department: formData.get('department'),
            date: formData.get('date'),
            message: formData.get('message')
        };
        
        // Validate form
        if (!validateForm(appointmentData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Appointment booked successfully! We will contact you soon to confirm.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data.department) {
        errors.push('Please select a department');
    }
    
    if (!data.date) {
        errors.push('Please select a preferred date');
    } else if (new Date(data.date) < new Date()) {
        errors.push('Please select a future date');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-message">${message}</div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 0;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
        overflow: hidden;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
    }
    
    .notification-icon {
        font-size: 20px;
        flex-shrink: 0;
    }
    
    .notification-message {
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background-color 0.2s;
        flex-shrink: 0;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Real-time Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.appointment-form input, .appointment-form select, .appointment-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
});

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
        case 'email':
            if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'phone':
            if (!isValidPhone(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
            break;
        case 'department':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select a department';
            }
            break;
        case 'date':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select a date';
            } else if (new Date(value) < new Date()) {
                isValid = false;
                errorMessage = 'Please select a future date';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        clearFieldError(field);
        field.style.borderColor = '#10b981';
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    error.style.cssText = `
        color: #ef4444;
        font-size: 12px;
        margin-top: 4px;
        font-weight: 500;
    `;
    
    field.parentNode.appendChild(error);
    field.style.borderColor = '#ef4444';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e5e7eb';
}

// Service Card Interactions
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Doctor Card Interactions
document.addEventListener('DOMContentLoaded', () => {
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    doctorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.doctor-overlay');
            const img = this.querySelector('.doctor-image img');
            if (overlay) overlay.style.opacity = '1';
            if (img) img.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.doctor-overlay');
            const img = this.querySelector('.doctor-image img');
            if (overlay) overlay.style.opacity = '0';
            if (img) img.style.transform = 'scale(1)';
        });
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Scroll to Top Button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1A4D2A, #0F2E1A);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(26, 77, 42, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 18px;
    `;
    
    document.body.appendChild(button);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 6px 25px rgba(26, 77, 42, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 20px rgba(26, 77, 42, 0.3)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Insurance Slider Enhancement
function initInsuranceSlider() {
    const slider = document.querySelector('.insurance-slider');
    const track = document.querySelector('.insurance-track');
    
    if (!slider || !track) return;
    
    // Pause animation when not in viewport for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                track.style.animationPlayState = 'running';
            } else {
                track.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(slider);
    
    // Add click handlers for insurance items
    const insuranceItems = document.querySelectorAll('.insurance-item');
    insuranceItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.querySelector('.insurance-name').textContent;
            showInsuranceModal(name);
        });
        
        // Add cursor pointer style
        item.style.cursor = 'pointer';
    });
}

// Show insurance provider modal/info
function showInsuranceModal(providerName) {
    const messages = {
        'NHIF': 'National Health Insurance Fund - Government health insurance coverage for all Tanzanian citizens.',
        'NSSF': 'National Social Security Fund - Social security and health benefits for employees.',
        'Britam': 'Britam Insurance - Comprehensive health insurance solutions with extensive coverage.',
        'Jubilee': 'Jubilee Insurance - Leading insurance provider in East Africa with quality healthcare coverage.',
        'MO Insurance': 'MO Insurance - Reliable health insurance coverage with excellent customer service.',
        'Assemble': 'Assemble Insurance - Quality healthcare insurance services with competitive rates.'
    };
    
    const message = messages[providerName] || `${providerName} - We accept this insurance provider for your healthcare needs.`;
    
    // Create a toast notification
    showNotification(message, 'info');
}

// Initialize insurance slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initInsuranceSlider);

// Facilities Section Enhancement
function initFacilitiesSection() {
    const facilitiesSlider = document.querySelector('.facilities-slider');
    const facilitiesTrack = document.querySelector('.facilities-track');
    
    if (!facilitiesSlider || !facilitiesTrack) return;
    
    // Pause animation when not in viewport for performance
    const sliderObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                facilitiesTrack.style.animationPlayState = 'running';
            } else {
                facilitiesTrack.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });
    
    sliderObserver.observe(facilitiesSlider);
    
    const facilityCards = document.querySelectorAll('.facility-card');
    
    facilityCards.forEach(card => {
        // Add click handler for facility cards
        card.addEventListener('click', () => {
            const title = card.querySelector('.facility-title').textContent;
            const description = card.querySelector('.facility-description').textContent;
            showFacilityModal(title, description);
        });
        
        // Add cursor pointer style
        card.style.cursor = 'pointer';
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Learn more about ${card.querySelector('.facility-title').textContent}`);
        
        // Handle keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Animate facility stats on scroll
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFacilityStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const facilitiesStats = document.querySelector('.facilities-stats');
    if (facilitiesStats) {
        statsObserver.observe(facilitiesStats);
    }
}

// Show facility modal/info
function showFacilityModal(title, description) {
    const messages = {
        'Intensive Care Unit (ICU)': 'Our ICU provides critical care with advanced monitoring systems, ventilators, and life-support equipment. Available 24/7 with specialized critical care nurses and doctors.',
        'Operating Theatre': 'Modern surgical suites equipped with the latest technology for complex procedures. Our experienced surgical teams ensure safe and successful operations.',
        'Private Wards': 'Comfortable private rooms with modern amenities, ensuring privacy and comfort for patients and families during recovery and treatment.',
        'Maternity Care': 'Comprehensive maternity services from prenatal care to delivery and postnatal care. Our maternity ward provides a safe and comfortable environment for mothers and newborns.',
        'Emergency Department': '24/7 emergency services with rapid response capabilities. Our emergency team is trained to handle trauma cases and critical medical emergencies.',
        'Laboratory Services': 'Fully equipped diagnostic laboratory with advanced testing capabilities. We provide quick and accurate results for various medical tests and screenings.',
        'Radiology Department': 'Modern imaging services including X-ray, CT scan, MRI, and ultrasound. Our radiology team provides comprehensive diagnostic imaging for accurate treatment planning.',
        'Pharmacy Services': 'In-house pharmacy with a wide range of medications and prescription services. Our pharmacists provide pharmaceutical care and medication counseling.'
    };
    
    const message = messages[title] || description;
    
    // Create a detailed toast notification
    showNotification(`<strong>${title}</strong><br>${message}`, 'info');
}

// Animate facility statistics
function animateFacilityStats() {
    const statNumbers = document.querySelectorAll('.facilities-stats .stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (number && number > 0) {
            let current = 0;
            const increment = number / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = text;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + (text.includes('+') ? '+' : '');
                }
            }, 50);
        } else if (text === '24/7') {
            // Special animation for 24/7
            stat.style.animation = 'pulse 2s infinite';
        }
    });
}

// Initialize facilities section when DOM is loaded
document.addEventListener('DOMContentLoaded', initFacilitiesSection);

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    setActiveNavLink();
    handleNavbarScroll();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    setActiveNavLink();
    
    // Initialize navbar scroll handler
    handleNavbarScroll();
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Error Handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}