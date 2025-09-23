export const createMediaPicture = (media, media_path) => {
  if (!media.media || !media.media.imageJpg) {
    console.error('Invalid media data for picture:', media);
    return document.createElement('div');
  }

  const { webpSrc, webpType, jpgSrc, jpgType, alt, loading, role, ariaLabel } = {
    webpSrc: `${media_path}/media/${media.media.imageWebp}`,
    webpType: 'image/webp',
    jpgSrc: `${media_path}/media/${media.media.imageJpg}`,
    jpgType: 'image/jpeg',
    alt: `${media.title} - Photo par le photographe`,
    loading: 'lazy',
    role: 'img',
    ariaLabel: `Photo: ${media.title}`,
  };

  const picture = document.createElement('picture');
  const sources = [];
  sources.push(`<source srcset="${webpSrc}" type="${webpType}">`);
  sources.push(`<img src="${jpgSrc}" alt="${alt}" loading="${loading}" role="${role}" aria-label="${ariaLabel}">`);
  picture.innerHTML = sources.join('\n');
  return picture;
};

export const createMediaVideo = (media, media_path) => {
  if (!media.media || !media.media.video) {
    console.error('Invalid video data:', media);
    return document.createElement('div');
  }

  const src = `${media_path}/media/video/${media.media.video}`;
  const video = document.createElement('video');

  video.controls = true;
  video.muted = true;
  video.loop = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.setAttribute('aria-label', `Vidéo: ${media.title} - Vidéo par le photographe`);
  video.setAttribute('role', 'video');
  video.setAttribute('data-media-type', 'video');

  video.innerHTML = `
    <source src="${src}" type="video/mp4">
    <p>Votre navigateur ne supporte pas la balise vidéo.</p>
  `;
  // Chrome warning Fix
  video.addEventListener('wheel', () => {}, { passive: true });
  video.addEventListener('loadedmetadata', () => {});

  return video;
};
