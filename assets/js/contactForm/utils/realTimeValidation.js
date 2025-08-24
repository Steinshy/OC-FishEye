let formElements = {};

function initializeFormElements() {
  formElements = {
    lastName: document.getElementById("last_name"),
    firstName: document.getElementById("first_name"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
  };
}

const handleRealTimeValidation = (element, fieldName) => {
  const value = element.value.trim();
  const valid = window.Validators
    ? window.Validators.validateField(fieldName, value)
    : (() => {
        if (fieldName === "first_name" || fieldName === "last_name") {
          return value.length >= 2;
        } else if (fieldName === "email") {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        } else if (fieldName === "message") {
          return value !== "" && value.length <= 500;
        }
        return true;
      })();

  const shouldShow = fieldName !== "message" && Boolean(value && !valid);

  element.setAttribute("data-error-visible", shouldShow ? "true" : "false");

  const key = window.FieldKeys
    ? window.FieldKeys.toErrorKey(fieldName)
    : fieldName;
  if (
    window.ErrorHandler &&
    typeof window.ErrorHandler.setError === "function"
  ) {
    if (fieldName !== "message") {
      window.ErrorHandler.setError(key, shouldShow);
    } else {
      if (value !== "" && value.length <= 500) {
        window.ErrorHandler.setError("message", false);
      }
    }
  }

  if (areAllContactFieldsValid()) {
    if (
      window.ErrorHandler &&
      typeof window.ErrorHandler.hideError === "function"
    ) {
      window.ErrorHandler.hideError("global");
    } else {
      const globalError = document.getElementById("form_global_error");
      if (globalError) {
        globalError.setAttribute("data-error-visible", "false");
      }
    }
  }
};

function areAllContactFieldsValid() {
  if (!formElements || Object.keys(formElements).length === 0) {
    initializeFormElements();
  }

  const getTrimmedValue = (el) => (el && el.value ? el.value.trim() : "");

  const values = {
    first_name: getTrimmedValue(formElements.firstName),
    last_name: getTrimmedValue(formElements.lastName),
    email: getTrimmedValue(formElements.email),
    message: getTrimmedValue(formElements.message),
  };

  if (
    window.Validators &&
    typeof window.Validators.areAllFieldsValid === "function"
  ) {
    return window.Validators.areAllFieldsValid(values);
  }

  return (
    values.first_name.length >= 2 &&
    values.last_name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) &&
    values.message.length > 0 &&
    values.message.length <= 500
  );
}

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
