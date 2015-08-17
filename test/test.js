/* global describe, it, before, beforeEach, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	validate = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// FIXTURES //

var goodConfig = require( './fixtures/good.json' ),
	badConfig = require( './fixtures/bad.json' );


// TESTS //

describe( 'controls-spec', function tests() {


	it( 'should export a function', function test() {
		expect( validate ).to.be.a( 'function' );
	});

	it( 'should properly validate chart configurations', function test() {
		var isValid;

		// Good configuration:
		isValid = validate( goodConfig );
		assert.ok( isValid );

		// Bad configuration:
		isValid = validate( badConfig );
		assert.notOk( isValid );

		assert.strictEqual( validate.errors.length, 1 );
	});

});
