// Generate responsive image URLs for different formats

import { getMobileUrl, isMobileOrTablet } from './helper.js';

// Get desktop and mobile URLs for webp and jpg
export const getResponsiveImageUrls = (webpUrl, jpgUrl, useMobile = null) => {
  const isMobile = useMobile !== null ? useMobile : isMobileOrTablet();
  return {
    webp: {
      desktop: webpUrl,
      mobile: getMobileUrl(webpUrl),
      url: isMobile ? getMobileUrl(webpUrl) : webpUrl,
    },
    jpg: {
      desktop: jpgUrl,
      mobile: getMobileUrl(jpgUrl),
      url: isMobile ? getMobileUrl(jpgUrl) : jpgUrl,
    },
    useMobile: isMobile,
  };
};

// Get poster URL for video based on device
export const getResponsivePosterUrl = (posterUrl, isMobile = false) => (isMobile ? getMobileUrl(posterUrl) : posterUrl);

// Get responsive URLs for media element
export const getMediaResponsiveUrls = (mediaElement, useHighQuality = false) =>
  getResponsiveImageUrls(mediaElement.medias.webpUrl, mediaElement.medias.jpgUrl, useHighQuality ? false : null);
