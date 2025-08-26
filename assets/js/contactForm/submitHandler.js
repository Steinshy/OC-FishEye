let submitElements = {};
let getFormElements = {};
let errorElements = {};

function initializeElements() {
  submitElements = {
    contactForm: document.getElementById("contact_form"),
    submitButton: document.querySelector(".submit_button")
  };

  getFormElements = {
    firstName: document.getElementById("first_name"),
    lastName: document.getElementById("last_name"),
    email: document.getElementById("email"),
    message: document.getElementById("message")
  };

  errorElements = {
    firstName: document.getElementById("first_name_error"),
    lastName: document.getElementById("last_name_error"),
    email: document.getElementById("email_error"),
    message: document.getElementById("message_error"),
    global: document.getElementById("form_global_error")
  };
}

function toSnakeField(fieldKey) {
  if (fieldKey === "firstName") return "first_name";
  if (fieldKey === "lastName") return "last_name";
  return fieldKey;
}

function setFieldError(field, shouldShow, message = "") {
  if (
    window.ErrorHandler &&
    typeof window.ErrorHandler.setError === "function"
  ) {
    window.ErrorHandler.setError(field, shouldShow, message);
  } else {
    if (errorElements[field]) {
      errorElements[field].setAttribute(
        "data-error-visible",
        shouldShow ? "true" : "false"
      );
      if (message) {
        errorElements[field].textContent = message;
      }
    }
    if (field === "global" && errorElements.global) {
      errorElements.global.setAttribute(
        "data-error-visible",
        shouldShow ? "true" : "false"
      );
      if (message) {
        errorElements.global.textContent = message;
      }
    }
  }
}

function validateFirstName(formData) {
  const firstName = (formData.first_name || "").trim();
  const isValid = window.Validators.validateField("first_name", firstName);
  setFieldError("firstName", !isValid);
  return isValid;
}

function validateLastName(formData) {
  const lastName = (formData.last_name || "").trim();
  const valid = window.Validators.validateField("last_name", lastName);
  setFieldError("lastName", !valid);
  return valid;
}

function validateEmail(formData) {
  const email = (formData.email || "").trim();
  const valid = window.Validators.validateField("email", email);
  setFieldError("email", !valid);
  return valid;
}

function validateMessage(formData) {
  const message = (formData.message || "").trim();
  const valid = window.Validators.validateField("message", message);
  setFieldError("message", !valid);
  return valid;
}

function validateForm(formData) {
  const valid = window.Validators.areAllFieldsValid(formData);

  if (!valid) {
    setFieldError(
      "global",
      true,
      "Veuillez corriger les erreurs dans le formulaire."
    );
  } else {
    setFieldError("global", false);
  }

  return valid;
}

function initializeSubmitHandler() {
  initializeElements();

  if (submitElements.contactForm) {
    submitElements.contactForm.addEventListener("submit", handleFormSubmit);
  } else {
    setFieldError(
      "global",
      true,
      "Formulaire introuvable lors de l'initialisation."
    );
  }
}
