/* Photographer Page => Error Handler Utility*/
import { Modal } from "../../../core/constants.js";

export const toggleError = (targetKey, shouldShow, message) => {
  const errorElement = Modal.formError[targetKey];
  if (errorElement) {
    errorElement.setAttribute("data-error-visible", shouldShow ? "true" : "false");
    if (message) {
      errorElement.textContent = message;
    }
  }
};

export const resetErrorVisibility = () => {
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

export const setError = (targetKey, shouldShow, message = "") => {
  toggleError(targetKey, shouldShow, message);
};

export const hideError = (targetKey) => {
  toggleError(targetKey, false);
};

export const ErrorHandler = {
  setError: setError,
  hideError: hideError,
  resetErrorVisibility: resetErrorVisibility
};