
// Real-time validation handler
const realTimeValidation = (element, fieldName) => {
  const fieldValue = element.value.trim();
  const isValid = Validators?.validateFields(fieldName, fieldValue) || false;
  const shouldShowError = Boolean(fieldValue && !isValid);
  const shouldShowValid = Boolean(fieldValue && isValid);

  if (fieldName !== "message") {
    element.setAttribute("data-error-visible", shouldShowError ? "true" : "false");
    element.setAttribute("data-valid", shouldShowValid ? "true" : "false");
  }

  if (ErrorHandler) {
    const errorKey = fieldErrorMap[fieldName] || fieldName;
    ErrorHandler.setError(errorKey, shouldShowError);
  }

  // Get all form values for complete validation
  const values = getTrimmedValues() || {};

  // Check if all fields are valid
  const areAllFieldsValid = (values) => {
    return Object.keys(values).every(field =>
      Validators?.validateFields(field, values[field]) || false
    );
  };

  const allFieldsValid = areAllFieldsValid(values);

  if (allFieldsValid) {
    if (window.ErrorHandler) {
      ErrorHandler.hideError("global");
    } else {
      const globalError = document.getElementById("form_global_error");
      if (globalError) {
        globalError.setAttribute("data-error-visible", "false");
      }
    }
  }

  // Control button state based on form validation
  if (ButtonState) {
    allFieldsValid ? ButtonState.show() : ButtonState.hide();
  }
};

// Export globally
window.realTimeValidation = realTimeValidation;