var compose = require('lodash/fp/compose');
var curry = require('lodash/fp/curry');
var reduce = require('lodash/fp/reduce');

var valid = require('../results/valid');
var combineResults = require('./combineResults');
var combineAllResults = reduce(combineResults, valid());

var resultForValue = curry(function(value, validator) {
  return validator(value);
});

module.exports = function(mapOverValidators) {
  return compose(
    combineAllResults,
    mapOverValidators,
    resultForValue
  );
}
