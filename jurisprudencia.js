// Integração da API de Jurisprudência

// Configuração da API
const jurisprudenciaConfig = {
    apiUrl: 'https://api.jusbrasil.com.br/search',
    apiKey: 'YOUR_API_KEY', // Substituir pela chave real quando disponível
    defaultParams: {
        q: 'direito penal',
        type: 'jurisprudencia',
        limit: 5
    }
};

// Classe para gerenciar a API de Jurisprudência
class JurisprudenciaAPI {
    constructor(config) {
        this.config = config;
        this.container = document.getElementById('jurisprudencia-container');
        this.searchForm = document.getElementById('jurisprudencia-search');
        this.resultsContainer = document.getElementById('jurisprudencia-results');
        this.loadingIndicator = document.getElementById('jurisprudencia-loading');
        this.errorMessage = document.getElementById('jurisprudencia-error');
        
        this.init();
    }
    
    init() {
        // Inicializar componentes da UI
        this.createUI();
        
        // Adicionar event listeners
        this.addEventListeners();
        
        // Carregar jurisprudências iniciais
        this.loadInitialJurisprudencias();
    }
    
    createUI() {
        // Verificar se o container existe
        if (!this.container) {
            console.error('Container de jurisprudência não encontrado');
            return;
        }
        
        // Criar elementos da UI se não existirem
        if (!this.searchForm) {
            this.searchForm = document.createElement('form');
            this.searchForm.id = 'jurisprudencia-search';
            this.searchForm.className = 'jurisprudencia-search';
            this.searchForm.innerHTML = `
                <div class="search-input-container">
                    <input type="text" id="jurisprudencia-query" placeholder="Pesquisar jurisprudência..." required>
                    <select id="jurisprudencia-area">
                        <option value="direito penal">Direito Penal</option>
                        <option value="direito civil">Direito Civil</option>
                        <option value="direito empresarial">Direito Empresarial</option>
                        <option value="direito tributário">Direito Tributário</option>
                    </select>
                </div>
                <button type="submit" class="search-button">Pesquisar</button>
            `;
            this.container.appendChild(this.searchForm);
        }
        
        if (!this.loadingIndicator) {
            this.loadingIndicator = document.createElement('div');
            this.loadingIndicator.id = 'jurisprudencia-loading';
            this.loadingIndicator.className = 'loading-indicator';
            this.loadingIndicator.innerHTML = '<div class="spinner"></div><p>Carregando jurisprudências...</p>';
            this.loadingIndicator.style.display = 'none';
            this.container.appendChild(this.loadingIndicator);
        }
        
        if (!this.errorMessage) {
            this.errorMessage = document.createElement('div');
            this.errorMessage.id = 'jurisprudencia-error';
            this.errorMessage.className = 'error-message';
            this.errorMessage.style.display = 'none';
            this.container.appendChild(this.errorMessage);
        }
        
        if (!this.resultsContainer) {
            this.resultsContainer = document.createElement('div');
            this.resultsContainer.id = 'jurisprudencia-results';
            this.resultsContainer.className = 'jurisprudencia-results';
            this.container.appendChild(this.resultsContainer);
        }
    }
    
    addEventListeners() {
        if (this.searchForm) {
            this.searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const query = document.getElementById('jurisprudencia-query').value;
                const area = document.getElementById('jurisprudencia-area').value;
                this.searchJurisprudencia(query, area);
            });
        }
    }
    
    loadInitialJurisprudencias() {
        // Simular carregamento inicial com dados de exemplo
        this.showLoading();
        
        // Em produção, substituir por chamada real à API
        setTimeout(() => {
            this.hideLoading();
            this.displayResults(this.getMockJurisprudencias());
        }, 1500);
    }
    
    searchJurisprudencia(query, area) {
        this.showLoading();
        this.clearResults();
        
        // Construir parâmetros de pesquisa
        const searchParams = {
            ...this.config.defaultParams,
            q: `${area} ${query}`
        };
        
        // Em produção, substituir por chamada real à API
        // this.fetchJurisprudencia(searchParams);
        
        // Simulação para demonstração
        setTimeout(() => {
            this.hideLoading();
            
            // Simular resultados diferentes baseados na consulta
            if (query.toLowerCase().includes('habeas') || area.includes('penal')) {
                this.displayResults(this.getMockJurisprudencias().filter(j => j.area.includes('Penal')));
            } else if (query.toLowerCase().includes('contrato') || area.includes('civil')) {
                this.displayResults(this.getMockJurisprudencias().filter(j => j.area.includes('Civil')));
            } else if (query.toLowerCase().includes('tribut') || area.includes('tributário')) {
                this.displayResults(this.getMockJurisprudencias().filter(j => j.area.includes('Tributário')));
            } else {
                this.displayResults(this.getMockJurisprudencias());
            }
        }, 1500);
    }
    
    fetchJurisprudencia(params) {
        // Implementação real da chamada à API (quando disponível)
        const url = new URL(this.config.apiUrl);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.config.apiKey}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar jurisprudências');
            }
            return response.json();
        })
        .then(data => {
            this.hideLoading();
            this.displayResults(data.results);
        })
        .catch(error => {
            this.hideLoading();
            this.showError(error.message);
        });
    }
    
    displayResults(results) {
        if (!results || results.length === 0) {
            this.showError('Nenhuma jurisprudência encontrada');
            return;
        }
        
        this.clearResults();
        
        results.forEach(jurisprudencia => {
            const jurisprudenciaCard = document.createElement('div');
            jurisprudenciaCard.className = 'jurisprudencia-card';
            
            jurisprudenciaCard.innerHTML = `
                <div class="jurisprudencia-header">
                    <h3>${jurisprudencia.titulo}</h3>
                    <span class="jurisprudencia-date">${jurisprudencia.data}</span>
                </div>
                <div class="jurisprudencia-body">
                    <p class="jurisprudencia-ementa">${jurisprudencia.ementa}</p>
                </div>
                <div class="jurisprudencia-footer">
                    <span class="jurisprudencia-tribunal">${jurisprudencia.tribunal}</span>
                    <span class="jurisprudencia-area">${jurisprudencia.area}</span>
                    <a href="${jurisprudencia.url}" target="_blank" class="jurisprudencia-link">Ver completo</a>
                </div>
            `;
            
            this.resultsContainer.appendChild(jurisprudenciaCard);
        });
    }
    
    showLoading() {
        if (this.loadingIndicator) {
            this.loadingIndicator.style.display = 'flex';
        }
        if (this.errorMessage) {
            this.errorMessage.style.display = 'none';
        }
    }
    
    hideLoading() {
        if (this.loadingIndicator) {
            this.loadingIndicator.style.display = 'none';
        }
    }
    
    showError(message) {
        if (this.errorMessage) {
            this.errorMessage.textContent = message;
            this.errorMessage.style.display = 'block';
        }
    }
    
    clearResults() {
        if (this.resultsContainer) {
            this.resultsContainer.innerHTML = '';
        }
        if (this.errorMessage) {
            this.errorMessage.style.display = 'none';
        }
    }
    
    // Dados de exemplo para demonstração
    getMockJurisprudencias() {
        return [
            {
                titulo: "Habeas Corpus nº 123456 - STF",
                data: "15/04/2025",
                ementa: "HABEAS CORPUS. TRÁFICO DE DROGAS. PRISÃO PREVENTIVA. AUSÊNCIA DE FUNDAMENTAÇÃO CONCRETA. ORDEM CONCEDIDA. A prisão preventiva, como medida de natureza cautelar, não pode ser utilizada como instrumento de punição antecipada do indiciado ou do réu, nem permite complementação de sua fundamentação pelas instâncias superiores.",
                tribunal: "Supremo Tribunal Federal",
                area: "Direito Penal",
                url: "#"
            },
            {
                titulo: "Recurso Especial nº 789012 - STJ",
                data: "22/03/2025",
                ementa: "RECURSO ESPECIAL. DIREITO CIVIL. CONTRATO DE COMPRA E VENDA. RESCISÃO CONTRATUAL. DEVOLUÇÃO DE VALORES. RETENÇÃO PARCIAL. POSSIBILIDADE. A rescisão de compromisso de compra e venda por culpa do promitente comprador autoriza a retenção de parte das prestações pagas como forma de indenização pelos prejuízos suportados pelo promitente vendedor.",
                tribunal: "Superior Tribunal de Justiça",
                area: "Direito Civil",
                url: "#"
            },
            {
                titulo: "Agravo de Instrumento nº 345678 - TJSP",
                data: "10/02/2025",
                ementa: "AGRAVO DE INSTRUMENTO. RECUPERAÇÃO JUDICIAL. CRÉDITO TRIBUTÁRIO. EXCLUSÃO. INTELIGÊNCIA DO ART. 187 DO CTN E ART. 6º, § 7º, DA LEI 11.101/2005. Os créditos tributários não se submetem ao regime de recuperação judicial, conforme expressa previsão legal.",
                tribunal: "Tribunal de Justiça de São Paulo",
                area: "Direito Empresarial",
                url: "#"
            },
            {
                titulo: "Apelação Cível nº 567890 - TRF3",
                data: "05/01/2025",
                ementa: "TRIBUTÁRIO. IMPOSTO DE RENDA. PESSOA FÍSICA. DESPESAS MÉDICAS. DEDUÇÃO. COMPROVAÇÃO. NECESSIDADE. A dedução de despesas médicas da base de cálculo do imposto de renda exige a efetiva comprovação dos gastos realizados, não bastando a mera declaração do contribuinte.",
                tribunal: "Tribunal Regional Federal da 3ª Região",
                area: "Direito Tributário",
                url: "#"
            },
            {
                titulo: "Recurso Extraordinário nº 901234 - STF",
                data: "18/12/2024",
                ementa: "RECURSO EXTRAORDINÁRIO. DIREITO PENAL. PRINCÍPIO DA INSIGNIFICÂNCIA. REINCIDÊNCIA. POSSIBILIDADE. A reincidência não impede, por si só, a aplicação do princípio da insignificância, devendo ser analisadas as circunstâncias do caso concreto para verificar a lesividade da conduta.",
                tribunal: "Supremo Tribunal Federal",
                area: "Direito Penal",
                url: "#"
            }
        ];
    }
}

// Inicializar a API de Jurisprudência quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se a seção de jurisprudência existe, se não, criar
    let jurisprudenciaSection = document.getElementById('jurisprudencia');
    if (!jurisprudenciaSection) {
        // Criar a seção de jurisprudência antes da seção de contato
        const contatoSection = document.getElementById('contato');
        
        jurisprudenciaSection = document.createElement('section');
        jurisprudenciaSection.id = 'jurisprudencia';
        jurisprudenciaSection.className = 'section';
        
        jurisprudenciaSection.innerHTML = `
            <div class="container">
                <h2 class="section-title">Jurisprudência</h2>
                <p class="section-description">Consulte decisões judiciais relevantes para o seu caso</p>
                <div id="jurisprudencia-container" class="jurisprudencia-container"></div>
            </div>
        `;
        
        // Inserir antes da seção de contato
        if (contatoSection && contatoSection.parentNode) {
            contatoSection.parentNode.insertBefore(jurisprudenciaSection, contatoSection);
        } else {
            // Se não encontrar a seção de contato, adicionar ao final do body
            document.body.appendChild(jurisprudenciaSection);
        }
    }
    
    // Adicionar link no menu de navegação
    const menu = document.getElementById('menu');
    if (menu) {
        const contatoMenuItem = Array.from(menu.querySelectorAll('li')).find(li => 
            li.querySelector('a') && li.querySelector('a').getAttribute('href') === '#contato'
        );
        
        if (contatoMenuItem) {
            const jurisprudenciaMenuItem = document.createElement('li');
            jurisprudenciaMenuItem.innerHTML = '<a href="#jurisprudencia">Jurisprudência</a>';
            
            menu.insertBefore(jurisprudenciaMenuItem, contatoMenuItem);
        }
    }
    
    // Inicializar a API
    const jurisprudenciaAPI = new JurisprudenciaAPI(jurisprudenciaConfig);
});
