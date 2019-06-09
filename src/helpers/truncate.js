const truncate = (text, size = 20) =>
  text.length <= size ? text : `${text.slice(0, size)}...`;

export default truncate;
