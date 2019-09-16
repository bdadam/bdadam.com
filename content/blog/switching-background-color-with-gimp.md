---
date: 2014-03-02 22:00
title: Switching background color of an image with Gimp
description: Design task - changing the background color of a pattern with Gimp
tags:
  - design
  - gimp
  - color
  - tutorial

abstract:
  As a web developers we sometimes come across some tasks which are not that strictly related to development, but rather to design.
  For me such a task was a few days ago, when I found a neat background pattern, but the color just didn't fit the site I was working on.
---

For this mini tutorial I'm using this [pattern from subtlepatterns.com](https://subtlepatterns.com/food/).

![Comparision of the images before and after](/article-assets/gimp-background-change/food_comparision.png 'Original pattern on the left, modified on the right')

## Here is what to do:

1. Open the picture in Gimp
2. Get the hex code of the color, which you want to switch (in this case fac564)
3. Then go to Colors > Color to Alpha... (If it's grayed out, just switch the Image > Mode from Indexed to **RGB**)
4. After this you should see the same image, just with transparent background color. So now we create a new background layer with the desired color.
5. At the end export the new image and have fun

## The steps as images

![Screenshot of step 1](/article-assets/gimp-background-change/gimp-capture-color-code.jpg 'Capturing color code')

![Screenshot of step 2](/article-assets/gimp-background-change/gimp-color-to-alpha-grayed-out.jpg 'Color to Alpha grayed out')

![Screenshot of step 3](/article-assets/gimp-background-change/gimp-change-mode-to-rgb.jpg 'Image mode to RGB')

![Screenshot of step 4](/article-assets/gimp-background-change/gimp-color-to-alpha.jpg 'Color to Alpha')

![Screenshot of step 5](/article-assets/gimp-background-change/gimp-color-to-alpha-window.jpg 'Color to Alpha window')

![Screenshot of step 6](/article-assets/gimp-background-change/gimp-new-background-layer.jpg "Final step - creating new background layer with desired colo
