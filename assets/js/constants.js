export const validationConfig = {
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  minlength: 2,
  maxlength: 500,
};

export let modalElements = {};

export const initializeModalElements = () => {
  modalElements = {
    contactButton: document.getElementById('contact-button'),
    mainModal: {
      main: document.getElementById('modal-signup'),
      form: document.getElementById('form-signup'),
      header: document.getElementById('modal-header'),
      content: document.getElementById('modal-content'),
      closeButton: document.getElementById('modal-close'),
      modalFooter: document.getElementById('modal-footer'),
      submitButton: document.getElementById('footer-submit-button'),
    },
    formGroup: {
      firstName: document.getElementById('firstname'),
      lastName: document.getElementById('lastname'),
      email: document.getElementById('email'),
      message: document.getElementById('message'),
    },
    formError: {
      firstName: document.getElementById('error-firstname'),
      lastName: document.getElementById('error-lastname'),
      email: document.getElementById('error-email'),
      message: document.getElementById('error-message'),
    },
    formElements: {
      contactForm: document.getElementById('contact_form'),
      contactModal: document.getElementById('modal_container'),
      characterCount: document.getElementById('character-count'),
      minCount: document.getElementById('character-count'),
      maxCount: document.getElementById('character-count'),
    },
  };
};

export const formConfig = {
  fieldNames: ['firstName', 'lastName', 'email', 'message'],
  errorElements: ['firstName', 'lastName', 'email', 'message'],
};

export const getInputs = () =>
  [modalElements?.formGroup?.firstName, modalElements?.formGroup?.lastName, modalElements?.formGroup?.email, modalElements?.formGroup?.message].filter(Boolean);

export const sortDropdownElements = {
  button: document.getElementById('media-button'),
  options: document.getElementById('sort-options'),
  popularOption: document.getElementById('popular-option'),
  dateOption: document.getElementById('date-option'),
  titleOption: document.getElementById('title-option'),
  likesOption: document.getElementById('likes-option'),
};
