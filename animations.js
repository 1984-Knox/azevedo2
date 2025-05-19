// Script para animações avançadas de rolagem

// Função para inicializar as animações de revelação
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-down, .reveal-scale, .reveal-rotate');
    
    // Função para verificar se um elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Função para adicionar classe de animação aos elementos visíveis
    function handleScroll() {
        revealElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('active')) {
                element.classList.add('active');
            }
        });
    }
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Verificar elementos visíveis no carregamento inicial
    handleScroll();
}

// Função para inicializar o efeito parallax
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function updateParallax() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const offset = scrollTop * speed;
            element.style.transform = `translateY(${offset}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    updateParallax();
}

// Função para inicializar o efeito de destaque durante a rolagem
function initHighlightOnScroll() {
    const highlightElements = document.querySelectorAll('.highlight-on-scroll');
    
    function isElementInCenter(el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (
            rect.top <= windowHeight * 0.6 &&
            rect.bottom >= windowHeight * 0.4
        );
    }
    
    function handleScroll() {
        highlightElements.forEach(element => {
            if (isElementInCenter(element)) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

// Função para adicionar efeito de ondas ao fundo
function initWaveBackground() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        if (!section.classList.contains('wave-bg')) {
            section.classList.add('wave-bg');
        }
    });
}

// Função para adicionar efeito de flutuação
function initFloatAnimation() {
    const elements = [
        document.querySelector('.logo'),
        ...document.querySelectorAll('.service-icon'),
        ...document.querySelectorAll('.counter-item')
    ];
    
    elements.forEach(element => {
        if (element) {
            element.classList.add('float-animation');
        }
    });
}

// Função para adicionar efeito de ripple aos botões
function initButtonRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Função para aplicar classes de animação aos elementos existentes
function applyAnimationClasses() {
    // Aplicar classes de revelação às seções
    document.querySelector('.hero-content h1').classList.add('reveal-left');
    document.querySelector('.hero-content p').classList.add('reveal-right');
    document.querySelector('.hero-content .btn').classList.add('reveal-up');
    
    // Sobre nós
    const aboutSection = document.querySelector('#sobre');
    aboutSection.querySelector('h2').classList.add('reveal-up');
    aboutSection.querySelector('p:first-of-type').classList.add('reveal-left');
    aboutSection.querySelector('p:last-of-type').classList.add('reveal-right');
    
    // Áreas de atuação
    const areasSection = document.querySelector('#areas');
    areasSection.querySelector('h2').classList.add('reveal-up');
    const serviceCards = areasSection.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        if (index % 2 === 0) {
            card.classList.add('reveal-left');
        } else {
            card.classList.add('reveal-right');
        }
    });
    
    // Contador
    const counterItems = document.querySelectorAll('.counter-item');
    counterItems.forEach((item, index) => {
        item.classList.add('reveal-scale');
        item.classList.add('highlight-on-scroll');
    });
    
    // Depoimentos
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    testimonialItems.forEach(item => {
        item.classList.add('reveal-scale');
    });
    
    // Equipe
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        if (index % 2 === 0) {
            member.classList.add('reveal-left');
        } else {
            member.classList.add('reveal-right');
        }
        member.classList.add('highlight-on-scroll');
    });
    
    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        item.classList.add('reveal-up');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Galeria
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('reveal-scale');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Certificações
    const certificationItems = document.querySelectorAll('.certification-item');
    certificationItems.forEach((item, index) => {
        item.classList.add('reveal-rotate');
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Redes Sociais
    const socialIcons = document.querySelectorAll('.follow-us-icons a');
    socialIcons.forEach((icon, index) => {
        icon.classList.add('reveal-up');
        icon.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Contato
    const contactSection = document.querySelector('#contato');
    contactSection.querySelector('.contact-info').classList.add('reveal-left');
    contactSection.querySelector('.contact-form').classList.add('reveal-right');
    contactSection.querySelector('.map-container').classList.add('reveal-up');
}

// Inicializar todas as animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar classes de animação
    applyAnimationClasses();
    
    // Inicializar animações
    initRevealAnimations();
    initParallaxEffect();
    initHighlightOnScroll();
    initWaveBackground();
    initFloatAnimation();
    initButtonRippleEffect();
    
    // Adicionar classe parallax ao hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('parallax');
        hero.dataset.speed = '0.2';
    }
    
    console.log('Animações avançadas inicializadas');
});
