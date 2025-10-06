import { getFieldNames, getFormElements } from '../../../constants.js';
import { errorDisplay } from '../../errorHandler.js';

const validateEmail = email => {
  if (!email?.includes('@') || !email?.includes('.')) return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
};

const validationRules = {
  firstname: value => value && value.length >= 2,
  lastname: value => value && value.length >= 2,
  email: validateEmail,
  message: value => value && value.length > 0 && value.length <= 500,
};

const validateForm = formData => {
  return Object.entries(validationRules).every(([field, validator]) => validator(formData[field]));
};

export const validateFields = (fieldName, value) => {
  return validationRules[fieldName] ? validationRules[fieldName](value) : false;
};

export const submitValidation = () => {
  let hasErrors = false;
  const formData = {};
  const formElements = getFormElements();

  getFieldNames().forEach(fieldName => {
    const element = formElements[fieldName];
    formData[fieldName] = element ? element.value : '';
  });

  const isValid = validateForm(formData);

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
