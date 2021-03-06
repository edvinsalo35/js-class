## Generators
{title: true}

## Why?

## Custom iterators

- potentially infinite
- over your own data-structures

## Asynchronicity

- very powerful for creating flow control

## Iterators

```javascript
// over arrays
for(const v of values) {
}
for(const [index, v] of values.entries()) {
}

// over maps
for(const [k,v] of map.entries()) {
}
```

## Write your own!

```javascript
function *objectProperties(object) {
  const keys = Object.keys(object);
  for(const key of keys) {
    yield [key, object[key]];
  }
}

for(const [k, v] of objectProperties({a: 1, b: 2, c: 3})) {
  console.log(k, v);
}
```

## Woah!

## Baby steps: `*`

```javascript
// the '*' means we're a generator function
function *objectProperties(object) {
  // ...
}
```

## Baby steps: `yield`

```javascript
function *abc() {
  // yield returns a value to the caller (for ... of above)
  yield "a";
  yield "b";
  yield "c";
}
```

## Two gotchas


## Gotcha 1

```javascript

logLast([1,2,3,4])

function *logLast(xs) {
  console.log(xs[xs.length - 1]);
}
```

<ul>
  <li class='fragment'>Calling a generator function creates, not starts, a generator</li>
  <li class='fragment'>It's only via iterating it we can start it</li>
</ul>

## Gotcha 1

- Generator functions *return* a generator
- The function body is run only via iteration (manual or `for ... of`)


## Gotcha 2

```javascript

for(const k in reverse([1,2,3,4])) {
  // never gets here! why?
  console.log(k);
}

function *reverse(xs) {
  for(var i = xs.length; i--;) {
    yield xs[i];
  }
}
```

<ul>
  <li class='fragment'>How are we looping over our generator?</li>
  <li class='fragment'>Generator objects have only prototype properties! i.e <code>{}</code></li>
</ul>

## Gotcha 2: Only `for ... of`, `in` will NOT work


## Let's try!
{exercise:true}

    Exercise 1

    exercises/generators

<!-- TODO generator API -->


## Asynchronicity

## Callbacks

```javascript
function cat(pathA, pathB, cb) {
  fs.readFile(pathA, function(err, fileA) {
    if(err) return cb(err);

    fs.readFile(pathB, function(err, fileB) {
      if(err) return cb(err);

      combine(fileA, fileB, cb);
    });
  })
}
```

## Promises

```javascript
function cat(pathA, pathB) {
  return Promise.all([
    fs.readFileAsync(pathA),
    fs.readFileAsync(pathB),
  ]).then([fileA, fileB]) => {
    return combine(fileA, fileB);  
  });
}
```

## But... can we do better?

## Yes!

```javascript
import co from "co";

co(function *cat() {
  const fileA = yield fs.readFileAsync(pathA);
  const fileB = yield fs.readFileAsync(pathB);

  return combine(fileA, fileB);
})
.then(function(combined) {
  console.log(combined);
}); 
```

## OMG!
{notitle: true}

![yay](media/yay.png)

## What's going on?

## Promise enabled

- when we `yield` a promise, co will call `.next` after the promise resolves

## Writing methods

```javascript
import co from "co";

const cat = co.wrap(function *cat(pathA, pathB) {
  const readingA = fs.readFileAsync(pathA);

  yield fs.readFileAsync(pathB);
  const fileA = yield readingA;

  return combine(fileA, fileB);
});

// files contain upper case words
cat("./one", "./two")
.then(function(combined) {
  // ONETWO
  console.log(combined);
}); 
```

## Parallel

```javascript
import co from "co";

co(function *cat() {
  // don't yield yet...
  const readingA = fs.readFileAsync(pathA);

  // ...until we've started the other tasks
  // to run in parallel
  const fileB = yield fs.readFileAsync(pathB);
  const fileA = yield readingA;

  return combine(fileA, fileB);
})
```

## Let's try!
{exercise:true}

  Exercise 3

  exercise/generators

    

