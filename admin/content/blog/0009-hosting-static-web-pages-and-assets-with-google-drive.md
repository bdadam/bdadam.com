---
title: Hosting static web pages and assets with Google Drive
description: >-
  Google Drive officially supports hosting static content with hotlinking
  capabilities
date: 2014-02-02T13:10:00.000Z
tags:
  - google drive
  - hosting
---

Have you ever needed to quickly deploy a website somewhere? Maybe to show a client some demo content? Or to show a buddy your newest static web app? Here's the solution.

<!-- readmore -->

Google Drive officially supports hosting static files (like web pages and their assets).
According to a discussion on Stack Exchange it doesn't violate the TOC when hotlinking these resources (free CDN?).

## Here is what to do:
1. Create a new folder in Google Drive
1. Change its visibility options to: "Public on the web"
1. Upload your files (html, css, js, images, swf, etc.)
1. It's recommended to place an index.html file into the folder, which will be the default document in the directory
1. Grab the URL of your folder (currently shown on the right under "HOSTING" when you select your newly created folder)
1. There you go, just enter this URL into the browser. It should be something like `https://googledrive.com/host/12345678901234567890abcd/`
1. You should be able to reference files directly inside that folder, e.g. `https://googledrive.com/host/12345678901234567890abcd/css/main.min.css`


*Please note that this method is really meant to host static files. There is no support for backend code.*

###Resources
* <a href="https://support.google.com/drive/answer/2881970?hl=en" rel="external,nofollow">Official Google Drive documentation (little bit obsolete)</a>
* <a href="http://webapps.stackexchange.com/questions/27142/google-drive-image-hotlinking" rel="external,nofollow">Stack Exchange discussion</a>
