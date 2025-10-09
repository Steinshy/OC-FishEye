import { getFormElements, getModalRefs } from '../../../constants.js';
import { errorDisplay } from '../../errorHandler.js';
import { sleep, toggleElementsDisabled } from '../helper.js';

import { submitValidation } from './validationManager.js';

const getInputs = () => {
  const { firstname, lastname, email, message } = getFormElements();
  return [firstname, lastname, email, message].filter(Boolean);
};

const updateButton = (text, disabled, classes = []) => {
  const button = getModalRefs().submitButton;
  if (!button) return;
  button.textContent = text;
  button.disabled = disabled;
  button.setAttribute('aria-disabled', disabled);
  button.classList.remove('success', 'disabled');
  if (classes.length) button.classList.add(...classes);
};

export const submitButtonState = {
  init: () => updateButton('Envoyer le message', true, ['disabled']),
  show: () => updateButton('Envoyer le message', false),
  hide: () => updateButton('Envoyer le message', true, ['disabled']),
  setLoading: isLoading => updateButton(isLoading ? 'Envoi en cours...' : 'Envoyer le message', isLoading, isLoading ? ['disabled'] : []),
  setSuccess: isSuccess => updateButton(isSuccess ? 'Message envoyé !' : 'Envoyer le message', false, isSuccess ? ['success'] : []),
  reset: () => updateButton('Envoyer le message', false),
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

const markSuccess = () =>
  getInputs().forEach(input => {
    input.classList.add('success');
    input.setAttribute('data-valid', 'true');
    input.setAttribute('data-error-visible', 'false');
  });

export const handleFormSubmission = async onComplete => {
  const inputs = getInputs();
  const { closeButton } = getModalRefs();

  toggleElementsDisabled([...inputs, closeButton], true);
  submitButtonState.setLoading(true);
  await sleep(1000);
  submitButtonState.setSuccess(true);
  markSuccess();

  await sleep(1500);
  toggleElementsDisabled([...inputs, closeButton], false);
  submitButtonState.reset();
  onComplete?.();
};
