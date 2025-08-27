let resetFormElements = {};
let modalErrorElements = [];
let modalFormFields = [];

function initializeResetFormElements() {
  resetFormElements = {
    contactForm: document.getElementById("contact_form"),
    contactModal: document.getElementById("modal_container"),
    message: document.getElementById("message"),
    characterCount: document.getElementById("character_count")
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
    field?.setAttribute("data-error-visible", "false");
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

document.addEventListener("DOMContentLoaded", () => {
  initializeResetFormElements();
  resetFormAndModal();
});
