---
date: 2015-01-26
title: Plain JavaScript event delegation
description: Event delegation code in vanilla JS without any library. Adding event handler to an outer element while still knowing which inner element was clicked.
tags:
  - javascript
  - event

abstract:
  Event delegation is a powerful concept of event handling. If you are using jQuery, you might know it as jQuery.on().
  Since I don't use jQuery anymore, I had to write a similar function myself. If you are wondering how the code looks like, read on.

needsupdate: true
---

## What is event delegation?

With event delegation we only set one event handler function, which then analyzes the event's target element and executes the intended handler function.
This way we have better code readability and performance improves.
There is no need to set new event handlers when the content dynamically changes.
This is very handy for lists or tables.

In jQuery code we could just call

```js
jQuery('#list').on('click', '.item', eventHandler);
```

Example: there is a list with 100 items. We want our eventHandler function to be called whenever a list item is clicked.

```html
<ul id="list">
  <li>1</li>
  <li>2</li>
  <li>...</li>
  <li>100</li>
</ul>
<script>
  var list = document.getElementById('list');
  list.addEventListener('click', function eventHandler(event) {
    // one item in the list was clicked
    console.log(event.target); // this is that item
    event.target.style.backgroundColor = '#f00';
  });
</script>
```

## This is just event bubbling, isn't it?

This first example was not very spectacular. It just uses event bubbling, which is natural in JavaScript.

But we can go further. What if only some specific elements should trigger our `eventHandler` function?
This is also possible. With jQuery the code looks like this:

```html
<ul id="list">
  <li class="yes">1</li>
  <li class="no">2</li>
  <li class="no">3</li>
  <li>...</li>
  <li class="yes">100</li>
</ul>
<script>
  $('#list').on('click', '.yes', function eventHandler(e) {
    // this function is only called,
    // when a list item with 'yes' class is called
    console.log(e.target); // this is the clicked list item
  });
</script>
```

## What if I don't have jQuery?

That's absolutely fine. I don't use jQuery either anymore. Here we have some vanilla JavaScript code:

```html
<ul id="list">
  <li class="yes">1</li>
  <li class="no">2</li>
  <li class="no">3</li>
  <li>...</li>
  <li class="yes">100</li>
</ul>
<script>
  function on(elSelector, eventName, selector, fn) {
    var element = document.querySelector(elSelector);

    element.addEventListener(eventName, function(event) {
      var possibleTargets = element.querySelectorAll(selector);
      var target = event.target;

      for (var i = 0, l = possibleTargets.length; i < l; i++) {
        var el = target;
        var p = possibleTargets[i];

        while (el && el !== element) {
          if (el === p) {
            return fn.call(p, event);
          }

          el = el.parentNode;
        }
      }
    });
  }

  on('#list', 'click', '.yes', function(e) {
    // this function is only called, when a list item with 'yes' class is called
    console.log(e.target); // this is the clicked list item
  });
</script>
```

## Demo

Click on any list item. Where it says "click me!", the click will trigger an `alert()` message.

```html
<!-- embed -->
<ul id="list">
  <li class="no"><button>won't work</button></li>
  <li class="no"><button>won't work</button></li>
  <li class="yes"><button>click me!</button></li>
  <li class="yes"><button>click me!</button></li>
  <li class="no"><button>won't work</button></li>
  <li class="yes"><button>click me!</button></li>
  <li class="yes"><button>click me!</button></li>
  <li class="no"><button>won't work</button></li>
  <li class="no"><button>won't work</button></li>
  <li class="yes"><button>click me!</button></li>
</ul>
<script>
  (function() {
    function on(elSelector, eventName, selector, fn) {
      var element = document.querySelector(elSelector);

      element.addEventListener(eventName, function(event) {
        var possibleTargets = element.querySelectorAll(selector);
        var target = event.target;

        for (var i = 0, l = possibleTargets.length; i < l; i++) {
          var el = target;
          var p = possibleTargets[i];

          while (el && el !== element) {
            if (el === p) {
              return fn.call(p, event);
            }

            el = el.parentNode;
          }
        }
      });
    }

    on('#list', 'click', 'li.yes', function() {
      alert('You clicked me!');
    });
  })();
</script>
```

## Use-cases

1. Large tables with many fields
1. Lists - the content of the parent element can be changed freely (paging), the event listener must be set only once
1. etc.

## Browser Support

This code uses two core DOM API call `Element.addEventListener` and `Element.querySelectorAll`. These are supported in every modern browser and IE9+.

### More resources on events

- [Bubbling and Capturing @ javascript.info](http://javascript.info/tutorial/bubbling-and-capturing)
- [addEventListener @ MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener)
- [Event Order @ QuirksMode](http://www.quirksmode.org/js/events_order.html)
- [Events Advanced @ QuirksMode](http://www.quirksmode.org/js/events_advanced.html)

**What do you think, would you use this code in your projects? Tell me your thoughts in the comments.**
