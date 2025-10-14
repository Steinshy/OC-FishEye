import { getFormElements, getModalRefs } from '../../../constants.js';
import { errorDisplay } from '../../errorHandler.js';
import { sleep, toggleElementsDisabled, getFormInputsArray, getFormValues } from '../helper.js';
import { logData } from '../logData.js';

import { submitButtonState } from './submitButtonState.js';
import { submitValidation } from './validationManager.js';

const { closeButton } = getModalRefs();

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
