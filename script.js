// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll animation for team members
const teamMembers = document.querySelectorAll('.team-member');

const observeElements = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observeElements, {
    root: null,
    threshold: 0.1
});

teamMembers.forEach(member => {
    observer.observe(member);
});

// Contact Form Submission with Formspree
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('thankYouModal');
const closeModal = document.getElementById('closeModal');

contactForm.addEventListener('submit', function(e) {
    // Prevent default form submission
    e.preventDefault();
    
    const form = this;
    
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show thank you modal
            modal.style.display = 'flex';
            // Clear the form
            form.reset();
            return response.json();
        } else {
            throw new Error('Oops! There was a problem with your submission.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again later.');
    });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Also close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Fix for footer white space issue
document.addEventListener('DOMContentLoaded', function() {
    // Fix footer positioning
    const footer = document.querySelector('footer');
    const lastSection = document.querySelector('section:last-of-type');
    
    if (footer && lastSection) {
        // Ensure no gap between last section and footer
        lastSection.style.paddingBottom = '0';
        lastSection.style.marginBottom = '0';
        
        // Make sure footer has no top margin
        footer.style.marginTop = '0';
        
        // Ensure body extends to full height
        document.body.style.minHeight = '100vh';
        document.documentElement.style.height = '100%';
    }
    
    // Function to check if page content is shorter than viewport
    function adjustFooterForShortPages() {
        const bodyHeight = document.body.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // If page is shorter than viewport, push footer to bottom
        if (bodyHeight < windowHeight) {
            document.body.style.height = '100vh';
            footer.style.position = 'absolute';
            footer.style.bottom = '0';
            footer.style.width = '100%';
        } else {
            document.body.style.height = 'auto';
            footer.style.position = 'relative';
        }
    }
    
    // Run on load and resize
    adjustFooterForShortPages();
    window.addEventListener('resize', adjustFooterForShortPages);
});