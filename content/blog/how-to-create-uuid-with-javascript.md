---
date: 2019-09-30
title: How and why to generate a universally unique identifier with JavaScript
description: Guide to generate a UUID in JavaScript both on client side and on server side
tags:
  - code
  - javascript
  - uuid

abstract:
  In any form of software development we often need a unique "name" to identify pieces of information
  (objects in memory, database entities, DOM elements, cars, persons and so on).
  This article will show how to generate such identifiers based on the needs, from simplest to more complex solutions.
---

## The simplest solution

In many client side application for this task we can use a simple solution: a `function` which returns an incrementing number every time it's called. This can be sufficient for some client side apps where we don't store the id in any database (e.g. we use the id to generate DOM elements or some short-living objects).

```js
let nextId = 1;
function generateId() {
  return nextId++;
}
```

We can even get rid of that `let nextId` variable if we define nextId as a property on the `generateId` function intself.

```js
function generateId() {
  return (generateId._id = (generateId._id || 0) + 1);
}
```

## What is a universally unique identifier?

The above solution is not sufficient when we need uniqueness. The above program generates the same ids every time it gets restarted.

To solve this problem smart computer scientists introduced the concept of a [universally unique id (UUID)](https://en.wikipedia.org/wiki/Universally_unique_identifier) or also called a globally unique identifier (GUID).

The chance to generate the same id twice is incredibly small for most practical use-cases. (There are no collisions.)

Let's see how we can generate such ids.

## Generic client side solution

```js
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
```

## Better random generator

The above solution is sufficient for many use cases. However we have to note that `Math.random` is not considered a good source of randomness due to how it is implemented in most browsers. What this means is that the chance for uuid collision is significantly higher than it is when using a proper source of randomness.

For this to overcome we need to choose a better pseudo random number generator (PRNG). Luckily most browsers nowadays support `crypto.getRandomValues`.

> The `crypto.getRandomValues()` method lets you get cryptographically strong random values. -- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues)

```js
function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
```

## Server side solution

The code from the previous step has only one problem: it only works in browsers but not in Node.js.

But as always there is a package for the rescue: [uuid](https://www.npmjs.com/package/uuid).

This package has the advantage compared to the browser variants that it suports version 1, 3, 4, 5 UUIDs as well. That is why we have `x`, `y` and `4` in `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx` which is used in the code of the client side function.

```bash
yarn add uuid

# or

npm install --save uuid
```

Then in code we can use the module like this:

```js
const uuidv1 = require('uuid/v1');
uuidv1(); // ⇨ '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d'
```

## Differences between UUID versions

The eagle-eyed reader may have spotted that we always generated version 4 UUID in the client-side code examples. The reason behind this is that v4 UUIDs only rely on a source of randomness. Other UUID versions also include some other information in the generated UUIDs to further reduce the chance of a collision.

A version 1 based id includes the timestamp when the id was generated and also the MAC address of the machine which was used to generate the id.

Version 3 and 5 based ids include the hashes of a namespace (v3 uses MD5 and v5 uses SHA-1).

Version 4 UUIDs include 122 randomly generated bits and 6 predetermined bits to signal the version.

## Validating UUIDs

```js
function isValidUUID(uuid) {
  const re = /[0-9a-f]{8}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{4}\-[0-9a-f]{12}/i;
  return re.test(uuid);
}

isValidUUID('a12f444c-2c6a-4d24-a907-885ac6108493'); // ⇨ true
isValidUUID('abc'); // ⇨ false
```

## Read more

[There’s Math.random(), and then there’s Math.random()](https://v8.dev/blog/math-random)

## Credits

- The code examples in this article were borrowed form this [Stack Overflow question](https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript)
- The regex for validation UUIDs was taken from [regextester.com](https://www.regextester.com/99148)
