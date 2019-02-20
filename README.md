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

## Installation
via npm:

```
npm install pdftohtmljs
```

## Usage
```javascript
var pdftohtml = require('pdftohtmljs');
var converter = new pdftohtml('test/pdfs/sample.pdf', "sample.html");

// See presets (ipad, default)
// Feel free to create custom presets
// see https://github.com/fagbokforlaget/pdftohtmljs/blob/master/lib/presets/ipad.js
// convert() returns promise
converter.convert('ipad').then(function() {
  console.log("Success");
}).catch(function(err) {
  console.error("Conversion error: " + err);
});

// If you would like to tap into progress then create
// progress handler
converter.progress(function(ret) {
  console.log ((ret.current*100.0)/ret.total + " %");
});


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
This library support nodejs v6+. Anything below v6 may still work but not tested.
