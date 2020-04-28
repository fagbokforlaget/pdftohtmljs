const { spawn } = require('child_process');

function pdftohtml (filename, outfile, options) {
  this.options = options || {};
  this.options.additional = [filename];

  if (typeof outfile !== "undefined" && outfile !== null) {
    this.options.additional.push(outfile);
  }

  pdftohtml.prototype._preset = (preset) => {
    let module;

    try {
      module = require(`./presets/${preset}`);
    }
    catch (error) {
      module = require(preset)
    }
    finally {
      if (module && typeof module.load === 'function') {
        module.load(this);
        return this;
      }
      else {
        throw new Error('preset ' + preset + ' could not be loaded');
      }

    }
  };

  pdftohtml.prototype.add_options = (optionArray) => {
    if (typeof optionArray.length !== undefined) {
        const self = this;

        optionArray.forEach((el) => {
          const firstSpace = el.indexOf(' ');
          if (firstSpace > 0) {
            const param = el.substr(0, firstSpace);
            const val = el.substr(firstSpace + 1).replace(/ /g, "\\ ");
            self.options.additional.push(param, val);
          } else {
            self.options.additional.push(el);
          }
        });
    }
    return this;
  };

  pdftohtml.prototype.convert = (preset) => {
    const presetFile = preset || "default";
    const self = this;

    self.options.bin = process.env.PDF2HTMLEX_BIN || self.options.bin || 'pdf2htmlEX';

    return new Promise((resolve, reject)  => {
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
          const lastLine = data.toString('utf8').split(/\r\n|\r|\n/g);
          const ll = lastLine[lastLine.length - 2];
          let progress;

          if (ll) {
            progress = ll.split(/Working\: ([0-9\d]+)\/([0-9\d]+)/ig);
          }

          if (progress && progress.length > 1) {
            // build progress report object
            const ret = {
              current: parseInt(progress[1]),
              total: parseInt(progress[2])
            };
            self.options.progress(ret);
          }

        }
      });

      child.on('error', (err) => {
        const error = new Error("Please install pdf2htmlEX from https://github.com/coolwanglu/pdf2htmlEX")
	      error.name = 'ExecutableError'

        reject(error);
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

  pdftohtml.prototype.progress = (callback) => {
    this.options.progress = callback;
    return this;
  };

}

// module exports
exports = module.exports = function(filename, outfile, options) {
  return new pdftohtml(filename, outfile, options);
};

