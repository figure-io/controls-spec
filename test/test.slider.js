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

var tmpl = require( './fixtures/slider_template.json' );


// TESTS //

describe( 'configuration slider control', function tests() {

	var template;

	before( function before() {
		tmpl = JSON.stringify( tmpl );
	});

	beforeEach( function beforeEach() {
		template = JSON.parse( tmpl );
	});

	it( 'should invalidate a control configuration without a `min` field', function test() {
		template.min = undefined;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a control configuration without a `max` field', function test() {
		template.max = undefined;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a control configuration with an invalid `value` field (non-numeric)', function test() {
		var values = [
			true,
			'not a numeric value',
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.value = '';
			template.value = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a control configuration with an invalid `min` field (non-numeric)', function test() {
		var values = [
			true,
			'not a numeric value',
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.min = '';
			template.min = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a control configuration with an invalid `max` field (non-numeric)', function test() {
		var values = [
			true,
			'not a numeric value',
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.max = '';
			template.max = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

	it( 'should invalidate a control configuration with an invalid `step` field (non-numeric)', function test() {
		var values = [
			true,
			'not a numeric value',
			null,
			function(){},
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			template.step = '';
			template.step = values[ i ];
			assert.notOk( validate( template ) );
			assert.strictEqual( validate.errors.length, 1 );
		}
	});

});
