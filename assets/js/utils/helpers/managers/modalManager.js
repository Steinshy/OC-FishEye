import { getModalRefs, getFormElements, formFieldNames } from '../../../constants.js';
import { aria } from '../../accessibility/aria.js';
import { setupFocusTrap, cleanupFocusTrap, toggleBackgroundContent, blurActive } from '../../accessibility/focus.js';
import { mobileKeyboard } from '../../accessibility/mobile.js';
import { errorDisplay } from '../../errorHandler.js';
import { toggleScroll, forEachFormField } from '../helper.js';

import { getSafeDuration } from './animationManager.js';
import { resetCharacterCount, addCharacterCountListeners, removeCharacterCountListeners } from './characterCountManager.js';
import { submitButtonState } from './submitButtonState.js';

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

export const openModal = () => {
  toggleModalAria(false);
  toggleModalDisplay(true);
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
    setupFocusTrap(mainModal, firstname);
  }, openingDuration);
};

export const closeModal = async () => {
  if (!mainModal) return;

  mainModal.classList.add('closing');

  const closingDuration = getSafeDuration(200);
  await new Promise(resolve => setTimeout(resolve, closingDuration));

  cleanupFocusTrap(mainModal);
  toggleScroll(false);
  toggleBackgroundContent(false);
  mobileKeyboard.resetModalPosition();
  toggleModalDisplay(false);
  toggleModalAria(true);

  mainModal.classList.remove('closing');

  resetFormAndModal();
  blurActive();
  removeCharacterCountListeners();
};

export const isModalOpen = () => Boolean(mainModal?.classList?.contains('show'));
