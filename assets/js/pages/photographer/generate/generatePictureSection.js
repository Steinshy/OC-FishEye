import { loadPictureImages } from '../../../utils/helpers/managers/mediasManager.js';
import { getResponsiveImageUrls } from '../../../utils/helpers/responsiveImages.js';

export const generatePictureSection = ({ name, jpgUrl, webpUrl }) => {
  const pictureContainer = document.createElement('div');
  pictureContainer.className = 'container-picture loading';

  const { webp, jpg } = getResponsiveImageUrls(webpUrl, jpgUrl);

  pictureContainer.innerHTML = `
    <picture>
      <source data-srcset="${webp.url}" type="image/webp">
      <source data-srcset="${jpg.url}" type="image/jpeg">
      <img
        class="profile-picture"
        alt="Portrait de ${name}"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width="900"
        height="900"
      >
    </picture>
  `;

  loadPictureImages(pictureContainer, jpg.url, webp.url);
  return pictureContainer;
};
