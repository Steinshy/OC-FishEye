import { media } from '../../selectors.js';
import { aria } from '../../utils/accessibility/aria.js';

const handleImageLoading = card => {
  const mediaContent = card.querySelector(media.content);
  const mediaElement = mediaContent?.querySelector(media.mediaElement);
  if (!mediaElement) return;

  const updateLoadingState = () => mediaContent.classList.replace('loading', 'loaded');

  const isVideo = mediaElement.tagName === 'VIDEO';
  const loadEvent = isVideo ? 'loadeddata' : 'load';
  const isAlreadyLoaded = isVideo ? mediaElement.readyState >= 2 : mediaElement.complete;

  mediaElement.addEventListener(loadEvent, updateLoadingState, { once: true });
  mediaElement.addEventListener('error', updateLoadingState, { once: true });

  if (isAlreadyLoaded) updateLoadingState();
};

const generateMediaInfo = media => {
  const mediaInfo = document.createElement('div');
  mediaInfo.innerHTML = `
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

  return mediaInfo;
};

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

  handleImageLoading(article);

  return article;
};
