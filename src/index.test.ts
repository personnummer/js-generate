import { describe, it, expect } from 'vitest';
import personnummer from 'personnummer';

const file = process.env.FILE || '.';
const generate = file.includes('cjs')
  ? // eslint-disable-next-line
    require(file)
  : (await import(file)).default;

const padZero = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

describe('generate', () => {
  it('generate personnummer with random date', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate();
      expect(personnummer.valid(pin)).toEqual(true);
    }
  });

  it('generate personnummer with specific date', () => {
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

  it('generate personnummer with random date and short format', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate({
        format: 'short',
      });
      const p = personnummer.parse(pin);
      expect(pin).toEqual(expect.stringContaining(p.sep));
    }
  });

  it('generate male personnummer with random date', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate({ gender: 'male' });
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(true);
      expect(p.isFemale()).toEqual(false);
    }
  });

  it('generate male personnummer with specific date', () => {
    const today = new Date();
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate(today, { gender: 'male' });
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(true);
      expect(p.isFemale()).toEqual(false);
    }
  });

  it('generate female personnummer with random date', () => {
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate({ gender: 'female' });
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(false);
      expect(p.isFemale()).toEqual(true);
    }
  });

  it('generate female personnummer with specific date', () => {
    const today = new Date();
    for (let i = 0, l = 3; i < l; i++) {
      const pin = generate(today, { gender: 'female' });
      const p = personnummer.parse(pin);
      expect(p.isMale()).toEqual(false);
      expect(p.isFemale()).toEqual(true);
    }
  });
});
