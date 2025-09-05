/**
 * Validation Utilities
 * General validation utility functions
 */

/**
 * Validate minimum length
 */
function hasMinLength(value, minLength = window.VALIDATION_RULES.MIN_NAME_LENGTH) {
  return (value || "").trim().length >= minLength;
}

/**
 * Validate maximum length
 */
function hasMaxLength(value, maxLength = window.VALIDATION_RULES.MAX_MESSAGE_LENGTH) {
  return (value || "").trim().length <= maxLength;
}

/**
 * Validate required field
 */
function isRequired(value) {
  return (value || "").trim().length > 0;
}

/**
 * Sanitize input value
 */
function sanitizeInput(value) {
  return (value || "").trim();
}

/**
 * Validate form data object
 */
function validateFormData(formData, rules = {}) {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = sanitizeInput(formData[field]);
    const fieldRules = rules[field];

    if (fieldRules.required && !isRequired(value)) {
      errors[field] = `${field} is required`;
    } else if (fieldRules.minLength && !hasMinLength(value, fieldRules.minLength)) {
      errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
    } else if (fieldRules.maxLength && !hasMaxLength(value, fieldRules.maxLength)) {
      errors[field] = `${field} must be no more than ${fieldRules.maxLength} characters`;
    } else if (fieldRules.email && !isValidEmail(value)) {
      errors[field] = `${field} must be a valid email`;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Global access for backward compatibility
window.ValidationUtils = {
  hasMinLength,
  hasMaxLength,
  isRequired,
  sanitizeInput,
  validateFormData
};
