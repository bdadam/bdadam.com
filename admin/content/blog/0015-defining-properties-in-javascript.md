---
title: Defining properties in JavaScript
description: >-
  JavaScript supports modern properties. Let's take a look at how to define and
  use them.
date: 2014-02-09T00:00:00.000Z
tags:
  - javascript
published: true
---

JavaScript has always supported basic properties on objects. But the time is approaching when IE8 support is not relevant anymore, so we can use a more modern approach (ES5) for defining properties. There is one difference though to other programming languages - like C# - that we always define properties on objects and not on types.

<!-- readmore -->

## Defining properties on objects with Object.defineProperty()
```JavaScript
var obj = {};

Object.defineProperty(obj, "myProperty", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: 13
});
```
The first two arguments are very obvious, but the third one is where all the magic happens. This argument is a property descriptor. Let's see what we can do with it.

### Enumerable
This attribute simply tells whether the property should show up in enumerations like `for ... in` loops or in `Object.keys()`.

Defaults to `false`.

### Configurable
This attribute sets whether the property can be reconfigured at a later point in the code or whether it can be deleted from the object.

Defaults to `false`.

### Writable
This attribute sets whether a property is read-only or not.

Defaults to `false` except in Google Chrome.

### Value
The value of a property can be anything, any valid JavaScript value (Number, Date, Array, Function, etc.).

Defaults to `undefined`.

## Defining getter and/or setter functions
It is also very easy to define getter and setter functions. Let's take a look at the example below:
```JavaScript
var obj = {};
var propValue = 100;
Object.defineProperty(obj, "prop", {
    get: function(){ return propValue; },
    set: function(newValue){ propValue = newValue; },
    enumerable : true,
    configurable : true
});
```

## Invalid cases
```JavaScript
var obj = {};
Object.defineProperty(obj, 'undeletable', { value: 100, configurable: false });
console.log(obj.undeletable); // 100
delete obj.undeletable;
console.log(obj.undeletable); // 100

var obj = {};
Object.defineProperty(obj, 'notWorking', {
    value: 100,
    get: function() { return 300; }
});
// TypeError: Invalid property. A property cannot both have accessors and be writable or have a value, #<Object>

var obj = {};
Object.defineProperty(obj, 'notWorking', {
    get: function() { return 300; },
    writable: true
});
// TypeError: Invalid property. A property cannot both have accessors and be writable or have a value, #<Object>
```

## Defining multiple properties on the same object
```JavaScript
var obj = {};

Object.defineProperties(obj, {
    "hello": {
        value: "Hello",
        writable: true
    },
    "world": {
        value: "World!",
        writable: false
    }
});
```

## Browser support
Good news, the `Object.defineProperty()` is supported in all modern browsers.
The only problematic one is Internet Explorer 8, which only allows to define properties on DOM objects).

## Performance
At the moment, using `Object.defineProperty()` is definitely slower than using basic properties like in the old days - but not that much.
For more detailed performance tests take a look at <a href="http://jsperf.com/object-defineproperty-vs-definegetter-vs-normal" rel="external,nofollow">jsperf.com</a>.

## Resources:
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" rel="external,nofollow">Object.defineProperty() on MDN</a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties" rel="external,nofollow">Object.defineProperties() on MDN</a>
