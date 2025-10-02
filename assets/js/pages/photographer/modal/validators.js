import { modalElements, getFieldNames } from '../../../constants.js';

import { errorDisplay } from './ui-helper.js';

const validateForm = formData => {
  const rules = {
    firstname: value => value && value.length >= 2,
    lastname: value => value && value.length >= 2,
    email: value => value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: value => value && value.length > 0 && value.length <= 500,
  };

  return Object.entries(rules).every(([field, validator]) => validator(formData[field]));
};

export const validateFields = (fieldName, value) => {
  const rules = {
    firstname: val => val && val.length >= 2,
    lastname: val => val && val.length >= 2,
    email: val => val && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    message: val => val && val.length > 0 && val.length <= 500,
  };

  return rules[fieldName] ? rules[fieldName](value) : false;
};

export const submitValidation = () => {
  let hasErrors = false;
  const formData = {};

  getFieldNames().forEach(fieldName => {
    const element = modalElements?.formGroup?.[fieldName];
    formData[fieldName] = element ? element.value : '';
  });

  const isValid = validateForm(formData);

  if (!isValid) {
    getFieldNames().forEach(fieldName => {
      const element = modalElements?.formGroup?.[fieldName];
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
