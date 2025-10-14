import { getModalRefs, getFormElements, formFieldNames } from '../../constants.js';
import { forEachFormField, toggleScroll } from '../../helpers/helper.js';
import { aria } from '../accessibility/aria.js';
import { setupFocusCycle, cleanupFocusCycle, toggleBackgroundContent, blurActive } from '../accessibility/focus.js';
import { mobileKeyboard } from '../accessibility/mobile.js';
import { initializeModalAccessibility } from '../accessibility/modal.js';
import { errorDisplay } from '../errorHandler.js';

import { getSafeDuration } from './animationManager.js';
import { resetCharacterCount, addCharacterCountListeners, removeCharacterCountListeners } from './characterCountManager.js';
import { submitForm } from './submissionManager.js';
import { submitButtonState } from './submitButtonState.js';
import { setupFieldValidation } from './validationManager.js';

const { mainModal, form, submitButton } = getModalRefs();

const resetInputStates = () => {
  forEachFormField(getFormElements(), formFieldNames, element => {
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

const toggleModal = show => {
  const display = {
    action: show ? 'add' : 'remove',
    apply: () => {
      if (mainModal) mainModal.classList[display.action]('show');
      if (form) form.classList[display.action]('show');
    },
  };

  const ariaState = {
    hidden: !show,
    apply: () => {
      if (mainModal) aria.setHidden(mainModal, ariaState.hidden);
      if (form) aria.setHidden(form, ariaState.hidden);
      if (submitButton) aria.setHidden(submitButton, ariaState.hidden);
    },
  };

  display.apply();
  ariaState.apply();
};

export const openModal = () => {
  toggleModal(true);
  toggleScroll(true);
  toggleBackgroundContent(true);
  mobileKeyboard.resetModalPosition();
  submitButtonState.hide();

  resetInputStates();
  resetCharacterCount();
  addCharacterCountListeners();

  const openingDuration = getSafeDuration(250);
  setTimeout(() => {
    const { firstname } = getFormElements();
    setupFocusCycle(mainModal, firstname);
  }, openingDuration);
};

export const closeModal = async () => {
  if (!mainModal) return;

  mainModal.classList.add('closing');

  const closingDuration = getSafeDuration(200);
  await new Promise(resolve => setTimeout(resolve, closingDuration));

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

export const isModalOpen = () => Boolean(mainModal?.classList?.contains('show'));

export const setupModalEventListeners = (photographerName = '') => {
  initializeModalAccessibility({
    photographerName,
    onOpen: openModal,
    onClose: closeModal,
    onSubmit: submitForm,
    onValidation: setupFieldValidation,
  });
};
