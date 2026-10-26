const getTime = (timeFormat) => {
  const date = new Date();
  const hours24 = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours24 >= 12 ? "pm" : "am";
  let hours = hours24 % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime24 = hours24 + ":" + minutes;
  let strTime12 = hours + ":" + minutes + " " + ampm;
  if (timeFormat === "24") return strTime24;
  else return strTime12;
};

function greetingPerTime(name = "") {
  const time = getTime("24");
  const [hour] = time.split(":").map(Number);
  const trimmedName = String(name ?? "").trim();
  const nameSuffix = trimmedName ? ` ${trimmedName}` : "";

  if (hour >= 5 && hour < 12) {
    return `Good morning${nameSuffix}`;
  } else if (hour >= 12 && hour < 18) {
    return `Good afternoon${nameSuffix}`;
  } else if (hour >= 18 && hour < 22) {
    return `Good evening${nameSuffix}`;
  } else if (hour >= 22 || hour < 5) {
    return `Good night${nameSuffix}`;
  } else if (hour >= 5 && hour < 7) {
    return `Good morning${nameSuffix}, it's a bit early, isn't it?`;
  } else if (hour >= 22 && hour < 24) {
    return `Good night${nameSuffix}, it's a bit late, isn't it?`;
  } else {
    return `Good day${nameSuffix}`;
  }
}

export default getTime;
export { greetingPerTime };
