import { getFormElements, getModalRefs, submissionButtonText } from '../../../constants.js';
import { aria } from '../../accessibility/aria.js';
import { errorDisplay } from '../../errorHandler.js';
import { sleep, toggleElementsDisabled, getFormInputsArray, getFormValues } from '../helper.js';
import { logData } from '../logData.js';

import { submitValidation } from './validationManager.js';

const { closeButton } = getModalRefs();
const { defaultText, loadingText, successText } = submissionButtonText;

const updateButton = (text, disabled, classes = []) => {
  const button = getModalRefs().submitButton;
  if (!button) return;

  button.textContent = text || defaultText;
  aria.setDisabled(button, disabled);
  button.classList.remove('success', 'disabled');
  if (classes.length) button.classList.add(...classes);
};

const setButtonDisabled = () => updateButton(defaultText, true, ['disabled']);
const setButtonEnabled = () => updateButton(defaultText, false);

export const submitButtonState = {
  init: setButtonEnabled,
  show: setButtonEnabled,
  hide: setButtonDisabled,
  setLoading: () => updateButton(loadingText, true, ['disabled']),
  setSuccess: () => updateButton(successText, false, ['success']),
  reset: setButtonEnabled,
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

const handleFormSubmission = async onComplete => {
  const inputs = getFormInputsArray(getFormElements());

  const markSuccess = () => {
    inputs.forEach(input => {
      input.classList.add('success');
      input.setAttribute('data-valid', 'true');
      input.setAttribute('data-error-visible', 'false');
    });
  };

  logData.formSubmission(getFormValues(getFormElements()));

  const elements = [...inputs, closeButton];
  toggleElementsDisabled(elements, true);
  submitButtonState.setLoading();

  await sleep(1000);
  submitButtonState.setSuccess();
  markSuccess();

  await sleep(1500);
  toggleElementsDisabled(elements, false);
  submitButtonState.reset();
  onComplete?.();
};
