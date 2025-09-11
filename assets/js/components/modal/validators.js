/* Main Validator Used in validatorRealTime.js and submission.js */

import { validationRules } from "../../core/constants.js";
import { ErrorHandler } from "../../core/constants.js";
import { fieldErrorMap } from "../../core/constants.js";

export const validateFields = (fieldName, value) => {
  switch (fieldName) {
    case "first_name":
    case "last_name":
      return value.length >= validationRules.minlength;
    case "email":
      return validationRules.emailRegex.test(value);
    case "message":
      return value.length > 0 && value.length <= validationRules.maxlength;
    default:
      return false;
  }
};


// Submit validation with error display
export const submitValidation = (values) => {
  let hasErrors = false;

  // Validate each field and show errors
  Object.keys(values).forEach(field => {
    const isValid = validateFields(field, values[field]);
    if (!isValid) {
      const errorKey = fieldErrorMap[field];
      if (ErrorHandler && errorKey) {
        ErrorHandler.setError(errorKey, true);
      }
      hasErrors = true;
    }
  });

  return !hasErrors;
};

// Create global Validators object
export const Validators = {
  validateFields,
  submitValidation
};