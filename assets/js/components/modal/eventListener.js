import { Modal } from '../../core/constants.js';
import { modalClosingPrevented } from './submission.js';
import { openModal } from './handler.js';
import { closeModal } from './handler.js';
import { submitForm } from './submission.js';
import { realTimeValidation } from './utils/validatorRealTime.js';
import { handleCharacterCount } from './utils/characterCount.js';

/* Contact form event listeners */

export const attachFormEventListeners = () => {
  if (!Modal.contactButton || !Modal.modalMain) return;
  Modal.contactButton.addEventListener('click', function () {
    openModal();
  });

  Modal.modalCloseButton.addEventListener('click', function (e) {
    if (modalClosingPrevented) {
      e.preventDefault();
      return;
    }
    closeModal();
  });

  Modal.mainForm.addEventListener('submit', function (e) {
    submitForm(e);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && Modal.modalMain?.classList?.contains('show')) {
      if (modalClosingPrevented) {
        e.preventDefault();
        return;
      }
      closeModal();
    }
  });
};

export const attachFormValidationListeners = () => {
  if (!Modal.firstNameInput || !Modal.lastNameInput || !Modal.emailInput || !Modal.messageInput)
    return;

  // Todo: This array is useless, it can be removed later since we use constants.js
  const fields = [
    { element: Modal.firstNameInput, name: 'first_name' },
    { element: Modal.lastNameInput, name: 'last_name' },
    { element: Modal.emailInput, name: 'email' },
    { element: Modal.messageInput, name: 'message' }
  ];

  fields.forEach(field => {
    // Use realTimeValidation for all validation - consistent and complete
    field.element.addEventListener('input', () => realTimeValidation(field.element, field.name));
    field.element.addEventListener('blur', () => realTimeValidation(field.element, field.name));

    // Clear errors on focus
    field.element.addEventListener('focus', () => {
      if (field.element.getAttribute('data-valid') === 'true') {
        field.element.setAttribute('data-error-visible', 'false');
      }
    });
  });
};

// Todo: Try to merge attachCharacterCountListeners removeCharacterCountListeners into one function if/else
export const attachCharacterCountListeners = () => {
  if (!Modal.messageInput) return;
  const updateCharacterCount = () =>
    (window.requestAnimationFrame || setTimeout)(handleCharacterCount);

  ['input', 'keyup', 'paste'].forEach(event => {
    Modal.messageInput.addEventListener(event, updateCharacterCount);
  });
};

export const removeCharacterCountListeners = () => {
  if (!Modal.messageInput) return;
  ['input', 'keyup', 'paste'].forEach(function (event) {
    Modal.messageInput.removeEventListener(event, handleCharacterCount);
  });
};
