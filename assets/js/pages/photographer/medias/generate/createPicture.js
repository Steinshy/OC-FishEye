export const createPicture = mediaElement => {
  if (!mediaElement) return;

  const picture = document.createElement('picture');
  picture.setAttribute('role', 'img');
  picture.setAttribute('aria-label', mediaElement.title || '');

  picture.innerHTML = `
    <source srcset="${mediaElement.medias.webpUrl}" type="image/webp">
    <source srcset="${mediaElement.medias.jpgUrl}" type="image/jpeg">
    <img src="${mediaElement.medias.jpgUrl}" alt="${mediaElement.title || ''}" loading="lazy" role="img" aria-label="${mediaElement.title || ''}">
  `;

  return picture;
};
