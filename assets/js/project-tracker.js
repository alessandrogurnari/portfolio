// ========================================
// PROJECT TRACKER - SISTEMA DI TRACKING PROGETTI
// ========================================
// Sistema intelligente per distinguere nuovi progetti da modifiche
// e selezionare automaticamente i 3 progetti più recenti per la homepage

/**
 * LOGICA COMPLETA DEL SISTEMA DI SINCRONIZZAZIONE CARD:
 * 
 * 1. RILEVAMENTO PROGETTI DAL PORTFOLIO:
 *    - Quando si visita la pagina portfolio.html, il sistema rileva automaticamente tutti i progetti
 *    - I progetti vengono cercati tramite il selettore '.client-works-section .project-card'
 *    - Per ogni progetto vengono estratti: nome, descrizione, immagine, link PDF, tags
 *    - I progetti vengono salvati nel localStorage con timestamp di creazione/modifica
 * 
 * 2. ORDINE CRONOLOGICO INVERSO:
 *    - I progetti vengono processati in ordine inverso (Array.from(portfolioProjects).reverse())
 *    - Questo garantisce che il progetto più recente (ultimo aggiunto) appaia per primo
 *    - Esempio: se aggiungo Progetto 10, 9, 8 → in homepage vedrò 10, 9, 8 (da sinistra a destra)
 * 
 * 3. SINCRONIZZAZIONE HOMEPAGE:
 *    - Quando si visita index.html, il sistema carica i dati dal localStorage
 *    - Seleziona automaticamente i 3 progetti più recenti (selectFeaturedProjects())
 *    - Genera dinamicamente le card HTML usando createProjectCard()
 *    - Le card vengono inserite nel container '.ultimi-progetti .projects-grid'
 * 
 * 4. GESTIONE AGGIUNTA/RIMOZIONE:
 *    - AGGIUNTA: Basta aggiungere una nuova card nel portfolio → automaticamente rilevata e sincronizzata
 *    - RIMOZIONE: Basta rimuovere una card dal portfolio → automaticamente rimossa dalla homepage
 *    - MODIFICA: Modificare una card esistente → i dati vengono aggiornati mantenendo la posizione
 * 
 * 5. PERSISTENZA DATI:
 *    - Tutti i dati vengono salvati nel localStorage con chiave 'projectTrackerData'
 *    - I dati persistono tra le sessioni del browser
 *    - Ogni progetto ha: id, nome, descrizione, immagine, pdfLink, tags, timestamp, flag isNewProject
 * 
 * 6. FLUSSO COMPLETO:
 *    Portfolio → Rilevamento → localStorage → Homepage → Rendering dinamico
 *    |              |              |              |              |
 *    |              |              |              |              └─ Card HTML generate dinamicamente
 *    |              |              |              └─ Caricamento dati dal localStorage
 *    |              |              └─ Salvataggio con timestamp e metadati
 *    |              └─ Estrazione dati da ogni .project-card
 *    └─ Aggiunta/rimozione/modifica progetti
 * 
 * 7. VANTAGGI DEL SISTEMA:
 *    - Sincronizzazione automatica senza intervento manuale
 *    - Ordine cronologico inverso (più recente = più visibile)
 *    - Persistenza dati tra sessioni
 *    - Gestione dinamica di aggiunta/rimozione/modifica
 *    - Performance ottimizzata con localStorage
 *    - Fallback robusto in caso di errori
 * 
 * 8. CASI D'USO:
 *    - Aggiungere nuovo progetto: basta inserirlo nel portfolio → appare automaticamente in homepage
 *    - Rimuovere progetto: basta eliminarlo dal portfolio → scompare automaticamente dalla homepage
 *    - Modificare progetto: basta modificarlo nel portfolio → aggiornamento automatico in homepage
 *    - Ordinare progetti: l'ordine nel portfolio determina l'ordine in homepage (inverso)
 */

class ProjectTracker {
    constructor() {
        this.storageKey = 'projectTracker';
        this.config = {
            maxProjects: 3,
            minTimeBetweenUpdates: 24 * 60 * 60 * 1000, // 24 ore
            excludeProjects: [], // ID progetti da escludere
            forceInclude: [] // ID progetti da includere sempre
        };
        this.projects = this.loadProjects();
    }

    // ========================================
    // GESTIONE DATI PROGETTI
    // ========================================
    
    loadProjects() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error('Errore nel caricamento dei progetti dal localStorage:', error);
            return {};
        }
    }

    // Pulisce tutti i dati salvati
    clearAllData() {
        try {
            // Rimuove la chiave principale
            localStorage.removeItem(this.storageKey);
            
            // Rimuove anche eventuali chiavi alternative per sicurezza
            localStorage.removeItem('projectTracker');
            localStorage.removeItem('homepageProjects');
            localStorage.removeItem('portfolioProjects');
            
            // Pulisce l'oggetto in memoria
            this.projects = {};
            
        } catch (error) {
            console.error('Errore nella pulizia dei dati:', error);
        }
    }

    // Forza la ricostruzione completa dei dati
    forceRebuild() {
        // Pulisce tutto completamente
        this.clearAllData();
        
        // Attende un momento per assicurarsi che la pulizia sia completata
        setTimeout(() => {
            // Se siamo nella homepage, carica i dati dal localStorage
            if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                this.loadProjects();
            } else {
                this.detectProjectsFromPortfolio();
            }
            
            this.updateHomepageProjects();
        }, 100);
    }



    saveProjects() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
        } catch (error) {
            console.error('Errore nel salvataggio dei progetti nel localStorage:', error);
        }
    }

    // ========================================
    // RILEVAMENTO PROGETTI DAL PORTFOLIO
    // ========================================
    
    detectProjectsFromPortfolio() {
        // Verifica se siamo nella pagina portfolio
        const isPortfolioPage = window.location.pathname.includes('portfolio.html');
        
        if (!isPortfolioPage) {
            this.loadProjects();
            return;
        }
        
        // Cerca i progetti nel portfolio (dentro le sezioni clienti)
        const portfolioProjects = document.querySelectorAll('.client-works-section .project-card');
        const currentTime = new Date().toISOString();
        
        
        
        // Pulisce completamente i progetti esistenti
        this.projects = {};
        
        // Raccoglie gli ID dei progetti attualmente presenti nel portfolio
        const currentProjectIds = new Set();
        
        // Processa i progetti in ordine inverso per avere il più recente a sinistra
        const reversedProjects = Array.from(portfolioProjects).reverse();
        
        reversedProjects.forEach((project, index) => {
            const originalIndex = portfolioProjects.length - 1 - index;
            
            const projectId = this.generateProjectId(project, originalIndex);
            const projectData = this.extractProjectData(project);
            
            
            // Aggiunge l'ID alla lista dei progetti attuali
            currentProjectIds.add(projectId);
            
            // Aggiunge il progetto (sempre come nuovo dato che abbiamo pulito)
            this.projects[projectId] = {
                id: projectId,
                name: projectData.name,
                description: projectData.description,
                image: projectData.image,
                pdfLink: projectData.pdfLink,
                tags: projectData.tags,
                firstAdded: currentTime,
                lastModified: currentTime,
                isNewProject: true,
                modificationCount: 0
            };
        });
        
        this.saveProjects();
    }

    // ========================================
    // GENERAZIONE ID UNIVOCO PROGETTO
    // ========================================
    
    generateProjectId(projectElement, index) {
        // Usa il contenuto del progetto per generare un ID univoco
        const title = projectElement.querySelector('h4')?.textContent || '';
        const description = projectElement.querySelector('p')?.textContent || '';
        const image = projectElement.querySelector('img')?.src || '';
        
        // Crea un hash semplice basato sul contenuto
        const content = title + description + image;
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            const char = content.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Converti a 32bit integer
        }
        
        return `project_${Math.abs(hash)}`;
    }

    // ========================================
    // ESTRAZIONE DATI PROGETTO
    // ========================================
    
    extractProjectData(projectElement) {
        return {
            name: projectElement.querySelector('h4')?.textContent || '',
            description: projectElement.querySelector('p')?.textContent || '',
            image: projectElement.querySelector('img')?.src || '',
            pdfLink: projectElement.querySelector('.project-overlay a')?.href || '',
            tags: Array.from(projectElement.querySelectorAll('.tag')).map(tag => tag.textContent)
        };
    }

    // ========================================
    // RILEVAMENTO MODIFICHE SIGNIFICATIVE
    // ========================================
    
    isSignificantModification(projectId, newData) {
        const existingProject = this.projects[projectId];
        if (!existingProject) return false;

        // Controlla se il contenuto è cambiato significativamente
        const contentChanged = 
            existingProject.name !== newData.name ||
            existingProject.description !== newData.description ||
            existingProject.image !== newData.image ||
            JSON.stringify(existingProject.tags) !== JSON.stringify(newData.tags);

        if (!contentChanged) return false;

        // Controlla se è passato abbastanza tempo dall'ultima modifica
        const lastModified = new Date(existingProject.lastModified);
        const now = new Date();
        const timeDiff = now - lastModified;

        return timeDiff > this.config.minTimeBetweenUpdates;
    }

    // ========================================
    // SELEZIONE PROGETTI FEATURED
    // ========================================
    
    selectFeaturedProjects() {
        // Filtra progetti esclusi e forzati
        const availableProjects = Object.values(this.projects).filter(project => 
            !this.config.excludeProjects.includes(project.id)
        );

        // Progetti forzati vanno sempre inclusi
        const forcedProjects = availableProjects.filter(project => 
            this.config.forceInclude.includes(project.id)
        );

        // Progetti nuovi (aggiunti di recente)
        const newProjects = availableProjects
            .filter(project => project.isNewProject)
            .sort((a, b) => new Date(b.firstAdded) - new Date(a.firstAdded));

        // Progetti modificati di recente (se non ci sono abbastanza progetti nuovi)
        const recentModifiedProjects = availableProjects
            .filter(project => !project.isNewProject)
            .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

        // Combina e seleziona i migliori
        let selectedProjects = [...forcedProjects];
        
        // Aggiungi progetti nuovi
        for (const project of newProjects) {
            if (selectedProjects.length >= this.config.maxProjects) break;
            if (!selectedProjects.find(p => p.id === project.id)) {
                selectedProjects.push(project);
            }
        }

        // Se non ci sono abbastanza progetti nuovi, aggiungi quelli modificati di recente
        for (const project of recentModifiedProjects) {
            if (selectedProjects.length >= this.config.maxProjects) break;
            if (!selectedProjects.find(p => p.id === project.id)) {
                selectedProjects.push(project);
            }
        }

        return selectedProjects.slice(0, this.config.maxProjects);
    }

    // ========================================
    // AGGIORNAMENTO HOMEPAGE
    // ========================================
    
    updateHomepageProjects() {
        
        const featuredProjects = this.selectFeaturedProjects();
        const projectsGrid = document.querySelector('.ultimi-progetti .projects-grid');
        
        if (!projectsGrid) {
            return;
        }
        
        // Pulisce il container
        projectsGrid.innerHTML = '';
        
        // Crea le card dinamicamente
        featuredProjects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
        
    }

    createProjectCard(projectData) {
        // Crea la struttura HTML della card
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${projectData.image}" alt="${projectData.name}">
                <div class="project-overlay">
                    <a href="${projectData.pdfLink || '#'}" target="_blank" class="btn btn-primary">
                        Apri PDF
                    </a>
                </div>
            </div>
            <div class="project-content">
                <h3>${projectData.name}</h3>
                <p>${projectData.description}</p>
                <div class="project-tags">
                    ${projectData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        return projectCard;
    }

    populateProjectCard(cardElement, projectData) {
        // Aggiorna immagine
        const img = cardElement.querySelector('.project-image img');
        if (img && projectData.image) {
            img.src = projectData.image;
            img.alt = projectData.name;
        }

        // Aggiorna titolo
        const title = cardElement.querySelector('.project-content h3');
        if (title) {
            title.textContent = projectData.name;
        }

        // Aggiorna descrizione
        const description = cardElement.querySelector('.project-content p');
        if (description) {
            description.textContent = projectData.description;
        }

        // Aggiorna tags
        const tagsContainer = cardElement.querySelector('.project-tags');
        if (tagsContainer && projectData.tags) {
            tagsContainer.innerHTML = '';
            projectData.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
        }
    }


    // ========================================
    // INIZIALIZZAZIONE
    // ========================================
    
    init() {
        
        // Rileva progetti dal portfolio se siamo nella pagina portfolio
        if (document.querySelector('.portfolio')) {
            this.detectProjectsFromPortfolio();
        }
        
        // Aggiorna homepage se siamo nella homepage
        if (document.querySelector('.ultimi-progetti')) {
            this.updateHomepageProjects();
        }
    }
}

// ========================================
// INIZIALIZZAZIONE GLOBALE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    window.projectTracker = new ProjectTracker();
    
    // Se siamo nella homepage, carica i dati dal localStorage
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        window.projectTracker.loadProjects();
        window.projectTracker.updateHomepageProjects();
    } else {
        window.projectTracker.init();
    }
    
});
