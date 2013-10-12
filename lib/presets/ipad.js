exports.load = function(pdf2htmlex) {
    pdf2htmlex.add_options([
        '--fit-width 968',
        '--font-format woff'
    ]);
    return pdf2htmlex
}
