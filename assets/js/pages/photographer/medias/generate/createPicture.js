import { createAccessibilityManager } from '../../../../accessibilityManagement.js';

const accessibilityManager = createAccessibilityManager();

export const createPicture = mediaElement => {
  if (!mediaElement) return;

  const picture = document.createElement('picture');
  picture.setAttribute('data-media-type', 'image');
  picture.setAttribute('data-media-id', mediaElement.id);

  const img = document.createElement('img');
  img.src = mediaElement.medias.jpgUrl;
  img.alt = mediaElement.title || 'Image de média';
  img.loading = 'lazy';
  img.setAttribute('role', 'img');
  img.setAttribute('aria-label', `Image: ${mediaElement.title || 'Média'}`);

  // Set up ARIA attributes using accessibility manager
  accessibilityManager.ariaManager.updateAttributes(img, {
    'aria-describedby': `media-info-${mediaElement.id}`,
    'aria-expanded': 'false',
  });

  picture.innerHTML = `
    <source srcset="${mediaElement.medias.webpUrl}" type="image/webp">
    <source srcset="${mediaElement.medias.jpgUrl}" type="image/jpeg">
  `;
  picture.appendChild(img);

  return picture;
};
