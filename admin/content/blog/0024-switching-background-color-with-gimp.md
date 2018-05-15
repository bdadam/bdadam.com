---
title: Switching background color of an image with Gimp
description: Design task - changing the background color of a pattern with Gimp
date: 2014-03-02T21:00:00.000Z
tags:
  - design
  - gimp
  - color
  - tutorial
published: true
---

As a web developers we sometimes come across some tasks which are not that strictly related to development, but rather to design. For me such a task was a few days ago, when I found a neat background pattern, but the color just didn't fit the site I was working on.

<!-- readmore -->

For this mini tutorial I'm using this <a href="http://subtlepatterns.com/food/" rel="external,nofollow">pattern from subtlepatterns.com</a>
<div class="text-center">
    <img src="/static/article-assets/gimp-background-change/food.png" alt="Original background pattern"/>
    &nbsp;
    <img src="/static/article-assets/gimp-background-change/food_blue.png" alt="Modified pattern with different background color"/>
    <p>Before on the left, after on the right</p>
</div>

## Here is what to do:
1. Open the picture in Gimp
1. Get the hex code of the color, which you want to switch (in this case fac564)
1. Then go to Colors > Color to Alpha... (If it's grayed out, just switch the Image > Mode from Indexed to **RGB**)
1. After this you should see the same image, just with transparent background color. So now we create a new background layer with the desired color.
1. At the end just export the new image and have fun


## The steps as images
<img src="/static/article-assets/gimp-background-change/gimp-capture-color-code.jpg" alt="Capturing color code" title="Capturing color code"/>

<img src="/static/article-assets/gimp-background-change/gimp-color-to-alpha-grayed-out.jpg" alt="Color to Alpha grayed out" title="Color to Alpha grayed out"/>

<img src="/static/article-assets/gimp-background-change/gimp-change-mode-to-rgb.jpg" alt="Image mode to RGB" title="Image mode to RGB"/>

<img src="/static/article-assets/gimp-background-change/gimp-color-to-alpha.jpg" alt="Color to Alpha" title="Color to Alpha"/>

<img src="/static/article-assets/gimp-background-change/gimp-color-to-alpha-window.jpg" alt="Color to Alpha window" title="Color to Alpha window"/>

<img src="/static/article-assets/gimp-background-change/gimp-new-background-layer.jpg" alt="Final step - creating new background layer with desired color" title="Final step - creating new background layer with desired color"/>
