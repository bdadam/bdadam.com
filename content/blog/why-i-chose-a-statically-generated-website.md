---
date: 2014-01-26
title: Why I chose to statically generate my website
description: Advantages and disadvantages of statically generated websites
tags:
  - blogging
  - static website
  - assemble
  - grunt

abstract:
  I was long searching for the perfect blog engine for this site. More precisely I was planning to build a blog engine myself.
  I wanted to keep it simple, so I didn't want to use something overkill like Wordpress or Drupal. And I also like to code.
  But then I realised I don't really need to do this. Building a blog engine is boring, time consuming and so on. So I had to find a simpler alternative.

needsupdate: true
---

## What did I need?

I wanted to have a website where I can show, who I am. I also wanted to write some articles and then publish them.
I wanted to have some sort of statistics about my users. That's all, not that much.

## Lets take a look at what I was planning

I knew I wanted to have some static pages like 'about me', 'contact' and some dynamic pages like blog posts. So I need a database, right?
Lets get one instance at <a href="http://mongolab.com" rel="external,nofollow">MongoLab</a>.

Then I was sure I need some continuous integration (CI) environment and a LIVE environment. That was fine, since I already have a web server.
So I knew I wanted to write and edit my articles. So I need a 'members area', with an editor, with https connection and authentication?
Then I thought it's too much for this small site. Lets look for something smaller.

## First I found markdown again

I always knew that markdown is very convenient (at least for a coder). Then I came across <a href="http://stackedit.io" rel="external,nofollow">stackedit.io</a>.
It the best markdown editor I have ever seen. Maybe better then a plain text editor.
So I was sure I wanted to write my articles in markdown. So I don't need to have an editor myself, Stackedit does the job for me.

## I remembered I saw something

This thing was called <a href="http://wintersmith.io/" rel="external,nofollow">Wintersmith</a>. A static website generator for node.js.
Unfortunately written in CoffeeScript. What a shame. But I started to use it. It was almost working but I didn't like it.

So I was looking for alternatives. And then I found <a href="http://assemble.io">Assemble</a>.
It is also a static website generator, actually a GruntJS task. But I liked it better and for templating it uses handlebars instead of Jade.

## Here I am now

Now I am using Assemble to generate my site. But I am not absolutely happy with it. I am missing some features, which I'm going to need in a few weeks.
Therefore I think I will build my own static website generator.

## What are the benefits of statically generating this site?

1. It's fast. Every page is generated once on my desktop computer and then hosting is cheap and easy. No more surprises when a blog post accidentally hits the top of Hackernews.
1. Deployment is also very easy. I just have to copy some files over SCP and that's it.
1. Less things can be hacked. :)
1. No need for caching. Almost every web-server does this for us out of the box.
1. In the end less things can go wrong.

## There are also some tradeoffs

Editing and publishing is definitely more complex than just hitting a button called "Publish". I cannot do them conveniently over my smart phone, I need my laptop.

## How does my workflow look like?

1. I write my article in markdown.
1. I (re)generate the html files.
1. Then I push the changes to <a href="http://github.com/bdadam/bdadam.com" rel="external,nofollow">my code repository</a>
1. At last I copy the files to my webserver and check whether everything is fine. That's all.

## Why is my code repository publicly available on GitHub?

1. I don't need to hide it in a private repository, since every page in this blog is public.
1. It is a good example for others who are also using (or planning to use) Assemble and are looking for some examples.
1. It doesn't cost a thing.

So I think this is the best for my tiny blog. But I am not affraid of changes. I definitely will change everything.

Do you also like static site generation?
