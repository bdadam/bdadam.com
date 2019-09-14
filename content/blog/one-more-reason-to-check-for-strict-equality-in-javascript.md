---
date: 2014-02-12 23:00
title: One more reason to check for strict equality in JavaScript
description: There are some things in JavaScript which seem to be strange, like 3 == [3] or 3 == [[[3]]]
tags:
  - javascript
  - fun

abstract: There are some things in JavaScript which seem to be strange, like `3 == [3]` or `3 == [[[3]]]`
---

Some JavaScript fun without further explanation.

```js
var a = [0, 1, 2, 3, 4, 5, 6];
console.log(a[3]); // 3
console.log(a[[3]]); // 3
console.log(a[[[3]]]); // 3
console.log(a[[[[3]]]]); // 3
console.log(a[[[[[3]]]]]); // 3
console.log(a['3']); // 3

console.log(3 == [3]); // true
console.log(3 == [[3]]); // true

console.log(3 === [[3]]); // false

3 === Number([3].valueOf().toString()); // true
console.log([3].valueOf()); // [3]
console.log([3].valueOf().toString()); // 3
console.log(Number('3')); // 3
// therefore:
3 === Number([3].valueOf().toString()); // true
```

## Resources

Some questions on Stack Overflow:

- [Strangest language feature](https://stackoverflow.com/questions/1995113/strangest-language-feature/2008728#2008728)
- [Why does 2 == [2] in JavaScript?](https://stackoverflow.com/a/1724551)
