const isValidFirstName = (value) => (value || "").trim().length >= 2;

const isValidLastName = (value) => (value || "").trim().length >= 2;

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidMessage = (value) =>
  (value || "").trim().length > 0 && (value || "").trim().length <= 500;

const validateField = (fieldName, value) => {
  switch (fieldName) {
    case "first_name":
    case "firstName":
      return isValidFirstName(value);
    case "last_name":
    case "lastName":
      return isValidLastName(value);
    case "email":
      return isValidEmail(value);
    case "message":
      return isValidMessage(value);
    default:
      return true;
  }
};

const areAllFieldsValid = (values) => {
  return (
    isValidFirstName(values.first_name) &&
    isValidLastName(values.last_name) &&
    isValidEmail(values.email) &&
    isValidMessage(values.message)
  );
};

window.Validators = {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidMessage,
  validateField,
  areAllFieldsValid
};
