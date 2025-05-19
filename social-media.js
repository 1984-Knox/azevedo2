// Funcionalidades para os destaques de redes sociais

// Dados das redes sociais
const socialMediaLinks = {
    facebook: "https://facebook.com/azevedoadvogados",
    instagram: "https://instagram.com/azevedoadvogados",
    linkedin: "https://linkedin.com/company/azevedoadvogados",
    twitter: "https://twitter.com/azevedoadvogados",
    youtube: "https://youtube.com/c/azevedoadvogados"
};

// Dados do feed do Instagram (simulado)
const instagramFeedData = [
    {
        image: 'instagram-1.jpg',
        link: 'https://instagram.com/p/123456',
        caption: 'Palestra sobre Direito Empresarial'
    },
    {
        image: 'instagram-2.jpg',
        link: 'https://instagram.com/p/234567',
        caption: 'Equipe em conferência internacional'
    },
    {
        image: 'instagram-3.jpg',
        link: 'https://instagram.com/p/345678',
        caption: 'Novo artigo publicado na revista jurídica'
    },
    {
        image: 'instagram-4.jpg',
        link: 'https://instagram.com/p/456789',
        caption: 'Celebrando 20 anos de excelência jurídica'
    }
];

// Função para criar a barra lateral de redes sociais
function createSocialSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'social-sidebar';
    
    // Adicionar links de redes sociais
    for (const [platform, url] of Object.entries(socialMediaLinks)) {
        const link = document.createElement('a');
        link.href = url;
        link.className = platform;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = `<i class="fab fa-${platform}"></i>`;
        sidebar.appendChild(link);
    }
    
    document.body.appendChild(sidebar);
}

// Função para adicionar ícones sociais no cabeçalho
function addHeaderSocialIcons() {
    const header = document.querySelector('header .container');
    const socialDiv = document.createElement('div');
    socialDiv.className = 'header-social';
    
    // Adicionar links de redes sociais
    for (const [platform, url] of Object.entries(socialMediaLinks)) {
        if (['facebook', 'instagram', 'linkedin'].includes(platform)) { // Apenas as 3 principais no cabeçalho
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `<i class="fab fa-${platform}"></i>`;
            socialDiv.appendChild(link);
        }
    }
    
    header.appendChild(socialDiv);
}

// Função para criar a seção "Siga-nos"
function createFollowUsSection() {
    const section = document.createElement('section');
    section.className = 'follow-us-section';
    section.id = 'redes-sociais';
    
    section.innerHTML = `
        <div class="container">
            <h2 class="follow-us-title">Siga-nos nas Redes Sociais</h2>
            <p class="follow-us-text">Acompanhe nosso conteúdo jurídico, novidades do escritório e mantenha-se atualizado sobre seus direitos.</p>
            <div class="follow-us-icons">
                <a href="${socialMediaLinks.facebook}" class="facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
                <a href="${socialMediaLinks.instagram}" class="instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                <a href="${socialMediaLinks.linkedin}" class="linkedin" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
                <a href="${socialMediaLinks.twitter}" class="twitter" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                <a href="${socialMediaLinks.youtube}" class="youtube" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
            </div>
            <div class="instagram-feed">
                <!-- Feed do Instagram será inserido via JavaScript -->
            </div>
            <a href="${socialMediaLinks.instagram}" class="instagram-link" target="_blank" rel="noopener noreferrer">Ver mais no Instagram</a>
        </div>
    `;
    
    // Inserir antes do rodapé
    const footer = document.querySelector('footer');
    document.body.insertBefore(section, footer);
    
    // Criar o feed do Instagram
    createInstagramFeed();
}

// Função para criar o feed do Instagram
function createInstagramFeed() {
    const feedContainer = document.querySelector('.instagram-feed');
    
    instagramFeedData.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'instagram-post';
        
        postElement.innerHTML = `
            <img src="${post.image}" alt="${post.caption}">
            <a href="${post.link}" class="overlay" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-instagram"></i>
            </a>
        `;
        
        feedContainer.appendChild(postElement);
    });
}

// Função para criar o pop-up estratégico
function createSocialPopup() {
    const popup = document.createElement('div');
    popup.className = 'social-popup';
    
    popup.innerHTML = `
        <div class="social-popup-header">
            <div class="social-popup-title">Conecte-se conosco</div>
            <button class="social-popup-close">&times;</button>
        </div>
        <div class="social-popup-content">
            <p>Siga o Azevedo Advogados nas redes sociais para conteúdo jurídico exclusivo e atualizações.</p>
            <div class="social-popup-icons">
                <a href="${socialMediaLinks.facebook}" class="facebook" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
                <a href="${socialMediaLinks.instagram}" class="instagram" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                <a href="${socialMediaLinks.linkedin}" class="linkedin" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Adicionar evento para fechar o pop-up
    const closeButton = popup.querySelector('.social-popup-close');
    closeButton.addEventListener('click', () => {
        popup.classList.remove('show');
        // Salvar no localStorage para não mostrar novamente na mesma sessão
        localStorage.setItem('socialPopupClosed', 'true');
    });
    
    // Mostrar o pop-up após 30 segundos, se não tiver sido fechado antes
    setTimeout(() => {
        if (!localStorage.getItem('socialPopupClosed')) {
            popup.classList.add('show');
        }
    }, 30000);
    
    // Mostrar o pop-up quando o usuário estiver prestes a sair da página
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY < 0 && !localStorage.getItem('socialPopupClosed')) {
            popup.classList.add('show');
        }
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Criar a barra lateral de redes sociais
    createSocialSidebar();
    
    // Adicionar ícones sociais no cabeçalho
    addHeaderSocialIcons();
    
    // Criar a seção "Siga-nos"
    createFollowUsSection();
    
    // Criar o pop-up estratégico
    createSocialPopup();
    
    // Adicionar link para redes sociais no menu de navegação
    const menu = document.querySelector('#menu');
    const contactItem = document.querySelector('#menu li:last-child');
    
    const socialItem = document.createElement('li');
    socialItem.innerHTML = '<a href="#redes-sociais">Redes Sociais</a>';
    
    menu.insertBefore(socialItem, contactItem);
});
