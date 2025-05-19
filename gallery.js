// Dados da galeria
const galleryItems = [
    {
        image: 'gallery-1.jpg',
        title: 'Escritório Principal',
        description: 'Nossa sede em São Paulo'
    },
    {
        image: 'gallery-2.jpg',
        title: 'Sala de Reuniões',
        description: 'Espaço para atendimento personalizado'
    },
    {
        image: 'gallery-3.jpg',
        title: 'Biblioteca Jurídica',
        description: 'Acervo completo para pesquisa'
    },
    {
        image: 'gallery-4.jpg',
        title: 'Equipe em Ação',
        description: 'Nossos profissionais trabalhando'
    },
    {
        image: 'gallery-5.jpg',
        title: 'Premiações',
        description: 'Reconhecimento da excelência'
    },
    {
        image: 'gallery-6.jpg',
        title: 'Eventos Jurídicos',
        description: 'Participação em congressos e seminários'
    }
];

// Função para criar os elementos da galeria
function createGalleryElements() {
    const galleryContainer = document.querySelector('.gallery-container');
    
    galleryItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        galleryItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        galleryContainer.appendChild(galleryItem);
    });
    
    // Criar o lightbox
    createLightbox();
}

// Função para criar o lightbox
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <div class="lightbox-content">
            <img src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
        <div class="lightbox-nav">
            <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Inicializar o lightbox
    initLightbox();
}

// Função para inicializar o lightbox
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    let currentIndex = 0;
    
    // Função para abrir o lightbox
    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[index];
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('.overlay h3').textContent;
        const description = item.querySelector('.overlay p').textContent;
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = `${title} - ${description}`;
        lightbox.classList.add('active');
        
        // Desabilitar o scroll da página
        document.body.style.overflow = 'hidden';
    }
    
    // Função para fechar o lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        
        // Habilitar o scroll da página
        document.body.style.overflow = '';
    }
    
    // Função para navegar para a imagem anterior
    function prevImage() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : galleryItems.length - 1;
        openLightbox(currentIndex);
    }
    
    // Função para navegar para a próxima imagem
    function nextImage() {
        currentIndex = (currentIndex < galleryItems.length - 1) ? currentIndex + 1 : 0;
        openLightbox(currentIndex);
    }
    
    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Fechar o lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navegação com teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.gallery-container')) {
        createGalleryElements();
    }
});
