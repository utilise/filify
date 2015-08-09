var through = require('through2')
  , file = require('utilise.file')
  , resolve = require('path').resolve
  , dirname = require('path').dirname

module.exports = function (path) {
  return through(function (buf, enc, next) {
    this.push(
      buf
        .toString('utf8')
        .replace(/file\((.*?)\)/g, function($0, $1){ 
          var resolved = eval($1
            .replace('__dirname', '"' + dirname(path).replace(/\\/g, '\\\\') + '"'))
          
          return '"' + file(resolve(resolved)).replace(/\n/g, '\\n').replace(/\r/g, '') + '"'
        }) 
    )
    next()
  })
}