const getMediaUrl = (media: any) => {
  if (window.chrome) {
    return window.chrome.runtime.getURL(media.toString());
  }

  return media;
};

export default getMediaUrl;