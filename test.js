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

  test('generate personnummer with specific date', () => {
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

  test('generate male personnummer with random date', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate('male');
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(true);
      expect(p.isFemale()).toEqual(false);
    }
  });

  test('generate male personnummer with specific date', () => {
    const today = new Date();
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate(today, 'male');
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(true);
      expect(p.isFemale()).toEqual(false);
    }
  });

  test('generate female personnummer with random date', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate('female');
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(false);
      expect(p.isFemale()).toEqual(true);
    }
  });

  test('generate female personnummer with specific date', () => {
    const today = new Date();
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate(today, 'female');
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(false);
      expect(p.isFemale()).toEqual(true);
    }
  });
});
