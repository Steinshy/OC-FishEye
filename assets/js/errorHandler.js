export const ErrorHandler = {
  levels: {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
  },

  log(level, message, error, context) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${context ? `[${context}] ` : ''}${message}`;

    switch (level) {
      case this.levels.ERROR:
        console.error(logMessage, error);
        break;
      case this.levels.WARN:
        console.warn(logMessage, error);
        break;
      case this.levels.INFO:
        console.info(logMessage, error);
        break;
      default:
        console.error(logMessage, error);
    }
  },

  handle(error, fallback = null, context = '', showUserMessage = false) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    this.log(this.levels.ERROR, errorMessage, error, context);

    if (showUserMessage) {
      this.showUserError(errorMessage);
    }

    return fallback;
  },

  async safeAsync(asyncFn, fallback = null, context = '') {
    try {
      return await asyncFn();
    } catch (error) {
      return this.handle(error, fallback, context, true);
    }
  },

  showUserError(message) {
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.textContent = `Erreur: ${message}`;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #e54858;
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(toast);
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 5000);
  },

  sendToErrorService(message, error, context) {
    console.error('Production Error:', message, error, context);
  },

  validate(data, validator, errorMessage, context = '') {
    if (!validator(data)) {
      const error = new Error(errorMessage);
      this.log(this.levels.ERROR, errorMessage, error, context);
      throw error;
    }
    return true;
  },
};

// Convenience methods
export const logError = (message, error, context) => ErrorHandler.log(ErrorHandler.levels.ERROR, message, error, context);

export const logWarning = (message, error, context) => ErrorHandler.log(ErrorHandler.levels.WARN, message, error, context);

export const logInfo = (message, error, context) => ErrorHandler.log(ErrorHandler.levels.INFO, message, error, context);

export const handleError = (error, fallback, context, showUserMessage) => ErrorHandler.handle(error, fallback, context, showUserMessage);

export const safeAsync = (asyncFn, fallback, context) => ErrorHandler.safeAsync(asyncFn, fallback, context);
