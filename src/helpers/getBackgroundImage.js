const apiUrl = () => {
  return `https://api.unsplash.com/photos/random?client_id=a082852aa337f729fdffedf269d352ed37c14ba6eb864179ec7b94b1b54c28e3&w=${
    window.innerWidth
  }&h=${window.innerHeight}`;
};

const capitalize = ([firstLetter, ...rest]) =>
  firstLetter.toUpperCase() + rest.join('');

const getBackgroundImageInfo = () => {
  return new Promise((resolve, reject) => {
    fetch(apiUrl())
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resolve({
          img: data.urls.custom,
          description: data.description || capitalize(data.alt_description),
          link: data.links.html,
          location:
            data.location && (data.location.title || data.location.name),
          artist: data.user && data.user.name,
          artistAvatar:
            data.user &&
            data.user.profile_image &&
            data.user.profile_image.small
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default getBackgroundImageInfo;
