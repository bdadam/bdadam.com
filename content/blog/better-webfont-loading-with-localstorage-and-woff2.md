---
title: Better webfont loading with using localStorage and providing WOFF2 support
date: 2014-12-18 01:30
description: Followup article on web font loading. This time with WOFF2 support, better inline JavaScript taking care of disabled localStorage.
#image:          /article-assets/pagespeed99.jpg
tags:
  - webfonts
  - perfmatters
  - localStorage
  - loading

abstract:
  In my previous [article about webfont loading](/blog/loading-webfonts-with-high-performance/) I showed a technique
  about how to load webfonts without blocking page rendering and without annoying the users with flickering text on all pageloads.
  This time I show you an optimized version of the script and provide a solution for WOFF2 support for the newest browsers.
---

## Expectations

1. The users must see the text as soon as possible.
2. As longs as the font is loading, the text must be rendered with the fallback font so that users can see and read it.
3. Users shouldn't be annoyed with flickering text on each page load.
4. Modern browsers with WOFF2 support should receive the fonts in WOFF2 format. This means ca. 30% less filesize.

## How to do this?

- Loading fonts as CSS asynchronously solves expectaions 1 and 2. But unfortunately it causes flickering on every pageload.
  The browsers already have rendered the text in the fallback font when they finish loading the webfont. So they replace the texts and this causes some flashing.

- The idea is to only load a font from the server once. Then we store the data into the localStorage.
  On subsequent requests we load the font directly from `localStorage`. This eliminates the flashing on subsequent page loads.
  Only the first load is affected by the flashing. So no. 3 is also solved now.

- It is quite hard to detect WOFF2 support in the browser if we don't want to rely on user agent detection.
  The best I could find is a very [clever script](https://github.com/filamentgroup/woff2-feature-test) from Filament Group which uses the font loading API.
  It's not 100% correct, but it doesn't provide false positives, only false negatives which is really acceptable in this case.

## Overview of the script

1. We let the old browsers stop early. Testing for `window.addEventListener` or some knows user agents (older Android stock browser, Opera Mini, etc.) is good enough.
1. In some cases `localStorage` can be unreachable, although the browser supports WOFF fonts. For theses cases I provide some fallback.
1. Then we check whether the font is already stored in localStorage. If it is, we load it immediately.
1. If it hasn't been loaded before, we load it with an AJAX call. But first we check for WOFF2 support.
1. Then we store the data into `localStorage` and load the css text into a style element.

## Lets take a look at the script

```js
//This script must be placed in the HEAD above all external stylesheet declarations (link[rel=stylesheet])
function loadFont(fontName, woffUrl, woff2Url) {
  // 0. Many unsupported browsers should stop here
  var nua = navigator.userAgent;
  var noSupport =
    !window.addEventListener || // IE8 and below
    (nua.match(/(Android (2|3|4.0|4.1|4.2|4.3))|(Opera (Mini|Mobi))/) &&
      !nua.match(/Chrome/)); // Android Stock Browser below 4.4 and Opera Mini

  if (noSupport) {
    return;
  }

  // 1. Setting up localStorage
  var loSto = {};
  try {
    // We set up a proxy variable to help with localStorage, e.g. when cookies are disabled
    // and the browser prevents us accessing it.
    // Otherwise some exceptions can be thrown which completely prevent font loading.
    loSto = localStorage || {};
  } catch (ex) {}

  var localStoragePrefix = 'x-font-' + fontName;
  var localStorageUrlKey = localStoragePrefix + 'url';
  var localStorageCssKey = localStoragePrefix + 'css';
  var storedFontUrl = loSto[localStorageUrlKey];
  var storedFontCss = loSto[localStorageCssKey];

  // 2. Setting up the <style> element, that we are using to apply the base64 encoded font data
  var styleElement = document.createElement('style');
  styleElement.rel = 'stylesheet';
  document.head.appendChild(styleElement);
  // Setting styleElement.textContent must be after this line, because of IE9 errors

  // 3. Checking whether the font data is already in localStorage and up-to-date
  if (
    storedFontCss &&
    (storedFontUrl === woffUrl || storedFontUrl === woff2Url)
  ) {
    // the css is still in the localStorage
    // AND it was loaded from one of the current URLs

    // 4. Applying the font style sheet
    styleElement.textContent = storedFontCss;
  } else {
    // The data was not present, or loaded from an obsolete URL
    // So we have to load it again

    // 5. Checking for WOFF2 support to know which URL we should use
    var url =
      woff2Url && supportsWoff2()
        ? woff2Url // WOFF2 URL provided and supported
        : woffUrl; // only WOFF support

    // 6. Fetching the font data from the server
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // 7. Updating localStorage with the fresh data and applying the font data
        loSto[localStorageUrlKey] = url;
        loSto[localStorageCssKey] = styleElement.textContent =
          request.responseText;
      }
    };
    request.send();
  }

  function supportsWoff2() {
    // Source: https://github.com/filamentgroup/woff2-feature-test
    if (!window.FontFace) {
      return false;
    }

    var f = new FontFace(
      't',
      'url("data:application/font-woff2,") format("woff2")',
      {}
    );
    f.load();

    return f.status === 'loading';
  }
}
```

The full script and some Grunt tasks for minification are available on [Github/bdadam/OptimizedWebfontLoading](https://github.com/bdadam/OptimizedWebfontLoading).
There are also some demo files.

## Where to put the script?

The script has to be in the HEAD of your page above all stylesheet declarations (`link[rel=stylesheet]`)
so that it doesn't block page rendering (the browser doesn't have to wait for the CSSOM to be ready).

## What happens when `localStorage` is not available?

This mostly happens when cookies are disabled or the website is loaded inside a WebView container in a native app.
In this case the code still works and falls back to normal browser caching.
The CSS file is requested on each pageload, but served from the browser cache - as long as the CSS file is served with proper caching headers.

## Fallback font

I thinkt it is enough to only provide webfonts for those browsers which support the WOFF or WOFF2 format.
This means ca. 90% of the users world wide. Other browsers should get the text rendered in a fallback font.

The users with these older browsers are going to be thankful, because we don't waste their limited resources (CPU, memory) on some fancy stuff.

## Demo

Although the technique shown in this article is at the moment my preferred way of loading webfonts, for comparision I provide two more techniques.

1. [Loading webfonts as CSS (async), then storing into `localStorage` for subsequent pageloads requests](/samples/webfonts2/localStorage.html)
1. [Loading webfonts as CSS (async), but not using localStorage](/samples/webfonts2/asynccss.html)
1. [Loading webfonts from external woff and woff2 files](/samples/webfonts2/external-fonts.html)

## Comparision

I ran some tests on [webpagetest.org](https://webpagetest.org/) with 3G connection.

The first visit was basically the same for both the localStorage and the async CSS solution.
They both first rendered the text in the fallback font, and then switched over to the webfont. Causing blinking once.
Loading the fonts from external files lead to invisible text until the fonts were loaded. This deleayed rendering with 0.6 seconds.

No. 1 and 2 in the lead.

The second visit comparision also shows some differences between localStorage and async CSS.
We can clearly see, that loading from localStorage doesn't cause any rerendering. Once the HTML is downloaded, the page is rendered immediately.

The async CSS way renders the page in the default font and then rerenders it with the webfont. This causes flickering for the user on every pageload.

No. 1 is the winner in this regard.

To illustrate the differences here are some filmstrip views:

![Comparision of different webfont loading techniques. The localStorage way. (repeat view)](/article-assets/webfonts2/filmstrip-localStorage.jpg 'Async CSS loading, using localStorage. No re-rendering.')

![Comparision of different webfont loading techniques. The async loaded CSS way. (repeat view)](/article-assets/webfonts2/filmstrip-async-css.jpg 'Async CSS loading, without localStorage. Re-rendering visible.')

![Comparision of different webfont loading techniques. Externally loaded fonts. (repeat view)](/article-assets/webfonts2/filmstrip-external-font.jpg 'Loading fonts externally. Rendering delayed until fonts are loaded.')

### Resources

- [My prevoius article about webfont loading on responsive sites](/blog/loading-webfonts-with-high-performance/)
- [Woff2 feature test by Filament Group](https://github.com/filamentgroup/woff2-feature-test)
- [WOFF2 support @ caniuse.com](https://caniuse.com/#feat=woff2)
- [Font loading support @ caniuse.com](https://caniuse.com/#search=FontFace)
- [Web Fonts Performance: Making Pretty, Fast - By Ilya Grigorik](https://www.igvita.com/2012/09/12/web-fonts-performance-making-pretty-fast/)
- [Improving Smashing Magazine’s Performance: A Case Study](https://www.smashingmagazine.com/2014/09/08/improving-smashing-magazine-performance-case-study/)
- [How we make RWD sites load fast as heck](https://www.filamentgroup.com/lab/performance-rwd.html)

What do you think of this technique? Do you have some ideas to improve it? Please leave a comment.

## Update

As @CrocoDillon recommended,
I added the third (optional) argument to  
`new FontFace(..., ..., {})` when checking for WOFF2 support.
Otherwise some browsers throw an exception (Chrome 35 and 36, Opera 22 and 23).
Take a closer look at the [pull request](https://github.com/filamentgroup/woff2-feature-test/pull/3).
