---
date: 2014-04-06
title: Generating sound effects with client side JavaScript
description: The easy way to generate simple 8-bit sound effects for games and apps in JavaScript
tags:
  - javascript
  - sound
  - client side

abstract:
  A few years ago I came across a simple library with which we can easily generate 8-bit sound effects for JavaScript games and apps.
  This library is very handy for hackathons or weekend coding sessions.

deprecation: Please note that the API of the library changed since publishing this article. For the up to date docs please visit [jsfx](https://github.com/egonelbre/jsfx) on GitHub.
needsupdate: true
---

This small library is called [jsfx](https://github.com/egonelbre/jsfx). Info on usage and a demo site can be found on its GitHub page.

## How does it work?

This lib generates wave files as data URIs and then feeds them to an `<audio>` element.

## Demo

Please click on the buttons to play the corresponding sound effects.

<iframe src="/demo/sound-effects/index.html" style="width: 100%; height: 40px;" frameborder="0" loading="lazy"></iframe>
