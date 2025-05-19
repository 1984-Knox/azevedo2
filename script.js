// Menu Mobile
const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    const active = nav.classList.contains('active');
    event.currentTarget.setAttribute('aria-expanded', active);
    if (active) {
        event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
    } else {
        event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
    }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);

// Fechar menu ao clicar em um item
const menuItems = document.querySelectorAll('#menu a');
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const nav = document.getElementById('nav');
        nav.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Formulário de Contato
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Capturar os dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Em um ambiente real, aqui seria feita uma requisição AJAX para enviar os dados para o servidor
    // Como é um exemplo, vamos simular o envio e mostrar a mensagem de sucesso
    
    // Simular envio de e-mail automático
    sendAutoResponse(name, email);
    
    // Mostrar mensagem de sucesso
    formSuccess.style.display = 'block';
    
    // Limpar formulário
    contactForm.reset();
    
    // Esconder mensagem de sucesso após 5 segundos
    setTimeout(() => {
        formSuccess.style.display = 'none';
    }, 5000);
});

// Função para simular o envio de e-mail automático
function sendAutoResponse(name, email) {
    // Em um ambiente real, esta função enviaria uma requisição para o backend
    // que por sua vez enviaria um e-mail para o usuário
    console.log(`E-mail automático enviado para ${email}`);
    
    // Conteúdo do e-mail que seria enviado
    const emailContent = `
        Olá ${name},
        
        Agradecemos por entrar em contato com o escritório Azevedo Advogados.
        
        Recebemos sua mensagem e entraremos em contato o mais breve possível.
        
        Atenciosamente,
        Equipe Azevedo Advogados
    `;
    
    console.log('Conteúdo do e-mail:', emailContent);
}

// Animação de elementos ao scroll
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.section-title, .area-card, .team-member, .stat');
    
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
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated', 'fadeIn');
            }
        });
    }
    
    // Adicionar evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Verificar elementos visíveis no carregamento inicial
    handleScroll();
});

// Implementação de e-mail automático com EmailJS (simulação)
// Em um ambiente real, você precisaria incluir a biblioteca EmailJS e configurar sua conta
function setupEmailJS() {
    // Simulação da configuração do EmailJS
    console.log('EmailJS configurado');
    
    // Em um ambiente real, você usaria algo como:
    /*
    emailjs.init("YOUR_USER_ID");
    
    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";
    const templateParams = {
        name: name,
        email: email,
        message: message
    };
    
    emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
            console.log('E-mail enviado!', response.status, response.text);
            formSuccess.style.display = 'block';
            contactForm.reset();
        }, function(error) {
            console.log('Falha no envio...', error);
            alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
        });
    */
}

// Inicializar a simulação do EmailJS
setupEmailJS();
