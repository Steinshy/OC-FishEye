export let modalElements = {};

export const populateModalElements = () => {
  modalState.mainModal = {
    main: document.getElementById('modal-signup'),
    form: document.getElementById('form-signup'),
    header: document.getElementById('modal-header'),
    content: document.getElementById('modal-content'),
    closeButton: document.getElementById('modal-close'),
    modalFooter: document.getElementById('modal-footer'),
    submitButton: document.getElementById('footer-submit-button'),
  };
  modalState.formGroup = {
    firstname: document.getElementById('firstname'),
    lastname: document.getElementById('lastname'),
    email: document.getElementById('email'),
    message: document.getElementById('message'),
  };
  modalState.formElements = {
    contactForm: document.getElementById('form-signup'),
    contactModal: document.getElementById('modal-signup'),
    characterCount: document.getElementById('character-count'),
  };
  modalElements = {
    contactButton: document.getElementById('contact-button'),
    mainModal: modalState.mainModal,
    formGroup: modalState.formGroup,
    formElements: modalState.formElements,
  };
};

export const formConfig = {
  fieldNames: ['firstname', 'lastname', 'email', 'message'],
};

export const getFieldNames = () => formConfig.fieldNames;

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
    role: 'role',
    option: 'option',
  },
};

export const modalState = {
  currentIndex: 0,
  medias: [],
  modal: null,
  focusTrap: null,
  previousFocus: null,
  isInitialized: false,
  isNavigating: false,
  touch: { startX: 0, startY: 0, minDistance: 50 },
  characterCountCleanup: null,
  mainModal: {
    main: null,
    form: null,
    header: null,
    content: null,
    closeButton: null,
    modalFooter: null,
    submitButton: null,
  },
  formGroup: {
    firstname: null,
    lastname: null,
    email: null,
    message: null,
  },
  formElements: {
    contactForm: null,
    contactModal: null,
    characterCount: null,
  },
};

export const lightboxElements = {
  get modal() {
    return document.getElementById('lightbox-modal');
  },
  get container() {
    return document.getElementById('lightbox-media-container');
  },
  get title() {
    return document.getElementById('lightbox-title');
  },
  get likes() {
    return document.getElementById('lightbox-likes-count');
  },
  get counter() {
    return document.getElementById('lightbox-counter');
  },
  medias: [],
  currentIndex: 0,
  isNavigating: false,
  isInitialized: false,
  previousFocus: null,
  focusTrap: null,
  touch: {
    startX: 0,
    startY: 0,
    minDistance: 50,
  },
};

export const timeoutConfig = {
  promise: 100,
  like: 1000,
  focus: 0,
};

export const selectorTypes = {
  focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  formInputs: 'input, textarea, button',
  dropdownOptions: '[role="option"]',
  mediaCards: 'article.media-card',
  mediaCardsContainer: '.medias-cards',
  mediaContent: '.media-content',
  eyeIcon: '.eye-icon',
  likesButton: '.likes',
  main: 'main',
  header: 'header',
};

import { accessibilityManager } from './utils/accessibility.js';
export const accessibility = accessibilityManager();
