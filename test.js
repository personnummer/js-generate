import generate from './src';
import personnummer from 'personnummer';

const padZero = (i) => (i < 10 ? `0${i}` : i);

describe('generate', () => {
  test('generate personnummer with random date', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate();
      expect(personnummer.valid(pin)).toEqual(true);
    }
  });

  test('generate personnummer with specific date numbers', () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate(y, m, d);
      expect(+pin.slice(0, 4)).toEqual(y);
      expect(pin.slice(4, 6)).toEqual(padZero(m));
      expect(pin.slice(6, 8)).toEqual(padZero(d));
      expect(personnummer.valid(pin)).toEqual(true);
    }
  });

  test('generate personnummer with specific date object', () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate(today);
      expect(+pin.slice(0, 4)).toEqual(y);
      expect(pin.slice(4, 6)).toEqual(padZero(m));
      expect(pin.slice(6, 8)).toEqual(padZero(d));
      expect(personnummer.valid(pin)).toEqual(true);
    }
  });
});
