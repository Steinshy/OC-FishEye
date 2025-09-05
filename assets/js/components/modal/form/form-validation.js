/**
 * Photographer Page => Form Validation
 * Todo: Import GameOn form code
 */

const isValidFirstName = (value) => (value || "").trim().length >= window.VALIDATION_RULES.MIN_NAME_LENGTH;
const isValidLastName = (value) => (value || "").trim().length >= window.VALIDATION_RULES.MIN_NAME_LENGTH;
const isValidEmail = (value) => window.VALIDATION_RULES.EMAIL_REGEX.test(value);
const isValidMessage = (value) =>
  (value || "").trim().length > 0 && (value || "").trim().length <= window.VALIDATION_RULES.MAX_MESSAGE_LENGTH;

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

// Export individual validators (available globally)

// Global access for backward compatibility
window.Validators = {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidMessage,
  validateField,
  areAllFieldsValid
};
