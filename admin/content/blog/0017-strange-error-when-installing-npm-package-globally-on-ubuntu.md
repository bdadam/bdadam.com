---
title: Strange error when installing npm package globally on Ubuntu
description: >-
  I ran into some problems when I tried to install the pm2 package globally on
  Ubuntu. Using the unsafe-perm flag solved the problem.
date: 2014-02-10T22:00:00.000Z
tags:
  - npm
  - ubuntu
  - node.js
---

Installing modules globally has never been a problem for me, neither on Windows nor on Ubuntu. At least until today, when I ran into a somewhat strange problem.

<!-- readmore -->

I tried to install the pm2 package on an Ubuntu 12.04 Server (`sudo npm install -g pm2@latest`),
but the package just didn't want to install correctly.
I kept getting gyp error messages and this one: "OSError: [Errno 13] Permission denied".
I thought it was impossible to get this error since I was running the install command as root (sudo).

## Installing modules with the unsafe-perm flag
And after a while I found the solution: using the unsafe-perm flag.
```sudo npm install -g pm2@latest --unsafe-perm```

What the docs say about this flag:

>If npm was invoked with root privileges, then it will change the uid to the user account or uid specified by the user config, which defaults to nobody.
>Set the unsafe-perm flag to run scripts with root privileges.

*And it worked for me like a charm!*

Honestly, I have to admit, that it is not 100% clear to me, why it made any difference in this case.
I suspect that it was because of gyp. Does anybody maybe have a better explanation?
