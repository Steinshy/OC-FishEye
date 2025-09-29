export const errorConfig = {
  contexts: {
    DATA_LOADING: 'Data Loading',
    MODAL_MANAGEMENT: 'Modal Management',
    LIGHTBOX: 'Lightbox',
    FORM_VALIDATION: 'Form Validation',
    ACCESSIBILITY: 'Accessibility',
    MEDIA_RENDERING: 'Media Rendering',
  },

  messages: {
    PHOTOGRAPHER_NOT_FOUND: 'Photographe non trouvé',
    MEDIA_NOT_FOUND: 'Média non trouvé',
    NETWORK_ERROR: 'Erreur de connexion',
    VALIDATION_ERROR: 'Erreur de validation',
    UNKNOWN_ERROR: "Une erreur inattendue s'est produite",
  },
};

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
      firstname: document.getElementById('firstname'),
      lastname: document.getElementById('lastname'),
      email: document.getElementById('email'),
      message: document.getElementById('message'),
    },
    formElements: {
      contactForm: document.getElementById('form-signup'),
      contactModal: document.getElementById('modal-signup'),
      characterCount: document.getElementById('character-count'),
      minCount: document.getElementById('character-count'),
      maxCount: document.getElementById('character-count'),
    },
  };
};

export const getFieldNames = () => ['firstname', 'lastname', 'email', 'message'];

export const formConfig = {
  fieldNames: ['firstname', 'lastname', 'email', 'message'],
};

export const getErrorElement = fieldName => document.getElementById(`error-${fieldName.toLowerCase()}`);

export const getInputs = () => {
  if (!modalElements.formGroup) return [];
  return Object.values(modalElements.formGroup).filter(Boolean);
};

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
