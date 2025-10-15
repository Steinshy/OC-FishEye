// Setup modal accessibility and event handlers

import { getModalRefs, getFormElements, formFieldNames } from '../../config.js';
import { forEachFormField } from '../../helpers/helper.js';

import { aria } from './aria.js';
import { handlers, events } from './keyboard.js';

// Initialize modal event listeners and validation
export const initializeModalAccessibility = ({ photographerName, onOpen, onClose, onSubmit, onValidation }) => {
  const { photographerName: name, contactButton: contact, submitButton: submit, closeButton: close, form } = getModalRefs();

  if (name && photographerName) name.textContent = photographerName;

  forEachFormField(getFormElements(), formFieldNames, (element, fieldName) => onValidation?.({ element, name: fieldName }));

  aria.setDisabled(contact, false);

  events.attachClickAndKeyboard(contact, onOpen, { preventDefault: false });
  events.attachClickAndKeyboard(close, onClose);

  submit?.addEventListener(
    'keydown',
    handlers.createActivationHandler(() => form?.requestSubmit())
  );

  form?.addEventListener('submit', e => onSubmit(e, onClose));
  document.addEventListener('keydown', handlers.createEscapeHandler(onClose));
};
