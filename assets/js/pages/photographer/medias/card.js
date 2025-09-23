import { createMediaPicture, createMediaVideo } from './utils/mediaElements.js';

export const createMediaCard = (media, media_path, index) => {
  const { title, likes, price, media_id, media: mediaData } = media;
  const isVideo = !!(mediaData && mediaData.video);
  const mediaType = isVideo ? 'vidéo' : 'photo';
  const mediaRole = isVideo ? 'video' : 'img';

  return `
    <article class="media-card" data-media-id="${media_id}" data-index="${index}" role="${mediaRole}" aria-label="${title}">
      <div class="media-container" role="button" tabindex="0" aria-label="Voir ${mediaType}: ${title}">
        ${createMediaElement(media, media_path)}
      </div>
      <div class="media-info">
        <h3>${title}</h3>
        <div class="media_stats">
          <button class="like-button" aria-label="Aimer cette ${mediaType}" aria-pressed="false">
            <span class="likes">${likes}</span>
            <i class="fas fa-heart" aria-hidden="true"></i>
          </button>
          <span class="price" aria-label="Prix: ${price} euros">${price}€</span>
        </div>
      </div>
    </article>
  `;
};

const createMediaElement = (media, media_path) => {
  if (media.media && media.media.imageJpg) {
    return createMediaPicture(media, media_path).outerHTML;
  } else {
    return createMediaVideo(media, media_path).outerHTML;
  }
};
