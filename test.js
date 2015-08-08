var expect = require('chai').expect
  , filify = require('./')
  , browserify = require('browserify')
  , via = require('utilise.via')
  , is = require('utilise.is')

describe('filify', function() {

  it('should filify js', function(done) {
    browserify()
      .add('foo.js')
      .transform(filify)
      .bundle()
      .pipe(via(test))

    function test(output){
      expect(is.in(output)('"baz"')).to.be.ok
      done()
    }
  })

})