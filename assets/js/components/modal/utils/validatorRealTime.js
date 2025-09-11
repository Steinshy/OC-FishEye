import { Validators } from '../validators.js';
import { ErrorHandler } from './displayError.js';
import { fieldErrorMap } from '../../../core/constants.js';
import { getTrimmedValues } from '../../../core/constants.js';
import { ButtonState } from './submitButton.js';

// Real-time validation handler
export const realTimeValidation = (element, fieldName) => {
  const fieldValue = element.value.trim();
  const isValid = Validators?.validateFields(fieldName, fieldValue) || false;
  const shouldShowError = Boolean(fieldValue && !isValid);
  const shouldShowValid = Boolean(fieldValue && isValid);

  if (fieldName !== 'message') {
    element.setAttribute('data-error-visible', shouldShowError ? 'true' : 'false');
    element.setAttribute('data-valid', shouldShowValid ? 'true' : 'false');
  }

  if (ErrorHandler) {
    const errorKey = fieldErrorMap[fieldName] || fieldName;
    ErrorHandler.setError(errorKey, shouldShowError);
  }

  // Get all form values for complete validation
  const values = getTrimmedValues() || {};

  // Check if all fields are valid
  const areAllFieldsValid = values => {
    return Object.keys(values).every(
      field => Validators?.validateFields(field, values[field]) || false
    );
  };

  // Control button state based on form validation
  if (ButtonState) {
    const allFieldsValid = areAllFieldsValid(values);
    allFieldsValid ? ButtonState.show() : ButtonState.hide();
  }
};
