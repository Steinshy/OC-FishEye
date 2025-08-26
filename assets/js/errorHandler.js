let globalErrorElements = {};

function initializeErrorElements() {
  globalErrorElements = {
    firstName: document.getElementById("first_name_error"),
    lastName: document.getElementById("last_name_error"),
    email: document.getElementById("email_error"),
    message: document.getElementById("message_error"),
    global: document.getElementById("form_global_error")
  };
}

function ensureInitialized() {
  if (!globalErrorElements?.firstName) {
    initializeErrorElements();
  }
}

function toggleError(targetKey, shouldShow, message) {
  ensureInitialized();

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

window.ErrorHandler = {
  initializeErrorElements,
  toggleError,
  setError,
  hideError
};
