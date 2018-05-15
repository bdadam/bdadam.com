---
title: Comparison helper for Handlebars.js
description: >-
  A useful Handlebars helper to compare to variables almost like in plain
  JavaScript
date: 2014-02-13T22:00:00.000Z
tags:
  - javascript
  - templating
  - handlebars
---

Personally, I was always missing some sort of comparison helper in Handlebars.js. I know, I know, it's sort of being against the philosophy of Handlebars - being logicless. But I still wanted to have it.

<!-- readmore -->

## Comparing two variables almost like in plain JavaScript
Thankfully I found a similar <a href="http://stackoverflow.com/a/16315366/2374649" rel="external,nofollow">question on Stack and a superb answer from a user called Jim</a>.

```JavaScript
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});
```

Here is how one would use it:
```html
\{{#ifCond value "===" value2}}
    Values are equal!
\{{else}}
    Values are different!
\{{/ifCond}}
```

## Update
As Eugene Mirotin pointed out, this solution could be much DRYer, so here is an improved variant of the code which does the same thing:
```JavaScript
(function() {
    function checkCondition(v1, operator, v2) {
        switch(operator) {
            case '==':
                return (v1 == v2);
            case '===':
                return (v1 === v2);
            case '!==':
                return (v1 !== v2);
            case '<':
                return (v1 < v2);
            case '<=':
                return (v1 <= v2);
            case '>':
                return (v1 > v2);
            case '>=':
                return (v1 >= v2);
            case '&&':
                return (v1 && v2);
            case '||':
                return (v1 || v2);
            default:
                return false;
        }
    }

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        return checkCondition(v1, operator, v2)
                    ? options.fn(this)
                    : options.inverse(this);
    });
}());
```
