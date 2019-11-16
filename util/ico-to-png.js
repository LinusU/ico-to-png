#!/usr/bin/env node

const icoToPng = require('../')
const fs = require('fs')

const source = process.argv[2]
const size = Number(process.argv[3])
const target = process.argv[4]

async function main () {
  console.log('Reading source ICO')
  const data = fs.readFileSync(source)

  console.log('Converting ICO to PNG')
  const png = await icoToPng(data, size, { scaleUp: true })

  console.log('Writing target PNG')
  fs.writeFileSync(target, png)
}

main().catch((err) => {
  process.exitCode = 1
  console.error(err.stack)
})
