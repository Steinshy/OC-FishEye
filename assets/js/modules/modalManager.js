class ModalManager {
  constructor(modalId, options = {}) {
    this.modalContainer = document.getElementById(modalId);
    this.closeButton = null;
    this.isInitialized = false;

    // Default options
    this.options = {
      closeOnBackdrop: true,
      closeOnEscape: true,
      focusFirstInput: true,
      restoreBodyOverflow: true,
      showClass: "show",
      ...options,
    };

    if (!this.modalContainer) {
      console.error(`ModalManager: Modal with ID "${modalId}" not found`);
      return;
    }

    this.init();
  }

  init() {
    if (this.isInitialized) return;

    // Find close button
    this.closeButton =
      this.modalContainer.querySelector("[data-modal-close]") ||
      this.modalContainer.querySelector(".modal_close");

    // Bind event handlers
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.close = this.close.bind(this);

    // Add event listeners
    if (this.options.closeOnBackdrop) {
      this.modalContainer.addEventListener("click", this.handleBackdropClick);
    }

    if (this.options.closeOnEscape) {
      document.addEventListener("keydown", this.handleKeydown);
    }

    if (this.closeButton) {
      this.closeButton.addEventListener("click", this.close);
    }

    this.isInitialized = true;
    console.log(`ModalManager: Modal "${this.modalContainer.id}" initialized`);
  }

  open(callbacks = {}) {
    if (!this.modalContainer) return;

    // Execute before open callback
    if (callbacks.beforeOpen) {
      callbacks.beforeOpen();
    }

    // Show modal
    this.modalContainer.hidden = false;
    if (this.options.showClass) {
      this.modalContainer.classList.add(this.options.showClass);
    }

    // Focus management
    if (this.options.focusFirstInput) {
      this.focusFirstInput();
    }

    // Prevent body scrolling
    if (this.options.restoreBodyOverflow) {
      document.body.style.overflow = "hidden";
    }

    // Execute after open callback
    if (callbacks.afterOpen) {
      callbacks.afterOpen();
    }
  }

  close(callbacks = {}) {
    if (!this.modalContainer) return;

    // Execute before close callback
    if (callbacks.beforeClose) {
      callbacks.beforeClose();
    }

    // Hide modal
    this.modalContainer.hidden = true;
    if (this.options.showClass) {
      this.modalContainer.classList.remove(this.options.showClass);
    }

    // Restore body scrolling
    if (this.options.restoreBodyOverflow) {
      document.body.style.overflow = "";
    }

    // Execute after close callback
    if (callbacks.afterClose) {
      callbacks.afterClose();
    }
  }

  toggle(callbacks = {}) {
    if (this.isOpen()) {
      this.close(callbacks);
    } else {
      this.open(callbacks);
    }
  }

  isOpen() {
    return this.modalContainer && !this.modalContainer.hidden;
  }

  focusFirstInput() {
    const firstInput = this.modalContainer.querySelector(
      'input:not([type="hidden"]), textarea, select, button'
    );
    if (firstInput) {
      firstInput.focus();
    }
  }

  handleBackdropClick(e) {
    if (e.target === this.modalContainer) {
      this.close();
    }
  }

  handleKeydown(e) {
    if (e.key === "Escape" && this.isOpen()) {
      this.close();
    }
  }

  destroy() {
    if (!this.isInitialized) return;

    // Remove event listeners
    if (this.options.closeOnBackdrop) {
      this.modalContainer.removeEventListener(
        "click",
        this.handleBackdropClick
      );
    }

    if (this.options.closeOnEscape) {
      document.removeEventListener("keydown", this.handleKeydown);
    }

    if (this.closeButton) {
      this.closeButton.removeEventListener("click", this.close);
    }

    this.isInitialized = false;
  }

  // Utility method to add custom event listeners
  addEventListener(event, callback) {
    if (!this.modalContainer) return;
    this.modalContainer.addEventListener(event, callback);
  }

  // Utility method to remove custom event listeners
  removeEventListener(event, callback) {
    if (!this.modalContainer) return;
    this.modalContainer.removeEventListener(event, callback);
  }
}

function createModal(modalId, options = {}) {
  return new ModalManager(modalId, options);
}

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ModalManager, createModal };
}

// Global access for direct script inclusion
window.ModalManager = ModalManager;
window.createModal = createModal;

