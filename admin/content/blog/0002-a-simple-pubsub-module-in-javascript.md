---
title: A simple PubSub module in JavaScript
description: ''
date: 2014-01-03T00:00:00.000Z
tags:
  - javascript
  - modules
---

I have always been a fan of simple things, such as the PubSub pattern. A few weeks ago I discovered this pattern again, when I was looking for a way to separate some JavaScript modules which don't really have to know about each other but have to have some sort of communication.

<!-- readmore -->

##TLDR
I believe that publish/subscribe (PubSub) is a very powerfull pattern. Therefore I have recently open sourced my implementation of it in JavaScript. The full source code can be found on GitHub: <a href="https://github.com/bdadam/PubSub" rel="external,nofollow">github.com/bdadam/PubSub</a>.
It's completely dependency-free and very small (under 1kb).

## What is PubSub?
>In software architecture, publish–subscribe is a messaging pattern where senders of messages, called publishers, do not program the messages to be sent directly to specific receivers, called subscribers. Instead, published messages are characterized into classes, without knowledge of what, if any, subscribers there may be. Similarly, subscribers express interest in one or more classes, and only receive messages that are of interest, without knowledge of what, if any, publishers there are.
Pub/sub is a sibling of the message queue paradigm, and is typically one part of a larger message-oriented middleware system.
<small>Source: [Wikipedia](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern)</small>

## Differences between DOM events and PubSub
PubSub is very similar to the DOM events, except: there is only one object which fires events and accepts listeners.
When using DOM events, a listener is registered on the DOM node which fires the event.
<pre class="prettyprint lang-js"><code>document.getElementById('someId').addEventListener('click', function() { /* event listener */ });
</code></pre>

In a *PubSub* architecture a publisher doesn't know its subscribers and a message receiver doesn't know where the message comes from. Both parties only know a mediator object which handles the broadcasting of the messages.

<pre class="prettyprint lang-js"><code>// PubSub is the global mediator object

PubSub.subscribe('anEvent', function(eventName, eventData) {
    console.log(eventName); // "anEvent"
    console.log(eventData.something); // 1
    console.log(eventData.someOtherThing); // 2
});

PubSub.publish('anEvent', { something: 1, someOtherThing: 2 });
</code></pre>

## The power of PubSub
This pattern allows us to decouple modules from each other. E.g. think of an online shop, where users can add products to their carts. When adding a product, the website usually has to do some things:

+ update number of items
+ update total price
+ do some tracking (e.g. Google Analytics)
+ highlight the newly added product
+ maybe play a small animation or even some sound effect (don't do it)
+ etc.

If a customer clicks on the "Add to cart" button, the button sends a message with the corresponding product as a payload. All the other components can listen to this event and act accordingly (update shopping cart, play animation, track it in Google Analytics and so on).

##Are there any disadvantages?
Yes, there are indeed. All the disadvantages come from the main advantage: publishers are decoupled from subscribers. This means:
1. There is no guarantee that a message is delivered. PubSub is a fire and forget pattern.
2. The publisher doesn't know, when a subscriber stops working.

## What does all this look like in JavaScript code?

<pre class="prettyprint lang-js"><code >// What the button does
$("#addProductButton").click(function() {
    PubSub.publish("productAdded", {
        product: {
            id: 1234,
            name: 'A Super Product',
            price: 9900 // in cents
        },
        user: {
            country: "DE",
            loggedIn: true,
            membershipStatus: "premium"
        }
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
        eventData.product.price
    ]);
});
</code></pre>

## How to install it?
If you use bower, just execute <code>bower install pubsub</code> and then include pubsub.min.js in your code. E.g:  <code>&lt;script src="/bower_components/pubsub/pubsub.min.js"&gt;&lt;/script&gt;</code>

If you don't use bower then you can download [pubsub.min.js](https://raw.github.com/bdadam/PubSub/master/pubsub.min.js) and include it. E.g.:
`<script src="/libs/pubsub/pubsub.min.js"></script>`

You can also use it with require-js:
```javascript
require(['pubsub'], function(PubSub) {
    console.log(typeof PubSub.publish); // "function"
    console.log(typeof PubSub.subscribe); // "function"
    console.log(typeof PubSub.unsubscribe); // "function"

    /* Please note: when using require js, the PubSub module doesn't register itself as a global object */
    console.log(typeof window.PubSub); // "undefined"
});
```

I think I am not the only one, who loves the simplicity and elegance of PubSub. If you do it as well, please consider using my implementation.
It's free and it's published under the MIT license.
