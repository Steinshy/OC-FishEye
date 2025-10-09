export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const toggleScroll = add => [document.documentElement, document.body].forEach(element => element.classList.toggle('no-scroll', add));

export const generateFragment = (elements, skeletonConfig = null) => {
  const fragment = document.createDocumentFragment();
  (Array.isArray(elements) ? elements : [elements]).forEach(element => element && fragment.appendChild(element));

  if (skeletonConfig?.img && skeletonConfig?.picture && skeletonConfig?.jpgUrl) {
    const { img, picture, jpgUrl, webpUrl } = skeletonConfig;
    [
      { element: picture.querySelector('source[type="image/webp"]'), fallback: webpUrl },
      { element: picture.querySelector('source[type="image/jpeg"]'), fallback: jpgUrl },
    ].forEach(({ element, fallback }) => element && element.setAttribute('srcset', element.dataset?.srcset || fallback));

    Object.assign(img, { src: jpgUrl, fetchpriority: 'high', decoding: 'sync' });
  }
  return fragment;
};

export const toggleElementsDisabled = (elements, disable) =>
  elements && (Array.isArray(elements) ? elements : [elements]).forEach(element => element && (element.disabled = disable));

export const sanitize = input => (typeof input === 'string' ? input.trim().replace(/<[^>]*>/g, '') : '');

export const sanitizeAndValidate = (value, validator) => validator(typeof value === 'string' ? sanitize(value) : '');

export const validateEmail = email =>
  typeof email === 'string' &&
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
      .trim()
      .replace(/<[^>]*>/g, '')
      .toLowerCase()
  );

export const validate = (rules, fieldNameOrData, value) =>
  typeof fieldNameOrData === 'string'
    ? (rules[fieldNameOrData]?.(value) ?? false)
    : Object.entries(rules).every(([field, validator]) => validator(fieldNameOrData[field]));

export const sanitizeName = name => (name ? name.replace(/[^a-zA-Z0-9]/g, '') : '');
export const getMediaType = (video, image) => (video ? 'video' : image ? 'image' : '');
export const toWebpFilename = filename => (filename ? filename.replace(/\.jpg$/i, '.webp') : '');
