// ========================================
// EMAILJS CONFIGURATION - PORTFOLIO ALESSANDRO GURNARI 2025
// ========================================
// Configurazione centralizzata per EmailJS
// Gestisce credenziali e template per l'invio email
// 
// GUIDA ALLA CONFIGURAZIONE:
// 1. Vai su https://www.emailjs.com/ e crea un account gratuito
// 2. Crea un nuovo servizio email (Gmail, Outlook, etc.)
// 3. Crea un template email con questi placeholder:
//    - {{from_name}} - Nome del mittente
//    - {{from_email}} - Email del mittente
//    - {{subject}} - Oggetto del messaggio
//    - {{message}} - Contenuto del messaggio
// 4. Sostituisci i valori qui sotto con le tue credenziali reali

// ========================================
// CONFIGURAZIONE EMAILJS
// ========================================
const EMAILJS_CONFIG = {
  // Chiave pubblica EmailJS (Account → General → Public Key)
  PUBLIC_KEY: 'mGZY5yhvU2lTEVEPP',
  
  // ID del servizio email (Email Services → Service ID)
  SERVICE_ID: 'service_rq540jo',
  
  // ID del template email (Email Templates → Template ID)
  // SOSTITUISCI CON IL TUO TEMPLATE ID CORRETTO
  TEMPLATE_ID: 'template_cz448vu'
};


/*
Oggetto: Nuovo messaggio dal portfolio - {{subject}}

Ciao Alessandro,

Hai ricevuto un nuovo messaggio dal tuo portfolio:

Nome: {{from_name}}
Email: {{from_email}}
Oggetto: {{subject}}

Messaggio:
{{message}}

---
Messaggio inviato automaticamente dal tuo portfolio.
*/

// Funzione per inizializzare EmailJS
function initializeEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  } else {
    console.error('EmailJS library not loaded');
  }
}

// Inizializza EmailJS automaticamente quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
  // Aspetta che EmailJS sia caricato
  if (typeof emailjs !== 'undefined') {
    initializeEmailJS();
  } else {
    // Se EmailJS non è ancora caricato, aspetta un po'
    setTimeout(() => {
      if (typeof emailjs !== 'undefined') {
        initializeEmailJS();
      }
    }, 1000);
  }
});

// Funzione per inviare email
function sendEmail(formData) {
  return emailjs.send(
    EMAILJS_CONFIG.SERVICE_ID,
    EMAILJS_CONFIG.TEMPLATE_ID,
    {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    }
  );
}

// Esporta la configurazione per l'uso in altri file
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EMAILJS_CONFIG, initializeEmailJS, sendEmail };
}
