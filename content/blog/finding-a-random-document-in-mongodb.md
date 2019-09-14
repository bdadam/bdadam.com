---
date: 2014-02-15 23:00
title: Finding a random document in MongoDB (with benchmarks)
description: Some tricks for retrieving a random element from a collection using MongoDB - with benchmarks.
tags:
  - mongodb
  - random

abstract: Finding a random element is not a trivial task when using MongoDB - especially when performance is crutial.
---

## Finding one random document - Method 1

1. First of all you have to count how many documents you have in the collection.
   Optionally you can provide a filter condition (query).

   `N = db.myCollection.count(query)`

1. Then you have to generate a random number which is less than the number you counted before.

   `R = Math.floor(Math.random() * N)`

1. Then skip that many records and retrieve the next one.
   If you provided a query at the first step, here you have to use it as well.

   `db.collection.find(query).limit(1).skip(R))`

### Let's see an example

```js
var query = { state: 'OK' };
var n = db.myCollection.count(query);
var r = Math.floor(Math.random() * n);
var randomElement = db.myCollection
  .find(query)
  .limit(1)
  .skip(r);
```

### Pro:

The data can be intact, no preparation is needed.

### Con:

- This one is the slowest method.
  But this approach may still be OK, depending on the case. It definitely has tradeoffs when the collection has a large amount of documents:
  The `skip` command has to scan at least `R` number of documents.
  If the number of documents retrieved by the query is large, the random number `R` is also going to be large.

## Finding one random document - Method 2

For this method to work, the data has too meet some constraints:

- Each document should have a field with a random number, e.g. when saving `db.myCollection.save({ name: 'name', ..., rnd: Math.random() })`
- The collection should have an index on this field, e.g. `db.myCollection.ensureIndex({ rnd: 1 })`

When the data is all set up, querying is rather easy:

```js
var query = {
  state: 'OK',
  rnd: {
    $gte: Math.random(),
  },
};

var randomElement = db.myCollection.findOne({
  $query: query,
  $orderby: { rnd: 1 },
});
```

### Pro:

- Not having to skip any document.

### Con:

- Data has to have field with a random number stored in it
- This random field should also have an index
- Sorting reduces performance

## Finding one random document - Method 2.5

There is a simpler variant of the second method. It doesn't retrieve a truly random document, but it may be enough for the specific case.

```js
var query = {
  state: 'OK',
  rnd: {
    $gte: Math.random(),
  },
};

var randomElement = db.myCollection.findOne(query);
```

Please note that there is no `$orderby`. This can improve performance. The price is that documents are sorted in "find order" rather than "random order".
But this could be fine in many cases.

### Pro:

- Not having to skip any document
- Performance

### Con:

- Not truly random document
- Data has to have a field with a random number stored in it
- This field also should have an index

## Benchmarks

I created a very simple benchmark. The setup looks like this:

```js
var i = 1000000;
while (i) {
  db.test.save({
    name: 'some lorem ipsum not important',
    rnd: Math.random(),
  });
  i--;
}
db.test.ensureIndex({ rnd: 1 });
```

Then I ran all the three methods on my computer with a local database, 10000 times each.

```js
var startDate = new Date();
var i = 10000;
while (i) {
  var n = db.test.count();
  var r = Math.floor(Math.random() * n);
  var randomElement = db.test
    .find()
    .limit(1)
    .skip(r);
  i--;
}
var t1 = new Date() - startDate;

var startDate = new Date();
var i = 10000;
while (i) {
  var query = {
    rnd: {
      $gte: Math.random(),
    },
  };

  var randomElement = db.myCollection.findOne({
    $query: query,
    $orderby: { rnd: 1 },
  });
  i--;
}
var t2 = new Date() - startDate;

var startDate = new Date();
var i = 10000;
while (i) {
  var query = {
    rnd: {
      $gte: Math.random(),
    },
  };

  var randomElement = db.myCollection.findOne(query);
  i--;
}
var t3 = new Date() - startDate;

print(t1, t2, t3);
```

## And the winner is "Method 2.5"

Here are my benchmark results:

| Method     | Time for 10,000 runs (seconds) |
| :--------- | -----------------------------: |
| Method 2.5 |                          2.234 |
| Method 2   |                          2.297 |
| Method 1   |                          2.813 |

Although the differences are not quite big, the winner is definitely "Method 2.5".
I think, when using more realistic data, the differences are also going to be much larger.

Do you have your own benchmark results with different data? Please feel free to comment it.
