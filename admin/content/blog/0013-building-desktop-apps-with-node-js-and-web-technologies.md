---
title: Building desktop apps with node.js and web technologies
description: >-
  The node-webkit project makes it possible to write standalone desktop apps
  with JavaScript, HTML5 and CSS3
date: 2014-02-04T21:00:00.000Z
tags:
  - node.js
  - webkit
  - desktop apps
published: true
---

Native apps with web technologies are not a mobile-only thing anymore. The node-webkit project makes it possible to write standalone desktop apps with JavaScript, HTML5 and CSS3. The coolest thing about this is, that both server side (node.js) and client side (jQuery, AngularJS, etc.) JavaScript libraries can be used.

<!-- readmore -->

<img src="/static/article-assets/node-webkit-screen.png"/>
<p class="legal center">Screenshot of a hello world app created with node-webkit</p>

A few hours ago I found this project called <a href="https://github.com/rogerwang/node-webkit" rel="external,nofollow">node-webkit</a>.
It seems to be living and mature enough to use it. But since I don't need it now, I blog about it, so that I can remember it in the appropriate moment.

## How does it work?
1. Write your application.
1. Create a zip file of all your assets (call it package.nw).
1. You can just ship this file along with the node-webkit executable file
1. Alternatively you can create an executable file from the package with a few dll files along
1. If you want to have a single executable file, it's recommended to box the files with <a href="http://enigmaprotector.com/en/aboutvb.html" rel="external,nofollow">Enigma Virtual Box</a>

## Attack of the contexts
There is a concept which might be a little crazy at first sight. There are different contexts with different global object for node modules and UI windows.
In the web context we have a `window` object (or many if we have multiple windows), which we don't have in a node module.
If we have to reach the window object of the current UI context, we have to pass it to the node module.
We get most of the problem with `instanceof` because the constructors like `Array` or `Date` are children of the context-dependent global object.
After just quickly building a "hello world" app I can't really tell to what extent this can be a problem or difficulty.

## Supported platforms
There are prebuilt binaries for Windows, OSX and Linux.

**References:**

* For more details and docs take a look at the <a href="https://github.com/rogerwang/node-webkit" rel="external,nofollow">project's Github site</a>.
The features are well-documented.
* <a href="http://strongloop.com/strongblog/creating-desktop-applications-with-node-webkit/" rel="external,nofollow">Creating Desktop Applications With node-webkit </a>
* <a href="http://oldgeeksguide.github.io/presentations/html5devconf2013/wtod.html#/" rel="external,nofollow">WebApp to DesktopApp with Node-Webkit</a>
