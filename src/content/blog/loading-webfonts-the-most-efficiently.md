---
layout:         post.hbs
title:          Loading webfonts the most efficiently on responsive sites
date:           2014-10-08 21:00
abstract:       The times are over when every website just used Arial, Verdana, Garamond or Times New Roman for rendering the text,
                because these were the only reliable fonts which were installed on almost any computer.
                Nowadays webfonts are spread all over the internet, but we still don't really know, how to load them efficiently.
                Here is a case study about loading Source Sans Pro the most efficiently.
tags:
- webfonts
- loading
- perfmatters
---

## TLDR
1. Only serve fonts in woff format
1. Other browsers get the old "websafe" fonts
1. Download the font, optimize it
1. Serve the fonts yourself
1. Serve them as CSS files - base64 encoded data URIs
1. If the user doesn't have the font, load it asynchronously and store in localStorage
1. Otherwise load it from localStorage without accessing the server
1. Have fun because your site renders much faster and your users have a much better usability experience

## 1. Browser support
According to [caniuse](http://caniuse.com/#search=woff), 84% of users' browsers support `woff` format.
The only exceptions are the usual old browsers - IE8 and old stock android browsers.
Therefore it is mostly enough to only provide webfonts for those browsers which support the `woff` format.
The old browsers should only show a fallback font like the ones mentioned above.
They will also be thankful for having better performance browsing your website. Just try to find something which fits in your design.

## 2. Don't use external providers like Google Fonts or Typekit
They either cause many extra blocking requests or annoying blinking if loading asynchronously.
We'll see shortly that there is a much better way of serving webfonts.

## 3. The licence matters
Choose a webfont which you can serve yourself. Unfortunately not every licence allows this.
Fortunately there are many which do - like the open source ones. Some of them are Open Sans or Source Sans Pro.
When you found your font, download the "binary" files (otf or ttf).

## 4. Optimizing, reducing size, generating the CSS
Head on over to the <a href="http://www.fontsquirrel.com/tools/webfont-generator">Font Squirrel Webfont Generator</a>.

When choosing expert mode we can choose to remove some charsets.
You have to decide which character sets you really need. Is your content only in english? Then you just need a basic subset.
Is your content in chineese? Then you most probably need everything.

It is important to choose the option to generate CSS files which contains the base64 encoded fonts. This file is what we really need.

## 5. Serving the CSS file
This file is going to be quite large (up to 100-300 kB) depending on your choice on charsets and the other options.
Therefore it is important to gzip it correctly and setting strong cacheability.

Fortunately you are going to serve this file only once for your visitors.
The first time, when the user doesn't have the font file, you download it asynchronously and store it in localStorage.
This time users with slower connections can see when the browsers repaints the fallback fonts with your webfonts, but it only happens at most once.
Many users won't notice anything at all.

From the second page load on you just load the CSS file from the localStorage. Which is reasonably fast.
The users won't see any blinking, because all the operations are synchronous, but only take a couple of milliseconds.

## 6. Show me the code
Since we store the file in localStorage this technique only needs client side code. Here you are.

```JavaScript
(function(){
    function addFont() {
        var style = document.createElement('style');
        style.textContent = localStorage.sourceSansPro;
        style.rel = 'stylesheet';
        document.head.appendChild(style);
    }

    try {
        if (localStorage.sourceSansPro) {
            // The font is in localStorage, we can load it directly
            addFont();
        } else {
            // We have to first load the font file asynchronously
            var request = new XMLHttpRequest();
            request.open('GET', '/path/to/source-sans-pro.woff.css', true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // We save the file in localStorage
                    localStorage.sourceSansPro = request.responseText;

                    // ... and load the font
                    addFont();
                }
            }

            request.send();
        }
    } catch(ex) {}
}());

```

## 7. What did we achieve

1. Eliminated at least one, but usually many blocking requests
1. No blinking for the user when the fallback font gets replaced by the wbfont
1. Faster render time on the first page request
1. Better score on Google Page Speed Insights and WebPageTest.org

## 8. See it in action
This technique is used on my blog. You can test it with your smartphone, tablet or laptop. It's fast, I promise. :)