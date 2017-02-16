'use strict'

const { join, relative, resolve } = require('path')
const Rollup = require('rollup')

module.exports = ({ rollup = {}, generate = {}, prefix = '.' }) => {
  let caches = {}
  return (req, res, next = () => {}) => {
    const cache = caches[req.path]
    const ropts = Object.assign({}, rollup, {
      cache,
      entry: join(prefix, req.path)
    })
    Rollup.rollup(ropts).then(bundle => {
      const result = bundle.generate(generate)
      caches[req.path] = bundle
      res.setHeader('Content-Type', 'text/javascript')
      res.end(result.code)
    }, err => {
      if (err.code === 'PARSE_ERROR') {
        console.error(
          '%s:%d:%d: %s',
          relative(resolve(process.cwd(), prefix), err.loc.file),
          err.loc.line,
          err.loc.column,
          err.message
        )
        console.error()
        console.error(err.frame)
        console.error()
        res.writeHead(500)
        res.end()
      } else if (err.code === 'UNRESOLVED_ENTRY') {
        // Pass 404s on to the next middleware
        next()
      } else {
        next(err)
      }
    })
  }
}
