var through = require('through2')
  , file = require('utilise.file')
  , to = require('utilise.to')
  , resolve = require('path').resolve
  , dirname = require('path').dirname

module.exports = function (path) {
  return through(function (buf, enc, next) {
    this.push(
      buf
        .toString('utf8')
        .replace(/file\((.*?)\)/g, function($0, $1){ 
          var args = to.arr(arguments)
            , str = args.pop()
            , i = args.pop()
          if (str.slice(i-9, i) == 'function ') return $0
          var resolved = eval($1
            .replace('__dirname', '"' + dirname(path).replace(/\\/g, '\\\\') + '"'))
          
          return '"' + file(resolve(resolved)).replace(/\n/g, '\\n').replace(/\r/g, '').replace(/"/g, '\\"') + '"'
        }) 
    )
    next()
  })
}