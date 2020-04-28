var assert = require('assert'),
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
      transcoder._preset('default');
      assert.equal(1, transcoder.options.additional.indexOf('--zoom'));
    });

    it('should fail to load preset', async function(){
      var transcoder = new pdftohtml(__dirname + '/pdfs/invalidfile.pdf');

      try {
        await transcoder.convert('somethingfisshy')
      }
      catch (err) {
        assert.equal(true, /somethingfisshy/.test(err));
      }

    });

    it('should load custom preset', function(){
      var transcoder = new pdftohtml(__dirname + '/pdfs/invalidfile.pdf');
      transcoder._preset(__dirname + '/presets/custom');
      assert.equal(1, transcoder.options.additional.indexOf('--zoom'));
    });
  });

  describe('convert', function(){
    it('should call success callback', function(done){
      var transcoder = new pdftohtml(__dirname + '/pdfs/sample.pdf');
      transcoder.add_options(['--dest-dir '+ __dirname]);

      transcoder.convert().then(function() {
        fs.exists(__dirname + '/sample.html', function(exists) {
          if (exists) {
            fs.unlinkSync(__dirname + '/sample.html');
            done();
          }
        });
      }).catch(function(err) {
          //pass
      });
    });

    it('should test output file phyiscally', function(done){
      var transcoder = new pdftohtml(__dirname + '/pdfs/sample.pdf', 'out.html');

      fs.exists(__dirname + '/out.html', function(exists) {
        if (exists) {
          fs.unlinkSync(__dirname + '/out.html');
        }
      });

      transcoder.add_options(['--dest-dir '+ __dirname]);

      transcoder.convert().then(function() {
        fs.exists(__dirname + '/out.html', function(exist) {
          if (exist) {
            fs.unlinkSync(__dirname + '/out.html');
            done();
          }
        });
      }).catch(function(err) {
        //pass
      });
    });
  });

  describe('error', function(){
    it('should call error callback', function(done){
      var transcoder = new pdftohtml(__dirname + '/pdfs/invalidfile.pdf');
      transcoder.convert().then(function() {
      }).catch(function(err) {
        done();
      });
    });
    it('should throw error when bin is not found', function(done){
      var transcoder = new pdftohtml(__dirname + '/pdfs/invalidfile.pdf', 'something.html', {bin: 'blah'});
      transcoder.convert().then(function() {
      }).catch(function(err) {
        done();
      });
    });

  });

});
