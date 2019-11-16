const lodepng = require('lodepng')
const decodeIco = require('decode-ico')
const resizeImageData = require('resize-image-data')

function toPng (image) {
  return (image.type === 'png')
    ? Promise.resolve(Buffer.from(image.data.buffer, image.data.byteLength, image.data.byteOffset))
    : lodepng.encode(image)
}

function toImageData (image) {
  return (image.type === 'png')
    ? lodepng.decode(image.data)
    : Promise.resolve(image)
}

module.exports = function icoToPng (source, size, options) {
  options = Object.assign({ scaleUp: false }, options)

  const images = decodeIco(source)

  for (const image of images) {
    image.score = 0

    // Bonus point for exact size match
    if (image.width === size) image.score++

    // Bonus point for larger images than target
    if (image.width >= size) image.score++

    // Bonus point if target is multiplier of image
    if (image.width % size === 0) image.score++

    // Higher score for larger image
    image.score += 1 - (1 / image.width)
  }

  const bestImage = images.reduce((a, b) => {
    return (a.score >= b.score ? a : b)
  })

  // Perfect match
  if (bestImage.width === size) {
    return toPng(bestImage)
  }

  // Largest image is too small, but we don't want to scale it up
  if (bestImage.width < size && !options.scaleUp) {
    return toPng(bestImage)
  }

  // Resize the image to match target size
  return toImageData(bestImage).then((image) => {
    return toPng(resizeImageData(image, size, size))
  })
}
