var map = require('lodash/fp/map');
var compose = require('lodash/fp/compose');
var toPairs = require('lodash/fp/toPairs');

var usingValidation = require('../validators/using');
var forAttribute = require('../modifiers/forAttribute');

var applyAttributeModifiers = map(function(attributeValidatorEntry) {
  return attributeValidatorEntry[0](attributeValidatorEntry[1]);
});

var buildModifiersAndValidators = map(function(entry) {
  return [forAttribute(entry[0]), usingValidation(entry[1])];
});

module.exports = compose(
  applyAttributeModifiers,
  buildModifiersAndValidators,
  toPairs
);

