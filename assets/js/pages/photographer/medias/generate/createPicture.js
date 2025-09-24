export const createPicture = mediaElement => {
  if (!mediaElement) return;

  const picture = document.createElement('picture');

  picture.innerHTML = `
    <source srcset="${mediaElement.medias.webpUrl}" type="image/webp">
    <source srcset="${mediaElement.medias.jpgUrl}" type="image/jpeg">
    <img src="${mediaElement.medias.jpgUrl}" alt="${mediaElement.title || 'Image de média'}" loading="lazy">
  `;

  return picture;
};
