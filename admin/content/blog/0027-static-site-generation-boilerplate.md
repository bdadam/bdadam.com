---
title: Boilerplate for static site generation
description: >-
  Boilerplate code for generating static websites with node.js, GruntJS and
  Assembe.
date: 2014-03-25T22:30:00.000Z
tags:
  - static website
  - boilerplate
published: true
---

As I already mentioned before, I really like simple things like static webpages. To speed things up, I created a boilerplate, which can be used by anybody to generate static websites.

<!-- readmore -->

[This blog is also statically generated.](/blog/why-i-chose-a-statically-generated-website.html)
Statically generating websites has many advantages. Some of these are
1. These sites can be hosted everywhere
1. No backend to be hacked
1. Outstanding performance
1. etc.

The boilerplate code can be found on GitHub: [bdadam/static-site-boilerplate](https://github.com/bdadam/static-site-boilerplate)

## What can this boilerplate do for you?
1. It generates html from markdown files with the help of [Assemble](http://assemble.io/).
1. It generates minified and optimized css file(s) with less and uncss
1. It generates minified and optimized JavaScript files with RequireJS
1. During development the affected files are regenerated when something changes (GruntJS watch task)
1. Local webserver with Livereload to immediately see what changes and what does it look like

## How to use it?
1. Clone this repository `git clone https://github.com/bdadam/static-site-boilerplate`
1. Install node dependencies `npm install`
1. Install bower dependencies `bower install`
1. Simply run `grunt build` to see that everything works
1. Run `grunt` for starting "development mode"
1. Then edit some files in the `content` folder and watch the html being regenerated and automatically refreshed in the browser

## What is planned for future releases?
1. Automatically running JavaScript unit tests with Jasmine
1. Supporting `browserify` for building JavaScript files
1. Adding some Handlebars helpers
1. Maybe some more partials and templates
1. Some real examples where you can see it in action


**I would be glad to hear your feedback in the comments.**
