# rollup-middleware

> [Rollup](http://rollupjs.org) is a next-generation ES6 module bundler

This is a simple express middleware to rebuild your bundles on request. It's intended for development! Use at least node v6.

## Installation

    $ npm i -D rollup-middleware

## Usage

```js
'use strict'

const app = express()
const opts = {
  rollup: {
    // This object is directly passed to rollup.rollup()
    // See https://github.com/rollup/rollup/wiki/JavaScript-API#rolluprollup-options-

    plugins: [ /* Pass your plugins */ ],
  },

  generate: {
    // This object is directly passed to rollup.generate()
    // See https://github.com/rollup/rollup/wiki/JavaScript-API#bundlegenerate-options-

    format: 'cjs'
  },

  // This is used as a prefix to look for entry files
  prefix: 'src',

  // Regex to serve only specific files
  grep: /\.js$/
}
app.use('/js', rollup(opts))
```
