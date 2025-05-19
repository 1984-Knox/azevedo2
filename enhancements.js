// Funções para animações de entrada
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    
    // Função para verificar se um elemento está visível na tela
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Função para adicionar classe de animação aos elementos visíveis
    function handleScroll() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Verificar elementos visíveis no carregamento inicial
    handleScroll();
}

// Dados de certificações e prêmios
const certificationsData = [
    {
        icon: 'fa-award',
        title: 'Escritório do Ano',
        year: '2024',
        description: 'Premiado como melhor escritório de advocacia na categoria Direito Penal pela Associação Brasileira de Advogados.'
    },
    {
        icon: 'fa-trophy',
        title: 'Excelência Jurídica',
        year: '2023',
        description: 'Reconhecimento por excelência em serviços jurídicos e contribuição para o desenvolvimento do Direito no Brasil.'
    },
    {
        icon: 'fa-medal',
        title: 'Top 10 Advogados',
        year: '2022',
        description: 'Nosso sócio fundador foi eleito um dos 10 melhores advogados do país na área de Direito Empresarial.'
    },
    {
        icon: 'fa-certificate',
        title: 'ISO 9001',
        year: '2021',
        description: 'Certificação de qualidade nos processos de gestão e atendimento ao cliente, garantindo excelência em todos os serviços.'
    }
];

// Função para criar os elementos de certificações
function createCertificationElements() {
    const certificationsContainer = document.querySelector('.certifications-container');
    
    certificationsData.forEach(item => {
        const certificationItem = document.createElement('div');
        certificationItem.className = 'certification-item fade-in';
        
        certificationItem.innerHTML = `
            <div class="certification-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <h3 class="certification-title">${item.title}</h3>
            <div class="certification-year">${item.year}</div>
            <p class="certification-description">${item.description}</p>
        `;
        
        certificationsContainer.appendChild(certificationItem);
    });
}

// Função para inicializar o Google Maps
function initGoogleMaps() {
    // O iframe do Google Maps é adicionado diretamente no HTML
    console.log('Google Maps inicializado');
}

// Traduções para a versão em inglês
const translations = {
    'pt': {
        'menu': {
            'inicio': 'Início',
            'sobre': 'Sobre Nós',
            'areas': 'Áreas de Atuação',
            'equipe': 'Equipe',
            'depoimentos': 'Depoimentos',
            'galeria': 'Galeria',
            'faq': 'Perguntas Frequentes',
            'certificacoes': 'Certificações',
            'contato': 'Contato'
        },
        'hero': {
            'title': 'Excelência Jurídica há 20 anos',
            'subtitle': 'Soluções jurídicas personalizadas para casos complexos',
            'button': 'Entre em Contato'
        },
        // Adicione mais traduções conforme necessário
    },
    'en': {
        'menu': {
            'inicio': 'Home',
            'sobre': 'About Us',
            'areas': 'Practice Areas',
            'equipe': 'Team',
            'depoimentos': 'Testimonials',
            'galeria': 'Gallery',
            'faq': 'FAQ',
            'certificacoes': 'Awards',
            'contato': 'Contact'
        },
        'hero': {
            'title': '20 Years of Legal Excellence',
            'subtitle': 'Customized legal solutions for complex cases',
            'button': 'Contact Us'
        },
        // Adicione mais traduções conforme necessário
    }
};

// Função para alternar o idioma
function switchLanguage(lang) {
    // Salvar a preferência de idioma
    localStorage.setItem('language', lang);
    
    // Atualizar os botões de idioma
    document.querySelectorAll('.language-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Atualizar os textos traduzíveis
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.dataset.translate;
        const parts = key.split('.');
        
        if (parts.length === 2 && translations[lang] && translations[lang][parts[0]] && translations[lang][parts[0]][parts[1]]) {
            element.textContent = translations[lang][parts[0]][parts[1]];
        }
    });
    
    console.log(`Idioma alterado para: ${lang}`);
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações
    initAnimations();
    
    // Inicializar certificações
    if (document.querySelector('.certifications-container')) {
        createCertificationElements();
    }
    
    // Inicializar Google Maps
    if (document.querySelector('.map-container')) {
        initGoogleMaps();
    }
    
    // Inicializar seletor de idioma
    const languageBtns = document.querySelectorAll('.language-btn');
    if (languageBtns.length > 0) {
        // Verificar se há uma preferência de idioma salva
        const savedLanguage = localStorage.getItem('language') || 'pt';
        
        // Definir o idioma inicial
        switchLanguage(savedLanguage);
        
        // Adicionar event listeners aos botões de idioma
        languageBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                switchLanguage(lang);
            });
        });
    }
});
