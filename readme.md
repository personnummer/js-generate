# generate [![Build Status](https://img.shields.io/github/actions/workflow/status/personnummer/js/nodejs.yml?branch=master)](https://github.com/personnummer/js-generate/actions) [![NPM Downloads](https://img.shields.io/npm/dm/@personnummer/generate.svg)](https://www.npmjs.com/package/@personnummer/generate)

Generate Swedish Personal Identity Numbers.

## Installation

```
npm install @personnummer/generate
```

## Usage

```js
import generate from '@personnummer/generate';

const today = new Date();

// generate with date object
let pin = generate(today);

// generate with random date between now and the previous hundred years and the next hundred years
pin = generate();

// generate with specific gender
pin = generate({ gender: 'male' }); // or 'female'

// generate with date object and with specific gender
pin = generate(today, { gender: 'male' }); // or 'female'
```

## Options

```js
{
  gender: '',    // '' (random), 'male' or 'female',
  format: 'long' // 'long' or 'short'
}
```

This package follows the output format [specification](https://github.com/personnummer/meta#short-format).

## License

MIT
