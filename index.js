module.exports = process.env.PDFTOHTML_COV
  ? require('./lib-cov/pdftohtml')
  : require('./lib/pdftohtml');

