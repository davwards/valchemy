var _ = require('lodash');
var Result = require('./results/result');
var valid = require('./results/valid');
var usingValidation = require('./validators/using');
var forAttribute = require('./modifiers/forAttribute');
var combineResults = require('./combineResults');

function Validation(schema) {
  if(schema) {
    this.validators = _.map(schema, function(validation, attribute) {
      var attributeModifier = forAttribute(attribute);
      var validator = usingValidation(validation)
      return attributeModifier(validator);
    });
  } else {
    this.validators = [];
  }
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

function resultOfValidatorOn(value) {
  return function(validator) {
    return validator(value);
  }
}

Validation.prototype.length      = buildStep(addValidator, require('./validators/length'));
Validation.prototype.pattern     = buildStep(addValidator, require('./validators/pattern'));
Validation.prototype.custom      = buildStep(addValidator, require('./validators/custom'));
Validation.prototype.withMessage = buildStep(addModifier, require('./modifiers/withMessage'));
Validation.prototype.ifPresent   = buildStep(addModifier, require('./modifiers/ifPresent'));
Validation.prototype.forAttribute   = buildStep(addModifier, require('./modifiers/forAttribute'));

Validation.prototype.validate = function(value) {
  return _.chain(this.validators)
    .map(resultOfValidatorOn(value))
    .reduce(combineResults, valid())
    .value();
};

module.exports = function(schema) { return new Validation(schema); };
