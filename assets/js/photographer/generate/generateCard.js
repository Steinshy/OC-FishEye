// Generate media card HTML elements

import { media } from '../../config.js';
import { aria } from '../../utils/accessibility/aria.js';

// Handle media loading states
const handleImageLoading = card => {
  const content = card.querySelector(media.content);
  const element = content?.querySelector(media.mediaElement);
  if (!element) return;

  const updateState = () => content.classList.replace('loading', 'loaded');

  const isVideo = element.tagName === 'VIDEO';
  const event = isVideo ? 'loadeddata' : 'load';
  const loaded = isVideo ? element.readyState >= 2 : element.complete;

  element.addEventListener(event, updateState, { once: true });
  element.addEventListener('error', updateState, { once: true });

  if (loaded) updateState();
};

// Generate media info section with title and likes
const generateMediaInfo = media => {
  const info = document.createElement('div');
  info.innerHTML = `
    <div class="media-info" id="media-info-${media.id}">
      <h3>${media.title}</h3>
      <button
          type="button"
          class="likes"
          aria-describedby="likes-count-${media.id}"
          aria-label="Aimer cette ${media.mediaType}"
          tabindex="0">
          <i class="fas fa-heart" aria-hidden="true"></i>
          <span id="likes-count" aria-live="polite">${media.likes}</span>
        </button>
    </div>
  `;

  return info;
};

// Generate complete media card element
export const generateCard = (media, element) => {
  if (!media || !element) return null;

  const article = document.createElement('article');
  article.className = 'media-card';
  article.setAttribute('data-media-id', media.id || '');
  aria.setRole(article, 'listitem');
  aria.setLabel(article, `Média: ${media.mediaType} - ${media.title || ''} - ${media.likes || 0} likes`);
  aria.setDescribedBy(article, `media-info-${media.id}`);

  const content = document.createElement('div');
  content.className = 'media-content loading';
  aria.setDescribedBy(content, `media-info-${media.id}`);

  content.appendChild(element);
  article.appendChild(content);
  article.appendChild(generateMediaInfo(media));

  handleImageLoading(article);

  return article;
};
