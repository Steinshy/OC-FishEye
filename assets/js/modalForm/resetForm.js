let resetFormElements = {};
let modalErrorElements = [];
let modalFormFields = [];

function initializeResetFormElements() {
  resetFormElements = {
    contactForm: document.getElementById("contact_form"),
    contactModal: document.getElementById("modal_container"),
    message: document.getElementById("message"),
    characterCount: document.getElementById("form_textarea")
  };
  modalErrorElements = [
    "first_name_error",
    "last_name_error",
    "email_error",
    "message_error"
  ];

  modalFormFields = ["first_name", "last_name", "email", "message"];
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
  modalFormFields.forEach((fieldName) => {
    const field = document.getElementById(fieldName);
    if (field) {
      if (fieldName !== "message") {
        field.setAttribute("data-error-visible", "false");
        field.setAttribute("data-valid", "false");
      }
    }
  });

  modalErrorElements.forEach((errorId) => {
    const errorSpan = document.getElementById(errorId);
    errorSpan?.setAttribute("data-error-visible", "false");
  });
};

const resetModal = () => {
  resetFormElements.contactModal?.classList.remove("show");
};

const resetFormAndModal = ({closeModal = true} = {}) => {
  resetFormFields();
  closeModal && resetModal();
};

window.resetFormAndModal = resetFormAndModal;
window.resetFormFields = resetFormFields;
window.resetErrorVisibility = resetErrorVisibility;
window.resetCharacterCount = resetCharacterCount;

document.addEventListener("DOMContentLoaded", () => {
  initializeResetFormElements();
  resetFormAndModal();
});
