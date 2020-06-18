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

const generateSerial = (gender) =>
  '' +
  randomNumber(gender) +
  ('' + randomNumber(gender)) +
  ('' + randomNumber(gender));

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
 * @param  {object} date
 * @param  {object} options
 *
 * @return {string}
 */
export default (date, options = {}) => {
  let y = 0,
    m = 0,
    d = 0;

  // with date object.
  if (date instanceof Date) {
    y = date.getFullYear();
    m = date.getMonth() + 1;
    d = date.getDate();
  } else if (typeof date === 'object') {
    options = date;
    date = undefined;
  }

  options = Object.assign(
    {
      gender: '',
      format: 'long',
    },
    options || {}
  );

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

  let serial = generateSerial(options.gender);

  while (serial === '000') {
    serial = generateSerial(options.gender);
  }

  const pin = `${y}${padZero(m)}${padZero(d)}${serial}`;

  const full = `${c}${pin}${luhn(pin)}`;

  if (options.format === 'long') {
    return full;
  }

  let sep = '+';
  if (new Date().getFullYear() - parseInt(full.slice(0, 4), 10) < 100) {
    sep = '-';
  }

  return `${full.slice(2, 4)}${full.slice(4, 6)}${full.slice(
    6,
    8
  )}${sep}${full.slice(8)}`;
};
