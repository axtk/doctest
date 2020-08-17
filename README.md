# doctest

_Generates unit tests from inline comments in JS code_

This approach is inspired by the Python _[doctest](https://docs.python.org/3/library/doctest.html)_ library enabling the developer to run tests from a docstring comment next to the code. For simple unit tests, it is convenient when they are close at hand.

Doctests are easy to read, they can work as human-readable examples giving insights to the module's use cases and can be regarded as an extension to _[JSDoc](https://jsdoc.app/)_.

They are also easy to write, and in the process of development, their presence or absence in the code comes immediately obvious without the need to look through other files and folders.

Doctests are also a shorter path to [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development).

## Example

```js
import ComplexNumber from './ComplexNumber';

// @test expect(abs(new ComplexNumber(-3, 4))).toEqual(5);
// @test expect(abs(new ComplexNumber(1, -1))).toEqual(Math.sqrt(2));

// @test Absolute value of imaginary unit is 1
// import IM_1 from './IM_1';
// expect(abs(IM_1)).toEqual(1);

export default function abs(z) {
    if (!(z instanceof ComplexNumber))
        throw new Error('Invalid argument: should be a ComplexNumber');
    return Math.sqrt(z.re*z.re + z.im*z.im);
}
```

\+ [Unit testing of class methods](https://github.com/axtk/complex/blob/master/src/ComplexNumber.js)

## Usage

_(With [jest](https://jestjs.io/) as an example)_

```
$ npx doctest build ./src/**/*.js
$ npx jest
$ npx doctest cleanup
```

or in a one-liner suitable for a `package.json` script:

```
  "test": "npx doctest build ./src/**/*.js && npx jest && npx doctest cleanup",
```

_Doctest_ generates temporary test files based on the content of the comments in the code and cleans up these files, once a test run is over.

For the sake of separation of concerns, the job of running the generated tests is entrusted to a dedicated unit testing utility (such as _jest_ in the setting above) which is not part of this package. The choice of the testing utility is up to the developer's preference.

## Options

The _doctest_ output format can be customized via an optional `doctest.config.js` file (which should resemble the default [`doctest.config.js`](doctest.config.js)). The config will be picked either from the application root or from the location specified in the optional `-c <config_path>` command line argument.

## Installation

```
$ npm i -D github:axtk/doctest
```
