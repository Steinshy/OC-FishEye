export const safeAsync = async (asyncFn, fallback = null, context = '') => {
  try {
    return await asyncFn();
  } catch (error) {
    console.error(`[${context}] ${error}`, error || '');
    return fallback;
  }
};
