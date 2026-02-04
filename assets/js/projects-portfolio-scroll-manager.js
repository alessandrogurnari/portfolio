/**
 * PROJECTS PORTFOLIO SCROLL MANAGER
 * Gestisce lo scroll dinamico per le sezioni portfolio su smartphone
 */

class ProjectsPortfolioScrollManager {
    constructor() {
        this.projectsGrids = [];
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        // Solo per dispositivi touch (smartphone, mobile, tablet)
        if (window.innerWidth > 1023) return;
        
        setTimeout(() => {
            this.setupPortfolioListeners();
        }, 100);
    }
    
    setupPortfolioListeners() {
        const clientHeaders = document.querySelectorAll('.client-works-header');
        
        clientHeaders.forEach(header => {
            header.addEventListener('click', () => {
                setTimeout(() => {
                    this.initializePortfolioSection(header);
                }, 350);
            });
        });
    }
    
    initializePortfolioSection(header) {
        const clientSection = header.closest('.client-works-section');
        const projectsGrid = clientSection.querySelector('.projects-grid');
        
        if (!projectsGrid || projectsGrid.style.display !== 'grid') return;
        
        // Controlla se già inizializzato
        if (this.projectsGrids.includes(projectsGrid)) return;
        
        // Aggiungi alla lista
        this.projectsGrids.push(projectsGrid);
        
        // Applica classe iniziale
        projectsGrid.classList.add('scroll-start');
        
        // Inizializza scroll state
        const gridIndex = this.projectsGrids.length - 1;
        this.updateScrollState(gridIndex);
        
        // Aggiungi event listener
        projectsGrid.addEventListener('scroll', () => {
            this.updateScrollState(gridIndex);
        });
        
        this.isInitialized = true;
    }

    updateScrollState(gridIndex = 0) {
        if (!this.isInitialized || !this.projectsGrids[gridIndex]) return;
        
        const projectsGrid = this.projectsGrids[gridIndex];
        const scrollLeft = projectsGrid.scrollLeft;
        const maxScroll = projectsGrid.scrollWidth - projectsGrid.clientWidth;
        const threshold = 50;
        
        // Rimuovi tutte le classi
        projectsGrid.classList.remove('scroll-start', 'scroll-middle', 'scroll-end');
        
        // Se non c'è scroll, mantieni stato iniziale
        if (maxScroll <= 0) {
            projectsGrid.classList.add('scroll-start');
            return;
        }
        
        // Applica la classe corretta
        if (scrollLeft >= maxScroll - threshold) {
            projectsGrid.classList.add('scroll-end');
        } else if (scrollLeft > threshold) {
            projectsGrid.classList.add('scroll-middle');
        } else {
            projectsGrid.classList.add('scroll-start');
        }
    }
}

// Inizializza solo nella pagina portfolio
if (document.body.classList.contains('portfolio')) {
    new ProjectsPortfolioScrollManager();
}
