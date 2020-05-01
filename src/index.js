const randomNumber = (gender) => {
  let num = Math.floor(Math.random() * 9);

  switch (gender) {
    case 'male':
      if (num % 2 === 0) {
        num += 1;
      }
      break;
    case 'female':
      if (num % 2 !== 0) {
        num += 1;
      }
      break;
    default:
      break;
  }

  return num;
};

const randomDate = () => {
  const year = new Date().getFullYear();
  const start = new Date(year - 100, 1, 1);
  const end = new Date(year + 100, 1, 1);

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const padZero = (i) => (i < 10 ? `0${i}` : i);

const luhn = (str) => {
  let v = 0;
  let sum = 0;

  str += '';

  for (let i = 0, l = str.length; i < l; i++) {
    v = str[i];
    v *= 2 - (i % 2);
    if (v > 9) {
      v -= 9;
    }
    sum += v;
  }

  return Math.ceil(sum / 10) * 10 - sum;
};

/**
 * Generate Swedish Swedish Personal Identity Number.
 *
 * @param  {date}   date
 * @param  {string} gender
 *
 * @return {string}
 */
export default (date, gender) => {
  let y = 0,
    m = 0,
    d = 0;

  // with date object.
  if (date instanceof Date) {
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();
  }

  if (typeof date === 'string') {
    gender = date;
    date = undefined;
  }

  // random date.
  if (!date) {
    const rd = randomDate();
    y = rd.getFullYear();
    m = rd.getMonth() + 1;
    d = rd.getDate();
  }

  let c = '';

  y = `${padZero(y)}`;
  if (y.length > 2) {
    c = y.slice(0, 2);
    y = y.slice(2, 4);
  }

  const pin = `${y}${padZero(m)}${padZero(d)}${'' + randomNumber(gender)}${
    '' + randomNumber(gender)
  }${'' + randomNumber(gender)}`;

  return `${c}${pin}${luhn(pin)}`;
};
