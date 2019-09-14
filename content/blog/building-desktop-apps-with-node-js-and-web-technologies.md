---
date: 2014-02-04 22:00
title: Building desktop apps with node.js and web technologies
description: The node-webkit project makes it possible to write standalone desktop apps with JavaScript, HTML5 and CSS3
tags:
  - native apps
  - node.js
  - desktop apps

abstract: Native apps with web technologies are not a mobile-only thing anymore.
  The node-webkit project makes it possible to write standalone desktop apps with JavaScript, HTML5 and CSS3.
  The coolest thing about this is, that both server side (node.js) and client side (jQuery, AngularJS, etc.) JavaScript libraries can be used.

deprecation: Since writing this article the world has changed quite a lot.
  The need for native apps decreased much with the introduction of [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/).
  Nevertheless we still have [node-webkit (rebranded as NW.js)](https://nwjs.io/) around,
  but also other contenders joined the game.
  Nowadays we have [React Native](https://facebook.github.io/react-native/), [NativeScript](https://www.nativescript.org/) and possibly many other technologies.
---

![Screenshot of node-webkit on Windows](/article-assets/node-webkit-screen.png 'Screenshot of a hello world app created with node-webkit')

A few hours ago I found this project called [node-webkit](https://github.com/nwjs/nw.js).
It seems to be living and mature enough to use it. But since I don't need it now, I blog about it, so that I can remember it in the appropriate moment.

## How does it work?

1. Write your application.
2. Create a zip file of all your assets (call it package.nw).
3. You can just ship this file along with the node-webkit executable file
4. Alternatively you can create an executable file from the package with a few dll files along
5. If you want to have a single executable file, it's recommended to box the files with [Enigma Virtual Box](https://enigmaprotector.com/en/aboutvb.html)

## Attack of the contexts

There is a concept which might be a little crazy at first sight. There are different contexts with different global object for node modules and UI windows.
In the web context we have a `window` object (or many if we have multiple windows), which we don't have in a node module.
If we have to reach the window object of the current UI context, we have to pass it to the node module.
We get most of the problem with `instanceof` because the constructors like `Array` or `Date` are children of the context-dependent global object.
After just quickly building a "hello world" app I can't really tell to what extent this can be a problem or difficulty.

## Supported platforms

There are prebuilt binaries for Windows, OSX and Linux.

**References:**

- [Creating Desktop Applications With node-webkit](https://strongloop.com/strongblog/creating-desktop-applications-with-node-webkit/)
- [WebApp to DesktopApp with Node-Webkit](https://oldgeeksguide.github.io/presentations/html5devconf2013/wtod.html#/)
