import { createInfo } from './createInfo.js';

export const createCard = (media, mediaElement) => {
  const article = document.createElement('article');
  article.className = 'media-card';
  article.setAttribute('data-media-id', media.id || '');
  article.setAttribute('aria-label', `Média: ${media.mediaType} - ${media.title || ''} - ${media.likes || 0} likes`);
  article.setAttribute('aria-describedby', `media-info-${media.id}`);

  article.innerHTML = `
    <div class="media-content" role="button" tabindex="0" aria-label="Ouvrir ${media.mediaType}: ${media.title || ''}">
      ${mediaElement.outerHTML}
    </div>
    ${createInfo(media).outerHTML}
  `;

  return article;
};
