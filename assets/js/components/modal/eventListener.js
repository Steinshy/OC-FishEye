/**
 * Contact form event listeners
 */

function attachFormEventListeners() {
  if (!Modal.contactButton || !Modal.modalMain) return;
  Modal.contactButton.addEventListener("click", function (e) {
    openModal();
  });

  Modal.modalCloseButton.addEventListener("click", function (e) {
    if (window.modalClosingPrevented) {
      e.preventDefault();
      return;
    }
    closeModal();
  });

  Modal.mainForm.addEventListener("submit", function (e) {
    submitForm(e);
  });

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

  // todo: This array is useless, it can be removed later since we use constants.js
  const fields = [
    { element: Modal.firstNameInput, name: "first_name" },
    { element: Modal.lastNameInput, name: "last_name" },
    { element: Modal.emailInput, name: "email" },
    { element: Modal.messageInput, name: "message" }
  ];

  fields.forEach(field => {
    // Use realTimeValidation for all validation - consistent and complete
    field.element.addEventListener("input", () => realTimeValidation(field.element, field.name));
    field.element.addEventListener("blur", () => realTimeValidation(field.element, field.name));

    // Clear errors on focus
    field.element.addEventListener("focus", () => {
      if (field.element.getAttribute("data-valid") === "true") {
        field.element.setAttribute("data-error-visible", "false");
      }
    });
  });
}

// todo: Try to merge attachCharacterCountListeners removeCharacterCountListeners into one function if/else
function attachCharacterCountListeners() {
  if (!Modal.messageInput) return;
  const updateCharacterCount = () => requestAnimationFrame(handleCharacterCount);

  ["input", "keyup", "paste"].forEach(event => {
    Modal.messageInput.addEventListener(event, updateCharacterCount);
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
