import { getFieldNames, getFormElements } from '../../../constants.js';
import { errorDisplay } from '../../errorHandler.js';
import { sanitizeAndValidate, validateEmail, validate } from '../helper.js';

const validationRules = {
  firstname: value => sanitizeAndValidate(value, v => v.length >= 2),
  lastname: value => sanitizeAndValidate(value, v => v.length >= 2),
  email: validateEmail,
  message: value => sanitizeAndValidate(value, v => v.length > 0 && v.length <= 500),
};

export const validateFields = (fieldName, value) => validate(validationRules, fieldName, value);

export const submitValidation = () => {
  let hasErrors = false;
  const formData = {};
  const formElements = getFormElements();

  getFieldNames().forEach(fieldName => {
    const element = formElements[fieldName];
    formData[fieldName] = element ? element.value : '';
  });

  const isValid = Boolean(validate(validationRules, formData));

  if (!isValid) {
    getFieldNames().forEach(fieldName => {
      const element = formElements[fieldName];
      const fieldValue = element ? element.value : '';
      const fieldIsValid = validateFields(fieldName, fieldValue);
      if (!fieldIsValid) {
        errorDisplay.toggleError(fieldName, true);
        hasErrors = true;
      }
    });
  }

  return !hasErrors;
};
