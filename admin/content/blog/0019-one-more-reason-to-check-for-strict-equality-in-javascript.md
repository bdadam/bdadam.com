---
title: One more reason to check for strict equality in JavaScript
description: >-
  There are some things in JavaScript which seem to be strange, like 3 == [3] or
  3 == [[[3]]]
date: 2014-02-12T22:00:00.000Z
tags:
  - javascript
  - fun
---



<!-- readmore -->

Some JavaScript fun without further explanation.
```JavaScript
var a = [0, 1, 2, 3, 4, 5, 6];
console.log(a[3]); // 3
console.log(a[[3]]); // 3
console.log(a[[[3]]]); // 3
console.log(a[[[[3]]]]); // 3
console.log(a[[[[[3]]]]]); // 3
console.log(a["3"]); // 3

console.log(3 == [3]); // true
console.log(3 == [[3]]); // true

console.log(3 === [[3]]); // false

3 === Number([3].valueOf().toString()) // true
console.log([3].valueOf()) // [3]
console.log([3].valueOf().toString()) // 3
console.log(Number("3")) // 3
// therefore:
3 === Number([3].valueOf().toString()) // true
```

Resources - questions on Stack Overflow:
* <a href="http://stackoverflow.com/questions/1995113/strangest-language-feature/2008728#2008728" rel="external,nofollow">Strangest language feature</a>
* <a href="http://stackoverflow.com/a/1724551" rel="external,nofollow">Why does 2 == [2] in JavaScript?</a>
