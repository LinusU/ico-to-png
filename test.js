/* eslint-env mocha */

const fs = require('fs')
const path = require('path')
const assert = require('assert')

const lodepng = require('lodepng')

const icoToPng = require('./')

function addTestCase (name, size, scaleUp, expectedSize) {
  const sourceData = fs.readFileSync(path.join(__dirname, 'fixtures', `${name}.ico`))
  const targetData = fs.readFileSync(path.join(__dirname, 'fixtures', `${name}-${expectedSize}.png`))

  it(`converts ${name}.ico to an ${expectedSize}x${expectedSize} image given size=${size} scaleUp=${scaleUp}`, async () => {
    const png = await icoToPng(sourceData, size, { scaleUp })
    assert(png instanceof Buffer, 'The extraced image is returned as a Buffer')

    const [actual, expected] = await Promise.all([lodepng.decode(png), lodepng.decode(targetData)])
    assert.deepStrictEqual(actual, expected, 'The extraced image should match the target')
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
