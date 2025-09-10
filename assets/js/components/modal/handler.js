/**
 * Photographer Page => Event Handler Functions
 * Contains all event handler functions for the contact form
 */

// Open the modal and set initial states
function openModal() {
  if (!Modal || !Modal.modalMain || !Modal.modalHeader || !Modal.mainForm) return;

  // Show modal immediately for instant visual feedback
  Modal.modalMain.removeAttribute("aria-hidden");
  Modal.modalHeader.classList.add("show");
  Modal.modalMain.classList.add("show");
  Modal.mainForm.classList.add("show");
  resetInputsAndFocus();
}

// Close the modal and reset form/modal state
function closeModal() {
  if (!Modal || !Modal.modalMain || !Modal.modalHeader || !Modal.mainForm) return;

  // Set aria-hidden on the main modal only
  Modal.modalMain.setAttribute("aria-hidden", "true");

  Modal.modalHeader.classList.remove("show");
  Modal.modalMain.classList.remove("show");
  Modal.mainForm.classList.remove("show");
  resetFormAndModal();

  // Return focus to the contact button for better accessibility
  if (Modal.contactButton) {
    Modal.contactButton.focus();
  }
}

// Initialize form handlers (button, character count, validation)
function initializeFormHandlers() {
  if (ButtonState) {
    ButtonState.initialize();
    ButtonState.hide();
  }
  handleCharacterCount();
}

// Expose handlers globally
window.openModal = openModal;
window.closeModal = closeModal;
window.initializeFormHandlers = initializeFormHandlers;
