import './style.css';

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const formElements = contactForm.elements;
const formStatus = document.getElementById('formStatus');
const submitButton = contactForm.querySelector('.submit-button');
const buttonText = submitButton.querySelector('.button-text');
const buttonLoader = submitButton.querySelector('.button-loader');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('#header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - 80; // Adjust for fixed header
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Form validation and WhatsApp redirect
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Reset error messages
  document.querySelectorAll('.error-message').forEach(error => {
    error.style.display = 'none';
  });
  
  // Get form values
  const name = formElements.name.value.trim();
  const email = formElements.email.value.trim();
  const message = formElements.message.value.trim();
  
  // Validate form
  let isValid = true;
  
  if (name === '') {
    showError('nameError', 'Por favor, informe seu nome');
    isValid = false;
  }
  
  if (email === '') {
    showError('emailError', 'Por favor, informe seu email');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('emailError', 'Por favor, informe um email válido');
    isValid = false;
  }
  
  if (message === '') {
    showError('messageError', 'Por favor, escreva uma mensagem');
    isValid = false;
  }
  
  if (isValid) {
    // Show loading indicator
    buttonText.textContent = 'Redirecionando...';
    buttonLoader.style.display = 'block';
    submitButton.disabled = true;
    
    // WhatsApp integration
    const phoneNumber = '5511999999999'; // Substitua pelo seu número no formato internacional
    const whatsappMessage = `Olá, meu nome é ${encodeURIComponent(name)}. Meu email é ${encodeURIComponent(email)}. Mensagem: ${encodeURIComponent(message)}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    
    // Redireciona para o WhatsApp
    setTimeout(() => {
      window.location.href = whatsappUrl;
      
      // Hide loading indicator and reset form
      buttonLoader.style.display = 'none';
      buttonText.textContent = 'Enviar Mensagem';
      submitButton.disabled = false;
      
      // Show redirect message
      formStatus.textContent = 'Redirecionando para o WhatsApp...';
      formStatus.className = 'form-status success';
      contactForm.reset();
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }, 1500);
  }
});

// Helper Functions
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Scroll Reveal Animation
function revealElements() {
  const elements = document.querySelectorAll('.reveal-element');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('active');
      element.style.animation = 'slideUp 0.8s ease forwards';
    }
  });
}

// Listen for scroll to trigger reveal animations
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);
