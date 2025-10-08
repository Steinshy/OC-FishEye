export const getModalRefs = () => {
  return {
    contactButton: document.getElementById('contact-button'),
    mainModal: document.getElementById('modal-signup'),
    form: document.getElementById('form-signup'),
    header: document.getElementById('modal-header'),
    content: document.getElementById('modal-content'),
    closeButton: document.getElementById('modal-close'),
    modalFooter: document.getElementById('modal-footer'),
    submitButton: document.getElementById('footer-submit-button'),
    photographerName: document.getElementById('modal-photographer-name'),
  };
};

export const getFormElements = () => {
  return {
    firstname: document.getElementById('firstname'),
    lastname: document.getElementById('lastname'),
    email: document.getElementById('email'),
    message: document.getElementById('message'),
    contactForm: document.getElementById('form-signup'),
    contactModal: document.getElementById('modal-signup'),
    characterCount: document.getElementById('character-count'),
  };
};

export const getFieldNames = () => ['firstname', 'lastname', 'email', 'message'];

export const getStatsElements = () => {
  return {
    totalLikesCount: document.getElementById('total-likes-count'),
    statsPrice: document.getElementById('stats-price'),
    statsLikes: document.querySelector('.stats-likes'),
  };
};

export const getSortButtonElements = () => {
  return {
    button: document.getElementById('media-button'),
    optionsContainer: document.getElementById('sort-options'),
    sortOptions: document.querySelectorAll('[role="option"]'),
  };
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
  like: 500,
  focus: 0,
};

export const selectorTypes = {
  focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  formInputs: 'input, textarea, button',
  sortOptions: '[role="option"]',
  mediaCards: 'article.media-card',
  mediaCardsContainer: '.medias-cards',
  mediaContent: '.media-content',
  likesButton: '.likes',
  main: 'main',
  header: 'header',
};

export const getScrollToTopElements = () => {
  return {
    button: document.getElementById('scroll-to-top'),
  };
};
