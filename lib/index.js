'use strict';

// MODULES //

var validator = require( 'is-my-json-valid' );


// FUNCTIONS //

/**
* FUNCTION contains( arr, x )
*	Checks whether an array contains a certain element.
*
* @param {Array} arr - input array
* @param {*} x - value to check for
* @returns {Boolean} true if `x` is an element of `arr`, false otherwise
*/
function contains( arr, x ) {
	var res = false,
		i;
	for ( i = 0; i < arr.length; i++ ) {
		if ( arr[ i ] === x ) {
			res = true;
		}
	}
	return res;
} // end FUNCTION contains()


// VALIDATOR //

/**
* FUNCTION validate( config )
*	Validates a `config` object.
*
* @param {Object} config - object to be validated against the schema
* @returns {Boolean} `true` if object passes validation, `false` otherwise
*/
function validate( config ) {
	var validateIt,
		res,
		err;

	validateIt = validator( require( './schema.json' ) );
	res = validateIt( config );

	validate.errors = validateIt.errors;

	// Further checks in case initial schema validation was successful
	if ( res === true ) {
		switch ( config.type ) {
			case 'slider':
				validate.errors = [];
				// Ensure that `min` property is smaller than `max`
				if ( config.min >= config.max ) {
					res = false;
					err = {
						'field': 'data.min',
						'message':'has to be smaller than max'
					};
					validate.errors.push( err );
				}

				// Ensure that `value` property is in the interval [ min, max ]
				if ( config.hasOwnProperty( 'value' ) === true ) {
					if ( config.value < config.min || config.value > config.max ) {
						res = false;
						err = {
							'field': 'data.value',
							'message':'has to be in the interval [min,max]'
						};
						validate.errors.push( err );
					}
				}
				// Ensure that `step` property is smaller than range of the slider
				if ( config.hasOwnProperty( 'step' ) === true ) {
					if ( config.step > config.max - config.min ) {
						res = false;
						err = {
							'field': 'data.step',
							'message':'cannot be larger than max - min'
						};
						validate.errors.push( err );
					}
				}
			break;
			case 'dropdown':
				validate.errors = [];
				// Ensure that `value` property is an element of the `choices` array
				if ( config.hasOwnProperty( 'value' ) === true ) {
					if ( !contains( config.choices, config.value ) ) {
						res = false;
						err = {
							'field': 'data.value',
							'message':'has to be an element of choices'
						};
						validate.errors.push( err );
					}
				}
			break;
		}
	}

	return res;
} // end FUNCTION validate()



// EXPORTS //

module.exports = validate;
