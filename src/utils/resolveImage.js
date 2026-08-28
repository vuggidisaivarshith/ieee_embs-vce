import {
  collegeLogo,
  embsLogo,
  vardhamanLogo,
  facultyPhoto,
  chairPhoto,
  secretaryPhoto,
  vicePhoto,
  treasurerPhoto,
  speakerPhoto,
  webmasterPhoto,
  eventSlide1,
  eventSlide2,
  eventSlide3
} from '../assets/images';

export function resolveImage(url, defaultFallback = embsLogo) {
  if (!url) return defaultFallback;

  const urlStr = String(url).toLowerCase();

  if (urlStr.includes('slide-1') || urlStr.includes('screenshot 2026-08-13 1')) return eventSlide1;
  if (urlStr.includes('slide-2') || urlStr.includes('screenshot 2026-08-13 2')) return eventSlide2;
  if (urlStr.includes('slide-3') || urlStr.includes('screenshot 2026-08-13 3')) return eventSlide3;
  if (urlStr.includes('secretary')) return secretaryPhoto;
  if (urlStr.includes('faculty')) return facultyPhoto;
  if (urlStr.includes('chair') && !urlStr.includes('vice')) return chairPhoto;
  if (urlStr.includes('vice')) return vicePhoto;
  if (urlStr.includes('treasurer')) return treasurerPhoto;
  if (urlStr.includes('speaker')) return speakerPhoto;
  if (urlStr.includes('college-logo')) return collegeLogo;
  if (urlStr.includes('embs-logo')) return embsLogo;
  if (urlStr.includes('vardhaman-logo')) return vardhamanLogo;

  // If it's a relative asset URL, add cache buster query parameter
  if (urlStr.startsWith('/assets/')) {
    return `${url}?v=2.0_${Date.now()}`;
  }

  return url;
}
