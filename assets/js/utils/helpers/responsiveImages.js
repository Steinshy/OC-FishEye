import { getMobileUrl } from './helper.js';

export const getResponsiveImageUrls = (webpUrl, jpgUrl) => {
  const webpMobile = getMobileUrl(webpUrl);
  const jpgMobile = getMobileUrl(jpgUrl);

  return {
    webp: {
      desktop: webpUrl,
      mobile: webpMobile,
      srcset: `${webpMobile} 768w, ${webpUrl} 1920w`,
    },
    jpg: {
      desktop: jpgUrl,
      mobile: jpgMobile,
      srcset: `${jpgMobile} 768w, ${jpgUrl} 1920w`,
    },
    sizes: '(max-width: 1024px) 768px, 1920px',
  };
};

export const getResponsivePosterUrl = (posterUrl, isMobile = false) => {
  return isMobile ? getMobileUrl(posterUrl) : posterUrl;
};
