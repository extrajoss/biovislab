'use strict'

const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const handlers = []

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    let handler = require(path.join(__dirname, file))
    handlers.push(handler)
  })

module.exports = Object.assign(...handlers)
