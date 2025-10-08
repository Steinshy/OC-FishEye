export const generatePicture = mediaElement => {
  if (!mediaElement) return null;

  const wrapper = document.createElement('div');
  wrapper.className = 'media-picture';
  wrapper.setAttribute('data-media-type', 'image');
  wrapper.setAttribute('data-media-id', mediaElement.id);

  wrapper.innerHTML = `
    <picture>
      <source
        srcset="${mediaElement.medias.webpUrl}"
        type="image/webp" />
      <source
        srcset="${mediaElement.medias.jpgUrl}"
        type="image/jpeg" />
      <img
        class="media-image"
        src="${mediaElement.medias.jpgUrl}"
        alt="${mediaElement.title || 'Média'}"
        loading="lazy"
        fetchpriority="low"
        decoding="async"
        data-media-id="${mediaElement.id}"
        width="${mediaElement.medias.width}"
        height="${mediaElement.medias.height}"
        aria-describedby="media-info-${mediaElement.id}"
      />
    </picture>
  `;

  return wrapper;
};
