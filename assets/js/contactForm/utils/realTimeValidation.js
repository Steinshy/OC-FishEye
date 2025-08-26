let formElements = {};

function initializeFormElements() {
  formElements = {
    lastName: document.getElementById("last_name"),
    firstName: document.getElementById("first_name"),
    email: document.getElementById("email"),
    message: document.getElementById("message")
  };
}

const fieldNameToErrorKey = {
  first_name: "firstName",
  last_name: "lastName",
  email: "email",
  message: "message"
};

const handleRealTimeValidation = (element, fieldName) => {
  const fieldValue = element.value.trim();

  const isValid = window.Validators
    ? window.Validators.validateField(fieldName, fieldValue)
    : true;

  const shouldShowError = Boolean(fieldValue && !isValid);

  element.setAttribute(
    "data-error-visible",
    shouldShowError ? "true" : "false"
  );

  if (window.ErrorHandler) {
    const errorKey = fieldNameToErrorKey[fieldName] || fieldName;
    window.ErrorHandler.setError(errorKey, shouldShowError);
  }

  if (window.Validators) {
    const values = {
      first_name: formElements.firstName?.value?.trim() || "",
      last_name: formElements.lastName?.value?.trim() || "",
      email: formElements.email?.value?.trim() || "",
      message: formElements.message?.value?.trim() || ""
    };

    if (window.Validators.areAllFieldsValid(values)) {
      if (window.ErrorHandler) {
        window.ErrorHandler.hideError("global");
      } else {
        const globalError = document.getElementById("form_global_error");
        if (globalError) {
          globalError.setAttribute("data-error-visible", "false");
        }
      }
    }
  }
};

const initializeRealTimeValidation = () => {
  initializeFormElements();

  if (formElements.firstName) {
    formElements.firstName.addEventListener("input", () =>
      handleRealTimeValidation(formElements.firstName, "first_name")
    );
  }
  if (formElements.lastName) {
    formElements.lastName.addEventListener("input", () =>
      handleRealTimeValidation(formElements.lastName, "last_name")
    );
  }
  if (formElements.email) {
    formElements.email.addEventListener("input", () =>
      handleRealTimeValidation(formElements.email, "email")
    );
  }
  if (formElements.message) {
    formElements.message.addEventListener("input", () =>
      handleRealTimeValidation(formElements.message, "message")
    );
  }
};

window.RealTimeValidation = {
  initializeRealTimeValidation,
  handleRealTimeValidation
};
