# Portfolio Alessandro Gurnari

Sito portfolio personale per UX/UI Designer con design moderno e responsive.

## Caratteristiche

- Design responsive ottimizzato per tutti i dispositivi
- Architettura SCSS modulare con 17 partials
- Portfolio dinamico con sincronizzazione automatica
- Form di contatto integrato con EmailJS
- Accessibilità WCAG AAA
- Performance ottimizzate con hardware acceleration

## Struttura

```
├── index.html              # Homepage
├── portfolio.html          # Portfolio progetti
├── cv.html                 # CV e competenze
├── contattami.html         # Form contatto
├── assets/
│   ├── css/                # CSS compilato
│   ├── js/                 # JavaScript
│   ├── images/             # Immagini
│   └── projects/           # Portfolio progetti
├── scss/                   # Sass sorgente
│   ├── main.scss
│   └── partials/           # Moduli SCSS
└── package.json
```

## Tecnologie

- HTML5, CSS3, Sass/SCSS
- JavaScript ES6+
- Bootstrap 5.3
- EmailJS
- Font Awesome
- Google Fonts (Inter)

## Pagine

- **Homepage**: Hero section, about, ultimi progetti, CTA contatto
- **Portfolio**: Progetti con accordion e navigazione
- **CV**: Esperienza professionale, formazione, competenze, download PDF
- **Contattami**: Form Bootstrap con EmailJS e sezione FAQ

## Setup

```bash
npm install
npm run build:css
```

Il CSS viene compilato da Sass in `assets/css/main.css`.

