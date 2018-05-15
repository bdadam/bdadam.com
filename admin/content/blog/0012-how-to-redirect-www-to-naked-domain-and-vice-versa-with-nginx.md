---
title: How to redirect www to naked domain and vice versa with NGINX?
description: Redirection www to non-www and vice versa with NGINX
date: 2014-02-03T22:00:00.000Z
tags:
  - nginx
  - redirection
---

One thing almost every website needs is redirection. Many websites decide to serve their visitors both over www and non-www site, just in case the user types it into the browser. But for SEO it's bad, when you have the same site over two different domains. Here is, how to solve this issue with NGINX.

<!-- readmore -->

## Redirecting www to non-www with `if` statement

```nginx
server {
    listen 80;

    server_name www.example.com example.com;

    if ($host = 'www.example.com' ) {
        # redirecting www.example.com to example.com
        # path, query string are retained
        rewrite  ^/(.*)$  http://example.com/$1  permanent;
    }
}
```

Please note that `if` is <a href="http://wiki.nginx.org/IfIsEvil" rel="external,nofollow">considered evil</a> inside NGINX configuration,
but it is perfectly OK in this case. The official docs say, that there are two cases when `if` is "100% safe":
* redirect (our case)
* return

```nginx
if ($request_method = POST ) {
    return 405;
}
if ($args ~ post=140){
    rewrite ^ http://example.com/ permanent;
}
```

## Redirecting www to non-www without `if` statement
The trick in this case is that we have to define two server blocks.

```nginx
server {
    listen       80;
    server_name  www.example.com;

    # redirecting www.example.com to example.com
    # path, query string are retained
    return       301 http://example.com$request_uri;
}

server {
    listen       80;
    server_name  example.com;
    ...
}
```

## Redirecting non-www to www

```nginx
server {
    listen       80;
    server_name  example.com;

    # redirecting example.com to www.example.com
    # path, query string are retained
    return       301 http://www.example.com$request_uri;
}

server {
    listen       80;
    server_name  www.example.com;
    ...
}
```
