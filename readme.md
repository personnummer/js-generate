# generate [![Build Status](https://github.com/personnummer/js-generate/workflows/build/badge.svg)](https://github.com/personnummer/js-generate/actions)

> work in progress

Generate Swedish Personal Identity Numbers.

## Installation

```
npm install --save @personnummer/generate
```

## Usage

```js
import generate from '@personnummer/generate';

const today = new Date();

// generate with date object
let pin = generate(today);

const y = today.getFullYear();
const m = today.getMonth() + 1;
const d = today.getDate();

// generate with numbers arguments.
pin = generate(y, m, d);

// generate with random date between now and the previous hundred years and the next hundred years.
pin = generate();
```

## License

MIT