---
title: 'Finally always wins, unless you crash your computer meanwhile'
description: JavaScript is a funny language
date: 2014-02-11T21:30:00.000Z
tags:
  - javascript
  - fun
---



<!-- readmore -->

In JavaScript it is perfectly valid to have a return statement in a finally block. But this doesn't mean, you should really put it in there.
Consider the following code:

```JavaScript
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

*So this function returns `true`.*
