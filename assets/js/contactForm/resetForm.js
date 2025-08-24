let resetFormElements = {};

function initializeResetFormElements() {
  resetFormElements = {
    contactForm: document.getElementById("contact_form"),
    contactModal: document.getElementById("modal_container"),
    message: document.getElementById("message"),
    characterCount: document.getElementById("character_count"),
  };
}

const resetFormFields = () => {
  resetFormElements.contactForm?.reset();
  resetCharacterCount();
  resetErrorVisibility();
};

const resetCharacterCount = () => {
  if (resetFormElements.message) {
    const minElement = document.getElementById("min");
    const maxElement = document.getElementById("max");
    const errorElement = document.getElementById("message_error");

    if (minElement) {
      minElement.textContent = "0";
    }

    resetFormElements.characterCount?.classList.remove("warning", "danger");
    if (maxElement) {
      maxElement.classList.remove("danger");
    }
    if (errorElement) {
      errorElement.classList.remove("danger");
    }
  }
};

const resetErrorVisibility = () => {
  const formFields = ["first_name", "last_name", "email", "message"];

  formFields.forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (field) {
      field.setAttribute("data-error-visible", "false");
    }
  });

  const errorSpans = [
    "first_name_error",
    "last_name_error",
    "email_error",
    "message_error",
  ];

  errorSpans.forEach((errorId) => {
    const errorSpan = document.getElementById(errorId);
    if (errorSpan) {
      errorSpan.setAttribute("data-error-visible", "false");
    }
  });
};

const resetURL = () => {
  if (window.history && window.history.replaceState) {
    const url = new URL(window.location);
    url.search = "";
    window.history.replaceState({}, document.title, url.toString());
  }
};

const closeModal = () => {
  if (resetFormElements.contactModal) {
    resetFormElements.contactModal.classList.remove("show");
  }
};

const resetModalAndURL = () => {
  resetFormFields();
  resetURL();
  closeModal();
};

const resetFormOnly = () => {
  resetFormFields();
  resetURL();
};

document.addEventListener("DOMContentLoaded", () => {
  initializeResetFormElements();
  resetFormOnly();
});
