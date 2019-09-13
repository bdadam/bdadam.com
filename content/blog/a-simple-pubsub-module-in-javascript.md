---
title: A simple PubSub module in JavaScript
date: 2014-01-03
tags:
  - code
  - javascript

abstract: I have always been a fan of simple things, such as the PubSub pattern.
  A few weeks ago I discovered this pattern again, when I was looking for a way to separate some JavaScript modules
  which don't really have to know about each other but have to have some sort of communication.

needsupdate: true
---

## TLDR

I believe that publish/subscribe (PubSub) is a very powerfull pattern. Therefore I have recently open sourced my implementation of it in JavaScript. The full source code can be found on GitHub: [github.com/bdadam/PubSub](https://github.com/bdadam/PubSub).
It's completely dependency-free and very small (under 1kb).

## What is PubSub?

> In software architecture, publish-subscribe is a messaging pattern where senders of messages, called publishers, do not program the messages to be sent directly to specific receivers, called subscribers. Instead, published messages are characterized into classes, without knowledge of what, if any, subscribers there may be. Similarly, subscribers express interest in one or more classes, and only receive messages that are of interest, without knowledge of what, if any, publishers there are.
> Pub/sub is a sibling of the message queue paradigm, and is typically one part of a larger message-oriented middleware system.
> <cite>[Wikipedia](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)</cite>

## Differences between DOM events and PubSub

- PubSub is very similar to the DOM events, except: there is only one object which fires all the events and registers all the listeners.
- DOM events propagate (bubbling and capturing phase). [See more about DOM event propagation.](https://javascript.info/bubbling-and-capturing)

```js
document.getElementById('someId').addEventListener('click', function() {
  /* event listener */
});
```

In a _PubSub_ architecture a publisher doesn't know its subscribers and a message receiver doesn't know where the message comes from. Both parties only know a mediator object which handles the broadcasting of the messages.

```js
// PubSub is the global mediator object

PubSub.subscribe('anEvent', function(eventName, eventData) {
  console.log(eventName); // "anEvent"
  console.log(eventData.something); // 1
  console.log(eventData.someOtherThing); // 2
});

PubSub.publish('anEvent', { something: 1, someOtherThing: 2 });
```

## The power of PubSub

This pattern allows us to decouple modules from each other. E.g. think of an online shop, where users can add products to their carts. When adding a product, the website usually has to do some things:

- update number of items
- update total price
- do some tracking (e.g. Google Analytics)
- highlight the newly added product
- maybe play a small animation or even some sound effect (don't do it)
- etc.

If a customer clicks on the "Add to cart" button, the button sends a message with the corresponding product as a payload. All the other components can listen to this event and act accordingly (update shopping cart, play animation, track it in Google Analytics and so on).

## Are there any disadvantages?

Yes, there are indeed. All the disadvantages come from the main advantage: publishers are decoupled from subscribers. This means:

1. There is no guarantee that a message is delivered. PubSub is a fire and forget pattern.
2. The publisher doesn't know, when a subscriber stops working.

## What does all this look like in JavaScript code?

```js
// What the button does
$('#addProductButton').click(function() {
  PubSub.publish('productAdded', {
    product: {
      id: 1234,
      name: 'A Super Product',
      price: 9900, // in cents
    },
    user: {
      country: 'DE',
      loggedIn: true,
      membershipStatus: 'premium',
    },
  });
});

// Total price module increases the displayed total price when a product is added
PubSub.subscribe('productAdded', function(eventData) {
  increaseTotalPrice(eventData.product.price);
});

// Play the sound when Mario collects a coin
PubSub.subscribe('productAdded', function() {
  playSound('mario-coin');
});

// Tracking module
PubSub.subscribe('productAdded', function(eventData) {
  _gaq.push([
    '_trackEvent',
    'Products',
    'Buy',
    eventData.product.name,
    eventData.product.price,
  ]);
});
```

## How to install it?

If you use bower, you can execute `bower install pubsub` and then include `pubsub.min.js` in your code.

```html
<script src="/bower_components/pubsub/pubsub.min.js"></script>
```

If you don't use bower then you can download [pubsub.min.js](https://raw.github.com/bdadam/PubSub/master/pubsub.min.js) and include it.

```html
<script src="/libs/pubsub/pubsub.min.js"></script>
```

You can also use it with require-js:

```js
require(['pubsub'], function(PubSub) {
  console.log(typeof PubSub.publish); // "function"
  console.log(typeof PubSub.subscribe); // "function"
  console.log(typeof PubSub.unsubscribe); // "function"

  /* Please note: when using require js,
     the PubSub module doesn't register itself as a global object */
  console.log(typeof window.PubSub); // "undefined"
});
```

I think I am not the only one, who loves the simplicity and elegance of PubSub. If you do it as well, please consider using my implementation.
It's free and it's published under the MIT license.
