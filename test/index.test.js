'use strict'

const mocha = require('mocha')
const assert = require('assert')
const priority = require('..')

const cases = [
  [ '*', '0,0,0,0,0,0' ],
  [ 'li', '0,0,0,0,1,0' ],
  [ 'li:first-line', '0,0,0,0,2,0' ],
  [ 'ul li', '0,0,0,0,2,0' ],
  [ 'ul ol + li', '0,0,0,0,3,0' ],
  [ 'h1 + *[rel=up]', '0,0,0,1,1,0' ],
  [ 'ul ol li.red', '0,0,0,1,3,0' ],
  [ 'li.red.level', '0,0,0,2,1,0' ],
  [ '#id', '0,0,1,0,0,0' ],
  [ 'body > h1', '0,0,0,0,2,0' ],
  [ 'button.button > i.icon', '0,0,0,2,2,0' ],
  [ 'button.button > i.icon:hover', '0,0,0,3,2,0' ],
  [ 'button.button > i.icon:before', '0,0,0,2,3,0' ],
  [ 'input[type="text"]:focus', '0,0,0,2,1,0' ],
]

describe('priority test', function () {
  it('should parse selector and get priority value', function () {
    // test opts
    let ret = priority.parse('*', {
      important: true,
      line: 11
    })
    assert.equal(ret.join(), '1,0,0,0,0,11')

    // test by cases
    cases.forEach(c => {
      let ret = priority.parse(c[0])

      assert.equal(ret.join(), c[1])
    })
  })

  it('shoule compare different priority values', function () {
    let arrays = [
      [0,1,0,0,0,0],
      [0,0,1,2,12,1],
      [1,1,0,0,0,0]
    ]

    arrays.sort((a, b) => {
      return priority.compare(a, b)
    })

    assert.equal(arrays[0].join(), '0,0,1,2,12,1')
    assert.equal(arrays[1].join(), '0,1,0,0,0,0')
  })
})
