import { createAccessibilityManager } from '../../../../accessibilityManagement.js';

const accessibilityManager = createAccessibilityManager();

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
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" focusable="false">
            <path fill="currentColor" d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5a4.5 4.5 0 0 1 8.12-2.49h0L12 7.3l1.88-1.29A4.5 4.5 0 0 1 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
          </svg>
          <span id="likes-count-${media.id}" aria-live="polite">${media.likes}</span>
        </button>
        <span class="price" aria-label="${media.priceLabel || `Prix: ${media.price} euros`}">
          ${media.price}
          <svg class="price-icon" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" focusable="false">
            <path fill="currentColor" d="M17 4h-4.18A3 3 0 0 0 10 2H8a1 1 0 0 0 0 2h2a1 1 0 0 1 .94.66L11.18 5H7a1 1 0 0 0 0 2h3.38l-.5 2H7a1 1 0 0 0 0 2h2.5l-.5 2H7a1 1 0 0 0 0 2h3.18l.72 2.34A1 1 0 0 1 10 18h-2a1 1 0 0 0 0 2h2a3 3 0 0 0 2.82-2H17a1 1 0 0 0 0-2h-3.62l.5-2H17a1 1 0 0 0 0-2h-2.12l.5-2H17a1 1 0 0 0 0-2z" />
          </svg>
        </span>
      </div>
    </div>
  `;

  const mediaInfoElement = mediaInfo.firstElementChild;
  const likesButton = mediaInfoElement.querySelector('.likes');

  // Set up ARIA attributes using accessibility manager
  accessibilityManager.ariaManager.updateAttributes(likesButton, {
    'aria-pressed': 'false',
    'aria-live': 'polite',
  });

  return mediaInfoElement;
};
