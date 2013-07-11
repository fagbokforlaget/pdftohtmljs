var shell = require('shelljs');

function pdftohtml (filename, outfile, options) {
  this.options = options || {};
  this.options.additional = [filename];
  if (typeof outfile !== "undefined" && outfile !== null) {
    this.options.additional.push(outfile);
  }

  pdftohtml.prototype.preset = function(preset) {
    try {
      var module = require('./presets/' + preset);
      if (typeof module.load === 'function') {
        module.load(this);
      }
      return this;
    } 
    catch (err) {
      try {
        var module = require(preset);
        if (typeof module.load === 'function') {
          module.load(this);
        }
        return this;
      }
      catch (err) {
        //pass
      }
    }
    throw new Error('preset ' + preset + ' could not be loaded');
  };

  pdftohtml.prototype.add_options = function(optionArray) {
    if (typeof optionArray.length !== undefined) {
        var self = this;
        optionArray.forEach(function(el) {
          if (el.indexOf(' ') > 0) {
            var values = el.split(' ');
            self.options.additional.push(values[0], values[1]);
          } else {
            self.options.additional.push(el);
          }
        });
    }
    return this;
  };

  pdftohtml.prototype.convert = function() {
    var self = this;
    var child = shell.exec('pdf2htmlEX ' + self.options.additional.join(' '), {async:true, silent:true});
    
    var error = '';

    child.stdout.on('data', function(data){
      // pdf2htmlEX writes out to stderr  
    });

    child.stderr.on('data', function(data){
      error += data;
      if (self.options.progress 
            && typeof self.options.progress === "function") {
        var lastLine = data.split(/\r\n|\r|\n/g);
        var ll = lastLine[lastLine.length - 2];
        var progress;
        if (ll) {
          progress = ll.split(/Working\: ([0-9\d]+)\/([0-9\d]+)/ig);
        }
        if (progress && progress.length > 1) {
          // build progress report object
          var ret = {
            current: parseInt(progress[1]),
            total: parseInt(progress[2])
          };
          self.options.progress(ret);
        }
      }
    });

    child.on('exit', function(code, signal){
      if (code === 0) {
        if (self.options.success 
            && typeof self.options.success === "function") {
          self.options.success();
        }
      }
      else {
        if (!shell.which('pdf2htmlEX')) {
          shell.echo('Sorry, this script requires pdf2htmlEX.');
          shell.echo('Install it from http://github.com/coolwanglu/pdf2htmlEX');
        }
        if (self.options.error 
            && typeof self.options.error === "function") {
          self.options.error(error);  
        }
      }

    });
  };

  pdftohtml.prototype.progress = function(callback) {
    this.options.progress = callback;
    return this;
  };

  pdftohtml.prototype.error = function(callback) {
    this.options.error = callback;
    return this;
  };

  pdftohtml.prototype.success = function(callback) {
    this.options.success = callback;
    return this;
  };
}

// module exports
exports = module.exports = function(filename, args) {
  return new pdftohtml(filename, args);
};

