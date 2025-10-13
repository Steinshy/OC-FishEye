export const getPageElements = () => {
  return {
    main: document.getElementById('main'),
    mainMedias: document.getElementById('main-medias'),
  };
};

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
    formGroup: document.querySelectorAll('.form-group'),
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
  mainModal: document.getElementById('lightbox-modal'),
  container: document.getElementById('lightbox-media-container'),
  title: document.getElementById('lightbox-title'),
  likes: document.getElementById('lightbox-likes-count'),
  counter: document.getElementById('lightbox-counter'),
  prev: document.getElementById('lightbox-prev'),
  next: document.getElementById('lightbox-next'),
  close: document.getElementById('lightbox-close'),
  medias: [],
  currentIndex: 0,
  isNavigating: false,
  isInitialized: false,
  minDistance: 50,
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

export const lightboxClasses = {
  visible: 'show',
  transition: 'lightbox-transition',
  hidden: 'lightbox-hidden',
  showing: 'lightbox-visible',
};

export const submissionButtonText = {
  defaultText: 'Envoyer le message',
  loadingText: 'Envoi en cours...',
  successText: 'Message envoyé !',
};
