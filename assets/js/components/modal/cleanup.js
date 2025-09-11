/**
 * Photographer Page => Form Reset
 */

import { Modal } from "../../core/constants.js";
import { ButtonState } from "../../core/constants.js";

export const resetCharacterCount = () => {
  if (Modal.characterCount) {
    Modal.characterCount.textContent = "0/500";
    Modal.characterCount.classList.remove("warning", "danger");
  }
};

export const resetInputStates = () => {
  // Reset each form field to its initial state
  for (const fieldName of Modal.formFieldNames) {
    const element = Modal[fieldName];
    if (element) {
      element.value = "";
      element.classList.remove("success", "warning", "danger");
      element.disabled = false;
      element.setAttribute('data-valid', 'false');
      element.setAttribute('data-error-visible', 'false');
    }
  }
};

export const resetFormAndModal = () => {
  // Defer heavy operations to next frame to avoid blocking
  requestAnimationFrame(() => {
    Modal.contactForm?.reset();
    Modal.contactModal?.classList.remove("show");
    resetInputStates();
    resetErrorVisibility();
    resetCharacterCount();
  });
};

export const resetInputsAndFocus = () => {
  requestAnimationFrame(() => {
    resetInputStates();
    if (Modal.firstNameInput) {
      Modal.firstNameInput.focus();
    }

    if (ButtonState) {
      ButtonState.initialize();
      ButtonState.hide();
    }
  });
};

