---
layout:         post.hbs
date:           2014-03-10 23:00
title:          A simple usability trick for Google Maps
description:    What should happen when the user scrolls over the map (mouse wheel) - zooming the map or scrolling the page?
abstract:       Embedding Google Maps in a website is very easy with its JavaScript API.
                A simple trick can improve the usability of large maps when users scroll with the mouse wheel over them.
tags:
- google maps
- usability
- javascript
---
## Usability problem
If you embed Google Maps via its JavaScript API, there is usually a usability question:
*What should happen, when the users scrolls over the map with their mouse wheels?*
The API defaults say: the user should zoom the map.

But that's in many cases not what users would expect. Especially when the map is large.
Sometimes they just want to scroll the page without zooming the map or having any interaction with it at all.

## How to solve it
There is a possible solution which is very easy and works for many users:
1. Before they had any interaction with the map, disable zooming with the mouse wheel
1. After they had an interaction, enable zooming with the mouse wheel
1. When they click away, or interact with other parts of the page, disable zooming with mouse wheel again

## Demo
1. Just scroll with the mouse wheel over the map
1. Click onto the map
1. Start zooming in and out with the mouse wheel
1. Click somewhere outside of the map
1. Scroll with mouse wheel over the map to just scroll the page
1. Repeat these steps [at most a few times - no endless loop :)]

<div id="map" style="width: 100%; height: 350px; position: relative;"></div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="//maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
<script>
    $(function() {
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
                center: new google.maps.LatLng(47.49840560, 19.04075779),
                scrollwheel: false // disableScrollingWithMouseWheel as default
            });

            google.maps.event.addListener(map, 'click', function(){
                enableScrollingWithMouseWheel()
            });
        }

        google.maps.event.addDomListener(window, 'load', init);

        $('body').on('click', function(event) {
            var clickedInsideMap = $(event.target).parents('#map').length > 0;

            if(!clickedInsideMap) {
                disableScrollingWithMouseWheel();
            }
        });

        $(window).scroll(function() {
            disableScrollingWithMouseWheel();
        });
    });
</script>

## Source code
```JavaScript
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
        center: new google.maps.LatLng(47.49840560, 19.04075779),
        scrollwheel: false // disableScrollingWithMouseWheel as default
    });

    google.maps.event.addListener(map, 'click', function(){
        enableScrollingWithMouseWheel()
    });
}

google.maps.event.addDomListener(window, 'load', init);

$('body').on('click', function(event) {
    var clickedInsideMap = $(event.target).parents('#map').length > 0;

    if(!clickedInsideMap) {
        disableScrollingWithMouseWheel();
    }
});

$(window).scroll(function() {
    disableScrollingWithMouseWheel();
});
```