---
published: false
layout: post.hbs
date: 2014-02-09 12:00
title: Defining properties on prototype in JavaScript
description:
abstract: In the last post we were looking at defining JavaScript properties.
  One (edge)case is when we define a property on the prototype and not on the object itself. Let's take a look at what happens.
tags:
  - javascript
---

## Defining properties on object prototypes

```js
var Car = function (doors) {
  if (!isNaN(doors)) {
    this.doors = doors;
  }
};

Object.defineProperty(Car.prototype, 'doors', {
  value: 4,
  writable: true,
  configurable: false,
});

var bmw = new Car();
var mercedes = new Car(4);
var ferrari = new Car(2);
var f1car = new Car(0);
```
