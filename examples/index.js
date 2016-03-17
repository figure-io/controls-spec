'use strict';

var validate = require( './../lib' );
var goodConfig;
var badConfig;
var isValid;

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
console.log( 'Good configuartion:' );
console.log( isValid );

isValid = validate( badConfig );
console.log( 'Bad configuartion:' );
console.log( isValid );
