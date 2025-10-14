// Mobile keyboard and viewport handling

import { getModalRefs } from '../../config.js';

// Get modal elements
const { mainModal, content } = getModalRefs();

// Check if modal is open
const isModalOpen = () => Boolean(mainModal?.classList?.contains('show'));

// Mobile keyboard behavior manager
export const mobileKeyboard = {
  isMobile: /Mobile/i.test(navigator.userAgent) || window.innerWidth <= 768,
  initialHeight: window.innerHeight,
  activeInput: null,

  // Initialize mobile keyboard handlers
  init() {
    if (!this.isMobile) return;

    window.addEventListener('resize', this.handleResize.bind(this));
    document.addEventListener('focusin', this.handleFocus.bind(this));
    document.addEventListener('focusout', this.handleBlur.bind(this));

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', this.handleResize.bind(this));
    }
  },

  // Handle viewport resize when keyboard opens
  handleResize() {
    const isOpen = this.initialHeight - window.innerHeight > 150;

    if (!content) return;

    content.classList.toggle('keyboard-open', isOpen);

    if (isOpen && this.activeInput) {
      this.scrollToInput();
    }
  },

  // Handle input focus event
  handleFocus(event) {
    if (isModalOpen()) {
      this.activeInput = event.target;
      setTimeout(() => this.scrollToInput(), 200);
    }
  },

  // Handle input blur event
  handleBlur(event) {
    if (this.activeInput === event.target) {
      this.activeInput = null;
    }
  },

  // Scroll input into view
  scrollToInput() {
    if (!this.activeInput || !content) return;

    const inputRect = this.activeInput.getBoundingClientRect();
    const visible = window.innerHeight - (this.initialHeight - window.innerHeight);

    if (inputRect.bottom > visible) {
      content.scrollTop += inputRect.bottom - visible + 20;
    }
  },

  // Reset modal scroll position
  resetModalPosition() {
    if (isModalOpen()) {
      content?.classList.remove('keyboard-open');
    }
  },
};
