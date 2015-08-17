'use strict';

var validate = require( './../lib' ),
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
