// HK Jewelry Corp - JavaScript Premium

// Remover loader cuando la página cargue
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 500);
    }
});

// Sistema de Notificaciones Toast Elegante con soporte para error
function showToast(message, type = 'success') {
    // Eliminar toast anterior si existe
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${icon}</span>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Animación de entrada
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto-remover después de 4 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Parallax Effect para Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }
});

// Smooth scroll para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    // Manejo de formulario de contacto con Toast
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showToast('Gracias por su mensaje. Nos pondremos en contacto con usted pronto.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Manejo de formulario de newsletter con Toast
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                const submitButton = newsletterForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Suscribiendo...';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    showToast('¡Gracias por suscribirse! Recibirá nuestras ofertas exclusivas.', 'success');
                    newsletterForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 1000);
            }
        });
    }

    // Animación suave avanzada al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar animación mejorada a elementos con clase 'fade-in'
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, 
                               transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Animación para section titles
    document.querySelectorAll('.section-title').forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        title.style.transition = 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s';
        
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        titleObserver.observe(title);
    });

    // Lazy Loading de imágenes
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Funcionalidad de búsqueda mejorada
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
        
        // Efecto de foco en el input
        searchInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.05)';
        });
        
        searchInput.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.style.transform = 'scale(1)';
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Si estamos en products.html, filtrar directamente
            if (window.location.pathname.includes('products.html')) {
                filterProducts(searchTerm);
            } else {
                // Si estamos en otra página, redirigir a products.html con el término de búsqueda
                window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
            }
        } else {
            showToast('Por favor ingresa un término de búsqueda', 'error');
        }
    }

    // Función para filtrar productos en la página de productos
    function filterProducts(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            clearSearch();
            return;
        }

        const productCards = document.querySelectorAll('.product-card');
        const sections = document.querySelectorAll('.section[id^="hk-signature"], .section[id^="miami-luxe"], .section[id^="royal-diamonds"], .section[id^="custom-by-hk"]');
        let foundCount = 0;
        const searchLower = searchTerm.toLowerCase().trim();

        productCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const badge = card.querySelector('.collection-badge')?.textContent.toLowerCase() || '';
            
            // Buscar también en palabras clave comunes
            const keywords = ['diamond', 'diamante', 'gold', 'oro', 'ring', 'anillo', 
                            'necklace', 'collar', 'bracelet', 'pulsera', 'earring', 'arete',
                            'pendant', 'colgante', 'platinum', 'platino', 'sapphire', 'zafiro',
                            'emerald', 'esmeralda', 'ruby', 'rubí', 'custom', 'personalizado'];
            
            const matchesTitle = title.includes(searchLower);
            const matchesDescription = description.includes(searchLower);
            const matchesBadge = badge.includes(searchLower);
            const matchesKeywords = keywords.some(keyword => 
                searchLower.includes(keyword) && (title.includes(keyword) || description.includes(keyword))
            );
            
            const matches = matchesTitle || matchesDescription || matchesBadge || matchesKeywords;

            if (matches) {
                card.style.display = '';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, foundCount * 50);
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Ocultar/mostrar secciones según productos visibles
        sections.forEach(section => {
            const sectionCards = section.querySelectorAll('.product-card');
            let hasVisible = false;
            
            sectionCards.forEach(card => {
                if (card.style.display !== 'none' && window.getComputedStyle(card).display !== 'none') {
                    hasVisible = true;
                }
            });
            
            if (!hasVisible && foundCount > 0) {
                section.style.display = 'none';
            } else {
                section.style.display = '';
            }
        });

        // Mostrar mensaje de resultados
        showSearchResults(searchTerm, foundCount);
    }

    // Función para mostrar resultados de búsqueda
    function showSearchResults(term, count) {
        // Eliminar mensaje anterior si existe
        const existingMessage = document.getElementById('searchResultsMessage');
        if (existingMessage) {
            existingMessage.remove();
        }

        const message = document.createElement('div');
        message.id = 'searchResultsMessage';
        message.style.cssText = `
            max-width: 1200px;
            margin: 2rem auto;
            padding: 1.5rem;
            background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%);
            border-left: 4px solid var(--color-gold);
            border-radius: 0;
            box-shadow: var(--shadow-md);
            font-family: var(--font-primary);
            text-align: center;
        `;

        if (count > 0) {
            message.innerHTML = `
                <strong style="color: var(--color-black); font-size: 1.1rem;">
                    Se encontraron ${count} producto${count > 1 ? 's' : ''} para "${term}"
                </strong>
                <button onclick="clearSearch()" style="
                    margin-left: 1rem;
                    padding: 0.5rem 1rem;
                    background: var(--color-gold);
                    color: var(--color-black);
                    border: none;
                    cursor: pointer;
                    font-family: var(--font-primary);
                    font-weight: bold;
                    border-radius: 0;
                    transition: all 0.3s;
                ">Limpiar búsqueda</button>
            `;
            showToast(`Se encontraron ${count} resultado${count > 1 ? 's' : ''}`, 'success');
        } else {
            message.innerHTML = `
                <strong style="color: var(--color-black); font-size: 1.1rem;">
                    No se encontraron productos para "${term}"
                </strong>
                <p style="margin-top: 0.5rem; color: var(--color-gray-dark);">
                    Intenta con otros términos como: "diamond", "gold", "ring", "necklace", etc.
                </p>
                <button onclick="clearSearch()" style="
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background: var(--color-gold);
                    color: var(--color-black);
                    border: none;
                    cursor: pointer;
                    font-family: var(--font-primary);
                    font-weight: bold;
                    border-radius: 0;
                    transition: all 0.3s;
                ">Mostrar todos los productos</button>
            `;
            showToast('No se encontraron resultados', 'error');
        }

        // Insertar mensaje después del header de introducción
        const introSection = document.querySelector('.section[style*="padding-top: 40px"]');
        if (introSection) {
            introSection.after(message);
        } else {
            const firstSection = document.querySelector('.section');
            if (firstSection) {
                firstSection.before(message);
            }
        }
    }

    // Función global para limpiar búsqueda
    window.clearSearch = function() {
        const productCards = document.querySelectorAll('.product-card');
        const sections = document.querySelectorAll('.section[id^="hk-signature"], .section[id^="miami-luxe"], .section[id^="royal-diamonds"], .section[id^="custom-by-hk"]');
        
        productCards.forEach((card, index) => {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 30);
        });
        
        sections.forEach(section => {
            section.style.display = '';
        });

        const message = document.getElementById('searchResultsMessage');
        if (message) {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }

        // Limpiar input de búsqueda
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
        }

        // Limpiar parámetro de URL
        if (window.location.search.includes('search=')) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        // Scroll suave hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });

        showToast('Búsqueda limpiada', 'success');
    };

    // Si hay un parámetro de búsqueda en la URL, ejecutar búsqueda automáticamente
    setTimeout(() => {
        if (window.location.pathname.includes('products.html') || window.location.pathname.endsWith('/')) {
            const urlParams = new URLSearchParams(window.location.search);
            const searchParam = urlParams.get('search');
            if (searchParam) {
                // Establecer el valor en el input
                const searchInput = document.getElementById('searchInput');
                if (searchInput) {
                    searchInput.value = searchParam;
                }
                // Ejecutar búsqueda después de que la página cargue completamente
                setTimeout(() => {
                    filterProducts(searchParam);
                }, 800);
            }
        }
    }, 100);

    // Efecto de cursor personalizado para elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .collection-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'pointer';
        });
        el.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'default';
        });
    });

    // Animación de números (para estadísticas si las hay)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Observar elementos con clase .counter
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Efecto de parallax suave para imágenes
    const parallaxImages = document.querySelectorAll('.parallax-image');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = img.dataset.speed || 0.5;
                const yPos = -(rect.top * speed);
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // Mejorar transición de imágenes al cargar
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Smooth scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Efecto de typing para textos importantes (opcional)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Aplicar efecto de typing a elementos con data-typing
    document.querySelectorAll('[data-typing]').forEach(el => {
        const text = el.dataset.typing;
        const typingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter(el, text);
                    typingObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        typingObserver.observe(el);
    });
});

