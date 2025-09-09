/**
 * Photographer Page => Event Handler Functions
 * Contains all event handler functions for the contact form
 */

// Open the modal and set initial states
function openModal() {
  if (!Modal || !Modal.modalMain || !Modal.modalHeader || !Modal.mainForm) return;

  // Reset any previous states before opening
  resetInputStates();
  Modal.modalMain.setAttribute("aria-hidden", "false");
  Modal.modalHeader.setAttribute("aria-hidden", "false");
  Modal.mainForm.setAttribute("aria-hidden", "false");

  Modal.modalHeader.classList.add("show");
  Modal.modalMain.classList.add("show");
  Modal.mainForm.classList.add("show");

  if (ButtonState) {
    ButtonState.initialize();
    ButtonState.hide();
  }
}

// Close the modal and reset form/modal state
function closeModal() {
  if (!Modal || !Modal.modalMain || !Modal.modalHeader || !Modal.mainForm) return;

  Modal.modalMain.setAttribute("aria-hidden", "true");
  Modal.modalHeader.setAttribute("aria-hidden", "true");
  Modal.mainForm.setAttribute("aria-hidden", "true");

  Modal.modalHeader.classList.remove("show");
  Modal.modalMain.classList.remove("show");
  Modal.mainForm.classList.remove("show");
  resetFormAndModal();
}

// Toggle modal visibility
function ModalVisibility() {
  if (!Modal || !Modal.modalMain) return false;
  if (Modal.modalMain.classList.contains("show")) {
    closeModal();
  } else {
    openModal();
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
window.ModalVisibility = ModalVisibility;
window.openModal = openModal;
window.closeModal = closeModal;
window.initializeFormHandlers = initializeFormHandlers;
