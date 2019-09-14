---
date: 2014-01-31
title: Error handling in JavaScript
description: The proper way of throwing and handling JavaScript Errors
tags:
  - javascript
  - code
  - browser
  - error
  - node.js

abstract:
  Have you ever wondered, what's the proper way of throwing JavaScript errors? And how to handle them?
  Here we'll see some examples and we'll define some custom error types.
---

_Additional bonus: the following code examples also work in node.js not just in the browsers._

## Throwing Errors

Throwing errors is very simple, we just need the `throw` statement.

```js
function throwsAnError() {
  throw new Error('An error occured');
}

try {
  throwsAnError();
} catch (ex) {
  console.log(ex.message); // An error occured
}
```

Theoretically it's possible to throw any kind of object, but it's not really recommended throwing anything else than `Error` or one of its derived (custom) types.
The reason for this is, that browsers not always work as you would expect.
Some of them (IE, Safari) only show "uncaught exception" and don't show the object which was thrown.

## Default error types in JavaScript

There are six predefined error types in JavaScript:

- EvalError: when an error occurs in the `eval()` function
- RangeError: when a parameter or variable is not in its valid numeric range
- ReferenceError: when an invalid reference is de-referenced (e.g. using a variable which has not been defined)
- SyntaxError: when there is a syntax error in some scripts
- TypeError: when a parameter or variable is not of a valid type
- URIError: when passing invalid parameters to URI function (`encodeURI()` or `decodeURI()`)

## Handling specific errors

Here comes the `instanceof` operator handy, when our codes runs into a catch. With its help we can check which type does the exception belong to.

```js
try {
  // doSomethingWithNumbersAndURIs();
} catch (ex) {
  if (ex instanceof RangeError) {
    alert('Value not in range!');
  } else if (ex instanceof URIError) {
    alert('Value not an URI!');
  } else {
    // some basic error handling
  }
}
```

## Throwing custom errors

This is also very simple, we just have to create a constructor for our error type which is derived from `Error`.
There's one little catch though, line numbers are shown incorrectly.

```js
function CustomError(message) {
  this.name = 'CustomError';
  this.message = message || 'Some default message';
}
CustomError.prototype = new Error();
CustomError.prototype.constructor = CustomError;

try {
  throw new CustomError('An error occured!');
} catch (ex) {
  console.log(ex.name); // CustomError
  console.log(ex.message); // Ann error occured!
}
```

If you are interested in more details:

1. [Mozilla Developer Network Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
2. [NCZOnline](http://www.nczonline.net/blog/2009/03/10/the-art-of-throwing-javascript-errors-part-2/)
