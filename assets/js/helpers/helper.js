export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const toggleScroll = add => [document.documentElement, document.body].forEach(element => element.classList.toggle('no-scroll', add));

export const toggleElementsDisabled = (elements, disable) =>
  elements && (Array.isArray(elements) ? elements : [elements]).forEach(element => element && (element.disabled = disable));

export const sanitize = input => (typeof input === 'string' ? input.trim().replace(/<[^>]*>/g, '') : '');

export const sanitizeAndValidate = (value, validator) => validator(typeof value === 'string' ? sanitize(value) : '');

export const validateEmail = email =>
  typeof email === 'string' &&
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
      .trim()
      .replace(/<[^>]*>/g, '')
      .toLowerCase()
  );

export const validate = (rules, fieldNameOrData, value) =>
  typeof fieldNameOrData === 'string'
    ? (rules[fieldNameOrData]?.(value) ?? false)
    : Object.entries(rules).every(([field, validator]) => validator(fieldNameOrData[field]));

export const sanitizeName = name => (name ? name.replace(/[^a-zA-Z0-9]/g, '') : '');
export const getMediaType = (video, image) => (video ? 'video' : image ? 'image' : '');
export const toWebpFilename = filename => (filename ? filename.replace(/\.jpg$/i, '.webp') : '');

export const getMobileUrl = url => {
  const ext = url.substring(url.lastIndexOf('.'));
  return url.replace(ext, `.mobile${ext}`);
};

export const isMobileOrTablet = () => window.innerWidth <= 1024;

export const getUrlParam = (param, parseAsInt = false) => {
  const value = new URLSearchParams(window.location.search).get(param);
  return parseAsInt && value ? parseInt(value, 10) : value;
};

export const addPulseAnimation = element => {
  if (!element) return;
  element.classList.add('pulse');
  setTimeout(() => element.classList.remove('pulse'), 400);
};

export const getFormInputsArray = ({ firstname, lastname, email, message }) => [firstname, lastname, email, message].filter(Boolean);

export const getFormValues = ({ firstname, lastname, email, message }) => ({
  firstname: firstname?.value,
  lastname: lastname?.value,
  email: email?.value,
  message: message?.value,
});

export const forEachFormField = (formElements, fieldNames, callback) => {
  fieldNames.forEach(fieldName => {
    const element = formElements[fieldName];
    if (element) callback(element, fieldName);
  });
};
