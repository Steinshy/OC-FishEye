const loadPictureImages = (pictureContainer, jpgUrl, webpUrl) => {
  const img = pictureContainer.querySelector('.profile-picture');
  const picture = pictureContainer.querySelector('picture');

  if (!img || !picture) return;

  const sources = [
    { element: picture.querySelector('source[type="image/webp"]'), url: webpUrl },
    { element: picture.querySelector('source[type="image/jpeg"]'), url: jpgUrl },
  ];

  sources.forEach(({ element, url }) => {
    if (element) element.setAttribute('srcset', element.dataset?.srcset || url);
  });

  Object.assign(img, { src: jpgUrl, fetchpriority: 'high', decoding: 'sync' });
};

export const generatePictureSection = ({ name, jpgUrl, webpUrl }) => {
  const pictureContainer = document.createElement('div');
  pictureContainer.className = 'container-picture';
  pictureContainer.innerHTML = `
    <picture>
      <source data-srcset="${webpUrl}" type="image/webp">
      <source data-srcset="${jpgUrl}" type="image/jpeg">
      <img
        class="profile-picture"
        src="assets/photographers/account.png"
        alt="Portrait de ${name}"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width="900"
        height="900"
      >
    </picture>
  `;

  loadPictureImages(pictureContainer, jpgUrl, webpUrl);
  return pictureContainer;
};
