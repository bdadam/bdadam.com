---
title: Tracking clicks with Google Analytics
description: >-
  Clicktracking and monitoring user behaviour is very important in nowadays
  websites. They are also essential for A/B testing.
date: 2014-02-14T22:00:00.000Z
tags:
  - javascript
  - tracking
  - google analytics
published: true
---

Every website has some links or buttons, users are clicking on them. But do webmasters know which ones do users click most often? Are there maybe some, which are not clicked at all? Maybe you just built a shiny new navigation and you may ask "do users use it?". Clicktracking gives you the answer. When using Google Analytics the results are just shown on your dashboard.

<!-- readmore -->

## Why would you track clicks on a website?
I think the answer to this question is very easy: to know, what users are clicking and where they are clicking.
You maybe have questions like these:
* Are users using the breadcrumbs?
* Are users clicking on 'back to' links?
* Do they click on the images in the gallery?
* What works better, a button or a link?
* Are red buttons working better than green buttons on a specific page?
* etc.

## Let's find the answers
```html
<button id="playVideo">Play video</button>
<script>
    $('#playVideo').click(function() {
        video.play(); // doing some work

        _gaq.push(['_trackEvent', 'Videos', 'Play', video.title]); // the 'old' way, when using the old tracking code
        /* or */
        ga('send', 'event', 'Videos', 'Play', video.title); // when using Universal Analytics
    });
</script>
```
This way you track events in Google Analytics which show up under Behaviour > Events on your Dashboard.
In the example above we are always generating an event when somebody clicks on the play button.
With these events we also store what really happened: category=Videos, action=Play, label='title of video'.

## Which link was clicked?
We just have to set the arguments properly, and then we exactly know which link was clicked.
```html
<a href="/my-cool-page.html" class="greenButton">Go to my cool page</a>
...
<a href="/my-cool-page.html" class="redButton">Go to my cool page</a>
...
<a href="/my-cool-page.html" class="blueButton">Go to my cool page</a>

<script>
$('.greenButton, .redButton, .blueButton').click(function() {
    var className = this.className;

    _gaq.push(['_trackEvent', 'Click', 'Link', className]); // the 'old' way, when using the old tracking code
    /* or */
    ga('send', 'event', 'Click', 'Link', className); // when using Universal Analytics
});
</script>
```

This method is also perfectly suitable for A/B testing. We just have to take care of displaying each variant equally for the visitors of our site.

## What the docs don't say
The modern browsers are quite fast. When users click on links, it happens quite often, that Google Analytics has not finished tracking the event.
But the browser navigates away from the page, and at the end the event doesn't get registered at all.

*What to do?*

With listening to `mousedown` event, we can reduce the number of lost events:
```JavaScript
$('.myButton').mousedown(function() {
    // track click
});
```

Or using a little hack, we can track even more events. But this one has a tradeoff:
the user has to wait more till the new page is loaded. In some situations it is maybe acceptable, but try to avoid this because
slower loading pages usually mean worse user experience. Which means less pageviews, more frustrated users and *less conversion*.

Here is the hack:
```JavaScript
$('.myLink').click(function() {
    var href = this.href; // getting the URL of the next page

    setTimeout(function() {
        window.location.href = href; // after a timeout of 250ms we navigate to the URL, where the user wanted to go
    }, 250);

    return false; // preventing default behaviour, so that the browser doesn't navigate away
});
```

References:
* <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/events" rel="external,nofollow">Event tracking with Universal Analytics</a>
* <a href="https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide" rel="external,nofollow">Event tracking with ga.js</a>
