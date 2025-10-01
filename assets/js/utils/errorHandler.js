export const logError = (message, error, context = '') => {
  console.error(`[${context}] ${message}`, error || '');
};

export const logWarning = (message, error, context = '') => {
  console.warn(`[${context}] ${message}`, error || '');
};

export const safeAsync = async (asyncFn, fallback = null, context = '') => {
  try {
    return await asyncFn();
  } catch (error) {
    logError('Operation failed', error, context);
    return fallback;
  }
};
