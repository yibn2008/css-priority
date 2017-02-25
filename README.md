# css-priority

calculate priority of css selector/rule

## priority

We use `Array(6)` to store the priority value:

```js
// rank algorithm
// -----------------
// a. important mark
// b. style attribte
// c. ID attribute (size)
// d. attributes + pseudo-class (size)
// e. element + pseudo-element (size)
// f. position of selector
var priority = [a, b, c, d, e, f]
```

## Usage

calculate priority of selector (with rule info):

```
var priority = require('css-priority')

// output: [0, 0, 0, 0, 0, 12]
priority.parse('*', {
  line: 12
})

// output: [1, 0, 0, 2, 3, 88]
priority.parse('button.button > i.icon:before', {
  important: true,
  line: 88
})
```

Compare selectors:

```js
var priority = require('css-priority')

var selectors = [
  '*'
  'li'
  'li:first-line'
  'ul li'
  'ul ol + li'
  'h1 + *[rel=up]'
  'ul ol li.red'
  'li.red.level'
]
var cache = {}

selectors.sort(function (a, b) {
  var calcA = cache[a] || (cache[a] = priority.parse(a))
  var calcB = cache[b] || (cache[b] = priority.parse(b))

  return priority.compare(a, b)
})
```

## API

### `priority.parse(selector, opts)`

- selector: *{String}* css selector
- opts: *{Object}* rule info
  - opts.important: *{Boolean}* important mark
  - opts.line: *{Number}* line number

parse css selector with rule info, and return `Array(6)` of priority

### `priority.compare(array1, array2)`

- array1: *{Array}*
- array2: *{Array}*

Compare different priority array

## LICENSE

MIT
