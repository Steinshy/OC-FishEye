import { createAccessibilityManager } from '../../../../accessibilityManagement.js';

import { createInfo } from './createInfo.js';

const accessibilityManager = createAccessibilityManager();

export const createCard = (media, mediaElement) => {
  const article = document.createElement('article');
  article.className = 'media-card';
  article.setAttribute('data-media-id', media.id || '');
  article.setAttribute('role', 'gridcell');
  article.setAttribute('aria-label', `Média: ${media.mediaType} - ${media.title || ''} - ${media.likes || 0} likes`);
  article.setAttribute('aria-describedby', `media-info-${media.id}`);

  const mediaContent = document.createElement('div');
  mediaContent.className = 'media-content';
  mediaContent.setAttribute('aria-describedby', `media-info-${media.id}`);
  mediaContent.appendChild(mediaElement);

  // Create eye icon button
  const eyeIcon = document.createElement('button');
  eyeIcon.className = 'eye-icon';
  eyeIcon.setAttribute('aria-label', `Ouvrir ${media.mediaType}: ${media.title || ''}`);
  eyeIcon.setAttribute('type', 'button');
  eyeIcon.textContent = '👁';
  mediaContent.appendChild(eyeIcon);

  article.appendChild(mediaContent);
  article.appendChild(createInfo(media));

  return article;
};
