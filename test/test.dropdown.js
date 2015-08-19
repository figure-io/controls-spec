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

var tmpl = require( './fixtures/dropdown_template.json' );


// TESTS //

describe( 'configuration dropdown control', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should validate a control configuration without the optional `value` field', function test() {
		delete template.value;
		assert.ok( validate( template ) );
	});

	it( 'should invalidate a control configuration with an invalid `choices` array (duplicate items)', function test() {
		template.choices.push( 'one' );
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a control configuration with an invalid `choices` array (less than two items)', function test() {
		template.choices.pop();
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a control configuration without a `choices` array', function test() {
		delete template.choices;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a control configuration for which its `value` is not an element of `choices`', function test() {
		template.value = 'three';
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

});
