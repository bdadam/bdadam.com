---
date: 2014-02-02 00:10
reviewedAt: 2019-09-14 02:00
title: Strong caching with NGINX
description: Enabling strong caching for assets is very important, here is an example how to do it with nginx for static files

tags:
  - nginx
  - caching
  - assets

abstract:
  Strong caching is very important nowadays since it can reduce page load times for the users
  (and eventually it can also reduce network transfer costs for the publishers).
  Here we see a simple example how to do it with NGINX for static files like CSS, JavaScript and images.
---

The essence of the solution is the following line which tells NGINX to send a `Cache-Control` header with the response.

```nginx
add_header Cache-Control "public, max-age=31536000, immutable";
```

This header tells the browser that the reponse can be cached for up to a year and does not need revalidation because it is `immutable`.  
This setting can live in the `location` section or in the `server` section of an nginx config file.

A more complete example would therefore look something like this:

```nginx
server {
    location ~* \.(?:ico|css|js|gif|jpe?g|png)$ {
        root /var/www/mysite;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
        break;
    }
}
```

After modifying the config file we want NGINX to reload the configs (e.g. on Ubuntu with `sudo service nginx reload`)

There are a few things to note:

- Setting max-age to one year (31536000 seconds) means that these resources can stay in the browser cache for up to one year.
- We turn off access logs here because these requests are most likely not so important to show up in logs. YMMV.
- When setting max-age to a long amount of time, we have to make sure that the requested resources really never change (e.g. with using some kind of cache busting or renaming the resources after every change).
- Setting the "Cache-Control" header to "public", which means that the resource "may be cached in public shared caches". (This rarely matters in the age of https.)
- Browsers nowadays have complicated heuristics about when to re-fetch a resource. Even setting max-age to one year is no guarantee that browsers will never fetch this resource again. Therefore we also add `immutable` to the `Cache-Control` header. This tells the browser that the resource will really not change. [See MDN for more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)

Have you already enabled strong caching for your asset files?

**Update:**
Maybe you noticed the lookahead in the regex.
It has a reason to be there: this way the regex engine doesn't create a capture group (no `$1`) so it has better performance.
