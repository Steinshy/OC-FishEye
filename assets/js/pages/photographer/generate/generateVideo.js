export const generateVideo = media => {
  const videoMedia = document.createElement('div');
  videoMedia.className = 'media-video';
  videoMedia.setAttribute('data-media-type', 'video');
  videoMedia.setAttribute('data-media-id', media.id);

  videoMedia.innerHTML = `
    <video
      data-media-type="video"
      data-media-id="${media.id}"
      poster="${media.medias.posterUrl}"
      preload="none"
      controls
      controlsList="nodownload"
      playsinline
      class="media-video-player"
      aria-label="${media.title || 'Vidéo'}"
      aria-describedby="media-info-${media.id}"
      tabindex="0"
    >
      <source src="${media.medias.mp4Url}" type="video/mp4">
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  `;

  return videoMedia;
};
