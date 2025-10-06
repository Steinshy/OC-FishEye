import { createMediaInfo } from './createMediaInfo.js';

export const createCard = (media, mediaElement) => {
  if (!media || !mediaElement) return null;

  const article = document.createElement('article');
  article.className = 'media-card';
  article.setAttribute('data-media-id', media.id || '');
  article.setAttribute('role', 'listitem');
  article.setAttribute('aria-label', `Média: ${media.mediaType} - ${media.title || ''} - ${media.likes || 0} likes`);
  article.setAttribute('aria-describedby', `media-info-${media.id}`);

  const mediaContent = document.createElement('div');
  mediaContent.className = 'media-content';
  mediaContent.setAttribute('aria-describedby', `media-info-${media.id}`);

  mediaContent.innerHTML = mediaElement.outerHTML;

  article.appendChild(mediaContent);
  article.appendChild(createMediaInfo(media));

  return article;
};
