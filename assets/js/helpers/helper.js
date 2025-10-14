// Utility helper functions

// Delay execution for specified milliseconds
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// Toggle body scroll on or off
export const toggleScroll = add => [document.documentElement, document.body].forEach(element => element.classList.toggle('no-scroll', add));

// Enable or disable form elements
export const toggleElementsDisabled = (elements, disable) =>
  (Array.isArray(elements) ? elements : [elements]).forEach(element => element && (element.disabled = disable));

// Remove HTML tags and trim string
export const sanitize = input => (typeof input === 'string' ? input.trim().replace(/<[^>]*>/g, '') : '');

// Sanitize value then validate with function
export const sanitizeAndValidate = (value, validator) => validator(typeof value === 'string' ? sanitize(value) : '');

// Validate email address format
export const validateEmail = email =>
  typeof email === 'string' &&
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
      .trim()
      .replace(/<[^>]*>/g, '')
      .toLowerCase()
  );

// Validate single field or entire form data
export const validate = (rules, fieldNameOrData, value) =>
  typeof fieldNameOrData === 'string'
    ? (rules[fieldNameOrData]?.(value) ?? false)
    : Object.entries(rules).every(([field, validator]) => validator(fieldNameOrData[field]));

// Remove special characters from name
export const sanitizeName = name => name?.replace(/[^a-zA-Z0-9]/g, '') || '';
// Determine media type from file properties
export const getMediaType = (video, image) => (video ? 'video' : image ? 'image' : '');
// Convert jpg filename to webp
export const toWebpFilename = filename => filename?.replace(/\.jpg$/i, '.webp') || '';
// Convert URL to mobile version
export const getMobileUrl = url => url.replace(url.substring(url.lastIndexOf('.')), s => `.mobile${s}`);
// Check if device is mobile or tablet
export const isMobileOrTablet = () => window.innerWidth <= 1024;
// Get URL parameter value
export const getUrlParam = (param, parseAsInt = false) => {
  const value = new URLSearchParams(window.location.search).get(param);
  return parseAsInt && value ? parseInt(value, 10) : value;
};

// Add pulse animation to element
export const addPulseAnimation = element => {
  if (!element) return;
  element.classList.add('pulse');
  setTimeout(() => element.classList.remove('pulse'), 400);
};

// Get array of form input elements
export const getFormInputsArray = ({ firstname, lastname, email, message }) => [firstname, lastname, email, message].filter(Boolean);

// Get form field values as object
export const getFormValues = ({ firstname, lastname, email, message }) => ({
  firstname: firstname?.value,
  lastname: lastname?.value,
  email: email?.value,
  message: message?.value,
});

// Execute callback for each form field
export const forEachFormField = (formElements, fieldNames, callback) =>
  fieldNames.forEach(fieldName => formElements[fieldName] && callback(formElements[fieldName], fieldName));
