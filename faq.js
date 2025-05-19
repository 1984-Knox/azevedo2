// Dados do FAQ
const faqData = [
    {
        question: "Quais são as áreas de atuação do escritório?",
        answer: "O escritório Azevedo Advogados atua principalmente nas áreas de Direito Penal, Direito Civil, Direito Empresarial e Direito Tributário, oferecendo serviços jurídicos especializados para cada uma dessas áreas."
    },
    {
        question: "Como funciona a primeira consulta?",
        answer: "A primeira consulta é agendada por telefone ou e-mail. Durante este encontro, analisamos seu caso, esclarecemos dúvidas e apresentamos as possíveis estratégias jurídicas. Este atendimento inicial é personalizado e confidencial."
    },
    {
        question: "Quanto tempo leva para resolver um processo?",
        answer: "O tempo de resolução varia conforme a complexidade do caso e a instância judicial. Processos simples podem ser resolvidos em meses, enquanto casos mais complexos podem levar anos. Nosso compromisso é buscar a solução mais ágil possível, mantendo você informado durante todo o processo."
    },
    {
        question: "O escritório atende em outras cidades?",
        answer: "Sim, além da sede em São Paulo, o escritório Azevedo Advogados atende em diversas cidades do Brasil. Para casos em outras localidades, contamos com uma rede de advogados correspondentes ou nos deslocamos conforme a necessidade do cliente."
    },
    {
        question: "Como são cobrados os honorários?",
        answer: "Os honorários são definidos após a análise inicial do caso, podendo ser fixos, por fase processual ou com base no êxito. Apresentamos uma proposta clara e transparente, formalizada em contrato, para que você conheça antecipadamente os valores envolvidos."
    }
];

// Função para criar os elementos do FAQ
function createFaqElements() {
    const faqContainer = document.querySelector('.faq-container');
    
    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <div class="faq-question">
                ${item.question}
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;
        
        faqContainer.appendChild(faqItem);
    });
    
    // Inicializar o FAQ
    initFaq();
}

// Função para inicializar o FAQ
function initFaq() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            
            // Verificar se o item já está ativo
            const isActive = faqItem.classList.contains('active');
            
            // Fechar todos os itens
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir o item clicado (se não estava ativo)
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.faq-container')) {
        createFaqElements();
    }
});
