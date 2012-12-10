REPORTER = list

test:
		@NODE_ENV=test ./node_modules/.bin/mocha -u bdd --timeout 5s --reporter $(REPORTER)

test-jenkins-xunit:
		@mocha --timeout 5s -R xunit

test-cov: lib-cov
		@PDFTOHTML_COV=1 $(MAKE) test REPORTER=html-cov > test/coverage.html

lib-cov:
		@rm -fr ./$@
		@jscoverage --no-highlight lib $@

clean:
		rm -f test/coverage.html
		rm -fr lib-cov

.PHONY: test test-cov lib-cov test-jenkins-xunit clean
