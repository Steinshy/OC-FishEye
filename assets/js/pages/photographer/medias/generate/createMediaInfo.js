import { accessibility } from '../../../../constants.js';

export const createMediaInfo = media => {
  if (!media) return;

  const mediaInfo = document.createElement('div');
  mediaInfo.innerHTML = `
    <div class="media-info" id="media-info-${media.id}">
      <h3>${media.title}</h3>
      <div class="media-stats">
        <button
          type="button"
          class="likes"
          aria-pressed="false"
          aria-describedby="likes-count-${media.id}"
          aria-label="Aimer cette ${media.mediaType}"
          tabindex="0"
        >
          <i class="fas fa-heart" aria-hidden="true"></i>
          <span id="likes-count-${media.id}" aria-live="polite">${media.likes}</span>
        </button>
        <span class="price" aria-label="${media.priceLabel || `Prix: ${media.price} euros`}">
          ${media.price}€
        </span>
      </div>
    </div>
  `;

  accessibility.ariaManager.updateAttributes(mediaInfo.firstElementChild.querySelector('.likes'), {
    'aria-pressed': 'false',
    'aria-live': 'polite',
  });

  return mediaInfo;
};
