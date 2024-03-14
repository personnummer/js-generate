type Options = {
  gender: string;
  format: string;
};

const randomNumber = (gender: string) => {
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

const randomDate = (): Date => {
  const year = new Date().getFullYear();
  const start = new Date(year - 100, 1, 1);
  const end = new Date(year + 100, 1, 1);

  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
};

const padZero = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

const generateSerial = (gender: string): string =>
  '' +
  randomNumber(gender) +
  ('' + randomNumber(gender)) +
  ('' + randomNumber(gender));

const luhn = (str: string): number => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let v: any = 0;
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
const generate = (
  date: Date | Partial<Options>,
  options: Partial<Options> = {},
): string => {
  let y: number | string = 0;
  let m = 0;
  let d = 0;

  if (!(date instanceof Date)) {
    options = date as Partial<Options>;
    date = randomDate();
  }

  y = date.getFullYear();
  m = date.getMonth() + 1;
  d = date.getDate();

  options = Object.assign(
    {
      gender: '',
      format: 'long',
    },
    options || {},
  );

  let c = '';

  y = `${padZero(y)}`;
  if (y.length > 2) {
    c = y.slice(0, 2);
    y = y.slice(2, 4);
  }

  let serial = generateSerial(options.gender || '');

  while (serial === '000') {
    serial = generateSerial(options.gender || '');
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
    8,
  )}${sep}${full.slice(8)}`;
};

export default generate;
