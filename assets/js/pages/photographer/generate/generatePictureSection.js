import { getResponsiveImageUrls } from '../../../utils/helpers/responsiveImages.js';

const loadPictureImages = (pictureContainer, jpgUrl, webpUrl) => {
  const img = pictureContainer.querySelector('.profile-picture');
  const webpSource = pictureContainer.querySelector('source[type="image/webp"]');
  const jpgSource = pictureContainer.querySelector('source[type="image/jpeg"]');

  if (webpSource) webpSource.srcset = webpSource.dataset.srcset || webpUrl;
  if (jpgSource) jpgSource.srcset = jpgSource.dataset.srcset || jpgUrl;
  if (img) Object.assign(img, { src: jpgUrl, fetchpriority: 'high', decoding: 'sync' });
};

export const generatePictureSection = ({ name, jpgUrl, webpUrl }) => {
  const pictureContainer = document.createElement('div');
  pictureContainer.className = 'container-picture';

  const { webp, jpg, sizes } = getResponsiveImageUrls(webpUrl, jpgUrl);

  pictureContainer.innerHTML = `
    <picture>
      <source data-srcset="${webp.srcset}" type="image/webp" sizes="${sizes}">
      <source data-srcset="${jpg.srcset}" type="image/jpeg" sizes="${sizes}">
      <img
        class="profile-picture"
        src="assets/photographers/account.png"
        alt="Portrait de ${name}"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width="900"
        height="900"
      >
    </picture>
  `;

  loadPictureImages(pictureContainer, jpgUrl, webpUrl);
  return pictureContainer;
};
