---
date: 2014-10-16 01:00
title: Automatically adjusting the height of a textarea to its content text
description: A simple JavaScript trick to make textareas grow or shrink in height automatically according to their actual text content.
tags:
  - trick
  - javascript

abstract:
  While I was working on a simple web based markdown editor I needed something where the users can type their texts.
  My first thought was to use a DIV with the contenteditable attribute. But it introduced many problems, which I did not want to fight.
  I only needed something simple and stupid - the good old `TEXTAREA`.
---

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
<textarea
  data-adaptheight
  rows="3"
  cols="40"
  placeholder="Your input"
  style="padding: 16px; line-height: 1.5;"
></textarea>
<script>
  (function () {
    function adjustHeight(el, minHeight) {
      // Calculate height of border (and scroll bar if displayed)
      // See details here: https://stackoverflow.com/questions/22675126/what-is-offsetheight-clientheight-scrollheight
      var borderHeight = el.offsetHeight - el.clientHeight;

      // set the height to 0 in case of it has to be shrinked
      el.style.height = 0;

      // set the correct height
      // el.scrollHeight is the full height of the content, not just the visible part
      el.style.height =
        Math.max(minHeight, el.scrollHeight) + borderHeight + 'px';
    }

    // we use the "data-adaptheight" attribute as a marker
    var textAreas = [].slice.call(
      document.querySelectorAll('textarea[data-adaptheight]')
    );

    // iterate through all the textareas on the page
    textAreas.forEach(function (el) {
      // we need box-sizing: border-box, if the textarea has padding
      el.style.boxSizing = 'border-box';

      // We disable vertical resizing
      el.style.resize = 'horizontal';

      // we hide vertical scrollbars
      el.style.overflowY = 'hidden';

      var initialContent = el.innerHTML;

      // We empty the textbox so that we can calculate the minimum height based on the rows attribute
      el.innerHTML = '';

      // the minimum height initiated through the "rows" attribute
      var minHeight = el.scrollHeight;

      // We set back the original content
      el.innerHTML = initialContent;

      el.addEventListener('input', function () {
        adjustHeight(el, minHeight);
      });

      // we have to readjust when window size changes (e.g. orientation change)
      window.addEventListener('resize', function () {
        adjustHeight(el, minHeight);
      });

      // we adjust height to the initial content
      adjustHeight(el, minHeight);
    });
  })();
</script>
```

## Demo

Please type in some text and see it for yourself. Initial height is 3 rows.

Please not that if the text is long then you will see a vertical scrollbar which comes from the iframe used to embed the demo into the article.
The scrollbar does not come from the `TEXTAREA` component.

<iframe src="/demo/textarea-auto-height.html" data-hide-code style="width: 100%; height: 350px;" frameborder="0"></iframe>

## Tradeoffs

Every keypress causes repaints. Because we set the height of the textarea to 0 and then to the calculated value.
This should however be negligible, because most users can only type at most a few characters a second.
Therefore it shouldn't cause any noticeable performance drawbacks.

## Where to use it for?

There are many cases in which this can be useful. Amongst others:

- Text editors
- Code editors
- Comment boxes

## For production

This article is only meant for simple use cases or as a proof of concept work.
For production (and therefore maybe more complex usecases) I would rather recommend using a library such as [autosize](https://github.com/jackmoore/autosize).
These libraries deal with browser bugs and other edge cases.

## Resources

- For differences between `offsetHeight`, `clientHeight` and `scrollHeight` please see [this StackOverflow answer](https://stackoverflow.com/a/22675563/2374649)

**Do you like it? Do you already use it? Please leave a comment below - the comment box is auto adjusted by default. :)**
