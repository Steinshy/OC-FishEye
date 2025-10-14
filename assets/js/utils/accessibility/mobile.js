import { getModalRefs } from '../../constants.js';

const { mainModal, content } = getModalRefs();

const isModalOpen = () => Boolean(mainModal?.classList?.contains('show'));

export const mobileKeyboard = {
  isMobile: /Mobile/i.test(navigator.userAgent) || window.innerWidth <= 768,
  initialHeight: window.innerHeight,
  activeInput: null,

  init() {
    if (!this.isMobile) return;

    window.addEventListener('resize', this.handleResize.bind(this));
    document.addEventListener('focusin', this.handleFocus.bind(this));
    document.addEventListener('focusout', this.handleBlur.bind(this));

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', this.handleResize.bind(this));
    }
  },

  handleResize() {
    const heightDiff = this.initialHeight - window.innerHeight;
    const isKeyboardOpen = heightDiff > 150;

    if (!content) return;

    content.classList.toggle('keyboard-open', isKeyboardOpen);

    if (isKeyboardOpen && this.activeInput) {
      this.scrollToInput();
    }
  },

  handleFocus(event) {
    const { target } = event;

    if (isModalOpen()) {
      this.activeInput = target;
      setTimeout(() => this.scrollToInput(), 200);
    }
  },

  handleBlur(event) {
    if (this.activeInput === event.target) {
      this.activeInput = null;
    }
  },

  scrollToInput() {
    if (!this.activeInput || !content) return;

    const inputRect = this.activeInput.getBoundingClientRect();
    const keyboardHeight = this.initialHeight - window.innerHeight;
    const visibleHeight = window.innerHeight - keyboardHeight;

    if (inputRect.bottom > visibleHeight) {
      content.scrollTop += inputRect.bottom - visibleHeight + 20;
    }
  },

  resetModalPosition() {
    if (isModalOpen()) {
      content?.classList.remove('keyboard-open');
    }
  },
};
