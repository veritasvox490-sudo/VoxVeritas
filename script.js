// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initAnimations();
    initNewsletterForm();
    initContactForm();
    initParallaxEffects();
    initImageGalleries();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.story-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .story-card, .about-content, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                z-index: 999;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                box-shadow: none;
                border: none;
                background: transparent;
                padding: 0;
                margin-top: 0.5rem;
            }
            
            .dropdown-menu li a {
                padding: 0.5rem 1rem;
                color: var(--color-text-light);
            }
        }
    `;
    document.head.appendChild(style);
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                this.reset();
            }
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && message) {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-video, .about-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Image gallery functionality
function initImageGalleries() {
    const storyCards = document.querySelectorAll('.story-card');
    
    // Define the new stories
    const stories = {
        'The Last Ascent': `The mountain loomed like a frozen titan, its peak hidden behind veils of cloud. Mira's legs ached, her breath ragged in the thin air, but she pushed forward. Each step was a goodbye to the life she had known below — the city, the noise, the endless race of days.

At the summit, she planted her ice axe and gazed into the void of stars, closer now than ever before. She wasn't climbing for glory; she was climbing because she knew this would be her last ascent. Tomorrow, her body would carry her down, but her spirit would remain here, cradled in the silence. The mountain, in its ancient patience, welcomed her as one of its own.`,

        'Shadows of the Forest': `In the half-light, the forest whispered with things unseen. Children of the village were told never to wander after dusk — not because of wolves, but because the shadows had hunger.

Kiran ignored the warnings. He wandered too deep, chasing a silver moth, when the trees leaned in close, their shadows stretching like claws. He heard footsteps that matched his own, laughter that wasn't his.

But the shadows weren't cruel. They were lonely. They reached out, curling around him like roots around stone. For a heartbeat, Kiran saw what they saw — centuries of silence, of watching, of waiting. When he returned home, he was changed. The shadows walked with him now, whispering secrets no one else could hear.`,

        'Ocean\'s Heart': `Beneath the waves, there was a place where the ocean itself kept its heart. It pulsed like a sapphire, glowing in the deep, surrounded by schools of curious fish that never strayed far.

No diver had ever found it — until Lani, with lungs strong as whalesong, followed a trail of dolphins into the abyss. When she touched the heart, she expected to drown. Instead, the ocean spoke.

"I give you a piece of me," it said, pressing warmth into her chest. From that day forward, Lani carried tides in her veins. Wherever she walked, puddles shimmered, seashells turned toward her, and children dreamed of waves. She was not just human anymore — she was the keeper of the ocean's heart.`,

        'Whispers of the Forest and Ocean Embrace': `At the cliff's edge, where pine roots reached for saltwater, the forest met the sea. This was where Aira liked to sit, listening. The forest whispered in rustles, the ocean answered in sighs.

But one evening, the whispers grew urgent. A storm was coming, the kind that split trees and swallowed ships. Aira pressed her palms into the moss and sand, begging them to be gentle.

And for the first time, the forest and the ocean answered together. The storm curved around the bay, leaving her village untouched. She never told anyone, but sometimes, when she sat on the cliff, she could hear them again — the forest and the ocean, in their endless embrace, murmuring like old lovers.`
    };
    
    // Add click handlers for story cards
    storyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const title = this.querySelector('h3')?.textContent || '';
            if (stories[title]) {
                openStoryModal(title, stories[title]);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        const btn = card.querySelector('.btn-text');
        if (btn) {
            btn.addEventListener('click', (e) => {
                const title = card.querySelector('h3')?.textContent || '';
                if (stories[title]) {
                    openStoryModal(title, stories[title]);
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-white);
            border-left: 4px solid var(--color-gold);
            box-shadow: var(--shadow);
            padding: 1rem;
            border-radius: 4px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: #28a745;
        }
        
        .notification-error {
            border-left-color: #dc3545;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--color-text-light);
        }
        
        .notification-close:hover {
            color: var(--color-text);
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Initialize counter animation when about section is visible
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Story modal helpers
function openStoryModal(title, bodyText) {
    const modal = document.getElementById('story-modal');
    if (!modal) return;
    const titleEl = modal.querySelector('#story-modal-title');
    const bodyEl = modal.querySelector('.story-modal-body');
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = bodyText;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeStoryModal() {
    const modal = document.getElementById('story-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.matches('[data-close]')) {
        closeStoryModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeStoryModal();
    }
});
