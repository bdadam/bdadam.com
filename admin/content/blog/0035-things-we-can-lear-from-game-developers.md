---
title: Things we can learn from game developers
description: ''
date: 2014-11-09T20:00:00.000Z
tags:
  - game
  - jankfree
---



<!-- readmore -->

Blah

1. 
1. Performance Budget (60fps rendering)
1. Data Oriented Design
    1. Entity Component System
1. Behavior Tree
1. Playtesting


## Data Oriented Programming

Resources:
* [What is Data-Oriented Game Engine Design?](http://gamedevelopment.tutsplus.com/articles/what-is-data-oriented-game-engine-design--cms-21052)
* [What is data oriented design? - Stack Overflow](http://stackoverflow.com/a/2021868)


## Performance Budget
Today's websites have a lot of animations, shadows, 3D transformations and other pretty effects.
Rendering all these visual effects need time, because of the many complex calculations behind them.
Also GPUs get utilized for this task.

What our users need is 60fps rendering, because most consumer monitors are running with 60Hz refresh rate. What does it mean for web developers?
Each frame must be painted in about 16ms. Maybe a half of this time is needed by the browser to paint.
This means that our code must not need more the 7-8ms to render a frame.


More resources:
* [JankFree](http://jankfree.org/)
* [Pixels are expensive - Aerotwist](http://aerotwist.com/blog/pixels-are-expensive/)
* [Making a 60fps Mobile App](http://aerotwist.com/blog/making-a-60fps-mobile-app/)


## Playtesting
Creating new websites (or web applications) is almost like creating new games.
Both a game and a website have:
* user experience
* some kind of core mechanics which is more or less new to the target audience at first sight
* if users like it they use it more often or longer

When creating a website it is very important for the developer to get feedback from the users.
Will they understand the concept? Do they find what they want? Where do they look for the features? What do they miss?
Is a feature obvious for them or do they need some tutorial?

[The Playtesting Bible](http://mentalblockgaming.com/blog/game-design/the-playtesting-bible-a-guide-for-game-developers/) has some very good points about playtesting games.
All of these points are absolutely valid for usertesting websites.
