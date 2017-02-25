'use strict'

// rank algorithm
// -----------------
// a. style attribte
// b. ID attribute (size)
// c. attributes + pseudo-class (size)
// d. element + pseudo-element (size)
// e. position of selector

// CSS Rule Node
// --------------
// Rule {
//   text: String,
//   priority: Array,   // [a, b, c, d]
//   line: Number,
//   declarions: [
//      Declarion
//   ]
// }
//
// Declarion {
//   name: String,
//   value: String,
//   important: Boolean
// }

const TOKEN_ID = /(#[\w-]+)/g
const TOKEN_CLASS = /(\.[\w-]+)/g
const TOKEN_ATTR = /(\[[^[\]]+])/g
const TOKEN_PSEUDO_CLASS = /(:[\w-]+)/g
const TOKEN_PSEUDO_ELEM = /(::[\w-]+)/g
const TOKEN_ELEM = /([\w-]+)/g

const PSEUDO_ELEMS = [
  'first-letter',
  'last-letter',
  'first-line',
  'last-line',
  'first-child',
  'last-child',
  'before',
  'after'
]

const SYMBOL_B = '\x02'
const SYMBOL_C = '\x03'
const SYMBOL_D = '\x04'

function compare (a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i]
    }
  }

  return 0
}

/**
 * parse then priority of selector (CSS Rule)
 * @param  {String} selector css selector
 * @param  {Object} opts
 *  - {Boolean} opts.important is current rule important
 *  - {Number} opts.line line number of css rule
 * @return {Array} array that contains 6 priority number
 */
function parse (selector, opts) {
  opts = opts || {}

  // priority: [ important, style, R1, R2, R3, line ]
  let important = opts.important ? 1 : 0
  let line = opts.line || 0
  let priority = [important, 0, 0, 0, 0, line]

  selector = selector.replace(/(::?)([\w-]+)/g, (total, left, elem) => {
    if (PSEUDO_ELEMS.indexOf(elem) >= 0) {
      if (left === ':') {
        return '::' + elem
      } else {
        return total
      }
    } else {
      return total
    }
  })

  // replace with symbols
  selector = selector
    .replace(TOKEN_ATTR, SYMBOL_C)
    .replace(TOKEN_PSEUDO_ELEM, SYMBOL_D)
    .replace(TOKEN_PSEUDO_CLASS, SYMBOL_C)
    .replace(TOKEN_ID, SYMBOL_B)
    .replace(TOKEN_CLASS, SYMBOL_C)
    .replace(TOKEN_ELEM, SYMBOL_D)

  // count
  selector = selector.replace(/[\2\3\4]/g, (symbol) => {
    let idx = symbol.charCodeAt(0)

    priority[idx] ++

    return '<' + idx + '>'
  })

  return priority
}

module.exports = {
  parse,
  compare
}
