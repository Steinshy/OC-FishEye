import { getMobileUrl, isMobileOrTablet } from './helper.js';

export const getResponsiveImageUrls = (webpUrl, jpgUrl, useMobile = null) => {
  const shouldUseMobile = useMobile !== null ? useMobile : isMobileOrTablet();
  const webpMobile = getMobileUrl(webpUrl);
  const jpgMobile = getMobileUrl(jpgUrl);

  return {
    webp: {
      desktop: webpUrl,
      mobile: webpMobile,
      url: shouldUseMobile ? webpMobile : webpUrl,
    },
    jpg: {
      desktop: jpgUrl,
      mobile: jpgMobile,
      url: shouldUseMobile ? jpgMobile : jpgUrl,
    },
    useMobile: shouldUseMobile,
  };
};

export const getResponsivePosterUrl = (posterUrl, isMobile = false) => {
  return isMobile ? getMobileUrl(posterUrl) : posterUrl;
};
