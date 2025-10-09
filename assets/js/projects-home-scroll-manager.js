/**
 * PROJECTS SCROLL MANAGER - GESTIONE SCROLL DINAMICO ULTIMI PROGETTI
 * 
 * Questo file gestisce il comportamento dinamico del padding
 * per la sezione "Ultimi Progetti" su smartphone
 */

class ProjectsScrollManager {
    constructor() {
        this.projectsGrid = null;
        this.container = null;
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Aspetta che il DOM sia caricato
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        this.projectsGrid = document.querySelector('.ultimi-progetti .projects-grid');
        this.container = document.querySelector('.ultimi-progetti .container');
        
        if (!this.projectsGrid || !this.container) {
            return;
        }
        
        // Solo per dispositivi touch (smartphone, mobile, tablet)
        if (window.innerWidth > 1023) {
            return;
        }
        
        this.isInitialized = true;
        this.updateScrollState();
        this.bindEvents();
    }

    bindEvents() {
        if (!this.isInitialized) return;
        
        // Gestisci scroll - istantaneo senza delay
        this.projectsGrid.addEventListener('scroll', () => {
            this.updateScrollState();
        });
        
        // Gestisci resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 1023) {
                this.updateScrollState();
            }
        });
    }

    updateScrollState() {
        if (!this.isInitialized) return;
        
        const scrollLeft = this.projectsGrid.scrollLeft;
        const maxScroll = this.projectsGrid.scrollWidth - this.projectsGrid.clientWidth;
        const threshold = 50; // Soglia aumentata per rilevamento più affidabile
        
        // Rimuovi tutte le classi di stato
        this.container.classList.remove('scroll-start', 'scroll-middle', 'scroll-end');
        
        // Se non c'è scroll disponibile, mantieni stato iniziale
        if (maxScroll <= 0) {
            this.container.classList.add('scroll-start');
            return;
        }
        
        // Applica la classe corretta in base alla posizione
        if (scrollLeft >= maxScroll - threshold) {
            // STATO FINE - solo padding destro
            this.container.classList.add('scroll-end');
        } else if (scrollLeft > threshold) {
            // STATO SCROLL - nessun padding laterale
            this.container.classList.add('scroll-middle');
        } else {
            // STATO INIZIALE - solo padding sinistro
            this.container.classList.add('scroll-start');
        }
    }
}

// Inizializza il manager
new ProjectsScrollManager();
