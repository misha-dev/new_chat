const toTwoLetters = (date) => {
  let str = JSON.stringify(date);
  if (str.length === 1) {
    str = '0' + str;
  }
  return str;
};

export const toDateTime = (date) => {
  if (!date) {
    return '';
  }
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${toTwoLetters(date.getHours())}:${toTwoLetters(date.getMinutes())}`;
};
