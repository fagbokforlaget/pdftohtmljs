var assert = require('assert'),
    path = require('path'),
    fs = require('fs'),
    pdftohtml = require('../index.js');

describe('pdftohtmljs', function(){

  describe('add_options', function(){
    it('should add options', function(){
      var transcoder = new pdftohtml(__dirname + '/pdfs/invalidfile.pdf');
      transcoder.add_options(['--space-as-offset 1', '--css-draw 0', '-h']);
      assert.equal(1, transcoder.options.additional.indexOf('--space-as-offset'));
      assert.equal(3, transcoder.options.additional.indexOf('--css-draw'));
    })
  });

  describe('preset', function(){
    it('should add preset', function(){
      var transcoder = new pdftohtml(__dirname + '/pdfs/invalidfile.pdf');
      transcoder.preset('default');
      assert.equal(1, transcoder.options.additional.indexOf('--zoom'));
    })

    it('should fail to load preset', function(){
      var transcoder = new pdftohtml(__dirname + '/pdfs/invalidfile.pdf');
      assert.throws(
        function() {
          transcoder.preset('somethingfisshy');
        },
        /somethingfisshy/
      );
    })

    it('should load custom preset', function(){
      var transcoder = new pdftohtml(__dirname + '/pdfs/invalidfile.pdf');
      transcoder.preset(__dirname + '/presets/custom');
      assert.equal(1, transcoder.options.additional.indexOf('--zoom'));
    })
  });

  describe('convert', function(){
    it('should call success callback', function(done){
      var transcoder = new pdftohtml(__dirname + '/pdfs/sample.pdf');
      transcoder.preset('default');
      transcoder.add_options(['--dest-dir '+ __dirname]);

      // Backward compatibility check
      if (typeof fs.exists !== "undefined") {
        path.exists = fs.exists;
      }

      transcoder.success(function() {
        path.exists(__dirname + '/sample.html', function(exists) {
          if (exists) {
            fs.unlinkSync(__dirname + '/sample.html');
            done();
          }
        });
      });

      transcoder.error(function(error) {
      });

      transcoder.progress(function(ret) {
      });

      transcoder.convert();
    });

    it('should test output file phyiscally', function(done){
      var transcoder = new pdftohtml(__dirname + '/pdfs/sample.pdf', 'out.html');

      // Backward compatibility check
      if (typeof fs.exists !== "undefined") {
        path.exists = fs.exists;
      }

      path.exists(__dirname + '/out.html', function(exists) {
        if (exists) {
          fs.unlinkSync(__dirname + '/out.html');
        }
      });

      transcoder.preset('default');
      transcoder.add_options(['--dest-dir '+ __dirname]);

      transcoder.success(function() {
        path.exists(__dirname + '/out.html', function(exist) {
          if (exist) {
            fs.unlinkSync(__dirname + '/out.html');
            done();
          }
        });
      });

      transcoder.error(function(error) {
      });

      transcoder.progress(function(ret) {
      });

      transcoder.convert();
    });

  });

  describe('error', function(done){
    it('should call error callback', function(){
      var transcoder = new pdftohtml(__dirname + '/pdfs/invalidfile.pdf');
      transcoder.preset('default');

      transcoder.success(function() {
      });

      transcoder.error(function(error) {
        done();
      });

      transcoder.convert();
    })
  });

})
