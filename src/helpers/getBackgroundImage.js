const apiUrl = () => {
  return `https://api.unsplash.com/photos/random?client_id=3b420aedb947dabf817151edc0b3535b24b4bf2ec41e010541aa520eac12eb00&w=${
    window.innerWidth
  }&h=${window.innerHeight}`;
};

const publicApiUrl = () =>
  `https://source.unsplash.com/random/${window.innerWidth}x${
    window.innerHeight
  }`;

const capitalize = ([firstLetter, ...rest]) =>
  firstLetter.toUpperCase() + rest.join('');

const getBackgroundImageInfo = () => {
  return new Promise((resolve, reject) => {
    fetch(apiUrl())
      .then((res) => res.json())
      .then((data) => {
        if (data.errors && data.errors.length > 0) {
          reject(data.errors[0]);
        }
        resolve({
          img: data.urls.custom,
          description:
            data.description ||
            (data.alt_description && capitalize(data.alt_description)),
          link: data.links.html,
          location:
            (data.location && (data.location.title || data.location.name)) ||
            (data.user && data.user.location),
          artist: data.user && data.user.name,
          artistAvatar:
            data.user &&
            data.user.profile_image &&
            data.user.profile_image.small
        });
      })
      .catch((err) => {
        resolve({
          img: publicApiUrl()
        });
      });
  });
};

export default getBackgroundImageInfo;
