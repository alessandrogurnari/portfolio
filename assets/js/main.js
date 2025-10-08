// ========================================
// MAIN JAVASCRIPT FILE - PORTFOLIO ALESSANDRO GURNARI
// ========================================
// Gestisce navigazione, animazioni e interazioni del sito


// ========================================
// MENU HAMBURGER - GESTIONE CLICK
// ========================================
function initializeHamburgerMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (!navToggle || !navMenu) {
    return;
  }
  
  navToggle.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Toggle classi per apertura/chiusura
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// ========================================
// INIZIALIZZAZIONE MENU
// ========================================

// Inizializza stato menu al caricamento
function initializeMenu() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  
  if (navMenu) {
    navMenu.classList.remove('active');
  }
  if (navToggle) {
    navToggle.classList.remove('active');
  }
  document.body.style.overflow = '';
}

// ========================================
// GESTIONE RESIZE - STATO PERSISTENTE
// ========================================
function initializeMenuPreserveState() {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  
  const isMobileTablet = window.innerWidth < 1024;
  const wasMenuOpen = navMenu && navMenu.classList.contains('active');
  
  if (isMobileTablet) {
    if (!wasMenuOpen) {
      if (navMenu) navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
    }
  } else {
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
  }
  
  document.body.style.overflow = '';
}

// ========================================
// GESTIONE RESIZE - PREVIENE FLASH MENU
// ========================================
let resizeTimeout;

window.addEventListener('resize', () => {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  
  if (navMenu) {
    navMenu.classList.add('resizing');
  }
  if (navToggle) {
    navToggle.classList.add('resizing');
  }
  
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (navMenu) {
      navMenu.classList.remove('resizing');
    }
    if (navToggle) {
      navToggle.classList.remove('resizing');
    }
    initializeMenuPreserveState();
  }, 50);
});

// ========================================
// GESTIONE CHIUSURA MENU
// ========================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// ========================================
// GESTIONE SCROLL DINAMICO - ULTIMI PROGETTI
// ========================================
// Gestita da projects-scroll-manager.js

// ========================================
// SMOOTH SCROLLING
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    // Escludi il link "#ultimi-progetti" - gestito dalla homepage
    if (this.getAttribute('href') === '#ultimi-progetti') {
      return; // Non fare nulla, lascia che sia gestito dalla homepage
    }
    
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// SKILL BARS ANIMATION
// ========================================

const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const width = progressBar.getAttribute('data-width');
        progressBar.style.width = width;
        observer.unobserve(progressBar);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => {
    observer.observe(bar);
  });
};

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const animateOnScroll = () => {
  // IntersectionObserver per attivare le animazioni CSS esistenti
  const elements = document.querySelectorAll(`
    .hero-text, .hero-image, .hero-buttons, .hero-description,
    .section-title, .project-card, .project-content, .project-tech,
    .card, .card-body, .form-title, .form-control, .form-label, .form-group,
    .btn, .btn-primary, .btn-secondary, .btn-outline, .btn-success, .btn-danger,
    .faq-title, .faq-item, .faq-accordion, .accordion-button, .accordion-body,
    .cv-header-section, .cv-section, .cv-section-title, .cv-download,
    .about-content, .about-text, .about-stats, .stat,
    .skills-grid, .skill-category, .skill-item, .skill-name, .skill-bar, .skill-progress,
    .clients, .client-item, .client-logo-img,
    .nav-link, .nav-logo, .nav-toggle,
    .footer, .footer-content
  `);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Attiva le animazioni CSS esistenti
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.2, 
    rootMargin: '0px 0px -50px 0px' 
  });
  
  elements.forEach(element => {
    // Imposta stato iniziale per attivare le animazioni CSS
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
  });
};

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================

const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Notification system
const showNotification = (message, type = 'info') => {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    max-width: 400px;
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
};

// ========================================
// INITIALIZATION
// ========================================

// ========================================
// ACTIVE LINK DETECTION
// ========================================
function setActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ========================================
// SCROLL TO TOP ON PAGE REFRESH
// ========================================
// Soluzione che funziona su Chrome (Safari potrebbe avere problemi con smooth scroll)
// Disabilita scroll restoration del browser
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Imposta la posizione di scroll con smooth scroll
window.scrollTo({
  top: 0,
  left: 0,
  behavior: 'smooth'
});

// Fallback per browser che ripristinano la posizione
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

// Fallback aggiuntivo per il caricamento completo
window.addEventListener('load', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
});

// ========================================
// INIZIALIZZAZIONE SISTEMA
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
  initializeHamburgerMenu();
  setActiveLink();
  animateSkillBars();
  animateOnScroll();
  lazyLoadImages();
  document.body.classList.add('loaded');
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Throttle function for scroll events (più efficiente del debounce per scroll)
const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Optimized scroll handler
const optimizedScrollHandler = throttle(() => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ========================================
// PORTFOLIO FILTER - FILTRO PROGETTI PER CLIENTE
// ========================================

const initializePortfolioFilter = () => {
  const clientItems = document.querySelectorAll('.client-item');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (!clientItems.length) {
    return; // Non siamo nella pagina portfolio
  }
  
  // Se non ci sono project cards, attiva solo le animazioni dei clienti
  if (!projectCards.length) {
    // Attiva le animazioni dei clienti
    clientItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, 100 + (index * 100));
    });
    return;
  }
  
  // Aggiungi event listener a ogni cliente
  clientItems.forEach(clientItem => {
    clientItem.addEventListener('click', function() {
      const clientName = this.getAttribute('data-client');
      
      
      clientItems.forEach(item => item.classList.remove('active'));
      
      // Aggiungi classe active al cliente cliccato
      this.classList.add('active');
      
      // Filtra i progetti
      projectCards.forEach(card => {
        const cardClient = card.getAttribute('data-client');
        
        if (clientName === 'all' || cardClient === clientName) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Scroll smooth alla sezione progetti
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const offsetTop = projectsSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mostra tutti i progetti inizialmente
  projectCards.forEach(card => {
    card.style.display = 'block';
  });
  
  // Attiva le animazioni dei clienti
  clientItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add('animate');
    }, 100 + (index * 100));
  });
};

// Inizializza il filtro portfolio
document.addEventListener('DOMContentLoaded', () => {
  initializePortfolioFilter();
});