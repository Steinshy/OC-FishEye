import { getModalRefs, getFormElements, formFieldNames } from '../../constants.js';
import { forEachFormField } from '../../helpers/helper.js';

import { aria } from './aria.js';
import { handlers, events } from './keyboard.js';

// Modal Event Listeners Setup
export const initializeModalAccessibility = ({ photographerName, onOpen, onClose, onSubmit, onValidation }) => {
  const { photographerName: photographerNameElement, contactButton, submitButton, closeButton, form } = getModalRefs();

  // Set photographer name in modal
  if (photographerNameElement && photographerName) {
    photographerNameElement.textContent = `Contactez ${photographerName}`;
  }

  // Setup field validation
  forEachFormField(getFormElements(), formFieldNames, (element, name) => {
    if (onValidation) onValidation({ element, name });
  });

  // Enable contact button
  aria.setDisabled(contactButton, false);

  // Attach event listeners
  events.attachClickAndKeyboard(contactButton, onOpen, { preventDefault: false });
  events.attachClickAndKeyboard(closeButton, onClose);

  if (submitButton) {
    submitButton.addEventListener(
      'keydown',
      handlers.createActivationHandler(() => form?.requestSubmit())
    );
  }

  form?.addEventListener('submit', e => onSubmit(e, onClose));
  document.addEventListener('keydown', handlers.createEscapeHandler(onClose));
};
