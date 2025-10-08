import { getFormElements, getModalRefs } from '../../../constants.js';
import { errorDisplay } from '../../errorHandler.js';
import { sleep } from '../helper.js';

import { submitValidation } from './validationManager.js';

export const submitButtonState = {
  init() {
    const refs = getModalRefs();
    if (!refs.submitButton) return;

    refs.submitButton.textContent = 'Envoyer le message';
    refs.submitButton.classList.remove('success', 'disabled');
    refs.submitButton.disabled = true;
    refs.submitButton.setAttribute('aria-disabled', 'true');
  },

  show() {
    const refs = getModalRefs();
    if (!refs.submitButton) return;

    refs.submitButton.disabled = false;
    refs.submitButton.classList.remove('disabled');
    refs.submitButton.setAttribute('aria-disabled', 'false');
  },

  hide() {
    const refs = getModalRefs();
    if (!refs.submitButton) return;

    refs.submitButton.disabled = true;
    refs.submitButton.classList.add('disabled');
    refs.submitButton.setAttribute('aria-disabled', 'true');
  },

  setLoading(isLoading = true) {
    const refs = getModalRefs();
    if (!refs.submitButton) return;

    if (isLoading) {
      submitButtonState.hide();
      refs.submitButton.textContent = 'Envoi en cours...';
    } else {
      submitButtonState.show();
      refs.submitButton.textContent = 'Envoyer le message';
    }
  },

  setSuccess(isSuccess = true) {
    const refs = getModalRefs();
    if (!refs.submitButton) return;

    if (isSuccess) {
      refs.submitButton.textContent = 'Message envoyé !';
      refs.submitButton.classList.add('success');
    } else {
      refs.submitButton.textContent = 'Envoyer le message';
      refs.submitButton.classList.remove('success');
    }
  },

  reset() {
    const refs = getModalRefs();
    if (!refs.submitButton) return;

    submitButtonState.show();
    refs.submitButton.textContent = 'Envoyer le message';
    refs.submitButton.classList.remove('success', 'disabled');
    refs.submitButton.setAttribute('aria-disabled', 'false');
  },

  isEnabled() {
    const refs = getModalRefs();
    return refs.submitButton && !refs.submitButton.disabled;
  },

  isDisabled() {
    const refs = getModalRefs();
    return refs.submitButton && refs.submitButton.disabled;
  },
};

const getInputs = () => {
  const formElements = getFormElements();
  return [formElements.firstname, formElements.lastname, formElements.email, formElements.message].filter(Boolean);
};

export const submitForm = async (e, onComplete) => {
  e.preventDefault();
  errorDisplay?.resetErrorVisibility();

  if (!submitValidation()) {
    submitButtonState?.hide();
    return;
  }

  await handleFormSubmission(onComplete);
};

const markInputsSuccess = () => {
  const inputs = getInputs();
  inputs.forEach(input => {
    input.classList.add('success');
    input.setAttribute('data-valid', 'true');
    input.setAttribute('data-error-visible', 'false');
  });
};

export const handleFormSubmission = async onComplete => {
  disableFormInputs(true);
  preventModalClosing(true);
  submitButtonState?.setLoading(true);

  await sleep(1000);
  submitButtonState?.setSuccess(true);
  markInputsSuccess();

  await sleep(1500);
  preventModalClosing(false);
  disableFormInputs(false);

  if (onComplete) onComplete();

  submitButtonState?.reset();
  console.info('form submitted');
};

export const disableFormInputs = disable => {
  const inputs = getInputs();
  inputs.forEach(input => {
    input.disabled = disable;
  });
};

export const preventModalClosing = prevent => {
  const refs = getModalRefs();
  if (!refs.closeButton) return;
  refs.closeButton.disabled = prevent;
};
