---
date: 2014-03-11 23:00
title: Automatically loading Grunt tasks with matchdep
description: Matchdep is a handy tool for filtering dependencies in node.js projects
tags:
  - javascript
  - node.js
  - grunt

abstract:
  Have you ever installed a new GruntJS-plugin and then forgotten to load it as a task in the gruntfile.js?
  Matchdep is a handy tool, which can solve this issue.
---

## What is matchdep?

Matchdep is a tool which can filter node.js dependencies, which are in the `package.json` file.

Installing it is very easy: `npm install --save matchdep`

## Automatically loading GruntJS tasks

```js
require('matchdep')
  .filterDev('grunt-*')
  .forEach(grunt.loadNpmTasks);
```

What we are doing here is: basically reading all (dev)dependencies from the `package.json` and filtering those out which begin with 'grunt-'.
These are tasks like all Grunt contrib tasks (`grunt-contrib-concat`, `grunt-contrib-less`, `grunt-contrib-copy`, etc.)
and other Grunt specific tasks (like `grunt-browserify` or `grunt-hashres`).
After filtering we load them as tasks.

## What can `matchdep` be used for besides loading Grunt tasks?

Honestly I must say, I have no idea. But this is still pretty cool, that we don't have to include each grunt plugin individually.
