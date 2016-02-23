var map = require('lodash/fp/map');
var reduce = require('lodash/fp/reduce');
var merge = require('lodash/fp/merge');
var mergeAll = reduce(merge);

var validatorsFromSchema = require('./infrastructure/validatorsFromSchema');
var loadBuilderCommandsFromManifests = require('./infrastructure/loadBuilderCommandsFromManifests');
var overallResult = require('./infrastructure/overallResult');

var STANDARD_MANIFESTS = [
  require('./manifests/validatorManifest'),
  require('./manifests/modifierManifest')
];

function Validation(schema) {
  this.validators = schema ? validatorsFromSchema(schema) : [];
}

function mapOverValidators(fn) { return map(fn, this.validators); }

Validation.prototype = mergeAll(
  Validation.prototype,
  loadBuilderCommandsFromManifests(STANDARD_MANIFESTS)
);

Validation.prototype.validate = overallResult(mapOverValidators);

module.exports = function(schema) { return new Validation(schema); };
