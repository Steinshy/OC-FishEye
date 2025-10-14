// Contact modal open and close operations

import { getModalRefs, getFormElements, formFieldNames } from '../../config.js';
import { forEachFormField, toggleScroll } from '../../helpers/helper.js';
import { aria } from '../accessibility/aria.js';
import { setupFocusCycle, cleanupFocusCycle, toggleBackgroundContent, blurActive } from '../accessibility/focus.js';
import { mobileKeyboard } from '../accessibility/mobile.js';
import { initializeModalAccessibility } from '../accessibility/modal.js';
import { errorDisplay } from '../errorHandler.js';

import { getSafeDuration } from './animation.js';
import { resetCharacterCount, addCharacterCountListeners, removeCharacterCountListeners } from './characterCount.js';
import { submitForm } from './submission.js';
import { submitButtonState } from './submitButtonState.js';
import { setupFieldValidation } from './validation.js';

// Reset all form input states
const resetInputStates = () => {
  forEachFormField(getFormElements(), formFieldNames, element => {
    element.value = '';
    element.classList.remove('success', 'warning', 'danger');
    element.disabled = false;
    element.dataset.valid = 'false';
    element.dataset.errorVisible = 'false';
  });
};

// Reset form and modal to initial state
const resetFormAndModal = () => {
  requestAnimationFrame(() => {
    const { contactForm, contactModal } = getFormElements();
    contactForm?.reset();
    contactModal?.classList.remove('show');
    resetInputStates();
    errorDisplay.resetErrorVisibility();
    resetCharacterCount();
  });
};

// Toggle modal visibility
const toggleModal = show => {
  const { mainModal, form, submitButton } = getModalRefs();
  const action = show ? 'add' : 'remove';

  mainModal?.classList[action]('show');
  form?.classList[action]('show');

  aria.setHidden(mainModal, !show);
  aria.setHidden(form, !show);
  aria.setHidden(submitButton, !show);
};

// Open contact modal
export const openModal = () => {
  const { mainModal } = getModalRefs();
  toggleModal(true);
  toggleScroll(true);
  toggleBackgroundContent(true);
  mobileKeyboard.resetModalPosition();
  submitButtonState.hide();

  resetInputStates();
  resetCharacterCount();
  addCharacterCountListeners();

  setTimeout(() => {
    setupFocusCycle(mainModal, getFormElements().firstname);
  }, getSafeDuration(250));
};

// Close contact modal
export const closeModal = async () => {
  const { mainModal } = getModalRefs();
  if (!mainModal) return;

  mainModal.classList.add('closing');
  await new Promise(resolve => setTimeout(resolve, getSafeDuration(200)));

  cleanupFocusCycle(mainModal);
  toggleScroll(false);
  toggleBackgroundContent(false);
  mobileKeyboard.resetModalPosition();
  toggleModal(false);
  mainModal.classList.remove('closing');

  resetFormAndModal();
  blurActive();
  removeCharacterCountListeners();
};

// Check if modal is open
export const isModalOpen = () => Boolean(getModalRefs().mainModal?.classList?.contains('show'));

// Setup modal event listeners and handlers
export const setupModalEventListeners = (photographerName = '') => {
  initializeModalAccessibility({
    photographerName,
    onOpen: openModal,
    onClose: closeModal,
    onSubmit: submitForm,
    onValidation: setupFieldValidation,
  });
};
