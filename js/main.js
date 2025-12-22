document.addEventListener('DOMContentLoaded', function() {
    
    // Generar elementos de construcción (líneas y nodos)
    function generateConstructionElements() {
        const container = document.getElementById('construction-lines');
        if (!container) return;
        
        // Limpiar elementos existentes
        container.innerHTML = '';
        
        // Generar líneas
        for (let i = 0; i < 15; i++) {
            const line = document.createElement('div');
            line.className = 'construction-line';
            
            // Posición aleatoria
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const width = Math.random() * 200 + 50;
            const angle = Math.random() * 360;
            
            line.style.top = `${top}%`;
            line.style.left = `${left}%`;
            line.style.width = `${width}px`;
            line.style.height = '1px';
            line.style.transform = `rotate(${angle}deg)`;
            
            // Animación de movimiento lento
            const duration = Math.random() * 20 + 10;
            line.style.animation = `moveLine ${duration}s linear infinite`;
            
            container.appendChild(line);
        }
        
        // Generar nodos
        for (let i = 0; i < 30; i++) {
            const node = document.createElement('div');
            node.className = 'construction-node';
            
            // Posición aleatoria
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            
            node.style.top = `${top}%`;
            node.style.left = `${left}%`;
            node.style.animationDelay = `${Math.random() * 4}s`;
            
            container.appendChild(node);
        }
        
        // Añadir keyframes para animación de líneas
        if (!document.getElementById('line-animation')) {
            const style = document.createElement('style');
            style.id = 'line-animation';
            style.textContent = `
                @keyframes moveLine {
                    0% { transform: rotate(${Math.random() * 360}deg) translateX(0); }
                    100% { transform: rotate(${Math.random() * 360}deg) translateX(${Math.random() > 0.5 ? 100 : -100}px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    // Abrir menú
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Cerrar menú
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Cerrar menú al hacer clic en enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Sistema de animación suave al hacer scroll
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.section-header, .problem-card, .service-card, .seriousness-item, .process-step, .project-card, .contact-title, .contact-description, .contact-method, .contact-cta');
        
        // Función para verificar si un elemento es visible
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
            );
        }
        
        // Función para animar elementos
        function animateOnScroll() {
            animatedElements.forEach(el => {
                if (isElementInViewport(el)) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
            
            // Mostrar/ocultar botón de scroll
            const scrollIndicator = document.getElementById('scroll-indicator');
            if (scrollIndicator) {
                if (window.scrollY > 300) {
                    scrollIndicator.classList.add('visible');
                } else {
                    scrollIndicator.classList.remove('visible');
                }
            }
            
            // Actualizar header
            const header = document.getElementById('header');
            if (header) {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Ocultar header al hacer scroll hacia abajo
                let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                if (window.scrollY > lastScrollTop && window.scrollY > 200) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
                
                lastScrollTop = window.scrollY <= 0 ? 0 : window.scrollY;
            }
        }
        
        // Configurar elementos para animación
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Ejecutar una vez al cargar
    }
    
    // Botón de scroll hacia arriba
    const scrollIndicator = document.getElementById('scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Inicializar todo
    generateConstructionElements();
    initScrollAnimations();
    
    // Actualizar elementos de construcción al redimensionar
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(generateConstructionElements, 250);
    });
    
    // Efecto suave al cargar la página
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
});