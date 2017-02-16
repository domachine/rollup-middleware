'use strict'

const express = require('express')

const rollup = require('.')

const app = express()
const opts = {
  prefix: 'test',
  rollup: {
    plugins: [
      require('rollup-plugin-node-resolve')(),
      require('rollup-plugin-commonjs')(),
      require('rollup-plugin-replace')({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  },
  generate: {
    format: 'iife'
  }
}
app.use(rollup(opts))
app.listen(3000, () => console.error('listening ...'))
