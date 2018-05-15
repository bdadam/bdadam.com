---
title: Loading webfonts with high performance on responsive websites
description: >-
  Optimally loading webfonts is not a trivial task. Here is a simple guide, how
  to do it. No blinking, no blocking.
date: 2014-10-08T19:00:00.000Z
tags:
  - localStorage
  - webfonts
  - loading
  - perfmatters
published: true
---

Once upon a time every website was only using Arial, Verdana, Garamond or Times New Roman for rendering the text, because these font were the only ones reliably installed on almost any computer. But these times are over. Webfonts are spread all over the internet, but we still don't really know, how to load them efficiently.

<!-- readmore -->

Here is my simple guide on what to do, to offer the optimal user experience without having to avoid the expensive accessories (aka webfonts).

## 0. TLDR
The essence of the technique:
1. Only serve fonts in woff format
1. Other browsers get the old "websafe" fonts
1. Download the font in "binary" format and optimize it
1. Serve the fonts yourself
1. Serve them as CSS files - base64 encoded data URIs
1. If the user doesn't have the font, load it asynchronously and store in localStorage
1. Otherwise load it from localStorage without accessing the server
1. Have fun because your site renders much faster and your users have a much better usability experience

For those who are still reading here are my explanations for the points above.

<a id="update1"></a>
### Update - 2014/10/09
If you don't believe in this optimization, I created two demo pages. Just test them and take a look at how resources are loaded, what is blocking, what isn't.

1. <a href="/samples/webfonts-conventional.html" target="_blank">Demo page: Loading from Google Fonts</a>
1. <a href="https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fbdadam.com%2Fsamples%2Fwebfonts-conventional.html" rel="external" target="_blank">Page Speed Insights: Loading with Google Fonts (79/100)</a>
1. <a href="/samples/webfonts-optimized.html" target="_blank">Demo page: Loading Asynchronously and serving from localStorage later on</a>
1. <a href="https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fbdadam.com%2Fsamples%2Fwebfonts-optimized.html" rel="external" target="_blank">Page Speed Insights: Async loading/localStorage (100/100)</a>

## 1. Browser support
According to [caniuse](http://caniuse.com/#search=woff), 84% of users' browsers support `woff` format.
The only exceptions are the usual old browsers - IE8 and old stock android browsers.
Therefore it is mostly enough to only provide webfonts for the modern browsers which support the `woff` format.
The old ones should only show a fallback font (e.g. Arial).
The users will also be thankful for having better performance browsing your website. Just try to find something which fits in your design.

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
Therefore it is important to gzip it correctly and setting strong cacheability when serving it to the users.

Fortunately you are going to serve this file only once for your visitors.
The first time, when the user doesn't have the font file, their browser downloads it asynchronously and stores it in localStorage.
This time users with slower connections can see when the browsers repaints the fallback fonts with your webfonts, but it only happens at most once.
Many users won't notice anything at all.

From the second page load on you just load the CSS file from the localStorage. Which is reasonably fast (5-50ms).
The users won't see any blinking, because all the operations are synchronous, but only take a couple of milliseconds.

## 6. Show me the code
Since we store the file in localStorage this technique only needs client side code. Here you are.

```html
<head>
...
<script>
(function(){
    function addFont() {
        var style = document.createElement('style');
        style.rel = 'stylesheet';
        document.head.appendChild(style);
        style.textContent = localStorage.sourceSansPro;
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
    } catch(ex) {
        // maybe load the font synchronously for woff-capable browsers
        // to avoid blinking on every request when localStorage is not available
    }
}());
</script>
...
</head>
```

## 7. What did we achieve

1. Eliminated at least one - but typically many - blocking requests
1. At most one blinking for the user when the fallback font gets replaced by the webfont (first visit, first request)
1. Faster render time on the first page request
1. Better score on Google Page Speed Insights and WebPageTest.org

## 8. See it in action
This technique is used on my blog. You can test it with your smartphone, tablet or laptop. It's fast, I promise. :)

**There are still some fine details which are missing from this post.
If you have questions or feedback, you are welcome to leave a [comment](#comments).**

<a id="update2"></a>
### Update - 2014/10/11
A Twitter user, @Kseso, made me aware of another method, which also proceeds to a 99/100 score on Google Page Speed Insights.
The method is to inline the CSS what Google Fonts delivers.

I advise against this method, because it delays text rendering quite a lot. So let's take a deeper look what happens here.

1. We define font faces directly in the HTML file like this:
```html
<head>
...
<style>
@font-face {
font-family: 'Source Sans Pro';
font-style: normal;
font-weight: 400;
src: local('Source Sans Pro'),
     local('SourceSansPro-Regular'),
     url(http://fonts.gstatic.com/s/sourcesanspro/v9/ODelI1aHBYDBqgeIAH2zlBBHWFfxJXS04xYOz0jw624.woff) format('woff');
}
</style>
...
</head>
```
1. The browser doesn't start to fetch the font file, until it doesn't know whether it is needed at all somewhere in the page.
1. The browser waits until DOM and CSSOM are constructed
1. The browser starts to fetch the font file from Google Fonts
(please notice, there is also an extra DNS request for fonts.gstatic.com).
<img src="/static/article-assets/gfonts-timeline.jpg" alt="Timeline of loading fonts from Google Fonts">
This timeline shows that the browser only starts fetching the font file, just before the DOMContentLoaded event.
1. If this wasn't bad enough, most browsers will just render blank text, where those font faces are used:
    1. Only IE starts rendering **immediately** with the fallback font
    2. Firefox and Chrome35+ wait for the font download to complete **with a 3 seconds timeout** (after which the fallback font is used)
    3. Safari and Chrome pre 35 wait for the font download to complete **without any timeout**

Therefore on slow connections you will delay rendering of your text content up to 3 seconds in most browsers.
In worst case, if your font takes ages to load (e.g. because of bad mobile connection), Safari users will never see your text content and just leave your page.
Your users can end up seeing a white page until the timeout kicks in.

More info can be found on <a href="https://www.igvita.com/2012/09/12/web-fonts-performance-making-pretty-fast/" rel="external">Ilya Gregorik's blog</a>.

I also created <a href="/samples/webfonts-googlefonts.html" target="_blank">a test page</a>, where you can check it out yourself.


### Resources
* [Web Fonts Performance: Making Pretty, Fast - By Ilya Grigorik](https://www.igvita.com/2012/09/12/web-fonts-performance-making-pretty-fast/)
* [Improving Smashing Magazine’s Performance: A Case Study](http://www.smashingmagazine.com/2014/09/08/improving-smashing-magazine-performance-case-study/)
* [How we make RWD sites load fast as heck](http://www.filamentgroup.com/lab/performance-rwd.html)

#### Translations
This article was <a href="http://css-live.ru/articles-css/bystraya-zagruzka-veb-shriftov-na-adaptivnyx-sajtax.html" hreflang="ru" rel="external">translated to Russian by Максим Усачев</a>.
