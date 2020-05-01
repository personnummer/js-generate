const randomNumber = () => Math.floor(Math.random() * 9);

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
 * @param  {number|date} y Year
 * @param  {number}      m Month
 * @param  {number}      d Day
 *
 * @return {string}
 */
export default (y, m, d) => {
  // with date object.
  if (y instanceof Date) {
    m = y.getMonth() + 1;
    d = y.getDate();
    y = y.getFullYear();
  }

  // random date.
  if (!y) {
    const rd = randomDate();
    y = rd.getFullYear();
    m = rd.getMonth() + 1;
    d = rd.getDate();
  }

  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    throw new Error('Input arguments is not a numbers or a date object.');
  }

  let c = '';

  y = `${padZero(y)}`;
  if (y.length > 2) {
    c = y.slice(0, 2);
    y = y.slice(2, 4);
  }

  const pin = `${y}${padZero(m)}${padZero(d)}${'' + randomNumber()}${
    '' + randomNumber()
  }${'' + randomNumber()}`;

  return `${c}${pin}${luhn(pin)}`;
};
