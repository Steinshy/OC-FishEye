/**
 * Main Validator
 * Used in validatorRealTime.js and submission.js
 */

const validateFields = (fieldName, value) => {
  switch (fieldName) {
    case "first_name":
    case "last_name":
      return value.length >= window.validationRules.minlength;
    case "email":
      return window.validationRules.emailRegex.test(value);
    case "message":
      return value.length > 0 && value.length <= window.validationRules.maxlength;
    default:
      return false;
  }
};


// Submit validation with error display
const submitValidation = (values) => {
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
const Validators = {
  validateFields,
  submitValidation
};

window.Validators = Validators;
