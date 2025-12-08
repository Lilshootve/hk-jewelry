// HK Jewelry Corp - JavaScript

// Search Functionality
function initSearch() {
    const searchInputs = document.querySelectorAll('#headerSearchInput');
    
    searchInputs.forEach(input => {
        if (!input) return;
        
        // Handle Enter key press
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value.trim());
            }
        });
        
        // Handle search icon click (if we add a clickable icon later)
        const searchIcon = input.nextElementSibling;
        if (searchIcon && searchIcon.classList.contains('header-search-icon')) {
            // Make icon clickable
            const iconWrapper = searchIcon.parentElement;
            iconWrapper.style.cursor = 'pointer';
            iconWrapper.addEventListener('click', function() {
                performSearch(input.value.trim());
            });
        }
    });
}

function performSearch(query) {
    if (!query || query.length < 2) {
        return;
    }
    
    // Normalize search query
    const normalizedQuery = query.toLowerCase().trim();
    
    // Search in product titles and descriptions
    const searchableElements = document.querySelectorAll('.product-card h3, .product-card p, .gallery-title, .gallery-description');
    const results = [];
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(normalizedQuery)) {
            const productCard = element.closest('.product-card, .gallery-item');
            if (productCard && !results.includes(productCard)) {
                results.push(productCard);
            }
        }
    });
    
    // If on products page, highlight results
    if (window.location.pathname.includes('products.html')) {
        highlightSearchResults(results, normalizedQuery);
    } else {
        // Redirect to products page with search parameter
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

function highlightSearchResults(results, query) {
    // Remove previous highlights
    document.querySelectorAll('.search-highlight').forEach(el => {
        el.classList.remove('search-highlight');
    });
    
    // Scroll to first result
    if (results.length > 0) {
        results[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        results[0].style.transition = 'background-color 0.3s';
        results[0].style.backgroundColor = '#fff9e6';
        setTimeout(() => {
            results[0].style.backgroundColor = '';
        }, 2000);
    }
}

// Handle search parameter on page load
function handleSearchParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    
    if (searchQuery) {
        const searchInput = document.getElementById('headerSearchInput');
        if (searchInput) {
            searchInput.value = searchQuery;
            performSearch(searchQuery);
        }
    }
}

// Smooth scroll para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    // Initialize search
    initSearch();
    handleSearchParameter();
    // Manejo de formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí se puede agregar lógica para enviar el formulario
            // Por ahora, solo mostramos un mensaje
            alert('Gracias por su mensaje. Nos pondremos en contacto con usted pronto.');
            contactForm.reset();
        });
    }

    // Manejo de formulario de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                alert('Gracias por suscribirse a nuestro boletín.');
                newsletterForm.reset();
            }
        });
    }

    // Animación suave al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animación a elementos con clase 'fade-in'
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

