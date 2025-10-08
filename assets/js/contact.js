// ========================================
// CONTACT FORM - PORTFOLIO ALESSANDRO GURNARI 2025
// ========================================
// Gestisce il form di contatto con EmailJS
// Integrazione completa con validazione e feedback utente
// Compatibile con Bootstrap 5.3 e accessibilità WCAG AAA

// ========================================
// INIZIALIZZAZIONE EMAILJS
// ========================================
// Inizializza EmailJS utilizzando la configurazione centralizzata
if (typeof emailjs !== 'undefined' && typeof EMAILJS_CONFIG !== 'undefined') {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
} else {
  console.error('❌ EmailJS o configurazione non trovati!');
}

// ========================================
// INIZIALIZZAZIONE FORM DI CONTATTO
// ========================================
// Aspetta che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
  // Trova il form di contatto nella pagina
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) {
    console.error('❌ Form di contatto non trovato!');
    return;
  }
  
  // ========================================
  // GESTIONE INVIO FORM
  // ========================================
  
  // Funzioni di utilità globali
  window.showLoading = function(show) {
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnLoading = document.getElementById('btn-loading');
    
    if (submitBtn && btnText && btnLoading) {
      if (show) {
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        submitBtn.disabled = true;
      } else {
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
        submitBtn.disabled = false;
      }
    }
  };
  
  window.showAlert = function(type, message) {
    const popupElement = document.getElementById('form-popup');
    const popupIcon = document.getElementById('popup-icon');
    const popupTitle = document.getElementById('popup-title');
    const popupMessage = document.getElementById('popup-message');
    
    if (!popupElement || !popupIcon || !popupTitle || !popupMessage) return;
    
    // Configura icona e titolo in base al tipo
    if (type === 'success') {
      popupIcon.className = 'fas fa-check-circle';
      popupTitle.textContent = 'Messaggio Inviato';
    } else {
      popupIcon.className = 'fas fa-exclamation-triangle error';
      popupTitle.textContent = 'Errore';
    }
    
    // Imposta il messaggio
    popupMessage.textContent = message;
    
    // Mostra il popup
    popupElement.style.display = 'flex';
    setTimeout(() => {
      popupElement.classList.add('show');
    }, 10);
  };
  
  window.closePopup = function() {
    const popupElement = document.getElementById('form-popup');
    if (popupElement) {
      popupElement.classList.remove('show');
      setTimeout(() => {
        popupElement.style.display = 'none';
      }, 300);
    }
  };
  
  window.resetForm = function() {
    const form = document.getElementById('contact-form');
    const charCount = document.getElementById('char-count');
    if (form) {
      form.reset();
      const inputs = form.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
      });
      if (charCount) {
        charCount.textContent = '0';
      }
    }
  };
  
  // Chiudi popup cliccando sull'overlay
  const popupElement = document.getElementById('form-popup');
  if (popupElement) {
    popupElement.addEventListener('click', function(e) {
      if (e.target === popupElement) {
        window.closePopup();
      }
    });
  }
  
  // ========================================
  // VALIDAZIONE CAMPI IN TEMPO REALE
  // ========================================
  // Aggiungi validazione in tempo reale per ogni campo
  
  // Funzione per validare un campo
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Validazione specifica per tipo di campo
    switch (fieldName) {
      case 'name':
        if (value.length === 0) {
          isValid = false;
          errorMessage = 'Il nome è obbligatorio';
        } else if (value.length < 2) {
          isValid = false;
          errorMessage = 'Il nome deve contenere almeno 2 caratteri';
        }
        break;
        
      case 'email':
        if (value.length === 0) {
          isValid = false;
          errorMessage = 'L\'email è obbligatoria';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Inserisci un indirizzo email valido';
          }
        }
        break;
        
      case 'subject':
        if (value.length === 0) {
          isValid = false;
          errorMessage = 'L\'oggetto è obbligatorio';
        } else if (value.length < 5) {
          isValid = false;
          errorMessage = 'L\'oggetto deve contenere almeno 5 caratteri';
        }
        break;
        
      case 'message':
        if (value.length === 0) {
          isValid = false;
          errorMessage = 'Il messaggio è obbligatorio';
        } else if (value.length < 10) {
          isValid = false;
          errorMessage = 'Il messaggio deve contenere almeno 10 caratteri';
        }
        break;
    }
    
    // Applica lo stato di validazione
    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
      removeFieldFeedback(field);
      // Non mostrare messaggio di successo per evitare spam visivo
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
      showFieldFeedback(field, errorMessage, 'error');
    }
    
    return isValid;
  }
  
  // Funzione per mostrare il feedback di un campo
  function showFieldFeedback(field, message, type) {
    
    removeFieldFeedback(field);
    
    // Crea il messaggio di feedback solo se c'è un messaggio
    if (message && message.trim() !== '') {
      // Cerca se esiste già un elemento di feedback
      let feedback = field.parentNode.querySelector('.invalid-feedback, .valid-feedback');
      
      if (!feedback) {
        // Se non esiste, crea un nuovo elemento
        feedback = document.createElement('div');
        feedback.className = type === 'error' ? 'invalid-feedback' : 'valid-feedback';
        field.parentNode.appendChild(feedback);
      } else {
        // Se esiste, aggiorna la classe e mostralo
        feedback.className = type === 'error' ? 'invalid-feedback' : 'valid-feedback';
        feedback.style.display = 'block';
      }
      
      feedback.textContent = message;
    }
  }
  
  // Funzione per rimuovere il feedback di un campo
  function removeFieldFeedback(field) {
    const existingFeedback = field.parentNode.querySelector('.invalid-feedback, .valid-feedback');
    if (existingFeedback) {
      // Se l'elemento esiste già nell'HTML, nascondilo invece di rimuoverlo
      if (existingFeedback.id) {
        existingFeedback.style.display = 'none';
        existingFeedback.textContent = '';
      } else {
        // Se è stato creato dinamicamente, rimuovilo
        existingFeedback.remove();
      }
    }
  }
  
  // Aggiungi event listeners per la validazione in tempo reale
  const formFields = contactForm.querySelectorAll('input, textarea');
  formFields.forEach(field => {
    // Validazione quando l'utente esce dal campo (blur)
    field.addEventListener('blur', function() {
      // Per il campo messaggio, valida sempre (anche se vuoto)
      if (this.name === 'message') {
        validateField(this);
      } else if (this.value.trim() !== '') {
        validateField(this);
      }
    });
    
    // Validazione durante la digitazione (con debounce per performance)
    let timeoutId;
    field.addEventListener('input', function() {
      
      clearTimeout(timeoutId);
      
      // Se il campo ha già uno stato di validazione, rimuovilo temporaneamente
      if (this.classList.contains('is-invalid') || this.classList.contains('is-valid')) {
        this.classList.remove('is-invalid', 'is-valid');
        removeFieldFeedback(this);
      }
      
      // Valida dopo 300ms di inattività (debounce più reattivo)
      timeoutId = setTimeout(() => {
        if (this.value.trim() !== '') {
          validateField(this);
        }
      }, 300);
    });
  });
  
  // ========================================
  // VALIDAZIONE COMPLETA FORM
  // ========================================
  // Funzione per validare tutto il form
  function validateForm() {
    let isFormValid = true;
    
    formFields.forEach(field => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });
    
    return isFormValid;
  }
  
  // ========================================
  // GESTIONE INVIO FORM
  // ========================================
  // Event listener per l'invio del form
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Valida tutto il form
    if (!validateForm()) {
      if (typeof window.showAlert === 'function') {
        window.showAlert('error', 'Per favore, correggi gli errori nel form prima di inviare!');
      }
      return;
    }
    
    // Estrai i dati dal form
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Mostra loading
    if (typeof window.showLoading === 'function') {
      window.showLoading(true);
    }
    
    // Invia email con EmailJS
    if (typeof emailjs !== 'undefined') {
      emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
      }).then(function(response) {
        console.log('✅ Email inviata con successo!', response);
        
        // Mostra messaggio di successo
        if (typeof window.showAlert === 'function') {
          window.showAlert('success', 'Messaggio inviato con successo! Ti risponderò presto.');
        }
        
        // Reset del form
        contactForm.reset();
        
        
        formFields.forEach(field => {
          field.classList.remove('is-invalid', 'is-valid');
          removeFieldFeedback(field);
        });
        
      }).catch(function(error) {
        console.error('❌ Errore nell\'invio dell\'email:', error);
        
        // Mostra messaggio di errore
        if (typeof window.showAlert === 'function') {
          window.showAlert('error', 'Errore nell\'invio del messaggio. Riprova più tardi.');
        }
      }).finally(function() {
        // Nascondi loading
        if (typeof window.showLoading === 'function') {
          window.showLoading(false);
        }
      });
    }
  });
  
});