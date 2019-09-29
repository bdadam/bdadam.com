---
date: 2019-09-26
title: How to create a unique id (UUID) with JavaScript
description: Guide to generate a UUID in JavaScript both on client side and on server side
tags:
  - code
  - javascript
  - uuid
abstract: .....
published: false
---

## Why we need unique ids

In any form of software development we often need a "name" which we use to reference objects, entities, elements, etc.

In many client side application for this task we can use a simple solution. This article is going to show some solutions from simplest to most complex order.

## The simplest solution

Sometimes what we only need is a `function` which returns an automatically incrementing number. This can be sufficient for some client side apps where we don't store the id in any database (we e.g. use the id to generate DOM elements or some objects).

```js
let nextId = 0;
function generateId() {
  return nextId++;
}
```

## What is a universally unique identifier?

The above solution is not sufficient if we want to make sure that there is no collision between ids. The above program generates the same ids every time it gets restarted.

For this problem smart computer scientists introduced us to the concept of [universally unique ids](https://en.wikipedia.org/wiki/Universally_unique_identifier). This means that the chance to generate the same id twice is incredibly small. How small depends on the implementation but usually so small that it's almost impossible.

## Generic client side solution

```js
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
```

## Better random generator

## Server side solution

## References

- A StackOverflow
