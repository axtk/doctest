# doctest

_Generates unit tests from inline comments in JS code_

This approach is inspired by the Python [doctest](https://docs.python.org/3/library/doctest.html) library. It is quite handy, when simple unit tests are close at hand.

They are easy to read, and they can work as human-readable examples giving insights to what the module is about.

They are also easy to write, and in the process of development, their presence or absence in the code comes immediately obvious without the need to search through other files and folders.

## Usage

```
$ npx doctest build ./src/**/*.js
$ npx jest
$ npx doctest cleanup
```

or in a one-liner suitable for a `package.json` script:

```
  "test": "npx doctest build ./src/**/*.js && npx jest && npx doctest cleanup",
```

## Example

```js
import ComplexNumber from './ComplexNumber';

// @test expect(abs(new ComplexNumber(-3, 4))).toEqual(5);
// @test expect(abs(new ComplexNumber(1, -1))).toEqual(Math.sqrt(2));

// @test Trivial case
// import IM_1 from './IM_1';
// expect(abs(IM_1)).toEqual(1);

export default function abs(z) {
    if (!(z instanceof ComplexNumber))
        throw new Error('Invalid argument: should be a ComplexNumber');
    return Math.sqrt(z.re*z.re + z.im*z.im);
}
```

## Installation

```
$ npm i -D github:axtk/doctest
```
