import { createInfo } from './createInfo.js';

export const createCard = (media, mediaElement) => {
  const article = document.createElement('article');
  article.className = 'media-card';
  article.setAttribute('data-media-id', media.id || '');
  article.setAttribute('role', 'button');
  article.setAttribute('tabindex', '0');
  article.setAttribute('aria-label', `Voir ${media.mediaType}: ${media.title || ''}`);

  article.innerHTML = `
    <div class="media-content">
      ${mediaElement.outerHTML}
    </div>
    ${createInfo(media).outerHTML}
  `;

  return article;
};
