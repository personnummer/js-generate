import personnummer from 'personnummer';

const lib = require(process.env.FILE);
const generate = process.env.FILE?.includes('esm') ? lib.default : lib;

const padZero = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

describe('generate', () => {
  test('generate personnummer with random date', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate();
      expect(personnummer.valid(pin)).toEqual(true);
    }
  });

  test('generate personnummer with specific date', () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate(today);
      expect(+pin.slice(0, 4)).toEqual(y);
      expect(pin.slice(4, 6)).toEqual('' + padZero(m));
      expect(pin.slice(6, 8)).toEqual('' + padZero(d));
      expect(personnummer.valid(pin)).toEqual(true);
    }
  });

  test('generate personnummer with random date and short format', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate({
        format: 'short',
      });
      const p = personnummer.parse(pin);
      expect(pin).toEqual(expect.stringContaining(p.sep));
    }
  });

  test('generate male personnummer with random date', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate({ gender: 'male' });
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(true);
      expect(p.isFemale()).toEqual(false);
    }
  });

  test('generate male personnummer with specific date', () => {
    const today = new Date();
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate(today, { gender: 'male' });
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(true);
      expect(p.isFemale()).toEqual(false);
    }
  });

  test('generate female personnummer with random date', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate({ gender: 'female' });
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(false);
      expect(p.isFemale()).toEqual(true);
    }
  });

  test('generate female personnummer with specific date', () => {
    const today = new Date();
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate(today, { gender: 'female' });
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(false);
      expect(p.isFemale()).toEqual(true);
    }
  });
});
