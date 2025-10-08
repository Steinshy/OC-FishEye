import { generateMediaInfo } from './generateMediaInfo.js';

export const generateCard = (media, mediaElement) => {
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

  mediaContent.appendChild(mediaElement);

  article.appendChild(mediaContent);
  article.appendChild(generateMediaInfo(media));

  return article;
};
