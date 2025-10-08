import { accessibilityManager } from '../../../utils/accessibility.js';

export const generateMediaInfo = media => {
  if (!media) return;

  const mediaInfo = document.createElement('div');
  mediaInfo.innerHTML = `
    <div class="media-info" id="media-info-${media.id}">
      <h3>${media.title}</h3>
      <button
          type="button"
          class="likes"
          aria-pressed="false"
          aria-describedby="likes-count-${media.id}"
          aria-label="Aimer cette ${media.mediaType}"
          tabindex="0">
          <i class="fas fa-heart" aria-hidden="true"></i>
          <span id="likes-count" aria-live="polite">${media.likes}</span>
        </button>
    </div>
  `;

  const { ariaManager } = accessibilityManager();
  ariaManager.updateAttributes(mediaInfo.firstElementChild.querySelector('.likes'), {
    'aria-pressed': 'false',
    'aria-live': 'polite',
  });

  return mediaInfo;
};
