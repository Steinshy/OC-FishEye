import { getModalRefs, getFormElements, getFieldNames } from '../../../constants.js';
import { aria } from '../../accessibility/aria.js';
import { setupFocusTrap, cleanupFocusTrap, toggleBackgroundContent, blurActive } from '../../accessibility/focus.js';
import { mobileKeyboard } from '../../accessibility/mobile.js';
import { errorDisplay } from '../../errorHandler.js';
import { toggleScroll, forEachFormField } from '../helper.js';

import { resetCharacterCount, addCharacterCountListeners, removeCharacterCountListeners } from './characterCountManager.js';
import { submitButtonState } from './submissionManager.js';

const { mainModal, form, submitButton } = getModalRefs();

const resetInputStates = () => {
  forEachFormField(getFormElements(), getFieldNames(), element => {
    element.value = '';
    element.classList.remove('success', 'warning', 'danger');
    element.disabled = false;
    element.dataset.valid = 'false';
    element.dataset.errorVisible = 'false';
  });
};

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

const toggleModalDisplay = show => {
  const action = show ? 'add' : 'remove';
  if (mainModal) mainModal.classList[action]('show');
  if (form) form.classList[action]('show');
};

const toggleModalAria = hidden => {
  if (mainModal) aria.setHidden(mainModal, hidden);
  if (form) aria.setHidden(form, hidden);
  if (submitButton) aria.setHidden(submitButton, hidden);
};

// Modal lifecycle management
export const openModal = () => {
  toggleModalAria(false);
  toggleModalDisplay(true);
  toggleScroll(true);
  toggleBackgroundContent(true);
  mobileKeyboard.resetModalPosition();
  submitButtonState.hide(); // Ensure submit button is initially disabled

  resetInputStates();
  resetCharacterCount();
  addCharacterCountListeners();

  setTimeout(() => {
    const { firstname } = getFormElements();
    setupFocusTrap(mainModal, firstname);
  }, 250);
};

export const closeModal = () => {
  if (mainModal) {
    mainModal.classList.add('closing');
  }

  setTimeout(() => {
    cleanupFocusTrap(mainModal);
    toggleScroll(false);
    toggleBackgroundContent(false);
    mobileKeyboard.resetModalPosition();
    toggleModalDisplay(false);
    toggleModalAria(true);

    if (mainModal) {
      mainModal.classList.remove('closing');
    }

    resetFormAndModal();
    blurActive();
    removeCharacterCountListeners();
  }, 200);
};

export const isModalOpen = () => Boolean(mainModal?.classList?.contains('show'));
