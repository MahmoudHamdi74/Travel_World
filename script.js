// Current language (default: Arabic)
let currentLang = 'ar';

// Change language function
function changeLanguage(lang) {
    currentLang = lang;
    
    // Update HTML lang and dir attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all text elements
    updatePageTranslations();
    
    // Update active button
    updateLanguageButtons(lang);
    
    // Save preference to localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Update all translations on the page
function updatePageTranslations() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    // Update placeholders
    const placeholders = document.querySelectorAll('[data-translate-placeholder]');
    placeholders.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });
    
    // Update page title
    const titleKey = document.querySelector('title').getAttribute('data-translate');
    if (titleKey && translations[currentLang][titleKey]) {
        document.title = translations[currentLang][titleKey];
    }
}

// Update language button states
function updateLanguageButtons(lang) {
    document.getElementById('ar-btn').classList.toggle('active', lang === 'ar');
    document.getElementById('en-btn').classList.toggle('active', lang === 'en');
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'ar' || savedLang === 'en')) {
        changeLanguage(savedLang);
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Contact form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Show success message (in real application, this would send data to server)
            const successMessage = currentLang === 'ar' 
                ? 'شكراً لتواصلك معنا! سنرد عليك قريباً.' 
                : 'Thank you for contacting us! We will reply soon.';
            
            alert(successMessage);
            
            // Reset form
            this.reset();
        });
    }
    
    // Add animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all trip cards and feature cards
    document.querySelectorAll('.trip-card, .feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Book now button handlers
    const bookButtons = document.querySelectorAll('.trip-card .btn-secondary');
    bookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tripCard = this.closest('.trip-card');
            const tripTitle = tripCard.querySelector('h3').textContent;
            
            const bookingMessage = currentLang === 'ar'
                ? `هل تريد حجز ${tripTitle}؟`
                : `Do you want to book ${tripTitle}?`;
            
            if (confirm(bookingMessage)) {
                const successMsg = currentLang === 'ar'
                    ? 'تم إضافة الرحلة إلى السلة! سيتم التواصل معك قريباً.'
                    : 'Trip added to cart! We will contact you soon.';
                alert(successMsg);
            }
        });
    });
    
    // Add active state to navigation links based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary-color)';
            }
        });
    });
});

// Add sticky navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});
