# Portfolio Alessandro Gurnari

Ciao! 👋 Questo è il mio sito portfolio personale, dove mostro i miei progetti di UX/UI Design e le mie competenze. L'ho sviluppato da zero per avere il controllo completo sul design e sulle funzionalità.

## 🎯 Cosa trovi qui

Un portfolio responsive che racconta la mia storia professionale attraverso:
- **Progetti UX/UI** con case study dettagliati
- **Esperienza lavorativa** e competenze tecniche
- **Form di contatto** per collaborazioni
- **Design system** coerente e accessibile

## 🚀 Caratteristiche principali

### Design & UX
- **Mobile-first** con breakpoints ottimizzati per dispositivi reali
- **Touch-friendly** su smartphone con interazioni specifiche
- **Accessibilità WCAG AAA** per un'esperienza inclusiva
- **Performance ottimizzate** con hardware acceleration

### Architettura tecnica
- **SCSS modulare** con 17 partials organizzati per funzionalità
- **JavaScript ES6+** con classi e gestione eventi moderna
- **Sistema di variabili** centralizzato per consistenza
- **Mixins riutilizzabili** per breakpoints e componenti

### Funzionalità avanzate
- **Portfolio dinamico** con sincronizzazione automatica dei progetti
- **Scroll intelligente** con padding dinamico su smartphone
- **Form di contatto** integrato con EmailJS
- **Accordion interattivo** per organizzare i progetti per cliente

## 🛠️ Tecnologie utilizzate

- **Frontend**: HTML5, CSS3, Sass/SCSS, JavaScript ES6+
- **Framework**: Bootstrap 5.3 (solo per componenti base)
- **Fonts**: Inter (Google Fonts) + SignPainter per il logo
- **Icons**: Font Awesome 6
- **Email**: EmailJS per il form di contatto
- **Build**: Sass compiler con watch mode

## 📁 Struttura del progetto

```
├── index.html              # Homepage con hero e ultimi progetti
├── portfolio.html          # Portfolio completo con accordion
├── cv.html                 # CV e competenze tecniche
├── contattami.html         # Form di contatto e FAQ
├── assets/
│   ├── css/                # CSS compilato (main.css)
│   ├── js/                 # JavaScript modulare
│   │   ├── main.js         # Core functionality
│   │   ├── client-header-manager.js  # Gestione accordion portfolio
│   │   ├── projects-scroll-manager.js # Scroll dinamico smartphone
│   │   ├── contact.js      # Form di contatto
│   │   └── projects-navigation.js    # Navigazione progetti
│   ├── images/             # Immagini e icone
│   └── projects/           # Portfolio progetti (PDF + copertine)
├── scss/                   # Sass sorgente
│   ├── main.scss          # Entry point
│   └── partials/          # Moduli SCSS organizzati
│       ├── _variables.scss    # Variabili e design system
│       ├── _mixins.scss       # Mixins riutilizzabili
│       ├── _foundation.scss   # Reset e base styles
│       ├── _typography.scss   # Tipografia
│       ├── _navbar.scss       # Navigazione
│       ├── _home.scss         # Homepage
│       ├── _portfolio.scss    # Portfolio
│       ├── _ultimi-progetti.scss # Sezione progetti homepage
│       ├── _cv.scss           # Pagina CV
│       ├── _contact.scss      # Form contatto
│       └── _footer.scss       # Footer
└── package.json
```

## 🎨 Design System

Ho creato un sistema di design coerente con:

### Colori
- **Primary**: #2A2E34 (testo principale)
- **Brand Accent**: #06b6d4 (CTA e elementi attivi)
- **Background**: #F0F0F0 (sfondo pagina)
- **Surface**: #fafafa (card e contenitori)

### Tipografia
- **Font principale**: Inter (Google Fonts)
- **Font logo**: SignPainter (personalizzato)
- **Scale responsive**: Dimensioni specifiche per smartphone

### Spacing
- **Sistema modulare**: Da 0.125rem a 6rem
- **Breakpoints**: Mobile-first con 6 breakpoints ottimizzati
- **Container**: Max-width 1280px con padding responsive

## 📱 Responsive Design

### Breakpoints
- **XS**: 0px (Mobile extra small)
- **SM**: 400px (Mobile)
- **MD**: 768px (Tablet)
- **LG**: 1024px (Desktop small)
- **XL**: 1200px (Desktop)
- **XXL**: 1400px+ (Desktop large)

### Comportamenti specifici
- **Smartphone**: Touch-friendly con interazioni ottimizzate
- **Tablet**: Layout ibrido con hover effects
- **Desktop**: Esperienza completa con animazioni

## 🚀 Setup e sviluppo

### Prerequisiti
- Node.js (per Sass compiler)
- Editor di codice (VS Code consigliato)

### Installazione
```bash
# Clona il repository
git clone [URL_REPOSITORY]
cd mio-sito-personale

# Installa le dipendenze
npm install

# Compila il CSS
npm run build:css
```

### Script disponibili
```bash
# Compila CSS una volta
npm run build:css

# Watch mode per sviluppo (se configurato)
npm run watch:css
```

## 🎯 Funzionalità principali

### Homepage
- **Hero section** con CTA principale
- **About** con competenze chiave
- **Ultimi progetti** con scroll orizzontale su smartphone
- **Call-to-action** per contatto

### Portfolio
- **Accordion interattivo** per organizzare progetti per cliente
- **Navigazione fluida** tra progetti
- **Download PDF** per ogni progetto
- **Tags** per categorizzazione

### CV
- **Esperienza professionale** cronologica
- **Competenze tecniche** organizzate per categoria
- **Formazione** e certificazioni
- **Download PDF** del CV completo

### Contattami
- **Form Bootstrap** con validazione
- **Integrazione EmailJS** per invio email
- **FAQ** per domande comuni
- **Social links** e contatti

## 🔧 Personalizzazione

### Variabili principali
Modifica `scss/partials/_variables.scss` per:
- Colori del brand
- Font e dimensioni
- Spacing e breakpoints
- Transizioni e animazioni

### Aggiungere progetti
1. Aggiungi PDF e copertina in `assets/projects/[cliente]/`
2. Il sistema rileva automaticamente i nuovi progetti
3. Aggiorna la navigazione se necessario

## 📈 Performance

- **CSS ottimizzato** con Sass compilation
- **JavaScript modulare** con lazy loading
- **Immagini ottimizzate** per web
- **Font loading** ottimizzato
- **Hardware acceleration** per animazioni

## 🎨 Accessibilità

- **WCAG AAA** compliance
- **Contrast ratio** ottimizzato
- **Keyboard navigation** completa
- **Screen reader** friendly
- **Focus indicators** visibili

## 📝 Note di sviluppo

### Decisioni tecniche
- **SCSS modulare**: Per mantenibilità e scalabilità
- **Mobile-first**: Approccio responsive moderno
- **JavaScript classi**: Per organizzazione del codice
- **Bootstrap selettivo**: Solo componenti necessari

### Sfide risolte
- **Scroll dinamico**: Padding variabile su smartphone
- **Accordion touch-friendly**: Stati attivi/inattivi
- **Performance**: Ottimizzazione animazioni
- **Cross-browser**: Compatibilità garantita

