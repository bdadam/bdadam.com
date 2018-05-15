---
title: >-
  Worth watching: Douglas Crockford speaking about the new good parts of
  JavaScript in 2014
description: >-
  The new good parts and bad parts of modern JavaScript in 2014. ES6, class-free
  object oriented programming, tail call optimization and many more.
date: 2014-10-20T21:00:00.000Z
tags:
  - video
  - javascript
---

At the Nordic.js 2014 Douglas Crockford was giving a talk about what he considers to be "the good parts" of JavaScript in 2014. He talks about ECMAScript6, what parts of it he could already identify as the new good parts, and of which he thinks, that they are going to be the new bad parts. Read on for my summary or just whatch the video.

<!-- readmore -->

<div style="padding: 30px 0 56.25%; background-color: #000; position: relative;"><iframe style="position: absolute; width: 100%; height: 100%; top: 0; right: 0; bottom: 0; left: 0;" src="http://www.youtube.com/embed/PSGEjv3Tqo0"></iframe></div>

## The "good parts" he identified in ES6

- ES6's new (proper) [tail call optimization](http://duartes.org/gustavo/blog/post/tail-calls-optimization-es6/).
  So that "JavaScript becomes a real functional programming language".
- Ellipsis aka rest operator for variable number of function arguments.<br>
`function x(...params) {}`
- Modules - to come away from global variables
- The `let` statement for block scope variables -> "`let` is the new `var`"
- Destructoring `let {a, b} = obj` equals in ES5 `var a = obj.a, b = obj.b;`
- `WeakMap` which has a terrible name -> nobody wants to use something which is weak, everybody wants strong things


## The bad parts

He admits that all the ES6 things are new and it's hard to decide whether they are going to be good or bad.
But there are definitely things, where he feels they are going to be bad.
- The worst is `class`. It's only for Java programmers, who don't want to learn JavaScript. For those "Who don't know how miserable they are."
- Generators - which add much complexity but little value

- He also talks about that he changed his mind. There are things, which he considered to be good parts, but they aren't anymore.
- He stopped using the `new` keyword years ago. He uses `Object.create` instead.
- But he also stopped using `Object.create` (although it was only added for him to the language).
- It all only happened, because he stopped using `this`. So he doesn't need those.
- He also stopped using `null`, because it doesn't make any sense to have two kinds of undefined: `null` and `undefined`.
- He stopped using falsiness.
- He doesn't use `for` statements anymore, just the new native array methods or `Object.keys`.
```JavaScript
Object.keys(obj).forEach(function(key) { /* ... */ });
```


## He made some thoughts about the next language after JavaScript

- Neither of Dart or TypeScript is the forward looking thing we need.
- Getting adoption of a new language is going to be extremely difficult, because programmers are as emotional as other people.
Also every change needs a decade to get accepted.
- Getting away from classes is a good thing, but he's not an advocate of prototypal inheritance anymore.
- He proposes class-free object oriented programming aka using closures when writing objects. Like this:
```JavaScript
function constructor(spec) {
    let { member } = spec,
        { other } = other_constructor(spec),
        method = function() {
            // member, other, methid, spec
        };

    return Object.freeze({
        method,
        other
    });
}
```
- He also proposes a new number type for the next generation programming languages. It's called [DEC64](http://dec64.com/).
With this new - one and only - number type he wants to fight against problems like `0.1 + 0.2 != 0.3`. (Binary Floating Points originating from 1950's)
He also talks about the two types of requirements, business vs. sceintific - exact cent values vs. approximate values. 


I think it was a very interesting talk. Douglas Crockford had many interesting points about programming in modern JavaScript.
There are some points which are maybe debatable.
What do you think? Do you agree with him? Do you have better ideas? Please share your thoughts in the comments below.
