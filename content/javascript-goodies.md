---
title: Some useful, tricky or funny JavaScript goodies
description: My collection of small JavaScript snippets, which are interesting enough to write about, but too small for a blog post
layout: page-with-comments.hbs
---

I am going to update this page every now an then when I find something interesting to mention. Newest goodies are always on top.
If you have something to add, feel free to comment it.

## `setTimeout()` and `setInterval()` accept arguments, which get passed to the callback functions

This doesn't work in IE8 and below, but can be 'fixed' with a polyfill. See: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout" rel="external">window.setTimeout @ MDN</a>

```js
for (var i = 0, l = anArray.length; i < l; i++) {
  setTimeout(
    function (item) {
      console.log(item); // logs: one two three
    },
    1,
    anArray[i]
  );
}
```

## Concatenating arrays without creating a new object

```js
var a = [1, 2, 3];
var b = [4, 5, 6];
Array.prototype.push.apply(a, b);
console.log(a); //[1, 2, 3, 4, 5, 6]
```
