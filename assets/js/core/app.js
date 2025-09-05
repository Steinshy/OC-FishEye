/**
 * Main Application - Init
 */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("info_name") && window.location.pathname.includes("photographer.html")) {
    setTimeout(() => {
      if (typeof handleContactModal === 'function') {
        handleContactModal();
      }
      if (typeof initCharacterCount === 'function') {
        initCharacterCount();
      }
      if (typeof initializeRealTimeValidation === 'function') {
        initializeRealTimeValidation();
      }

      // Initialize form submission handler
      const contactForm = document.getElementById("contact_form");
      if (contactForm && typeof handleFormSubmit === 'function') {
        contactForm.addEventListener("submit", handleFormSubmit);
      }
    }, 200);
  }
});