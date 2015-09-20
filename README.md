## pdftohtmljs - pdf2htmlEx shell wrapper for Node.js
[![Build Status](https://travis-ci.org/fagbokforlaget/pdftohtmljs.png)](https://travis-ci.org/fagbokforlaget/pdftohtmljs)
pdftohtmljs provides access to [pdf2htmlEX](https://github.com/coolwanglu/pdf2htmlEX) via shell in node.js programs. Current version uses ShellJS for platform independent execution of shell commands.

### Installation
via npm:

```
npm install pdftohtmljs
```

### Usage
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

### Command line usage
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

### Tests
```
$ npm test
```

Coverage (Make sure you have installed jscoverage (it's easy `sudo aptitude install jscoverage` or `brew jscoverage`)

```
$ npm test-cov
```

