interface Options {
  scaleUp?: boolean
}

declare function icoToPng (source: Buffer, size: number, options?: Options): Promise<Buffer>

export = icoToPng
