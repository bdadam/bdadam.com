---
date: 2014-01-30
title: Serve - a practical command line webserver
description: A small and practical tool to simply serve static files
tags:
  - tool
  - webserver
  - command line

abstract: A few weeks ago I found a very amazing tool - it's called "serve".

needsupdate: true
---

## What can it do for you?

It can simply serve your files over `http://` protocol. Besides static files it supports jade templates, stylus and less.
I usually use it, when I need an ad-hoc web server, like when downloading some sources from github and I want to check out the examples.
They sometimes need a 'real web server', because of the limitations of the `file://` protocol.

## How to use it?

Install it the usual way with `npm install -g serve@1` and you should be fine.
Then just simply `cd` into the directory which you want to be able to access from `http://localhost` and run `serve`.
Default port is 3000 but, as many things, it's configurable.
That's it.

For more documentation visit the [github/serve](https://github.com/visionmedia/serve) project page.
