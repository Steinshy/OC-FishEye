export const errorConfig = {
  contexts: {
    DATA_LOADING: 'Données chargées',
    MODAL_MANAGEMENT: "Gestion de l'affichage du modal",
    LIGHTBOX: 'Lightbox',
    FORM_VALIDATION: 'Validation du formulaire',
    ACCESSIBILITY: 'Accessibilité',
    MEDIA_RENDERING: 'Rendu des médias',
    FORM_SUBMISSION: 'Envoi du formulaire',
  },

  messages: {
    DATA_ERROR: 'Erreur de chargement des données',
    PHOTOGRAPHER_NOT_FOUND: 'Photographe non trouvé',
    MEDIA_NOT_FOUND: 'Média non trouvé',
    NETWORK_ERROR: 'Erreur de connexion',
    MODAL_ERROR: 'Erreur de gestion du modal',
    VALIDATION_ERROR: 'Erreur de validation',
    UNKNOWN_ERROR: "Une erreur inattendue s'est produite",
    SUBMIT_ERROR: "Erreur lors de l'envoi du formulaire",
  },
};

export let modalElements = {};

export const initializeModalElements = () => {
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

  if (modalElements.contactButton) {
    modalElements.contactButton.disabled = false;
    modalElements.contactButton.removeAttribute('aria-disabled');
  }
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
  modal: document.getElementById('lightbox-modal'),
  container: document.getElementById('lightbox-media-container'),
  title: document.getElementById('lightbox-title'),
  likes: document.getElementById('lightbox-likes-count'),
  counter: document.getElementById('lightbox-counter'),
  mediaElementCache: new Map(),
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

export const mediasElements = {
  main: document.getElementById('main-medias'),
};
