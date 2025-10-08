/**
 * GESTIONE NAVIGAZIONE PROGETTI - PORTFOLIO
 * 
 * Questo file gestisce:
 * - Visualizzazione di 3 card alla volta su desktop
 * - Navigazione con frecce sinistra/destra
 * - Logica per mostrare/nascondere le frecce
 * - Scroll smooth e gestione stati bottoni
 */

class ProjectsNavigation {
    constructor() {
        this.projectGrids = document.querySelectorAll('.projects-grid');
        this.init();
    }

    init() {
        this.projectGrids.forEach(grid => {
            this.setupGrid(grid);
        });
        
        // Rileva il resize per cambiare comportamento
        window.addEventListener('resize', () => {
            // Controlla se ci sono progetti aperti e riattiva la logica corretta
            this.projectGrids.forEach(grid => {
                const isOpen = grid.style.display === 'grid' || grid.style.display === 'flex' || grid.style.display === 'block';
                if (isOpen) {
                    if (this.isMobileOrTablet()) {
                        this.setupMobileTabletGrid(grid);
                    } else {
                        // Su desktop, riattiva la logica normale
                        this.setupGrid(grid);
                    }
                }
            });
        });
    }
    
    // Rileva se siamo su mobile o tablet
    isMobileOrTablet() {
        return window.innerWidth <= 1023; // Breakpoint desktop (1024px)
        // Copre: Mobile (0-575px) + Gap (576-767px) + Tablet (768-1023px)
        // Usa <= 1023 per essere coerente con @include md-down (max-width: 1023px)
    }
    
    // Setup per mobile/tablet: mostra tutte le card
    setupMobileTabletGrid(grid) {
        // Mostra tutte le card
        const cards = grid.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'none';
            // Mantieni le transizioni per le animazioni hover
        });
        
        // Nascondi le frecce
        const navigation = grid.nextElementSibling;
        if (navigation) {
            navigation.style.display = 'none';
        }
    }
    

    setupGrid(grid) {
        const navigation = grid.nextElementSibling; // .projects-navigation
        if (!navigation) return;

        const prevButton = navigation.querySelector('.nav-arrow:first-child');
        const nextButton = navigation.querySelector('.nav-arrow:last-child');
        
        if (!prevButton || !nextButton) {
            return;
        }

        // Nascondi inizialmente le frecce
        navigation.style.display = 'none';
        
        // Su mobile/tablet, non fare nulla qui - le card saranno mostrate solo quando l'header viene cliccato
        if (this.isMobileOrTablet()) {
            return;
        }
        
        // Abilita i bottoni
        prevButton.disabled = false;
        nextButton.disabled = false;

        // Funzione per aggiornare lo stato dei bottoni
        const updateButtonStates = () => {
            const cards = grid.querySelectorAll('.project-card');
            const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
            const firstVisibleIndex = Array.from(cards).indexOf(visibleCards[0]);
            const lastVisibleIndex = Array.from(cards).indexOf(visibleCards[visibleCards.length - 1]);
            
            prevButton.disabled = firstVisibleIndex <= 0;
            nextButton.disabled = lastVisibleIndex >= cards.length - 1;
        };

        // Event listeners per le frecce
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showPreviousCards(grid);
        });

        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showNextCards(grid);
        });

        // Aggiorna lo stato dei bottoni quando cambiano le card visibili
        // (gestito dalle funzioni showPreviousCards e showNextCards)

        // Funzione per mostrare/nascondere le frecce
        const toggleNavigation = (show) => {
            if (show) {
                const totalCards = grid.querySelectorAll('.project-card').length;
                
                if (totalCards <= 3) {
                    // Caso A: 1-3 card - nascondi frecce, mostra tutte
                    navigation.style.display = 'none';
                    grid.classList.remove('open');
                    // Mostra tutte le card (la griglia CSS gestisce il posizionamento)
                    grid.querySelectorAll('.project-card').forEach(card => {
                        card.style.display = 'block';
                        card.style.opacity = '1';
                        card.style.transform = 'none';
                        card.style.transition = 'none';
                    });
                } else {
                    // Caso B: 4+ card - mostra frecce, limita a 3
                    navigation.style.display = 'flex';
                    navigation.style.marginTop = '4px'; 
                    grid.classList.add('open');
                    this.limitVisibleCards(grid, 3);
                    updateButtonStates();
                }
            } else {
                navigation.style.display = 'none';
                grid.classList.remove('open');
                // Mostra tutte le card quando si chiude (la griglia CSS gestisce il posizionamento)
                grid.querySelectorAll('.project-card').forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.style.transition = 'none';
                });
            }
        };

        // Esponi la funzione per essere chiamata dall'esterno
        grid.toggleNavigation = toggleNavigation;
    }

    // Funzione per limitare le card visibili
    limitVisibleCards(grid, maxCards) {
        const cards = grid.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            if (index < maxCards) {
                // Prime 3 card: visibili (nessuna animazione)
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.style.transition = 'none';
            } else {
                // Card successive: nascoste
                card.style.display = 'none';
                card.style.opacity = '1';
                card.style.transform = 'none';
            }
        });
    }

    // Funzione per mostrare le card precedenti
    showPreviousCards(grid) {
        const cards = grid.querySelectorAll('.project-card');
        const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
        const firstVisibleIndex = Array.from(cards).indexOf(visibleCards[0]);
        
        if (firstVisibleIndex > 0) {
            // Fade out delle card attualmente visibili con transizione più fluida
            visibleCards.forEach(card => {
                card.style.transition = 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
            });
            
            // Dopo il fade out, cambia le card
            setTimeout(() => {
                // Nascondi le vecchie card
                visibleCards.forEach(card => {
                    card.style.display = 'none';
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.style.transition = 'none';
                });
                
                // Mostra le nuove card con posizione iniziale
                for (let i = Math.max(0, firstVisibleIndex - 3); i < firstVisibleIndex; i++) {
                    cards[i].style.display = 'block';
                    cards[i].style.opacity = '0';
                    cards[i].style.transform = 'translateY(-10px)';
                    cards[i].style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
                
                // Fade in delle nuove card con movimento fluido
                setTimeout(() => {
                    for (let i = Math.max(0, firstVisibleIndex - 3); i < firstVisibleIndex; i++) {
                        cards[i].style.opacity = '1';
                        cards[i].style.transform = 'translateY(0)';
                    }
                    
                    // Aggiorna lo stato dei bottoni dopo che le nuove card sono visibili
                    this.updateButtonStates(grid);
                    
                    // Ricalcola le altezze delle card per uniformità
                    if (window.setDynamicCardHeights) {
                        window.setDynamicCardHeights();
                    }
                }, 50);
            }, 400);
        }
    }

    // Funzione per mostrare le card successive
    showNextCards(grid) {
        const cards = grid.querySelectorAll('.project-card');
        const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
        const lastVisibleIndex = Array.from(cards).indexOf(visibleCards[visibleCards.length - 1]);
        
        if (lastVisibleIndex < cards.length - 1) {
            // Fade out delle card attualmente visibili con transizione più fluida
            visibleCards.forEach(card => {
                card.style.transition = 'opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '0';
                card.style.transform = 'translateY(-10px)';
            });
            
            // Dopo il fade out, cambia le card
            setTimeout(() => {
                // Nascondi le vecchie card
                visibleCards.forEach(card => {
                    card.style.display = 'none';
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.style.transition = 'none';
                });
                
                // Mostra le nuove card con posizione iniziale
                for (let i = lastVisibleIndex + 1; i < Math.min(cards.length, lastVisibleIndex + 4); i++) {
                    cards[i].style.display = 'block';
                    cards[i].style.opacity = '0';
                    cards[i].style.transform = 'translateY(10px)';
                    cards[i].style.transition = 'opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
                
                // Fade in delle nuove card con movimento fluido
                setTimeout(() => {
                    for (let i = lastVisibleIndex + 1; i < Math.min(cards.length, lastVisibleIndex + 4); i++) {
                        cards[i].style.opacity = '1';
                        cards[i].style.transform = 'translateY(0)';
                    }
                    
                    // Aggiorna lo stato dei bottoni dopo che le nuove card sono visibili
                    this.updateButtonStates(grid);
                    
                    // Ricalcola le altezze delle card per uniformità
                    if (window.setDynamicCardHeights) {
                        window.setDynamicCardHeights();
                    }
                }, 50);
            }, 400);
        }
    }

    // Metodo per aggiornare lo stato dei bottoni
    updateButtonStates(grid) {
        const navigation = grid.nextElementSibling;
        if (!navigation) return;
        
        const prevButton = navigation.querySelector('.nav-arrow:first-child');
        const nextButton = navigation.querySelector('.nav-arrow:last-child');
        if (!prevButton || !nextButton) return;
        
        const cards = grid.querySelectorAll('.project-card');
        const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
        const firstVisibleIndex = Array.from(cards).indexOf(visibleCards[0]);
        const lastVisibleIndex = Array.from(cards).indexOf(visibleCards[visibleCards.length - 1]);
        
        prevButton.disabled = firstVisibleIndex <= 0;
        nextButton.disabled = lastVisibleIndex >= cards.length - 1;
    }

    // Metodo pubblico per attivare/disattivare la navigazione
    toggleGridNavigation(gridId, isOpen) {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        // Su mobile/tablet, mostra sempre tutte le card
        if (this.isMobileOrTablet()) {
            this.setupMobileTabletGrid(grid);
            return;
        }
        
        // Su desktop, usa la logica normale
        if (grid.toggleNavigation) {
            grid.toggleNavigation(isOpen);
        }
    }
}

// Inizializza quando il DOM è pronto
document.addEventListener('DOMContentLoaded', function() {
    window.projectsNavigation = new ProjectsNavigation();
});
