# Portfolio Alessandro Gurnari

Portfolio professionale sviluppato per presentare progetti di UX/UI Design e competenze tecniche. Il sito è stato progettato e sviluppato da zero per garantire controllo completo sul design e sulle funzionalità.

## Panoramica

Portfolio responsive che presenta:
- Progetti UX/UI con case study dettagliati
- Esperienza professionale e competenze tecniche
- Sistema di contatto integrato
- Design system coerente e accessibile

## Caratteristiche tecniche

### Design e User Experience
- Approccio mobile-first con breakpoints ottimizzati
- Interazioni touch-friendly per dispositivi mobili
- Conformità WCAG AAA per accessibilità
- Performance ottimizzate con hardware acceleration

### Architettura
- SCSS modulare con 17 partials organizzati per funzionalità
- JavaScript ES6+ con architettura a classi
- Sistema di variabili centralizzato
- Mixins riutilizzabili per componenti comuni

### Funzionalità avanzate
- Portfolio dinamico con sincronizzazione automatica
- Sistema di scroll intelligente con padding dinamico
- Form di contatto integrato con EmailJS
- Accordion interattivo per organizzazione progetti
- Interazioni ottimizzate per dispositivi touch

## Stack tecnologico

- **Frontend**: HTML5, CSS3, Sass/SCSS, JavaScript ES6+
- **Framework**: Bootstrap 5.3 (componenti base)
- **Tipografia**: Inter (Google Fonts), SignPainter (logo)
- **Icone**: Font Awesome 6
- **Email**: EmailJS
- **Build**: Sass compiler

## Struttura del progetto

```
├── index.html              # Homepage
├── portfolio.html          # Portfolio completo
├── cv.html                 # Curriculum vitae
├── contattami.html         # Form di contatto
├── assets/
│   ├── css/                # CSS compilato
│   ├── js/                 # JavaScript modulare
│   ├── images/             # Risorse grafiche
│   └── projects/           # Portfolio progetti
├── scss/                   # Codice sorgente Sass
│   ├── main.scss          # Entry point
│   └── partials/          # Moduli organizzati
└── package.json
```

## Design System

### Palette colori
- **Primary**: #2A2E34 (testo principale)
- **Brand Accent**: #06b6d4 (elementi attivi)
- **Background**: #F0F0F0 (sfondo)
- **Surface**: #fafafa (contenitori)

### Tipografia
- **Font principale**: Inter
- **Font logo**: SignPainter
- **Scale responsive**: Dimensioni ottimizzate per dispositivo

### Sistema di spacing
- **Modulare**: Da 0.125rem a 6rem
- **Breakpoints**: 6 livelli responsive
- **Container**: Max-width 1280px

## Breakpoints responsive

- **XS**: 0px (Mobile extra small)
- **SM**: 400px (Mobile)
- **MD**: 768px (Tablet)
- **LG**: 1024px (Desktop small)
- **XL**: 1200px (Desktop)
- **XXL**: 1400px+ (Desktop large)

## Setup e sviluppo

### Prerequisiti
- Node.js
- Editor di codice

### Installazione
```bash
git clone [URL_REPOSITORY]
cd mio-sito-personale
npm install
npm run build:css
```

### Script disponibili
```bash
npm run build:css    # Compila CSS
npm run watch:css    # Watch mode (se configurato)
```

## Funzionalità principali

### Homepage
- Hero section con call-to-action
- Sezione about con competenze
- Ultimi progetti con navigazione
- Sistema di contatto

### Portfolio
- Accordion per organizzazione progetti
- Navigazione fluida tra progetti
- Download PDF per ogni progetto
- Sistema di categorizzazione

### CV
- Esperienza professionale cronologica
- Competenze tecniche categorizzate
- Formazione e certificazioni
- Download PDF completo

### Contattami
- Form con validazione Bootstrap
- Integrazione EmailJS
- FAQ e informazioni
- Link social e contatti

## Personalizzazione

### Variabili principali
Modificare `scss/partials/_variables.scss` per:
- Colori del brand
- Tipografia e dimensioni
- Spacing e breakpoints
- Transizioni e animazioni

### Gestione progetti
1. Aggiungere PDF e copertina in `assets/projects/[cliente]/`
2. Il sistema rileva automaticamente i nuovi progetti
3. Aggiornare la navigazione se necessario

## Performance e accessibilità

### Ottimizzazioni
- CSS compilato e ottimizzato
- JavaScript modulare con lazy loading
- Immagini ottimizzate per web
- Font loading ottimizzato
- Hardware acceleration per animazioni

### Accessibilità
- Conformità WCAG AAA
- Contrast ratio ottimizzato
- Navigazione da tastiera completa
- Compatibilità screen reader
- Indicatori di focus visibili

## Architettura tecnica

### Decisioni progettuali
- **SCSS modulare**: Manutenibilità e scalabilità
- **Mobile-first**: Approccio responsive moderno
- **JavaScript a classi**: Organizzazione del codice
- **Bootstrap selettivo**: Solo componenti necessari

### Soluzioni implementate
- **Scroll dinamico**: Padding variabile per smartphone
- **Accordion touch-friendly**: Stati attivi ottimizzati
- **Performance**: Ottimizzazione animazioni
- **Cross-browser**: Compatibilità garantita