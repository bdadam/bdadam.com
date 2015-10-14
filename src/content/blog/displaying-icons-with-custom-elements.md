---
layout:         post.hbs
date:           2015-10-14
title:          Displaying icons with custom elements
description:    A cross-browser technique to use SVG icons without icon-fonts
abstract:       Since HTTP/2 is not widely supported yet, it has always been a pain to use icons on web pages.
                There are many ways to include icons and all of them have some tradeoffs.
                This interesting technique shows a way to include SVG-icons in a cross-browser way with using custom elements.
tags:
- html
- web components
- custom elements
- javascript
---

## TLDR

I created a technique for using SVG icons without pain with a simple gulp task. The code can be found here: [bdadam/custom-icons](https://github.com/bdadam/custom-icons).

The usage looks like this:

```HTML
<x-icon type="some-icon"></x-icon>
...
<script src="icons.js" async></script>
```

The script basically puts an svg element inside the `x-icon` tag. This svg element can then - for example - be styled with CSS.

```HTML
<style>
    [type="happy"] path {
        fill: red;
    }
</style>
...
<x-icon type="happy">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <path fill="#444" d="..."></path>
    </svg>
</x-icon>
```

## The longer version

I have to admit that I always had a pain when I had to include a set of icons on webpages.
- I didn't want to use icon fonts, because they are sometimes problematic:
    [accessibility problems](https://github.com/FortAwesome/Font-Awesome/issues/6133), [blurrines](http://mir.aculo.us/2014/10/31/icon-fonts-vs-inline-svg/), etc.
- I didn't want to use inline SVGs either, because of cacheability and duplication.
- I didn't want to include a bunch of IMG tags, because of the many extra HTTP-requests.

So I was searching for a better way when I found out that I could have all the advantages of those techniques above.
I always thought it would be pretty neat if we had some dedicated HTML element for icons. Like this here:

```HTML
<x-icon type="some-icon"></x-icon>
```

This looks quite semantic and self explaining.
We could use any tag name which is a valid name for custom elements - e.g. it must include a dash.
There is a type attribute which defines which icon is shown. Easy. Bot how to achieve this?

## JavaScript and WebPack for the rescue

The technique is behind the scenes quite simple.
The input is just some SVG files.
The output is a single JavaScript file which includes the content of all the SVG files and some loader code.

For the source code of a sample implementation please check out this GitHub repository: [bdadam/custom-icons](https://github.com/bdadam/custom-icons)

The only magic what we need is WebPack with a custom loader: [svgo-loader](https://github.com/rpominov/svgo-loader).
This loader automagically loads the content of the `require`d SVG files, minimizes it and provides it as normal string variable in the code.

It's hard to explain, please check out the sources.

### Supported browsers

This technique works in all modern browsers.
Though `document.registerElement` is only supported in recent versions of Chrome, we can already use this API now
with a very smart [polyfill from WebReflection](https://github.com/WebReflection/document-register-element).
Thanks to the polyfill we have support back to IE9 and Android 2.2.

Browsers without native SVG support are unfortunately out for now. Maybe in the future if somebody still needs this, one can create a fallback JavaScript
file with PNGs.