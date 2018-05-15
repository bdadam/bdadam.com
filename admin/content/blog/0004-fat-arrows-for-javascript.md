---
title: Fat arrows for JavaScript
description: 'LINQ and C# like lambda expressions are almost there in JavaScript.'
date: 2014-01-29T00:00:00.000Z
tags: []
published: true
---

I have to admit, I have completely overseen, that fat arrows ( => ) are coming to JavaScript. The syntax is much the same as in C#. This also means that LINQ is also on its way to the JavaScript world.

<!-- readmore -->

I have to say one thing I really like, when I'm working with C#, is LINQ and the lambda expressions. If you don't know what they are, here is an example:
```C#
var areThereAnySportsCars = cars.Where(x => x.HorsePower > 300 && x.Seats == 2).Any(y => y.Color == 'RED');
```

I think it's very easy to see what this expression does: it filters the `cars` array for cars which have more than 300 HP and exactly 2 seats,
then checks whether there are any red ones.

## How does it look like in JavaScript?
```JavaScript
var sportsCars = cars.where(x => x.horsePower > 300 && x.seats === 2).any(y => y.Color === 'RED');
```

Do you notice any differences (besides triple = signs and casing)? No there isn't.

## Where is the catch?
Unfortunately there is a catch:
Currently this syntax is only supported in Firefox.
Althought Firefox has been supporting it for more than a year now (almost two), its support is completely missing in Chrome.
But the syntax is in the <a href="http://wiki.ecmascript.org/doku.php?id=harmony:arrow_function_syntax" rel="external,nofollow">ES6 Draft</a>,
so we can hope that Google also decides to support it.

## More examples
```JavaScript
var sqaure = function(x) { return x * x; };
var squareNew = x => x * x;

var sum = function(a, b) {return a + b};
var sumNew = (a, b) => a + b;

domElement.addEventListener('click', function(event) { handleEvent(event.target); });
domElement.addEventListener('click', event => handleEvent(event.target));

[1,2,3].map(function(x) { return x + 1; });
[1,2,3].map(x => x + 1);
```

## What's `this`?
One of the most complicated things when teaching people JavaScript is to teach what is the value of `this`.
With fat arrows we get a function expression which has some limitations:
1. `this` is bound to the context, where you use the fat arrow
2. they cannot be used as a constructor (they throw an error)

Some examples:
```JavaScript
// With conventional function definitions
var obj = {
    logThis: function() {
        console.log(this); //this is obj
        var log = function() {
            console.log(this); //this is the global object (window)
        };

        log();
    }
};

myObj.logThis();
/*
This call logs:
Object { logThis=function() }
Window
*/

// With fat arrows
var obj = {
    logThis: function() {
        console.log(this); //this is obj
        var log = () => console.log(this); //this is also obj

        log();
    }
};

obj.logThis();
/*
This call logs:
Object { logThis=function() }
Object { logThis=function() }
*/

var X = a => a*3;

new X(); // TypeError: X is not a constructor
```

## OK - but where is LINQ?
There have always been many LINQ-like implementations in JavaScript. They usually simply take a function expression as a parameter,
so it's not a big deal to use fat arrows instead of conventional function expressions.
```JavaScript
var isThereAnySportsCar = cars.where(function(car) { return car.horsePower > 300; }).any(function(c) { return c.seats === 2; });

var isThereAnySportsCar = cars.where(car => car.horsePower > 300).any(c => c.seats === 2);
```

But LINQ is not just about the syntax. In LINQ every item of the original array goes through the whole pipeline, so that the original array is only iterated once.
In plain old JavaScript (ECMAScript 3) this was impossible. In ES6 generators are coming, which are solving this issue.
I'm not going to go into details now, lets have it for another blog post.

There is <a rel="external,nofollow" href="https://github.com/aaronpowell/linq-in-javascript/">one LINQ implementation</a> which I really like.
It's far awy from feature completeness, but it shows how it should be done.
