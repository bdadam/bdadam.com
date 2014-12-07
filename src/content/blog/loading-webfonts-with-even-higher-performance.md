---
layout:         post.hbs
title:          Loading webfonts with high performance on responsive websites
date:           2014-12-07 21:00

description:    Followup article on web font loading. This time with WOFF2 support, better inline JavaScript taking care of disabled localStorage.

abstract:       In the first part of this article I wrote about font loading with high performance on resposive sites. This time I take a look at some more things,
                like WOFF2 support, where to put the script.

#image:          /static/article-assets/pagespeed99.jpg
tags:
- localStorage
- webfonts
- loading
- perfmatters
---

As a reminder let's take a look at what are our requirements on loading webfonts:
- Fontloading doesn't block page rendering
- Users see text rendered in a fallback font until the font is not loaded
- If the font never loads, the text still gets rendered
- We only support browsers which support WOFF or WOFF2

## The problems with most common font loading techniques
- 


## How to detect WOFF2 support
I found a very tiny [WOFF2 feature detect script](https://github.com/filamentgroup/woff2-feature-test) from Filament Group.
It fulfills every requirement I have:
- It's small
- It doesn't load external resources
- It's fast
- Browser support is very good amongst browsers supporting WOFF2. See [WOFF2 support](http://caniuse.com/#feat=woff2) vs. [Font loading support](http://caniuse.com/#search=FontFace)

Here is the script
```JavaScript
var supportsWoff2 = (function(win) {
    if(!("FontFace" in win)) {
        return false;
    }

    var f = new win.FontFace("t", 'url("data:application/font-woff2,") format("woff2")');
    f.load();
    
    return f.status === 'loading';
})(this);
```

## Where to get WOFF2 files?


## What to do when there is no localStorage?

## Where to put the script?
The script has to be in the HEAD of your page above all stylesheet declarations (link[rel=stylesheet])
so that it doesn't block page rendering (the browser doesn't have to wait for the CSSOM to be ready).


### Resources
[Woff2 feature test by Filament Group](https://github.com/filamentgroup/woff2-feature-test)