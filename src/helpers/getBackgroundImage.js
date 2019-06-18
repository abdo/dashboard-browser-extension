import capitalize from '../helpers/capitalize';

const apiUrl = () => {
  return `https://api.unsplash.com/photos/random?client_id=a082852aa337f729fdffedf269d352ed37c14ba6eb864179ec7b94b1b54c28e3&w=${
    window.innerWidth
  }&h=${window.innerHeight}`;
};

const publicApiUrl = () =>
  `https://source.unsplash.com/random/${window.innerWidth}x${
    window.innerHeight
  }`;

const getBackgroundImageInfo = () => {
  return new Promise((resolve, reject) => {
    resolve({
      img: publicApiUrl()
    });
    // fetch(apiUrl())
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.errors && data.errors.length > 0) {
    //       reject(data.errors[0]);
    //     }
    //     resolve({
    //       img: data.urls.custom,
    //       description: data.description || capitalize(data.alt_description),
    //       link: data.links.html,
    //       location:
    //         (data.location && (data.location.title || data.location.name)) ||
    //         (data.user && capitalize(data.user.location)),
    //       artist: data.user && capitalize(data.user.name),
    //       artistAvatar:
    //         data.user &&
    //         data.user.profile_image &&
    //         data.user.profile_image.small
    //     });
    //   })
    //   .catch((err) => {
    //     resolve({
    //       img: publicApiUrl()
    //     });
    //   });
  });
};

export default getBackgroundImageInfo;
