import { validationRules, formConfig, modalElements } from '../../../constants.js';

import { errorDisplay } from './ui-helper.js';

export const validateFields = (fieldName, value) => {
  switch (fieldName) {
    case 'firstName':
    case 'lastName':
      return value.length >= validationRules.minlength;
    case 'email':
      return validationRules.emailRegex.test(value);
    case 'message':
      return value.length > 0 && value.length <= validationRules.maxlength;
    default:
      return false;
  }
};

export const submitValidation = () => {
  let hasErrors = false;

  formConfig.fieldNames.forEach(fieldName => {
    const element = modalElements?.formGroup?.[fieldName];
    const isValid = validateFields(fieldName, element?.value || '');
    if (!isValid) {
      if (errorDisplay && fieldName) {
        errorDisplay.toggleError(fieldName, true);
      }
      hasErrors = true;
    }
  });

  return !hasErrors;
};
