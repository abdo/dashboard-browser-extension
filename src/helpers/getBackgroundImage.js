import capitalize from "../helpers/capitalize";
import { unsplashApiKey } from "../keys.ignore";
import { recallBackground, rememberBackground } from "./backgroundCache";
import { getBundledBackground } from "./fallbackBackgrounds";

const themesOf = (imgThemes) => (Array.isArray(imgThemes) ? imgThemes : []);

const apiUrl = (imgThemes) => {
  if (imgThemes.length === 0) {
    return `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}`;
  }

  const randomIndex = Math.floor(Math.random() * imgThemes.length);
  const randomImgTheme = imgThemes[randomIndex];

  return `https://api.unsplash.com/photos/random?client_id=${unsplashApiKey}&query=${randomImgTheme}`;
};

const mapPhoto = (data) => {
  const full = data.urls.full;
  const width = window.innerWidth || 1600;
  const height = window.innerHeight || 900;
  const sized = full.replace("q=85", "q=70");
  const imageUrl = sized.includes("?")
    ? `${sized}&w=${width}&h=${height}&fit=crop`
    : `${sized}?w=${width}&h=${height}&fit=crop&q=70`;
  const raw = String((data.urls && (data.urls.raw || data.urls.full)) || "").split(
    "?"
  )[0];
  const user = data.user || {};
  const location = data.location || {};

  return {
    id: data.id,
    img: imageUrl,
    cacheUrl: raw ? `${raw}?auto=format&fit=crop&w=1600&q=60` : imageUrl,
    description: data.description || capitalize(data.alt_description),
    link: data.links && data.links.html,
    location: location.title || location.name || capitalize(user.location),
    artist: capitalize(user.name),
    artistAvatar: user.profile_image && user.profile_image.small,
    artistProfileLink: user.links && user.links.html,
  };
};

const toPublicInfo = (info) => ({
  img: info.img,
  description: info.description,
  link: info.link,
  location: info.location,
  artist: info.artist,
  artistAvatar: info.artistAvatar,
  artistProfileLink: info.artistProfileLink,
});

const fallbackBackground = async () => {
  try {
    const cached = await recallBackground();
    if (cached && cached.img) return cached;
  } catch (err) {
    // Storage can be unavailable. The bundled photos still cover that case.
  }

  return getBundledBackground();
};

const getBackgroundImageInfo = async (imgThemes) => {
  try {
    const res = await fetch(apiUrl(themesOf(imgThemes)));
    const data = await res.json();
    const errorText = Array.isArray(data && data.errors)
      ? data.errors[0]
      : data && data.errors;

    if (!res.ok || errorText || !data || !data.urls || !data.urls.full) {
      throw new Error(errorText || "Unsplash request failed");
    }

    const info = mapPhoto(data);
    rememberBackground(info);
    return toPublicInfo(info);
  } catch (err) {
    return fallbackBackground();
  }
};

export default getBackgroundImageInfo;
