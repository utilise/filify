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
      expect(is.in(output)('"ba\\"z"')).to.be.ok
      done()
    }
  })

  it('should not replace if function declaration', function(done) {
    browserify()
      .add('fun.js')
      .transform(filify)
      .bundle()
      .pipe(via(test))

    function test(output){
      expect(is.in(output)('function file(name){}')).to.be.ok
      done()
    }
  })

})