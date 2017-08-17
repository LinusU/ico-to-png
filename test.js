/* eslint-env mocha */

'use strict'

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const lodepng = require('lodepng')

const icoToPng = require('./')

function assertImagesEqual (actual, expected) {
  Promise.all([
    lodepng.decode(actual),
    lodepng.decode(expected)
  ]).then((images) => {
    assert.strictEqual(images[0].width, images[1].width, 'The extracted image width should match the target')
    assert.strictEqual(images[0].height, images[1].height, 'The extracted image height should match the target')
    assert.ok(Buffer.compare(images[0].data, images[1].data) === 0, 'The extracted image data should match the target')
  })
}

function addTestCase (name, size, scaleUp, expectedSize) {
  const sourceData = fs.readFileSync(path.join(__dirname, 'fixtures', `${name}.ico`))
  const targetData = fs.readFileSync(path.join(__dirname, 'fixtures', `${name}-${expectedSize}.png`))

  it(`converts ${name}.ico to an ${expectedSize}x${expectedSize} image given size=${size} scaleUp=${scaleUp}`, () => {
    return icoToPng(sourceData, size, { scaleUp }).then((png) => {
      return assertImagesEqual(png, targetData)
    })
  })
}

describe('ICO to PNG', () => {
  // Scaling up
  addTestCase('github', 16, true, 16)
  addTestCase('github', 24, true, 24)
  addTestCase('github', 32, true, 32)
  addTestCase('github', 48, true, 48)

  // Not scaling up
  addTestCase('github', 16, false, 16)
  addTestCase('github', 24, false, 24)
  addTestCase('github', 32, false, 32)
  addTestCase('github', 48, false, 32)
})
