# Portfolio Personale - Alessandro Gurnari

Portfolio personale moderno e responsive per UX/UI Designer, sviluppato con HTML, CSS (Sass), JavaScript e Bootstrap.

## 🚀 Caratteristiche Principali

- **Design Responsive**: Ottimizzato per tutti i dispositivi (Mobile First)
- **Accessibilità WCAG AAA**: Font-size minimo 18px, contrasti ottimali
- **Architettura SCSS Modulare**: 17 partials specializzati e organizzati
- **Portfolio Dinamico**: Sincronizzazione automatica progetti con localStorage
- **Form Contatto**: Bootstrap 5.3 + EmailJS per invio email
- **Performance**: Hardware acceleration e ottimizzazioni per scroll

## 📁 Struttura del Progetto

```
mio-sito-personale/
├── index.html              # Homepage
├── portfolio.html          # Pagina portfolio
├── cv.html                 # Pagina CV
├── contattami.html         # Pagina contattami (con Bootstrap)
├── assets/                 # Assets del sito
│   ├── css/                # CSS compilato
│   ├── js/                 # JavaScript
│   ├── images/             # Immagini e favicon
│   └── projects/           # Portfolio progetti
├── scss/                   # Sass sorgente (17 partials modulari)
│   ├── main.scss
│   └── partials/           # Architettura modulare
├── package.json            # Configurazione npm
└── README.md               # Documentazione
```

## 🛠️ Tecnologie Utilizzate

- **HTML5**: Struttura semantica
- **CSS3**: Styling moderno con variabili CSS
- **Sass/SCSS**: Preprocessore CSS con architettura modulare (17 partials)
- **JavaScript ES6+**: Interattività e funzionalità dinamiche
- **Bootstrap 5.3**: Framework CSS per la pagina contattami
- **EmailJS**: Servizio per l'invio di email dal form di contatto
- **Font Awesome**: Icone
- **Google Fonts**: Tipografia (Inter)

## 📱 Pagine del Sito

- **Homepage**: Hero, About, Ultimi Progetti, Contact CTA
- **Portfolio**: Progetti con sistema accordion e navigazione
- **CV**: Esperienza, formazione, competenze, download PDF
- **Contattami**: Form Bootstrap con EmailJS e FAQ

## 🏗️ Architettura e Sistema di Design

### Architettura SCSS Modulare
- **Foundation**: Variabili, mixins, tipografia, utilities
- **Components**: Bottoni, link, navbar, hamburger
- **Sections**: Hero, about, portfolio, contact, CV, footer
- **Mixin riutilizzabili** per coerenza e manutenibilità

### Sistema di Design
- **Colori**: Monocromatico - Primario #2A2E34, Accent #06b6d4, Sfondo #F0F0F0
- **Tipografia**: Inter (Google Fonts) con pesi 300-700
- **Breakpoints**: Mobile (< 576px), Mobile Large (576-767px), Tablet (768-1023px), Desktop (≥ 1024px)

## 🔧 Caratteristiche Tecniche

### Sistema di Sincronizzazione Progetti
- **Project Tracker**: Sincronizzazione automatica tra portfolio e homepage
- **Ordine Cronologico**: I progetti più recenti appaiono per primi
- **Persistenza Dati**: localStorage per mantenere i dati tra le sessioni

### Performance e Ottimizzazioni
- **Intersection Observer**: Animazioni performanti
- **Throttle/Debounce**: Ottimizzazione eventi scroll e resize
- **Hardware Acceleration**: Ottimizzazioni per scroll e transizioni smooth
- **Accessibilità WCAG AAA**: Font-size minimo 18px per conformità
- **Codice Pulito**: Regole consolidate, !important superflue rimosse
