const getTime = (timeFormat) => {
  const date = new Date();
  const hours24 = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours24 >= 12 ? 'pm' : 'am';
  let hours = hours24 % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime24 = hours24 + ':' + minutes;
  let strTime12 = hours + ':' + minutes + ' ' + ampm;
  if (timeFormat === '24') return strTime24;
  else return strTime12;
};

export default getTime;
