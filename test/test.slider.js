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

	it( 'should validate control configuration with a valid `value` field', function test() {
		template.value = 5;
		assert.ok( validate( template ) );
	});

	it( 'should validate control configuration without the optional `step` field', function test() {
		delete template.step;
		assert.ok( validate( template ) );
	});

	it( 'should invalidate a control configuration without a `min` field', function test() {
		delete template.min;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a control configuration without a `max` field', function test() {
		delete template.max;
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

	it( 'should invalidate a control configuration with a `value` field outside the interval [min,max]', function test() {
		template.min = 0;
		template.max = 1;
		template.value = 1.5;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a control configuration with a `step` field larger than `max - min`', function test() {
		template.min = -5;
		template.max = 5;
		template.step = 11;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 1 );
	});

	it( 'should invalidate a control configuration with a `min` field larger than or equal to `max`', function test() {
		template.min = 7;
		template.max = 5;
		assert.notOk( validate( template ) );
		assert.strictEqual( validate.errors.length, 2	 );
	});

});
