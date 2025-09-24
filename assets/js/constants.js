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

export const dropdownConfig = {
  elements: {
    get button() {
      return document.getElementById('media-button');
    },
    get sortOptions() {
      return document.getElementById('sort-options');
    },
  },

  attributes: {
    show: 'show',
    hidden: 'hidden',
    ariaHidden: 'aria-hidden',
    ariaExpanded: 'aria-expanded',
    ariaSelected: 'aria-selected',
    role: 'role',
    option: 'option',
  },
  events: {
    click: 'click',
    keydown: 'keydown',
  },
  keys: {
    escape: 'Escape',
    arrowDown: 'ArrowDown',
    arrowUp: 'ArrowUp',
    enter: 'Enter',
  },
};

export const sortConfig = {
  elements: {
    popular: document.getElementById('popular-option'),
    date: document.getElementById('date-option'),
    title: document.getElementById('title-option'),
    likes: document.getElementById('likes-option'),
  },
};

export const mediaStore = {
  medias: [],
  mediaPath: '',
  photographerId: null,
};

export const mediasConfig = {
  get mainMedias() {
    return document.getElementById('main-medias');
  },
  get cardsContainer() {
    return document.createElement('div');
  },
};
