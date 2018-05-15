---
title: Strong caching with NGINX
description: >-
  Enabling strong caching for assets is very important, here is an example how
  to do it with nginx for static files
date: 2014-02-01T23:10:00.000Z
tags:
  - nginx
  - caching
published: true
---

Strong caching is very important nowadays since it can reduce page load times for the users (and eventually it can also reduce network transfer costs for the publishers). Here we see a simple example how to do it with NGINX for static files like css, JavaScript and images.

<!-- readmore -->

```nginx
server {
    location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
        root /var/www/mysite;
        expires max;
        add_header Cache-Control "public";
        access_log off;
        break;
    }
}
```

Of course after modifying the config file we have to reload the configs (e. g. on Ubuntu we have to type `sudo /etc/init.d/nginx reload`)

There are a few things to note here:
* we set the "expires" header to max age, which means these resources can stay in the browser cache 'forever'
* we are setting the "Cache-Control" header to "public", which means that the resource "may be cached in public shared caches"
* we turn off access logging here, because these requests are in many cases not that important
* if you set expiration to max-age, you have to be sure that the requested resources really never change (some kind of cache busting)
* these settings can live in the `location` section or in the `server` section of an nginx config file

Have you already enabled strong caching for your asset files?

** Update:**
Maybe you noticed the lookahead in the regex.
It has a reason to be there: this way the regex engine doesn't create a capture group (no $1) so it has better performance.
