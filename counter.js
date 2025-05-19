// Contador de casos
const counterData = [
    {
        value: 500,
        label: 'Casos de Sucesso',
        prefix: '+',
        suffix: ''
    },
    {
        value: 20,
        label: 'Anos de Experiência',
        prefix: '',
        suffix: ''
    },
    {
        value: 100,
        label: 'Clientes Satisfeitos',
        prefix: '+',
        suffix: '%'
    },
    {
        value: 30,
        label: 'Advogados Especializados',
        prefix: '',
        suffix: ''
    }
];

// Função para inicializar o contador
function initCounter() {
    const counterItems = document.querySelectorAll('.counter-item');
    
    counterItems.forEach((item, index) => {
        const counterValue = item.querySelector('.counter-value');
        const finalValue = parseInt(counterValue.dataset.value);
        const duration = 2000; // 2 segundos
        const interval = 20; // 20ms
        const steps = duration / interval;
        const increment = finalValue / steps;
        let currentValue = 0;
        
        // Função para animar o contador
        function animateCounter() {
            currentValue += increment;
            
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            
            // Formatar o valor com prefixo e sufixo
            const prefix = counterValue.dataset.prefix || '';
            const suffix = counterValue.dataset.suffix || '';
            counterValue.textContent = prefix + Math.floor(currentValue) + suffix;
        }
        
        // Iniciar a animação quando o elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(animateCounter, interval);
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

// Função para criar os elementos do contador
function createCounterElements() {
    const counterContainer = document.querySelector('.counter-container');
    
    counterData.forEach(data => {
        const counterItem = document.createElement('div');
        counterItem.className = 'counter-item';
        
        counterItem.innerHTML = `
            <div class="counter-value" data-value="${data.value}" data-prefix="${data.prefix}" data-suffix="${data.suffix}">0</div>
            <div class="counter-label">${data.label}</div>
        `;
        
        counterContainer.appendChild(counterItem);
    });
    
    // Inicializar o contador
    initCounter();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.counter-container')) {
        createCounterElements();
    }
});
