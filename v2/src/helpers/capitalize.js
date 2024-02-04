const capitalize = (word) =>
  !word ? word : word[0].toUpperCase() + word.slice(1);

export default capitalize;
