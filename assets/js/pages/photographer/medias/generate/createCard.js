import { createMediaInfo } from './createMediaInfo.js';

export const createCard = (media, mediaElement) => {
  const article = document.createElement('article');
  article.className = 'media-card';
  article.setAttribute('data-media-id', media.id || '');
  article.setAttribute('role', 'listitem');
  article.setAttribute('aria-label', `Média: ${media.mediaType} - ${media.title || ''} - ${media.likes || 0} likes`);
  article.setAttribute('aria-describedby', `media-info-${media.id}`);

  const mediaContent = document.createElement('div');
  mediaContent.className = 'media-content';
  mediaContent.setAttribute('aria-describedby', `media-info-${media.id}`);

  // Convert mediaElement to HTML string
  const mediaElementHTML = mediaElement.outerHTML;

  mediaContent.innerHTML = `
    ${mediaElementHTML}
    <button
      class="eye-icon"
      aria-label="Ouvrir ${media.mediaType}: ${media.title || ''}"
      type="button"
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" focusable="false">
        <path
          fill="currentColor"
          d="M15.5 14h-.79l-.28-.27A6 6 0 1 0 9 15a6 6 0 0 0 3.73-1.27l.27.28v.79l5 5L20.49 19zM9 13a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm1-5h2a1 1 0 0 1 0 2h-2v2a1 1 0 0 1-2 0v-2H6a1 1 0 0 1 0-2h2V6a1 1 0 0 1 2 0z" />
      </svg>
    </button>
  `;

  article.appendChild(mediaContent);
  article.appendChild(createMediaInfo(media));

  return article;
};
