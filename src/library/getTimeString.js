const getTimeString = date => {
  let d = new Date(date),
    hour = d.getHours(),
    min = d.getMinutes(),
    strTime = "오전 ";

  if (hour >= 12) {
    hour -= 12;
    strTime = "오후 ";
  }

  if (hour < 10) hour = "0" + hour;
  if (min < 10) min = "0" + min;

  strTime += hour + ":" + min;
  return strTime;
};

export default getTimeString;
