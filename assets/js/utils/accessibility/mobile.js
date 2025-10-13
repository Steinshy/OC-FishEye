const isModalOpen = () => Boolean(document.getElementById('modal-signup')?.classList?.contains('show'));

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

    const modalContent = document.querySelector('.modal.show .modal-content');
    if (!modalContent) return;

    modalContent.classList.toggle('keyboard-open', isKeyboardOpen);

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
    if (!this.activeInput) return;

    const modal = this.activeInput.closest('.modal-content');
    const inputRect = this.activeInput.getBoundingClientRect();
    const keyboardHeight = this.initialHeight - window.innerHeight;
    const visibleHeight = window.innerHeight - keyboardHeight;

    if (inputRect.bottom > visibleHeight) {
      modal.scrollTop += inputRect.bottom - visibleHeight + 20;
    }
  },

  resetModalPosition() {
    if (isModalOpen()) {
      document.querySelector('.modal.show .modal-content')?.classList.remove('keyboard-open');
    }
  },
};
