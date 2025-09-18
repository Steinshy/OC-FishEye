import { createMediaPicture, createVideoElement } from './mediaHandler.js';

export const createMediaCard = (media, media_path, index) => {
  const { title, likes, price, media_id } = media;

  const createMediaElement = () => {
    if (media.image) {
      return createMediaPicture(media, media_path).outerHTML;
    } else {
      return createVideoElement(media, media_path).outerHTML;
    }
  };

  return `
    <div class="media-card" data-media-id="${media_id}" data-index="${index}">
      <div class="media-info">
        <h3>${title}</h3>
        <div class="media_stats">
          <span class="likes">${likes} <i class="fas fa-heart"></i></span>
          <span class="price">${price}€</span>
        </div>
      </div>
      ${createMediaElement()}
    </div>
  `;
};
