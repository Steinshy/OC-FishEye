import { aria } from '../../../utils/accessibility/aria.js';

import { generateMediaInfo } from './generateMediaInfo.js';

export const generateCard = (media, mediaElement) => {
  if (!media || !mediaElement) return null;

  const article = document.createElement('article');
  article.className = 'media-card';
  article.setAttribute('data-media-id', media.id || '');
  aria.setRole(article, 'listitem');
  aria.setLabel(article, `Média: ${media.mediaType} - ${media.title || ''} - ${media.likes || 0} likes`);
  aria.setDescribedBy(article, `media-info-${media.id}`);

  const mediaContent = document.createElement('div');
  mediaContent.className = 'media-content loading';
  aria.setDescribedBy(mediaContent, `media-info-${media.id}`);

  mediaContent.appendChild(mediaElement);
  article.appendChild(mediaContent);
  article.appendChild(generateMediaInfo(media));

  return article;
};
