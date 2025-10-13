import { getModalRefs, getFormElements, getFieldNames } from '../../../constants.js';
import { aria } from '../../accessibility/aria.js';
import { handlers, events } from '../../accessibility/keyboard.js';
import { forEachFormField } from '../helper.js';
import { openModal, closeModal } from '../managers/modalManager.js';
import { submitForm } from '../managers/submissionManager.js';
import { setupFieldValidation } from '../managers/validationManager.js';

export const setupModalEventListeners = (photographerName = '') => {
  const { photographerName: photographerNameElement, contactButton, submitButton, closeButton, form } = getModalRefs();

  // Set photographer name in modal
  if (photographerNameElement && photographerName) {
    photographerNameElement.textContent = `Contactez ${photographerName}`;
  }

  // Setup field validation
  forEachFormField(getFormElements(), getFieldNames(), (element, name) => {
    setupFieldValidation({ element, name });
  });

  // Enable contact button
  aria.setDisabled(contactButton, false);

  // Attach event listeners
  events.attachClickAndKeyboard(contactButton, openModal, { preventDefault: false });
  events.attachClickAndKeyboard(closeButton, closeModal);

  if (submitButton) {
    submitButton.addEventListener(
      'keydown',
      handlers.createActivationHandler(() => form?.requestSubmit())
    );
  }

  form?.addEventListener('submit', e => submitForm(e, closeModal));
  document.addEventListener('keydown', handlers.createEscapeHandler(closeModal));
};
