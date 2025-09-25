import { createAccessibilityManager } from '../../../../accessibilityManagement.js';

const accessibilityManager = createAccessibilityManager();

export const createInfo = media => {
  if (!media) return;

  const mediaInfo = document.createElement('div');
  mediaInfo.className = 'media-info';
  mediaInfo.setAttribute('id', `media-info-${media.id}`);

  const likesButton = document.createElement('button');
  likesButton.type = 'button';
  likesButton.className = 'likes';
  likesButton.setAttribute('aria-pressed', 'false');
  likesButton.setAttribute('aria-label', `Aimer cette ${media.mediaType}`);
  likesButton.setAttribute('aria-describedby', `likes-count-${media.id}`);
  likesButton.tabIndex = 0;

  // Set up ARIA attributes using accessibility manager
  accessibilityManager.ariaManager.updateAttributes(likesButton, {
    'aria-pressed': 'false',
    'aria-live': 'polite',
  });

  likesButton.innerHTML = `
    <i class="fas fa-heart" aria-hidden="true"></i>
    <span id="likes-count-${media.id}" aria-live="polite">${media.likes}</span>
  `;

  const priceSpan = document.createElement('span');
  priceSpan.className = 'price';
  priceSpan.setAttribute('aria-label', `Prix: ${media.price} euros`);
  priceSpan.textContent = `${media.price}€`;

  const mediaStats = document.createElement('div');
  mediaStats.className = 'media-stats';
  mediaStats.appendChild(likesButton);
  mediaStats.appendChild(priceSpan);

  mediaInfo.innerHTML = `<h3>${media.title}</h3>`;
  mediaInfo.appendChild(mediaStats);

  return mediaInfo;
};
