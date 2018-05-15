---
title: Loading web pages really fast - optimistic page loading with Instantclick.io
description: How to turn traditional websites into single page apps with Instantclick.io
date: 2014-10-08T00:00:00.000Z
tags:
  - javascript
  - single page app
  - click
  - perfmatters
published: true
---

There is a very clever trick, which can turn any web page into a single page app. Without requiring you to do any significant work. Fortunately there is also a very handy tool, which makes use of this trick and does a great job.

<!-- readmore -->

As web developers we usually want to anything to load pages faster for the user. What about if started loading a page, before the user clicks a link?

## Optimistic page loading

It is absolutely possible to make the user experience much better by loading content much faster.
The trick is, to start (optimistically) loading the page when the user only just hovers over a link.
There is a significant delay between hovering and clicking - usually more then 100 ms.
We can use this time to prefetch the next page which is behind the link, so that we can show it right after the click event was fired.

You can see this trick in action for example on this blog. Just click on some links on the page.

## Instantclick.io

You can get this tool here: <a href="http://instantclick.io/" rel="external,nofollow">http://instantclick.io/</a>.

Just put a single script into your page and you should be almost fine. Maybe you need some blacklisting/whitelisting,
so that some links are not prefetched automatically. Or maybe you want some scripts to execute on every request.
Everything is easily doable. Just head over to the downloads section. There are some useful information about the integration.

They also have a test page, where you can measure how much time you can shave off of the load time.
It measures the time difference between mosuedown event and click event - and also between touchstart event and click event.

## Mousedown instead of hover

If a web page has many links, it is better to only prefetch when the user really pressed the mouse button.
It still gives a decent advantage over the traditional way.

## Touch support

The library comes with touch support out of the box.


**Do you like it?** Do you already use this library? Tell me about your experience in the comments.
