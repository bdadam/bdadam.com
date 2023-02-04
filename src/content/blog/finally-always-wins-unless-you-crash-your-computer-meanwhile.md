---
date: 2014-02-11 22:30
title: Finally always wins, unless you crash your computer meanwhile
description: JavaScript is a funny language
tags:
  - javascript
  - fun

abstract: In JavaScript it is perfectly valid to have a return statement in a `finally` block. But this doesn't mean, you should really put it in there.
---

Consider the following code:

```js
function whatDoesThisReturn() {
  try {
    return false;
  } finally {
    return true;
  }
}

console.log(whatDoesThisReturn());
```

Basically the `finally` block is called after the `try` block, therefore it overrides the return value.

_So this function returns `true`._
