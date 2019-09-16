---
date: 2014-03-10 23:00
title: A simple usability trick for Google Maps
description: What should happen when the user scrolls over the map (mouse wheel) - zooming the map or scrolling the page?
tags:
  - google maps
  - usability
  - javascript

abstract:
  Embedding Google Maps in a website is very easy with its JavaScript API.
  A simple trick can improve the usability of large maps when users scroll with the mouse wheel over them.

deprecation: The trick in this article is no longer needed.
  Google Maps solves the problem now out of the box. It requires that users press `Ctrl` button when zooming in with the mouse wheel on devices with physical keyboards or pinch zooming (with two fingers) on mobile devices.
needsupdate: true
---

## Usability problem

If you embed Google Maps via its JavaScript API, there is usually a usability question:
_What should happen, when the users scroll over the map with their mouse wheels?_
The API defaults say: the user should zoom the map.

But that's in many cases not what users would expect. Especially when the map is large.
Sometimes they just want to scroll the page without zooming the map or having any interaction with it at all.

## How to solve it

There is a possible solution which is very easy and works for many users:

1. Before they had any interaction with the map, disable zooming with the mouse wheel
2. After they had an interaction, enable zooming with the mouse wheel
3. When they click away, or interact with other parts of the page, disable zooming with mouse wheel again

## Demo

1. Scroll with the mouse wheel over the map
1. Click onto the map
1. Start zooming in and out with the mouse wheel
1. Click somewhere outside of the map
1. Scroll with mouse wheel over the map to just scroll the page
1. Repeat these steps [at most a few times - no endless loop :)]

**NOTE:** Here used to be a demo which no longer works due to changes in the Google Maps API.

## Update (16/03/2014)

I edited the source code to use `mousedown` event instead of `click`.
This helps when the user drags the map - dragging counts also as an interaction with the map.

## Source code

```js
var el = $('#map');
var map;

function enableScrollingWithMouseWheel() {
  map.setOptions({ scrollwheel: true });
}

function disableScrollingWithMouseWheel() {
  map.setOptions({ scrollwheel: false });
}

function init() {
  map = new google.maps.Map(el[0], {
    zoom: 10,
    center: new google.maps.LatLng(47.4984056, 19.04075779),
    scrollwheel: false, // disableScrollingWithMouseWheel as default
  });

  google.maps.event.addListener(map, 'mousedown', function() {
    enableScrollingWithMouseWheel();
  });
}

google.maps.event.addDomListener(window, 'load', init);

$('body').on('mousedown', function(event) {
  var clickedInsideMap = $(event.target).parents('#map').length > 0;

  if (!clickedInsideMap) {
    disableScrollingWithMouseWheel();
  }
});

$(window).scroll(function() {
  disableScrollingWithMouseWheel();
});
```
