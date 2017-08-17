# ICO to PNG

Convert an ICO file to a PNG file.

## Installation

```sh
npm install --save ico-to-png
```

## Usage

```js
const icoToPng = require('ico-to-png')
const fs = require('fs')

const source = fs.readFileSync('favicon.ico')

icoToPng(source, 128).then((png) => {
  console.log(png)
  //=> <Buffer 89 50 4e 47 0d 0a 1a 0a ... >
})
```

## API

### `icoToPng(source, size[, options]) => Promise<Buffer>`

Extracts an image of the requestsed size, and returns a Promise of the raw PNG data.

If no image of that exact size is present in the source file, a suitable larger image will be downsized to the requested size. If a larger image isn't present, the largest image will be returned.

This means that the the returned file could potentially be smaller than the requested size. If you always want exactly the size specified, pass the `scaleUp: true` to scale up the largest image, instead of returning it as is.
