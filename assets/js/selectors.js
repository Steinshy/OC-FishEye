/** Media & Card Selectors */
export const media = {
  card: '.media-card',
  content: '.media-content',
  mediaElement: 'img, video',
  videoElement: 'video',
  image: 'img',
};

/** Profile & Picture Selectors */
export const picture = {
  profile: '.profile-picture',
  webpSource: 'source[type="image/webp"]',
  jpegSource: 'source[type="image/jpeg"]',
};

/** Interactive Elements */
export const interactive = {
  likesButton: '.likes',
  likesCount: 'span',
  heartIcon: '.fa-heart',
};

/** Form Selectors */
export const form = {
  group: '.form-group',
};

/** Stats Selectors */
export const stats = {
  likes: '.stats-likes',
};

/** Role-based Selectors */
export const roles = {
  option: '[role="option"]',
};

/** Accessibility & Focusable Elements */
export const accessibility = {
  focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  formInputs: 'input, textarea, button',
};

/** Layout Selectors */
export const layout = {
  main: 'main',
  header: 'header',
};

/** Combined Selectors (for backward compatibility) */
export const selectors = {
  // Media
  mediaCard: '.media-card',
  mediaContent: '.media-content',
  mediaElement: 'img, video',
  videoElement: 'video',

  // Picture
  profilePicture: '.profile-picture',
  webpSource: 'source[type="image/webp"]',
  jpegSource: 'source[type="image/jpeg"]',

  // Interactive
  likesButton: '.likes',
  heartIcon: '.fa-heart',

  // Form
  formGroup: '.form-group',

  // Stats
  statsLikes: '.stats-likes',

  // Roles
  sortOption: '[role="option"]',

  // Accessibility
  focusable: 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  formInputs: 'input, textarea, button',

  // Layout
  main: 'main',
  header: 'header',
};
