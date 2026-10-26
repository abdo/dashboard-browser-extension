import forest from "../assets/fallbacks/forest.jpg";
import shore from "../assets/fallbacks/shore.jpg";
import valley from "../assets/fallbacks/valley.jpg";

// Last-resort photos for when Unsplash and the saved-photo cache are both unavailable.
// Compressed Unsplash images (Unsplash License):
// forest.jpg  images.unsplash.com/photo-1441974231531-c6227db76b6e
// shore.jpg   images.unsplash.com/photo-1507525428034-b723cf961d3e
// valley.jpg  images.unsplash.com/photo-1506744038136-46273834b3fb
const fallbacks = [
  {
    img: forest,
    description: "Sunlit forest path",
    link: "https://unsplash.com",
    bundled: true,
  },
  {
    img: shore,
    description: "Sunrise over a quiet shore",
    link: "https://unsplash.com",
    bundled: true,
  },
  {
    img: valley,
    description: "River in a mountain valley",
    link: "https://unsplash.com",
    bundled: true,
  },
];

export const getBundledBackground = () => {
  const choice = fallbacks[Math.floor(Math.random() * fallbacks.length)];
  return { ...choice };
};
