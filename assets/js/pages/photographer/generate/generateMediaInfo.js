export const generateMediaInfo = media => {
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
