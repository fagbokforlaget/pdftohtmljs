# pdftohtmljs - pdf2htmlEx shell wrapper for Node.js
[![view on npm](http://img.shields.io/npm/v/pdftohtmljs.svg)](https://www.npmjs.org/package/pdftohtmljs)
[![npm module downloads](http://img.shields.io/npm/dt/pdftohtmljs.svg)](https://www.npmjs.org/package/pdftohtmljs)
[![Dependency Status](https://david-dm.org/fagbokforlaget/pdftohtmljs.svg)](https://david-dm.org/fagbokforlaget/pdftohtmljs)
[![Build Status](https://travis-ci.org/fagbokforlaget/pdftohtmljs.svg)](https://travis-ci.org/fagbokforlaget/pdftohtmljs)
[![Known Vulnerabilities](https://snyk.io/test/github/fagbokforlaget/pdftohtmljs/badge.svg)](https://snyk.io/test/github/fagbokforlaget/pdftohtmljs)
[![view on npm](http://img.shields.io/npm/l/pdftohtmljs.svg)](https://www.npmjs.org/package/pdftohtmljs)

pdftohtmljs provides access to [pdf2htmlEX](https://github.com/coolwanglu/pdf2htmlEX) via shell in node.js programs.

## Requirements
- [pdf2htmlEX](https://github.com/coolwanglu/pdf2htmlEX)

If you've docker env setup, just install it via docker
```
alias pdf2htmlEX="docker run -ti --rm -v ~/pdf:/pdf iapain/pdf2htmlex pdf2htmlEX"
```

~/pdf on host computer will be used as volume

PDF2HTMLEX path is resolved usiing following:
* first it looks into env variable `PDF2HTMLEX_BIN`.
* then it fallbacks to `bin` option.
* then it fallbacks to system path.

## Installation
via npm:

```
npm install pdftohtmljs
````

## Usage
```javascript
const pdftohtml = require('pdftohtmljs')

// See presets (ipad, default)
// Feel free to create custom presets
// see https://github.com/fagbokforlaget/pdftohtmljs/blob/master/lib/presets/ipad.js
const convert = async (file, output, preset) => {
  const converter = new pdftohtml(file, output)

  // If you would like to tap into progress then create
  // progress handler
  converter.progress((ret) => {
    const progress = (ret.current * 100.0) / ret.total

    console.log(`${progress} %`)
  })

  try {
    // convert() returns promise
    await converter.convert(preset || 'ipad')
  } catch (err) {
    console.error(`Psst! something went wrong: ${err.msg}`)
  }

}

// call method
convert('test/pdfs/sample.pdf', 'sample.html')

```

## Command line usage
```
npm install pdftohtmljs -g
```

```
pdftohtmljs sample.pdf
```
You may optionally provide your own filename and preset
```
pdftohtmljs sample.pdf sample.html ipad
```

## Tests
```
$ npm test
```

## NodeJS Support
This library support nodejs v8+
