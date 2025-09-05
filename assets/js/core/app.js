/**
 * Main Application - Init
 */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("info_name") && window.location.pathname.includes("photographer.html")) {
    setTimeout(() => {
      if (typeof window.handleContactModal === 'function') {
        window.handleContactModal();
      }
      if (typeof window.initCharacterCount === 'function') {
        window.initCharacterCount();
      }
      if (typeof window.initializeRealTimeValidation === 'function') {
        window.initializeRealTimeValidation();
      }

      // Initialize form submission handler
      const contactForm = document.getElementById("contact_form");
      if (contactForm && typeof window.handleFormSubmit === 'function') {
        contactForm.addEventListener("submit", window.handleFormSubmit);
      }
    }, 200);
  }
});