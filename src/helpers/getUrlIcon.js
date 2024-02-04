const getUrlIcon = (url) => {
  const pathArray = url.split("/");
  const protocol = pathArray[0];
  const host = pathArray[2];
  const origin = protocol + "//" + host;

  return `${origin}/favicon.ico`;
};

export default getUrlIcon;
