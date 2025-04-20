// Additional animations for the portfolio
// This file contains helper functions for creating animated elements

/**
 * Creates a typing animation effect on text elements
 * @param {HTMLElement} element - The element to apply the typing effect to
 * @param {string} text - The text to be typed
 * @param {number} speed - The typing speed in milliseconds
 */
export function typeText(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

/**
 * Creates a counter animation that counts up to a target number
 * @param {HTMLElement} element - The element to display the counter in
 * @param {number} target - The target number to count to
 * @param {number} duration - The duration of the animation in milliseconds
 * @param {string} prefix - Text to display before the number (optional)
 * @param {string} suffix - Text to display after the number (optional)
 */
export function animateCounter(element, target, duration = 2000, prefix = '', suffix = '') {
  let startTime = null;
  const startValue = 0;
  
  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(progress * (target - startValue) + startValue);
    
    element.textContent = `${prefix}${currentValue}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = `${prefix}${target}${suffix}`;
    }
  }
  
  requestAnimationFrame(animate);
}

/**
 * Creates a parallax scrolling effect on an element
 * @param {HTMLElement} element - The element to apply the parallax effect to
 * @param {number} speed - The speed of the parallax effect (0-1)
 */
export function parallaxScroll(element, speed = 0.5) {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const translateY = scrollPosition * speed;
    
    element.style.transform = `translateY(${translateY}px)`;
  });
}

/**
 * Animates progress bars to their target percentage
 * @param {HTMLElement} element - The progress bar element
 * @param {number} percent - The target percentage (0-100)
 * @param {number} duration - The duration of the animation in milliseconds
 */
export function animateProgressBar(element, percent, duration = 1500) {
  let startTime = null;
  const startValue = 0;
  
  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const currentValue = Math.floor(progress * (percent - startValue) + startValue);
    
    element.style.width = `${currentValue}%`;
    element.setAttribute('aria-valuenow', currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.width = `${percent}%`;
      element.setAttribute('aria-valuenow', percent);
    }
  }
  
  requestAnimationFrame(animate);
}