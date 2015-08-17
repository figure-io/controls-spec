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

var tmpl = require( './fixtures/template.json' );


// TESTS //

describe( 'configuration type', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a control configuration with an invalid type', function test() {
		var values = [
			'random_string',
			293,
			'sliders',
			null
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.type = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 2 );
		}
	});

});
