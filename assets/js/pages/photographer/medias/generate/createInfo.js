export const createInfo = media => {
  if (!media) return;

  const mediaInfo = document.createElement('div');
  mediaInfo.className = 'media-info';
  mediaInfo.innerHTML = `
    <h3>${media.title}</h3>
    <div class="media-stats">
      <div class="likes" role="button" tabindex="0" aria-label="Aimer cette ${media.mediaType}">
        <i class="fas fa-heart" aria-hidden="true"></i>
        <span>${media.likes}</span>
      </div>
      <span class="price">${media.price}€</span>
    </div>
  `;

  return mediaInfo;
};
