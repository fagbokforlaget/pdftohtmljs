## pdftohtmljs - pdf2htmlEx shell wrapper for Node.js
[![Build Status](https://travis-ci.org/fagbokforlaget/pdftohtmljs.png)](https://travis-ci.org/fagbokforlaget/pdftohtmljs)
pdftohtmljs provides access to [pdf2htmlEX](https://github.com/coolwanglu/pdf2htmlEX) via shell in node.js programs. Current version uses ShellJS for platform independent execution of shell commands.

### Installation
via npm:

```
$ npm install pdftohtmljs
```

### Usage
```
var pdftohtml = require('pdftohtmljs'),
    converter = new pdftohtml('test/pdfs/sample.pdf');

converter.preset('default');

converter.success(function() {
  console.log("convertion done");
});

converter.error(function(error) {
  console.log("conversion error: " + error);
});

converter.progress(function(ret) {
  console.log ((ret.current*100.0)/ret.total + " %");
});

converter.convert();
```

### Tests
```
$ npm test
```

Coverage (Make sure you have installed jscoverage (it's easy `sudo aptitude install jscoverage` or `brew jscoverage`)

```
$ npm test-cov
```

