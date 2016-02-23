var _ = require('lodash');
var usingValidation = require('./validators/using');
var forAttribute = require('./modifiers/forAttribute');
var map = require('lodash/fp/map');

var overallResult = require('./infrastructure/overallResult');

function Validation(schema) {
  this.validators = schema ? validatorsFromSchema(schema) : [];
}

function validatorsFromSchema(schema) {
  return _.map(schema, function(validation, attribute) {
    var attributeModifier = forAttribute(attribute);
    return attributeModifier(usingValidation(validation));
  });
}

function buildStep(attach, factory) {
  return function() {
    var operation = factory.apply(this, arguments);

    attach.call(this, operation);

    return this;
  }
}

function addValidator(validator) {
  this.validators.push(validator);
}

function addModifier(modifier) {
  var targetValidator = this.validators.pop();
  var modifiedValidator = modifier(targetValidator);
  this.validators.push(modifiedValidator);
}

function commandsFromManifest(addWith, manifest) {
  return _.mapValues(manifest, function(factory, name) {
    return buildStep(addWith, factory);
  });
}

function mapOverValidators(fn) { return map(fn, this.validators); }

_.merge(
  Validation.prototype,
  commandsFromManifest(addValidator, require('./validatorManifest')),
  commandsFromManifest(addModifier, require('./modifierManifest'))
);

Validation.prototype.validate = overallResult(mapOverValidators);

module.exports = function(schema) { return new Validation(schema); };
