/**
 * Photographer Page => Error Handler Utility
 * Todo: Import GameOn form code
 */

let globalErrorElements = {};

globalErrorElements = {
  firstName: document.getElementById("first_name_error"),
  lastName: document.getElementById("last_name_error"),
  email: document.getElementById("email_error"),
  message: document.getElementById("message_error"),
  global: document.getElementById("global_error")
};

function toggleError(targetKey, shouldShow, message) {
  const errorElement = globalErrorElements[targetKey];
  if (errorElement) {
    errorElement.setAttribute(
      "data-error-visible",
      shouldShow ? "true" : "false"
    );
    if (message) {
      errorElement.textContent = message;
    }
  }
}

function setError(targetKey, shouldShow, message = "") {
  toggleError(targetKey, shouldShow, message);
}

function hideError(targetKey) {
  toggleError(targetKey, false);
}

// Global access for backward compatibility
window.ErrorHandler = {
  toggleError,
  setError,
  hideError,
  globalErrorElements
};
