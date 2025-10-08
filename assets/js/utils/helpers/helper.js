export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const toggleScroll = add => {
  document.documentElement.classList.toggle('no-scroll', add);
  document.body.classList.toggle('no-scroll', add);
};
export const isArray = value => Array.isArray(value);
export const isValidArray = (value, checkLength = true) => {
  return checkLength ? Array.isArray(value) && value.length > 0 : Array.isArray(value);
};

export const generateFragment = (elements, skeletonConfig = null) => {
  const fragment = document.createDocumentFragment();

  const elementArray = isArray(elements) ? elements : [elements];

  elementArray.forEach(element => {
    if (element) {
      fragment.appendChild(element);
    }
  });

  if (skeletonConfig && skeletonConfig.img && skeletonConfig.picture && skeletonConfig.jpgUrl) {
    const { img, picture, jpgUrl, webpUrl } = skeletonConfig;

    const webpSource = picture.querySelector('source[type="image/webp"]');
    const jpgSource = picture.querySelector('source[type="image/jpeg"]');

    if (webpSource) {
      const value = webpSource.dataset?.srcset || webpUrl;
      if (value) webpSource.setAttribute('srcset', value);
    }
    if (jpgSource) {
      const value = jpgSource.dataset?.srcset || jpgUrl;
      if (value) jpgSource.setAttribute('srcset', value);
    }
    img.src = jpgUrl;
    img.setAttribute('fetchpriority', 'high');
    img.setAttribute('decoding', 'sync');
  }

  return fragment;
};
