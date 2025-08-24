let globalErrorElements = {};

function initializeErrorElements() {
  globalErrorElements = {
    firstName: document.getElementById("first_name_error"),
    lastName: document.getElementById("last_name_error"),
    email: document.getElementById("email_error"),
    message: document.getElementById("message_error"),
    global: document.getElementById("form_global_error"),
  };
}

function ensureInitialized() {
  if (!globalErrorElements || Object.keys(globalErrorElements).length === 0) {
    initializeErrorElements();
  }
}

function showError(targetKey, message) {
  ensureInitialized();
  const el = globalErrorElements[targetKey];
  if (el) {
    el.setAttribute("data-error-visible", "true");
    if (typeof message === "string" && message) {
      el.textContent = message;
    }
  }
}

function hideError(targetKey) {
  ensureInitialized();
  const el = globalErrorElements[targetKey];
  if (el) {
    el.setAttribute("data-error-visible", "false");
  }
}

function setError(targetKey, shouldShow, message) {
  if (shouldShow) {
    showError(targetKey, message);
  } else {
    hideError(targetKey);
  }
}

window.ErrorHandler = {
  initializeErrorElements,
  showError,
  hideError,
  setError,
};
