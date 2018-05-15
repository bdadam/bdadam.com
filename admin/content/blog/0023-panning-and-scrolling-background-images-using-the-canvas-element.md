---
title: Panning and scrolling background images using the canvas element
description: Animated background for canvas based games
date: 2014-03-01T17:00:00.000Z
tags:
  - javascript
  - canvas
  - tutorial
published: true
---

I'm planning to create a simple 2D game in plain JavaScript. As the first step I would like to show, how to animate (pan or scroll) a background image using the canvas element. I am also going to show some basic setup code in order to have a loop where we can draw the frames.

<!-- readmore -->

There are two common scenarios for simple 2D games:
* There is a huge background image for the entire level. All the activities have this same background image, but the viewport's position is chaging
* There is a small image which is scrolled all the time (tipically from right to left) as the player advances


## Panning the viewport inside the background image
<iframe src="/figures/panning-background.html" style="width: 100%; height: 230px;"></iframe>

## Demo
Please click on the button to start the animation.
<iframe src="/samples/canvas-background-panning.html" style="width: 100%; height: 370px; border: none;"></iframe>

## How it works
We have a function which is called for every frame our game draws.
In this method we calculate the position of the viewport. For this basic example I chose to derive the position from the elapsed time.
Therefore the camera takes an elliptical path.

```JavaScript
function draw(delta) {
    totalSeconds += delta;
    var x = -1 * (img.width - canvas.width) / 2 * (1 + Math.cos(totalSeconds / Math.PI));
    var y = -1 * (img.height - canvas.height) / 2 * (1 + -Math.sin(totalSeconds / Math.PI));

    context.drawImage(img, x, y);
}
```

## Scrolling the background image infinitely
In the second case the background image is scrolling infinitely as time and the player advances.
It's like when playing Mario, but the camera is centered on Mario the whole time.

<iframe src="/figures/scrolling-background.html" style="width: 100%; height: 180px;"></iframe>

In the animation above we can see, that for this effect we need at least 2 images (can be the same) or more, depending on the viewport size.

## Demo
Please click on the button to start the animation.
The vertical black lines mean the edges of the single images.
For this example I'm using the same image and we have a constant speed of 100 pixels/sec.
<iframe src="/samples/canvas-background-scrolling.html" style="width: 100%; height: 370px; border: none;"></iframe>

## How it works
The background position is also derived from the elapsed time (constant speed).
1. We calculate how many images are needed to cover the viewport: `Math.ceil(canvas.width / img.width) + 1`
2. We calculate the current X-position: `totalSeconds * vx % img.width`. Please note the modulo operator here.
3. We store the current context state and translate our canvas to make the drawing easier.
4. We draw the images - one after the other.
5. We restore the context's state.
```JavaScript
function draw(delta) {
    totalSeconds += delta;

    var vx = 100; // the background scrolls with a speed of 100 pixels/sec
    var numImages = Math.ceil(canvas.width / img.width) + 1;
    var xpos = totalSeconds * vx % img.width;

    context.save();
    context.translate(-xpos, 0);
    for (var i = 0; i < numImages; i++) {
        context.drawImage(img, i * img.width, 0);
    }
    context.restore();
}
```

## All the code which calls our `draw()` function
In order for this to work, we have some more work to do. This is the setup code I used for these examples.
1. I used some basic `requestAnimationFrame` polyfill
1. The animation gets only started after the image is loaded successfully (onload).
1. Some start/stop logic and button
1. And the `loop()` function which gets called in every frame when our animation is running. Here we need `requestAnimationFrame()`.

```JavaScript
(function() {
    window.requestAnimationFrame = window.requestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.mozRequestAnimationFrame
            || function(callback) { window.setTimeout(callback, 1000 / 60); };

    var canvas = document.getElementById('bg');
    var context = canvas.getContext('2d');
    var looping = false;
    var totalSeconds = 0;

    var img = new Image();
    img.onload = imageLoaded;
    img.src = 'IMG_SOURCE';

    function imageLoaded() {
        draw(0);

        var btn = document.getElementById('btnStart');
        btn.addEventListener('click', function() {
            startStop();
        });
    }

    var lastFrameTime = 0;

    function startStop() {
        looping = !looping;

        if (looping) {
            lastFrameTime = Date.now();
            requestAnimationFrame(loop);
        }
    }

    function loop() {
        if (!looping) {
            return;
        }

        requestAnimationFrame(loop);

        var now = Date.now();
        var deltaSeconds = (now - lastFrameTime) / 1000;
        lastFrameTime = now;
        draw(deltaSeconds);
    }


    function draw(delta) {
        /* Here happens some magic. */
    }
}());
```

**In order to see the full source code, please view these pages**
1. <a href="/samples/canvas-background-panning.html" rel="noindex,nofollow" target="_blank">Panning the viewport inside the background image</a>
2. <a href="/samples/canvas-background-scrolling.html" rel="noindex,nofollow" target="_blank">Scrolling the background image</a>
