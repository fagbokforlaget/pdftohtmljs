const { spawn } = require('child_process');

function pdftohtml (filename, outfile, options) {
  this.options = options || {};
  this.options.additional = [filename];
  if (typeof outfile !== "undefined" && outfile !== null) {
    this.options.additional.push(outfile);
  }

  pdftohtml.prototype._preset = function(preset) {
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
          var firstSpace = el.indexOf(' ');
          if (firstSpace > 0) {
            var param = el.substr(0, firstSpace);
            var val = el.substr(firstSpace + 1).replace(/ /g, "\\ ");
            self.options.additional.push(param, val);
          } else {
            self.options.additional.push(el);
          }
        });
    }
    return this;
  };

  pdftohtml.prototype.convert = function(preset) {
    const presetFile = preset || "default";
    const self = this;

    self.options.bin = self.options.bin || 'pdf2htmlEX';

    return new Promise(function (resolve, reject) {
      let error = '';

      self._preset(presetFile);

      const child = spawn(self.options.bin, self.options.additional);

      child.stdout.on('data', (data) => {
        // pdf2htmlEX writes out to stderr
      });

      child.stderr.on('data', (data) => {
        error += data;
        if (self.options.progress
              && typeof self.options.progress === "function") {
          var lastLine = data.toString('utf8').split(/\r\n|\r|\n/g);
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

      child.on('error', (err) => {
        console.error("Please install pdf2htmlEX from https://github.com/coolwanglu/pdf2htmlEX");
        reject(err);
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve(error);
        } else {
          reject(new Error(`${self.options.bin} ran with parameters: ${self.options.additional.join(' ')} exited with an error code ${code} with following error:\n${error}`));
        }
      });
    });
  };

  pdftohtml.prototype.progress = function(callback) {
    this.options.progress = callback;
    return this;
  };

}

// module exports
exports = module.exports = function(filename, outfile, options) {
  return new pdftohtml(filename, outfile, options);
};

