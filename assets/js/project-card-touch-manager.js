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
        // Gestisce i click sulle card dei progetti - LOGICA UNIFICATA
        document.addEventListener('click', (e) => {
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
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
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
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
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
            if (projectImage) {
                projectImage.classList.remove('touch-active');
            }
            this.activeCard = null;
        }
    }

    openPDF(pdfButton) {
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
                
                // Aggiungi un messaggio informativo
                const infoMsg = document.createElement('div');
                infoMsg.innerHTML = 'PDF non visualizzabile in questo browser. Clicca "Apri PDF" per visualizzarlo.';
                infoMsg.style.position = 'fixed';
                infoMsg.style.top = '50%';
                infoMsg.style.left = '50%';
                infoMsg.style.transform = 'translate(-50%, -50%)';
                infoMsg.style.zIndex = '10000';
                infoMsg.style.padding = '20px';
                infoMsg.style.backgroundColor = 'rgba(0,0,0,0.8)';
                infoMsg.style.color = 'white';
                infoMsg.style.borderRadius = '10px';
                infoMsg.style.textAlign = 'center';
                infoMsg.style.fontSize = '16px';
                infoMsg.style.maxWidth = '300px';
                document.body.appendChild(infoMsg);
                
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
                    document.body.removeChild(infoMsg);
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
