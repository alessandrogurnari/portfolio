/**
 * CLIENT HEADER MANAGER - GESTIONE ORDINAMENTO HEADER CLIENTI
 * 
 * Questo file gestisce:
 * - Ordinamento automatico degli header clienti con il più recente in cima
 * - Aggiunta dinamica di nuovi header clienti
 * - Persistenza dell'ordine nel localStorage
 * - Animazioni fluide per il riordinamento
 */

class ClientHeaderManager {
    constructor() {
        this.storageKey = 'clientHeadersOrder';
        this.containerSelector = '#clients .container';
        this.clientSectionSelector = '.client-works-section';
        this.init();
    }

    init() {
        // Applica l'ordinamento quando la pagina è caricata
        this.applyClientOrder();
        
        // Espone metodi pubblici per aggiungere nuovi clienti
        window.addNewClient = (clientData) => this.addNewClient(clientData);
        window.reorderClients = () => this.applyClientOrder();
    }

    /**
     * Applica l'ordinamento degli header clienti
     * Il più recente va in cima alla lista
     */
    applyClientOrder() {
        const container = document.querySelector(this.containerSelector);
        if (!container) return;

        const clientSections = Array.from(container.querySelectorAll(this.clientSectionSelector));
        if (clientSections.length === 0) return;

        // Carica l'ordine salvato dal localStorage
        const savedOrder = this.getSavedOrder();
        
        // Se non c'è un ordine salvato, crea uno basato sulla posizione attuale
        if (!savedOrder || savedOrder.length === 0) {
            this.initializeOrder(clientSections);
            return;
        }

        // Riordina le sezioni clienti secondo l'ordine salvato
        this.reorderSections(clientSections, savedOrder);
    }

    /**
     * Inizializza l'ordine per la prima volta
     */
    initializeOrder(clientSections) {
        const order = clientSections.map((section, index) => ({
            id: section.id,
            timestamp: Date.now() - (index * 1000) // Il primo ha timestamp più recente
        }));
        
        this.saveOrder(order);
    }

    /**
     * Riordina le sezioni clienti secondo l'ordine specificato
     */
    reorderSections(clientSections, savedOrder) {
        const container = document.querySelector(this.containerSelector);
        const titleElement = container.querySelector('.section-title');
        const subtitleElement = container.querySelector('.section-subtitle');
        
        // Trova la posizione dove inserire le sezioni clienti (dopo titolo e sottotitolo)
        let insertAfter = subtitleElement;
        if (!insertAfter) {
            insertAfter = titleElement;
        }
        if (!insertAfter) {
            insertAfter = container.firstElementChild;
        }

        // Rimuovi tutte le sezioni clienti dal DOM
        clientSections.forEach(section => {
            section.remove();
        });

        // Riordina secondo l'ordine salvato (più recente = indice più basso)
        const sortedOrder = savedOrder.sort((a, b) => b.timestamp - a.timestamp);
        
        // Reinserisci le sezioni nell'ordine corretto
        sortedOrder.forEach(orderItem => {
            const section = clientSections.find(s => s.id === orderItem.id);
            if (section) {
                // Aggiungi animazione di entrata
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                
                insertAfter.insertAdjacentElement('afterend', section);
                
                // Anima l'entrata
                requestAnimationFrame(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                });
            }
        });
    }

    /**
     * Aggiunge un nuovo cliente in cima alla lista
     */
    addNewClient(clientData) {
        const container = document.querySelector(this.containerSelector);
        if (!container) return;

        // Crea la nuova sezione cliente
        const newSection = this.createClientSection(clientData);
        
        // Aggiungi la nuova sezione in cima
        const titleElement = container.querySelector('.section-title');
        const subtitleElement = container.querySelector('.section-subtitle');
        let insertAfter = subtitleElement || titleElement || container.firstElementChild;
        
        // Aggiungi animazione di entrata
        newSection.style.opacity = '0';
        newSection.style.transform = 'translateY(-20px)';
        newSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        insertAfter.insertAdjacentElement('afterend', newSection);
        
        // Anima l'entrata
        requestAnimationFrame(() => {
            newSection.style.opacity = '1';
            newSection.style.transform = 'translateY(0)';
        });

        // Aggiorna l'ordine nel localStorage
        this.updateOrderWithNewClient(newSection.id);
        
        // Reinizializza gli event listeners per il nuovo header
        this.initializeHeaderEvents(newSection);
        
        return newSection;
    }

    /**
     * Crea una nuova sezione cliente con la struttura HTML corretta
     */
    createClientSection(clientData) {
        const section = document.createElement('div');
        section.id = clientData.id;
        section.className = 'client-works-section';
        
        section.innerHTML = `
            <div class="client-works-header" role="button" tabindex="0" aria-expanded="false" aria-label="Espandi progetti ${clientData.name}">
                <img src="${clientData.logo}" alt="${clientData.name}" class="client-works-logo">
                <div class="client-works-info">
                    <h3>${clientData.name}</h3>
                    <p>${clientData.description}</p>
                </div>
                <div class="client-works-arrow">
                    <i class="fas fa-chevron-down"></i>
                </div>
            </div>
            
            <div class="projects-grid" id="projects-grid-${clientData.id}">
                ${clientData.projects.map(project => `
                    <div class="project-card">
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.name}">
                            <div class="project-overlay">
                                <a href="${project.pdfLink}" target="_blank" class="btn btn-primary">
                                    Apri PDF
                                </a>
                            </div>
                        </div>
                        <div class="project-content">
                            <h4>${project.name}</h4>
                            <p>${project.description}</p>
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="projects-navigation" style="display: ${clientData.projects.length <= 3 ? 'none' : 'flex'}">
                <button class="nav-arrow" id="prev-projects-${clientData.id}">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="nav-arrow" id="next-projects-${clientData.id}">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        
        return section;
    }

    /**
     * Aggiorna l'ordine nel localStorage aggiungendo il nuovo cliente in cima
     */
    updateOrderWithNewClient(newClientId) {
        const currentOrder = this.getSavedOrder();
        const newOrder = [
            {
                id: newClientId,
                timestamp: Date.now()
            },
            ...currentOrder
        ];
        
        this.saveOrder(newOrder);
    }

    /**
     * Inizializza gli event listeners per un header cliente
     */
    initializeHeaderEvents(section) {
        const header = section.querySelector('.client-works-header');
        const arrow = header.querySelector('.client-works-arrow');
        const projectsGrid = section.querySelector('.projects-grid');
        
        // Aggiungi l'event listener per l'accordion
        header.addEventListener('click', function() {
            const isCurrentlyOpen = projectsGrid.style.display === 'grid';
            
            // Chiudi altri header aperti
            const allHeaders = document.querySelectorAll('.client-works-header');
            allHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherArrow = otherHeader.querySelector('.client-works-arrow');
                    const otherProjectsGrid = otherHeader.closest('.client-works-section').querySelector('.projects-grid');
                    
                    if (otherProjectsGrid.style.display === 'grid') {
                        otherArrow.classList.remove('active');
                        otherProjectsGrid.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                        otherProjectsGrid.style.opacity = '0';
                        otherProjectsGrid.style.transform = 'scale(0.95)';
                        
                        requestAnimationFrame(() => {
                            setTimeout(() => {
                                otherProjectsGrid.style.setProperty('display', 'none', 'important');
                                otherProjectsGrid.style.transform = 'none';
                                if (window.projectsNavigation) {
                                    window.projectsNavigation.toggleGridNavigation(otherProjectsGrid.id, false);
                                }
                            }, 300);
                        });
                    }
                }
            });
            
            // Gestisci header corrente
            if (isCurrentlyOpen) {
                arrow.classList.remove('active');
                projectsGrid.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                projectsGrid.style.opacity = '0';
                projectsGrid.style.transform = 'scale(0.95)';
                
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        projectsGrid.style.setProperty('display', 'none', 'important');
                        projectsGrid.style.transform = 'none';
                        if (window.projectsNavigation) {
                            window.projectsNavigation.toggleGridNavigation(projectsGrid.id, false);
                        }
                    }, 300);
                });
            } else {
                arrow.classList.add('active');
                projectsGrid.style.display = 'grid';
                projectsGrid.style.opacity = '0';
                projectsGrid.style.transform = 'scale(0.95)';
                projectsGrid.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        projectsGrid.style.opacity = '1';
                        projectsGrid.style.transform = 'scale(1)';
                        if (window.projectsNavigation) {
                            window.projectsNavigation.toggleGridNavigation(projectsGrid.id, true);
                        }
                    }, 50);
                });
            }
        });
        
        // Nascondi inizialmente i progetti
        projectsGrid.style.setProperty('display', 'none', 'important');
    }

    /**
     * Salva l'ordine nel localStorage
     */
    saveOrder(order) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(order));
        } catch (error) {
            console.error('Errore nel salvataggio dell\'ordine clienti:', error);
        }
    }

    /**
     * Carica l'ordine dal localStorage
     */
    getSavedOrder() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Errore nel caricamento dell\'ordine clienti:', error);
            return [];
        }
    }

    /**
     * Resetta l'ordine (utile per testing)
     */
    resetOrder() {
        localStorage.removeItem(this.storageKey);
        this.applyClientOrder();
    }
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    window.clientHeaderManager = new ClientHeaderManager();
});

// Esempio di utilizzo per aggiungere un nuovo cliente:
/*
// Esempio di come aggiungere un nuovo cliente
const newClientData = {
    id: 'nuovo-cliente-works',
    name: 'Nuovo Cliente',
    description: 'Descrizione del nuovo cliente',
    logo: './assets/images/clients/nuovo-cliente.png',
    projects: [
        {
            name: 'Progetto 1',
            description: 'Descrizione del progetto 1',
            image: './assets/projects/nuovo-cliente/progetto_1_copertina.jpg',
            pdfLink: './assets/projects/nuovo-cliente/progetto_1.pdf',
            tags: ['Tag1', 'Tag2']
        }
    ]
};

// Aggiungi il nuovo cliente (andrà automaticamente in cima)
window.addNewClient(newClientData);
*/

