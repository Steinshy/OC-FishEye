export const createInfo = media => {
  if (!media) return;

  const mediaInfo = document.createElement('div');
  mediaInfo.className = 'media-info';
  mediaInfo.setAttribute('id', `media-info-${media.id}`);
  mediaInfo.innerHTML = `
    <h3>${media.title}</h3>
    <div class="media-stats">
      <div class="likes" role="button" aria-label="Aimer cette ${media.mediaType}" aria-describedby="likes-count-${media.id}">
        <i class="fas fa-heart" aria-hidden="true"></i>
        <span id="likes-count-${media.id}" aria-live="polite">${media.likes}</span>
      </div>
      <span class="price" aria-label="Prix: ${media.price} euros">${media.price}€</span>
    </div>
  `;

  return mediaInfo;
};
