Controls Specification
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependencies][dependencies-image]][dependencies-url]

> JSON specification and validator for [control interfaces](https://github.com/figure-io/polymer-controls).


## Installation

``` bash
$ npm install controls-spec
```


## Usage

``` javascript
var validate = require( 'controls-spec' );
```

#### validate( config )

Validates if a configuration object conforms to the specification for .

``` javascript
var config = {
	"name": "Width",
	"id": 0,
	"type":"slider",
	"min": 400,
	"max": 800,
	"step":10,
}
var isValid = validate( config );
// returns true
```

<a name="attr-errors"></a>
#### validate.errors

An `array` of errors from the most recent validation. If no errors occurred during validation, the list is `null`.

``` javascript
var errs = validator.errors;
```

## Examples

``` javascript
var validate = require( 'controls-spec' ),
	goodConfig,
	badConfig,
	isValid;

// Load in our contol interface configurations...
goodConfig = require( './good.json' );
/*
	{
	    "id": 0,
	    "type":"slider",
	    "max": 10,
	    "min": 0,
	    "step":1
	}
*/
badConfig = require( './bad.json' );
/*
	{
	    "id": 0,
	    "type":"slider",
	    "min":"wrong",
	    "max":1
	}
*/

// Validate:
isValid = validate( goodConfig );
// returns true

isValid = validate( badConfig );
// returns false
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/.svg
[npm-url]: https://npmjs.org/package/

[travis-image]: http://img.shields.io/travis/figure-io/controls-spec/master.svg
[travis-url]: https://travis-ci.org/figure-io/controls-spec

[dependencies-image]: http://img.shields.io/david/figure-io/controls-spec.svg
[dependencies-url]: https://david-dm.org/figure-io/controls-spec

[dev-dependencies-image]: http://img.shields.io/david/dev/figure-io/controls-spec.svg
[dev-dependencies-url]: https://david-dm.org/dev/figure-io/controls-spec

[github-issues-image]: http://img.shields.io/github/issues/figure-io/controls-spec.svg
[github-issues-url]: https://github.com/figure-io/controls-spec/issues
