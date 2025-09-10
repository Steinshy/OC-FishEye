/**
 * Photographer Page => Error Handler Utility
 */

function toggleError(targetKey, shouldShow, message) {
  const errorElement = Modal.formError[targetKey];
  if (errorElement) {
    errorElement.setAttribute("data-error-visible", shouldShow ? "true" : "false");
    if (message) {
      errorElement.textContent = message;
    }
  }
}

const resetErrorVisibility = () => {
  // Reset form field error states
  Modal.formFieldNames.forEach((fieldName) => {
    const field = Modal[fieldName];
    if (field && fieldName !== "messageInput") {
      field.setAttribute("data-error-visible", "false");
      field.setAttribute("data-valid", "false");
    }
  });

  // Reset all error message visibility
  Modal.formErrorNames.forEach((errorId) => {
    Modal[errorId]?.setAttribute("data-error-visible", "false");
  });

};

function setError(targetKey, shouldShow, message = "") {
  toggleError(targetKey, shouldShow, message);
}

function hideError(targetKey) {
  toggleError(targetKey, false);
}

window.ErrorHandler = {
  setError: setError,
  hideError: hideError,
  resetErrorVisibility: resetErrorVisibility
};

// Export resetErrorVisibility globally
window.resetErrorVisibility = resetErrorVisibility;