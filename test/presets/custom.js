exports.load = function(pdf2htmlex) {
    pdf2htmlex.add_options([
        '--zoom 1.33',
        '--font-format woff',
        '--font-suffix .woff'
    ]);
    return pdf2htmlex
}
