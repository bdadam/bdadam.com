---
layout:         post.hbs
date:           2014-04-06
title:          Generating sound effects with client side JavaScript
description:    The easy way to generate simple 8-bit sound effects for games and apps in JavaScript
abstract:       A few years ago I came across a simple library with which we can easily generate 8-bit sound effects for JavaScript games and apps.
                This library is very handy for hackathons or weekend coding sessions.
tags:
- javascript
- sound
- client side
---

This small library is called [jsfx](https://github.com/egonelbre/jsfx). Info on usage and a demo site can be found on its GitHub page.

## How does it work?
This lib generates wave files as data URIs and then feeds them to an &lt;audio&gt; element.

## Demo
Just click on the buttons to play the corresponding sound effects.

<button id="btnPickup">Pick up a coin</button>
<button id="btnLaser">Laser</button>
<button id="btnJump">Jump</button>
<button id="btnShoot">Shoot</button>

<script src="/static/article-assets/jsfx/audio.js"></script>
<script src="/static/article-assets/jsfx/jsfx.js"></script>
<script src="/static/article-assets/jsfx/jsfxlib.js"></script>
<script>
    (function load() {
        if (!window.jsfxlib) {
            return setTimeout(load, 100);
        }

        try {
            function setup(id, params) {
                var wave = jsfxlib.createWave(params);
                document.getElementById(id).addEventListener('click', function() {
                    wave.play();
                });
            }

            setup('btnPickup', ["square",0.0000,0.4000,0.0000,0.0140,0.3900,0.3420,20.0000,1371.0000,2400.0000,0.0000,0.0000,0.0000,0.0100,0.0003,0.0000,0.3380,0.1920,0.0000,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]);
            setup('btnJump', ["square",0.0000,0.4000,0.0000,0.3680,0.0000,0.1460,20.0000,454.0000,2400.0000,0.3840,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.2210,0.0000,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.0000,0.0000]);
            setup('btnShoot', ["saw",0.0000,0.4000,0.0000,0.2040,0.0000,0.3180,20.0000,951.0000,2400.0000,-0.5880,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.3440,0.1860,0.0000,0.1540,0.0100,1.0000,0.0000,0.0000,0.0390,0.0000]);
            setup('btnLaser', ["square",0.0000,0.4000,0.0000,0.2100,0.0000,0.1840,20.0000,1180.0000,2400.0000,-0.5180,0.0000,0.0000,0.0100,0.0003,0.0000,0.0000,0.0000,0.4990,-0.2120,0.0000,0.0000,0.0000,1.0000,0.0000,0.0000,0.1340,0.0000]);
        }
        catch(ex) {
            setTimeout(load, 100);
        }
    }());
</script>