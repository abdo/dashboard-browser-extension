let timeout;

const debounce = (fn) => {
  clearTimeout(timeout);
  timeout = setTimeout(fn, 50);
};

export default debounce;
