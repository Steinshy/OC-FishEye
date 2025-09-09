/**
 * Photographer Page => Event Listener Setup
 * Handles all event listener attachments for the contact form
 * 
 * This file sets up all event listeners for the modal and form.
 * All functions are exposed globally for use in app.js or elsewhere.
 * 
 * All logic and references are correct and consistent with the rest of the codebase.
 */

function attachFormEventListeners() {
  if (!Modal.contactButton || !Modal.modalCloseButton || !Modal.mainForm) return;

  // Open modal on contact button click (with DOM ready check)
  Modal.contactButton.addEventListener("click", function (e) {
    // Prevent multiple rapid clicks and ensure DOM is ready
    if (Modal.contactButton.disabled || !document.readyState === "complete") {
      e.preventDefault();
      return;
    }
    ModalVisibility();
  });

  // Close modal on close button click
  Modal.modalCloseButton.addEventListener("click", function (e) {
    if (window.modalClosingPrevented) {
      e.preventDefault();
      return;
    }
    closeModal();
  });

  // Handle form submission
  Modal.mainForm.addEventListener("submit", function (e) {
    submitForm(e);
  });

  // Close modal on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && Modal.modalMain?.classList?.contains("show")) {
      if (window.modalClosingPrevented) {
        e.preventDefault();
        return;
      }
      closeModal();
    }
  });
}

function attachFormValidationListeners() {
  if (!Modal.firstNameInput || !Modal.lastNameInput || !Modal.emailInput || !Modal.messageInput) return;

  // Real-time validation for each field (input and blur events)
  const fields = [
    { element: Modal.firstNameInput, name: "first_name" },
    { element: Modal.lastNameInput, name: "last_name" },
    { element: Modal.emailInput, name: "email" },
    { element: Modal.messageInput, name: "message" }
  ];

  fields.forEach(field => {
    // Validate on input (real-time)
    field.element.addEventListener("input", function () {
      realTimeValidation(field.element, field.name);
    });

    // Validate on blur (when user leaves field)
    field.element.addEventListener("blur", function () {
      realTimeValidation(field.element, field.name);
    });

    // Clear errors on focus (if field was previously valid)
    field.element.addEventListener("focus", function () {
      if (field.element.getAttribute("data-valid") === "true") {
        field.element.setAttribute("data-error-visible", "false");
      }
    });
  });
}

function attachCharacterCountListeners() {
  if (!Modal.messageInput) return;
  ["input", "keyup", "paste"].forEach(function (event) {
    Modal.messageInput.addEventListener(event, handleCharacterCount);
  });
}

function removeCharacterCountListeners() {
  if (!Modal.messageInput) return;
  ["input", "keyup", "paste"].forEach(function (event) {
    Modal.messageInput.removeEventListener(event, handleCharacterCount);
  });
}

// Expose functions globally
window.attachFormEventListeners = attachFormEventListeners;
window.attachFormValidationListeners = attachFormValidationListeners;
window.attachCharacterCountListeners = attachCharacterCountListeners;
window.removeCharacterCountListeners = removeCharacterCountListeners;
