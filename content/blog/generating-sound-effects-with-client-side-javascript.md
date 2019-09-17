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

deprecation: Please not that the API of the library changed since publishing this article. For the up to date docs please visit [jsfx](https://github.com/egonelbre/jsfx) on GitHub.
needsupdate: true
---

This small library is called [jsfx](https://github.com/egonelbre/jsfx). Info on usage and a demo site can be found on its GitHub page.

## How does it work?

This lib generates wave files as data URIs and then feeds them to an `<audio>` element.

## Demo

Please click on the buttons to play the corresponding sound effects.

```html
<!-- embed -->
<button id="btnPickup">Pick up a coin</button>
<button id="btnLaser">Laser</button>
<button id="btnJump">Jump</button>
<button id="btnShoot">Shoot</button>

<script src="/article-assets/jsfx/audio.js"></script>
<script src="/article-assets/jsfx/jsfx.js"></script>
<script src="/article-assets/jsfx/jsfxlib.js"></script>
<script>
  function setup(id, params) {
    var wave = jsfxlib.createWave(params);
    document.getElementById(id).addEventListener('click', function() {
      wave.play();
    });
  }

  setup('btnPickup', [
    'square',
    0.0,
    0.4,
    0.0,
    0.014,
    0.39,
    0.342,
    20.0,
    1371.0,
    2400.0,
    0.0,
    0.0,
    0.0,
    0.01,
    0.0003,
    0.0,
    0.338,
    0.192,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
  ]);
  setup('btnJump', [
    'square',
    0.0,
    0.4,
    0.0,
    0.368,
    0.0,
    0.146,
    20.0,
    454.0,
    2400.0,
    0.384,
    0.0,
    0.0,
    0.01,
    0.0003,
    0.0,
    0.0,
    0.0,
    0.221,
    0.0,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.0,
    0.0,
  ]);
  setup('btnShoot', [
    'saw',
    0.0,
    0.4,
    0.0,
    0.204,
    0.0,
    0.318,
    20.0,
    951.0,
    2400.0,
    -0.588,
    0.0,
    0.0,
    0.01,
    0.0003,
    0.0,
    0.0,
    0.0,
    0.344,
    0.186,
    0.0,
    0.154,
    0.01,
    1.0,
    0.0,
    0.0,
    0.039,
    0.0,
  ]);
  setup('btnLaser', [
    'square',
    0.0,
    0.4,
    0.0,
    0.21,
    0.0,
    0.184,
    20.0,
    1180.0,
    2400.0,
    -0.518,
    0.0,
    0.0,
    0.01,
    0.0003,
    0.0,
    0.0,
    0.0,
    0.499,
    -0.212,
    0.0,
    0.0,
    0.0,
    1.0,
    0.0,
    0.0,
    0.134,
    0.0,
  ]);
</script>
```
