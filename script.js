// HK Jewelry Corp - JavaScript

// Smooth scroll para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
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

    // Funcionalidad de búsqueda
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (searchInput && searchButton) {
        // Buscar al hacer clic en el botón
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // Buscar al presionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Redirigir a página de productos con parámetro de búsqueda
            window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
        }
    }
});

