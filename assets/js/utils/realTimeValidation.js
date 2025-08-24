const formElements = {
  lastName: document.getElementById("last_name"),
  firstName: document.getElementById("first_name"),
  email: document.getElementById("email"),
  message: document.getElementById("message"),
};

// Real time validation - Inputs
const handleRealTimeValidation = (element, fieldName) => {
  const value = element.value.trim();
  let valid = true;

  if (fieldName === "first_name" || fieldName === "last_name") {
    valid = value.length >= 2;
  } else if (fieldName === "email") {
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  } else if (fieldName === "message") {
    valid = value !== "";
  }

  element.setAttribute("data-error-visible", value && !valid);
};

const initializeRealTimeValidation = () => {
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
