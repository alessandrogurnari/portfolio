/**
 * PROJECT CARD TOUCH MANAGER
 * ========================================
 * Gestisce i click/tap sulle card dei progetti per dispositivi touch
 * (smartphone, mobile, tablet) escluso desktop
 * 
 * LOGICA:
 * 1. Al primo click/tap sulla card → mostra overlay con pulsante "Apri PDF"
 * 2. Al click/tap sul pulsante "Apri PDF" → apre il PDF (non download)
 * 3. Al click/tap fuori o in un punto generico della card → nasconde l'overlay
 */

class ProjectCardTouchManager {
    constructor() {
        this.activeCard = null;
        this.isInitialized = false;
        
        // Controlla se è un dispositivo touch
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        
        if (!isTouchDevice) {
            return; // Exit if not a touch device, let CSS hover handle it
        }
        
        // Controlla se è desktop (larghezza > 1023px)
        if (window.innerWidth > 1023) {
            return; // Exit if desktop, let CSS hover handle it
        }
        
        // Inizializza sempre, anche se le card non sono ancora presenti
        this.initialize();
    }

    initialize() {
        // Inizializza sempre, anche se le card non sono ancora presenti
        this.setupTouchListeners();
        this.isInitialized = true;
    }

    setupTouchListeners() {
        // Variabili per rilevare swipe vs tap
        let touchStartX = 0;
        let touchStartY = 0;
        let lastTouchWasScroll = false;

        const moveThreshold = 10; // px

        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        }, { passive: true });

        // Gestisce tap/click sulle card dei progetti (click = desktop/tap convertito, touchend = autentico tap mobile)
        const handleTap = (e) => {
            // Se touchend ma movimento oltre soglia => consideralo scroll, esci
            if (e.type === 'touchend' && e.changedTouches && e.changedTouches[0]) {
                const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
                const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
                if (dx > moveThreshold || dy > moveThreshold) {
                    lastTouchWasScroll = true; // segna che era scroll
                    return;
                }
                lastTouchWasScroll = false;
            }

            // Se siamo in un evento click generato dopo uno scroll, ignoralo
            if (e.type === 'click' && lastTouchWasScroll) {
                lastTouchWasScroll = false;
                return;
            }

            // Cerca la card più vicina
            const projectCard = e.target.closest('.project-card');
            const pdfButton = e.target.closest('.project-overlay .btn');
            const overlay = e.target.closest('.project-overlay');
            const projectImage = e.target.closest('.project-image');

            // Se non c'è una card, esci
            if (!projectCard) {
                if (this.activeCard) {
                    this.hideOverlay();
                }
                return;
            }

            // Priorità 1: click sul pulsante PDF
            if (pdfButton) {
                e.preventDefault();
                e.stopPropagation();
                this.openPDF(pdfButton);
                return;
            }

            // Priorità 2: Se clicchi sull'overlay (ma non sul pulsante PDF) e c'è una card attiva, chiudi overlay
            if (overlay && !pdfButton && this.activeCard) {
                e.preventDefault();
                e.stopPropagation();
                this.hideOverlay();
                return;
            }

            // Priorità 3: Se esiste una card attiva e il click è dentro la stessa card (ma non sull'overlay), chiudi overlay
            if (this.activeCard && projectCard === this.activeCard && !overlay) {
                e.preventDefault();
                e.stopPropagation();
                this.hideOverlay();
                return;
            }

            // Priorità 4: Se clicchi su una nuova card, apri overlay
            if (projectCard && this.activeCard !== projectCard) {
                e.preventDefault();
                e.stopPropagation();
                this.showOverlay(projectCard);
                return;
            }
        };

        // Ascolta sia click (alcuni browser mobile li generano) sia touchend (tap puro)
        ['click', 'touchend'].forEach(evt => {
            document.addEventListener(evt, handleTap, { passive: false });
        });
    }

    showOverlay(projectCard) {
        // Nasconde l'overlay della card precedentemente attiva
        if (this.activeCard && this.activeCard !== projectCard) {
            this.hideOverlay();
        }
        
        // Mostra l'overlay della card corrente
        const overlay = projectCard.querySelector('.project-overlay');
        const image = projectCard.querySelector('.project-image img');
        
        if (overlay) {
            overlay.classList.add('open');
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            overlay.style.setProperty('pointer-events', 'auto', 'important');

            // Assicura che il pulsante PDF riceva i tap anche su mobile
            const pdfBtn = overlay.querySelector('.btn');
            if (pdfBtn) {
                pdfBtn.style.pointerEvents = 'auto';
            }

            // Listener diretto sull'overlay per chiuderlo al tap
            const closeOnTap = (ev) => {
                // Se il tap è sul pulsante PDF, lascia gestire al listener principale
                if (ev.target.closest('.project-overlay .btn')) {
                    return;
                }
                ev.preventDefault();
                ev.stopPropagation();
                this.hideOverlay();
            };
            ['click', 'touchend'].forEach(evt => {
                overlay.addEventListener(evt, closeOnTap, { once: true });
            });
            // Niente listener diretto: il click sull'overlay viene già gestito
            // dal listener globale con priorità 2 (condizione overlay && !pdfButton)
            this.activeCard = projectCard;
            
            // Aggiungi una classe per identificare la card attiva
            projectCard.classList.add('touch-active');
            
            // Aggiungi la classe touch-active anche al project-image per il CSS
            const projectImage = projectCard.querySelector('.project-image');
            if (projectImage) {
                projectImage.classList.add('touch-active');
            }
            
            // Aggiungi effetto scale all'immagine
            if (image) {
                image.style.transform = 'scale(1.05) !important';
                image.style.transition = 'transform 0.3s ease';
                image.style.willChange = 'transform';
            }
        }
    }

    hideOverlay() {
        if (this.activeCard) {
            const overlay = this.activeCard.querySelector('.project-overlay');
            const image = this.activeCard.querySelector('.project-image img');
            const projectImage = this.activeCard.querySelector('.project-image');
            
            if (overlay) {
                // Disabilita subito i click
                overlay.style.setProperty('pointer-events', 'none', 'important');

                // Rimuovi la classe touch-active dall'immagine PRIMA della transizione:
                if (projectImage) {
                    projectImage.classList.remove('touch-active');
                }

                // Rimuovi la classe open (che rende il bottone visibile) DOPO la transizione CSS
                const transitionDuration = 200; // deve corrispondere a CSS
                setTimeout(() => {
                    overlay.classList.remove('open');
                    overlay.style.visibility = 'hidden';
                }, transitionDuration);
            }
            
            // Rimuovi l'effetto scale dall'immagine con transizione
            if (image) {
                image.style.transform = 'scale(1)';
                image.style.transition = 'transform 0.3s ease';
                image.style.willChange = 'transform';
                
                // Rimuovi willChange dopo la transizione
                setTimeout(() => {
                    image.style.willChange = 'auto';
                }, 300);
            }
            
            // Rimuovi la classe touch-active dalla card e dal project-image
            this.activeCard.classList.remove('touch-active');
            // projectImage class già rimossa sopra
            this.activeCard = null;
        }
    }

    openPDF(pdfButton) {
        // Feedback visivo veloce sul pulsante
        if (pdfButton) {
            pdfButton.classList.add('pressed');
            setTimeout(() => pdfButton.classList.remove('pressed'), 150);
        }

        const pdfLink = pdfButton.getAttribute('href');
        if (pdfLink && pdfLink !== '#') {
            // Metodo specifico per dispositivi mobile - forza l'apertura del PDF
            try {
                // Metodo 1: Crea un iframe visibile temporaneo per aprire il PDF
                const iframe = document.createElement('iframe');
                iframe.style.position = 'fixed';
                iframe.style.top = '0';
                iframe.style.left = '0';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.zIndex = '9999';
                iframe.style.backgroundColor = 'white';
                iframe.src = pdfLink;
                document.body.appendChild(iframe);
                
                // (Rimosso) Messaggio informativo non più necessario
                
                // Aggiungi un pulsante per chiudere
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '✕ Chiudi';
                closeBtn.style.position = 'fixed';
                closeBtn.style.top = '10px';
                closeBtn.style.right = '10px';
                closeBtn.style.zIndex = '10001';
                closeBtn.style.padding = '10px 20px';
                closeBtn.style.backgroundColor = '#333';
                closeBtn.style.color = 'white';
                closeBtn.style.border = 'none';
                closeBtn.style.borderRadius = '5px';
                closeBtn.style.cursor = 'pointer';
                document.body.appendChild(closeBtn);
                
                // Gestisci la chiusura
                const closeViewer = () => {
                    document.body.removeChild(iframe);
                    document.body.removeChild(closeBtn);
                };
                
                closeBtn.addEventListener('click', closeViewer);
                
                // Chiudi automaticamente dopo 30 secondi
                setTimeout(closeViewer, 30000);
                
            } catch (error) {
                // Metodo 2: Fallback con window.open
                try {
                    const newWindow = window.open(pdfLink, '_blank', 'noopener,noreferrer');
                    if (!newWindow) {
                        // Metodo 3: Se popup è bloccato, usa un link temporaneo
                        const link = document.createElement('a');
                        link.href = pdfLink;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                } catch (e) {
                    // Metodo 4: Ultimo fallback
                    window.location.href = pdfLink;
                }
            }
        }
        // Nasconde l'overlay dopo aver aperto il PDF
        this.hideOverlay();
    }
}

// Inizializza il manager
new ProjectCardTouchManager();
