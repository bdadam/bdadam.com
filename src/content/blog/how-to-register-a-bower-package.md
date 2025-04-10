---
date: 2014-02-03
title: How to register a bower package
description: A few weeks ago I registered my first package with bower. Here is what I did.
tags:
  - bower
  - javascript

abstract:
  A few weeks ago I posted about my [PubSub module](https://bdadam.com/blog/a-simple-pubsub-module-in-javascript/).
  Since then I registered it as a bower package. It was actually my first bower package. I am going to show you how easy it was.

deprecation: Please note that the [usage of bower is not recommended anymore](https://snyk.io/blog/bower-is-dead/).
---

Installing bower is as simple as typing `npm install -g bower`.
If you don't know bower, here is what the [docs say](https://github.com/bower/bower) about it:

> Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack. There are no system wide dependencies, no dependencies are shared between different apps, and the dependency tree is flat.

### Requirements for a bower package:

- The package sources should be hosted in a git repository
- Each package has to have a JSON manifest
- Using [semver](https://semver.org/) git tags

## Registration steps

1. Generate a JSON manifest with `bower init`. During the process we have to answer some questions.
2. Check the generated `bower.json` file and fill in the missing parts if needed (e.g. dependecies, keywords, author, etc.)
3. Commit the json file and set a semver tag with `git tag -a v1.0.0 -m 'my version 1.0.0'`
4. Register your package with calling `bower register packageName git://packageRepository-url`
5. When everything goes fine, the package should be registered now

At the end of the process everybody should be able to install your package with `bower install packageName`.
For a more detailed example you can take a look at my [PubSub package](https://github.com/bdadam/PubSub).
