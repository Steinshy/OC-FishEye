export const generatePicture = mediaElement => {
  const pictureMedia = document.createElement('div');
  pictureMedia.className = 'media-picture';
  pictureMedia.setAttribute('data-media-type', 'image');
  pictureMedia.setAttribute('data-media-id', mediaElement.id);

  pictureMedia.innerHTML = `
    <picture>
      <source srcset="${mediaElement.medias.webpUrl}" type="image/webp" />
      <source srcset="${mediaElement.medias.jpgUrl}" type="image/jpeg" />
      <img
        class="media-image"
        src="${mediaElement.medias.jpgUrl}"
        alt="${mediaElement.title || 'Média'}"
        loading="lazy"
        fetchpriority="low"
        decoding="async"
        data-media-id="${mediaElement.id}"
        aria-describedby="media-info-${mediaElement.id}"
      />
    </picture>
  `;

  return pictureMedia;
};
