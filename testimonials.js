// Dados dos depoimentos
const testimonials = [
    {
        name: "Maria Silva",
        company: "Empresa ABC",
        text: "O escritório Azevedo Advogados foi fundamental para a resolução do nosso caso tributário complexo. Profissionalismo e excelência em todos os aspectos.",
        rating: 5
    },
    {
        name: "João Oliveira",
        company: "Empreendedor",
        text: "Após 3 anos tentando resolver meu caso com outros escritórios, a equipe do Azevedo Advogados conseguiu uma solução em apenas 6 meses. Recomendo fortemente.",
        rating: 5
    },
    {
        name: "Carolina Mendes",
        company: "Grupo XYZ",
        text: "Atendimento personalizado e estratégias jurídicas eficientes. O conhecimento técnico da equipe fez toda a diferença no nosso processo.",
        rating: 5
    }
];

// Função para criar os elementos de depoimentos
function createTestimonialElements() {
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    testimonials.forEach((testimonial, index) => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = 'testimonial-item';
        
        // Criar as estrelas baseadas na avaliação
        let starsHTML = '';
        for (let i = 0; i < testimonial.rating; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        testimonialItem.innerHTML = `
            <div class="testimonial-content">
                <div class="testimonial-text">
                    <p>"${testimonial.text}"</p>
                </div>
                <div class="testimonial-info">
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.company}</p>
                    <div class="testimonial-rating">
                        ${starsHTML}
                    </div>
                </div>
            </div>
        `;
        
        testimonialSlider.appendChild(testimonialItem);
    });
    
    // Adicionar navegação
    const navButtons = document.createElement('div');
    navButtons.className = 'testimonial-nav';
    
    navButtons.innerHTML = `
        <button class="prev-btn"><i class="fas fa-chevron-left"></i></button>
        <div class="testimonial-dots"></div>
        <button class="next-btn"><i class="fas fa-chevron-right"></i></button>
    `;
    
    testimonialContainer.appendChild(navButtons);
    
    // Criar os pontos de navegação
    const dotsContainer = document.querySelector('.testimonial-dots');
    testimonials.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        dotsContainer.appendChild(dot);
    });
    
    // Inicializar o slider
    initTestimonialSlider();
}

// Função para inicializar o slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    // Função para atualizar o slider
    function updateSlider() {
        const itemWidth = document.querySelector('.testimonial-item').offsetWidth;
        slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Atualizar os pontos ativos
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Event listeners para os botões
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });
    
    // Event listeners para os pontos
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            updateSlider();
        });
    });
    
    // Auto-play do slider
    setInterval(() => {
        currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000);
    
    // Inicializar o slider
    updateSlider();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.testimonial-container')) {
        createTestimonialElements();
    }
});
