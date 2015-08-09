var through = require('through2')
  , file = require('utilise.file')
  , resolve = require('path').resolve

module.exports = function () {
  return through(function (buf, enc, next) {
    this.push(
      buf
        .toString('utf8')
        .replace(/file\((.*?)\)/g, function($0, $1){ 
          return '"' + file(resolve($1.replace(/'/g, ''))).replace(/\n/g, '\\n').replace(/\r/g, '') + '"'
        }) 
    )
    next()
  })
}