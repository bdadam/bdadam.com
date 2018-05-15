---
title: Automatically adjusting the height of a textarea to its content text
description: >-
  A simple JavaScript trick to make textareas grow or shrink in height
  automatically according to their actual text content.
date: 2014-10-15T23:00:00.000Z
tags:
  - trick
  - javascript
published: true
---

While I was working on a simple web based markdown editor I needed something where the users can type their texts. My first thought was to use a DIV with the contenteditable attribute. But it introduced many problems, which I did not want to fight. I only needed something simple and stupid - the good old TEXTAREA.

<!-- readmore -->

But also textareas have a big problem: they have a fixed height per default.
You can either set the `rows` attribute to tell how many rows should be displayed, or you can set their `style.height` properties.
But unfortunately there is no auto-height property.

## The idea
After every change in the text we have to measure how high the content is. Fortunately there is a method to do it.
`element.scrollHeight` gives us the height of the content, regardless of visible scrollbars.
To be able to decrease the size we set the height each time back to zero so that scrollHeight reports the required minimum and not more.
E.g. when the user deletes a line.

We also have to calculate the size of the border and outline, so that we don't give any chance for the content to be cut off, or that a scrollbar is shown.

Then we set the `style.height` property to the calculated height.

To do this every time, we use the `oninput` event, which is fired every time the text content changes.
Contrary to `onchange` which only fires when the users clicks away.


## Show me the code
```html
<textarea data-adaptheight rows="3" cols="40" placeholder="Your input" style="padding: 16px; line-height: 1.5;"></textarea>
<script>
(function() {
    function adjustHeight(textareaElement, minHeight) {
        // compute the height difference which is caused by border and outline
        var outerHeight = parseInt(window.getComputedStyle(el).height, 10);
        var diff = outerHeight - el.clientHeight;

        // set the height to 0 in case of it has to be shrinked
        el.style.height = 0;

        // set the correct height
        // el.scrollHeight is the full height of the content, not just the visible part
        el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px';
    }

    
    // we use the "data-adaptheight" attribute as a marker
    var textAreas = [].slice.call(document.querySelectorAll('textarea[data-adaptheight]'));
    
    // iterate through all the textareas on the page
    textAreas.forEach(function(el) {

        // we need box-sizing: border-box, if the textarea has padding
        el.style.boxSizing = el.style.mozBoxSizing = 'border-box';

        // we don't need any scrollbars, do we? :)
        el.style.overflowY = 'hidden';

        // the minimum height initiated through the "rows" attribute
        var minHeight = el.scrollHeight;

        el.addEventListener('input', function() {
            adjustHeight(el, minHeight);
        });

        // we have to readjust when window size changes (e.g. orientation change)
        window.addEventListener('resize', function() {
            adjustHeight(el, minHeight);
        });

        // we adjust height to the initial content
        adjustHeight(el, minHeight);

    });
}());
</script>
```

## Demo
Just type in some text and see it for yourself. Initial height is 3 rows.

<textarea data-adaptheight rows="3" cols="40" placeholder="Your input" style="padding: 16px; line-height: 1.5; width: 100%; display: block;"></textarea>
<script>
(function() {
    function adjustHeight(textareaElement, minHeight) {
        var diff = parseInt(window.getComputedStyle(el).height, 10) - el.clientHeight;
        el.style.height = 0;
        el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px';
    }

    var textAreas = document.querySelectorAll('textarea[data-adaptheight]');
    
    for (var i = 0, l = textAreas.length; i < l; i++) {
        var el = textAreas[i];
        el.style.boxSizing = el.style.mozBoxSizing = 'border-box';
        el.style.overflowY = 'hidden';
        var minHeight = el.scrollHeight;

        el.addEventListener('input', function() { adjustHeight(el, minHeight); });
        window.addEventListener('resize', function() { adjustHeight(el, minHeight); });

        adjustHeight(el, minHeight);
    }
}());
</script>

## Tradeoffs
Every keypress causes repaints. Because we set the height of the textarea to 0 and then to the calculated value.
This should however be negligible, because most users can only type at most a few characters a second.
Therefore it shouldn't cause any noticeable performance drawbacks.

## Where to use it for?
There are many cases in which this can be useful. Amongst others:
- Text editors
- Code editors
- Comment boxes

**Do you like it? Do you already use it? Just leave a comment below - the comment box is auto adjusted by default. :)**
