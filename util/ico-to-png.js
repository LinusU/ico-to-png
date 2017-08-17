const icoToPng = require('../')
const fs = require('fs')

const source = process.argv[2]
const size = Number(process.argv[3])
const target = process.argv[4]

Promise.resolve()
  .then(() => {
    console.log('Reading source ICO')
    return fs.readFileSync(source)
  })
  .then((data) => {
    console.log('Converting ICO to PNG')
    return icoToPng(data, size, { resize: true })
  })
  .then((png) => {
    console.log('Writing target PNG')
    fs.writeFileSync(target, png)
  })
  .catch((err) => {
    process.exitCode = 1
    console.error(err.stack)
  })
