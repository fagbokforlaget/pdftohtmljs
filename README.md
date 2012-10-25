## pdftohtmljs - pdf2htmlEx shell wrapper for Node.js

pdftohtmljs provides access to pdf2htmlEX via shell in node.js programs. Current version uses ShellJS for platform independent execution of shell commands.

### Installation

via npm:

```
$ npm install pdftohtmljs
```

### Usage
```
var pdftohtml = require('pdftohtmljs'),
    transcoder = new pdftohtml('tests/pdfs/sample.pdf');

transcoder.preset('default');

transcoder.success(function() {
  console.log("convertion done");
});

transcoder.error(function(error) {
  console.log("conversion error: " + error);
});

transcoder.progress(function(ret) {
  console.log ((ret.current*100.0)/ret.total + " %");
});

transcoder.convert();
```

### Tests
```
$ npm test
```

Coverage (Make sure you have installed jscoverage (it's easy `sudo aptitude install jscoverage` or `brew jscoverage`)

```
$ npm test-cov
```

